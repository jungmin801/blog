---
title: "[테스트코드 입문] 5장 UI 컴포넌트 테스트"
description: 
draft: false
tags: 
date: 2025-08-15
---
## 오늘 읽은 범위
5장 UI 컴포넌트 테스트

## 책에서 기억하고 싶은 내용을 써보세요.
### UI 컴포넌트 테스트
1. UI 컴포넌트의 주요 기능들이 의도한 대로 작동하고 있는가, 문제가 생긴 부분이 없는 가를 확인한다.
	- 데이터를 렌더링하는 기능
	- 사용자의 입력을 전달하는 기능
	- 웹 api와 연동하는 기능
	- 데이터를 동적으로 변경하는 기능
2. UI 컴포넌트를 통해 웹 접근성을 향상시킬 수 있다.

### UI 컴포넌트 테스트의 기초 지식
1. `render()` : 테스트할 컴포넌트를 렌더링
2. `getByText()` : 일치하는 문자열을 가진 한 개의 텍스트 요소를 찾는다.
3. `toBeInTheDocument()` : 해당 요소가 DOM에 존재하는지 검증
4. `getByRole()` : 특정 DOM요소를 role로 취득
5. `toHaveTextContent()` : 문자가 포함되어있는지 검증
6. `fireEvent` : 임의의 DOM 이벤트 발생

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

test('버튼 클릭 시 텍스트 변경', () => {
  render(<Button />);

  // 초기 상태 검증
  const btn = screen.getByRole('button');
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveTextContent('클릭 전');

  // 클릭 이벤트 발생
  fireEvent.click(btn);

  // 변경된 상태 검증
  expect(screen.getByText('클릭 후')).toBeInTheDocument();
});
```

### 아이템 목록 UI 컴포넌트 테스트
1. li요소는 listitem이라는 role을 하기 때문에 `getAllByRole('listitem')`으로 모든 요소를 취득할 수 있다. -> `within()`을 사용하여 취득할 노드의 범위를 줄일 수도 있다.
2. ul요소는 `getByRole('list')`로 취득할 수 있다.
3. 데이터가 없는 경우 목록을 표시하지 않고 '데이터 없음'이라고 표시하는 경우, `queryByRole()`을 사용할 수 있다. queryBy 접두사가 붙은 api는 테스트가 에러 발생으로 중단되지 않는다.

> [!NOTE]
> 요소 취득 api는 원칙에 따라 다음과 같은 순서로 사용할 것을 권장
> 1. 모두가 접근 가능한 쿼리 (웹 접근성 고려)
> 	- getByRole, getByText, getByLabelText, getByPlaceholderText, getByDisplayValue
> 2. 시맨틱 쿼리 -> 브라우저나 보조 기기에 따라 다른 결과가 나올 수 있다.
> 	- getByAltText, getByTitle
> 3. 테스트 ID
> 	- getByTextId


### 인터랙티브 UI 컴포넌트 테스트
1. userEvent로 문자열 입력하기
	- userEvent로 user 인스턴스를 생성
	- user.type으로 입력을 재현
```javascript
const user = userEvent.setup();
 
test('input에 문자열을 입력하면 값이 반영된다', async () => {
  render(<Input placeholder="이름을 입력하세요" />);
  const input = screen.getByPlaceholderText('이름을 입력하세요');
  await user.type(input, '철수');  
  expect(screen.getByDisplayValue('철수')).toBeInTheDocument();
});
```

2. 버튼 활성화 여부 테스트
체크박스를 클릭하면 checked상태가 변경되면서 회원가입 버튼이 활성화 되는 UI가 있다.

```javascript
test('체크박스 클릭 시 회원가입 버튼 활성화', async () => {
  const user = userEvent.setup();
  render(<SignUpForm />);

  const checkbox = screen.getByRole('checkbox', { name: /약관 동의/i });
  const submitButton = screen.getByRole('button', { name: /회원가입/i });
  // 초기 상태: 버튼 비활성화
  expect(submitButton).toBeDisabled();
  // 체크박스 클릭
  await user.click(checkbox);
  // 체크 후: 버튼 활성화
  expect(submitButton).toBeEnabled();
});
```

### 유틸리티 함수를 활용한 테스트
화면 분기가 있는 경우, 여러번 동일한 인터랙션을 작성해야할 때가 많다. 이때, 하나의 함수로 정리하면 재사용이 가능하다.
```javascript
/** 약관 동의 후 회원가입 버튼 클릭 시퀀스 */
export async function agreeAndSubmit() {
  const user = userEvent.setup();
  const checkbox = screen.getByRole('checkbox', { name: /약관 동의/i });
  const submitButton = screen.getByRole('button', { name: /회원가입/i });

  await user.click(checkbox);
  await user.click(submitButton);
}
```

### 스냅샷 테스트
1. UI 컴포넌트가 예기치 않게 변경됐는지 검증하고 싶을 때 사용한다. 
2. 테스트를 실행하면 변경된 부분에 diff가 생긴다.
3. 실패한 테스트를 성공시키려면 커밋된 스냅샷을 갱신해야한다.
```javascript
test('snapshot: 계정명이 표시됐는지 확인한다", () => {
	const { container } = render(<Form name="철수"/>);
	expect(container).toMatchSnapshot(); 
})
```

### 암묵적 역할과 접근 가능한 이름
1. 암묵적 역할 : 명시적으로 role을 지정하지 않아도 초깃값으로 부여된 역할
	- 역할과 요소는 1:1로 매칭되지 않는다.
2. 접근 가능한 이름 : 보조 기기가 인식하는 노드의 명칭