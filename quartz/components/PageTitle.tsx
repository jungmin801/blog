import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

interface PageTitleOptions {
  // 이미지 URL을 위한 옵션 추가
  titleImage?: string
  // 이미지 크기 옵션
  imageSize?: number
  // 이미지를 원형으로 표시할지 여부
  roundImage?: boolean
}

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass, opts }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  
  // 옵션에서 값 가져오기, 기본값 설정
  const options = opts as PageTitleOptions
  const titleImage = options?.titleImage || "/static/icon.png"
  const imageSize = options?.imageSize || 40
  const roundImage = options?.roundImage !== false // 기본값은 true
  
  // 이미지 컨테이너 스타일 계산
  const imageContainerStyle = {
    width: `${imageSize}px`,
    height: `${imageSize}px`,
    borderRadius: roundImage ? '50%' : '0',
  }
  
  return (
    <div class={classNames(displayClass, "page-title-container")}>
      <div class="title-image-container" style={imageContainerStyle}>
        <img src={titleImage} alt={title} class="title-image" />
      </div>
      <h2 class="page-title">
        <a href={baseDir}>{title}</a>
      </h2>
    </div>
  )
}

PageTitle.css = `
.page-title-container {
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.title-image-container {
  overflow: hidden;
  flex-shrink: 0;
}

.title-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

export default ((opts?: PageTitleOptions) => {
  const component = (props: QuartzComponentProps) => {
    return PageTitle({
      ...props,
      opts,
    })
  }
  component.css = PageTitle.css
  return component
}) satisfies QuartzComponentConstructor