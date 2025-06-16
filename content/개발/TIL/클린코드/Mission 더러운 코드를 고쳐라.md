---
title: "[클린코드] Mission 더러운 코드를 고쳐라!"
description:
draft: false
tags:
  - 노개북
  - 노마드코더
  - 개발자북클럽
date: 2025-05-30
---

## QUIZ 01

- Hint❕ : 검색하기 쉬운 이름을 사용하세요.
- blastOFF는 로켓 발사를 의미. 86400000은 하루의 밀리초 (milliseconds) 의미.

```javascript
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000)

// GOOD 😎
// 위 코드를 깨끗하게 다시 작성해 주세요.
function scheduleBlastOffAfterOneDay() {
  const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24
  setTimeout(blastOff, ONE_DAY_IN_MS)
}

// 어떻게 고쳤는지, 사례에서 무엇을 배워야 하는지 설명해주세요.
1. 하루의 밀리초 표현하는 숫자를 상수로 분리하고, 계산식을 통해 이해도를 높였다.
2. 불필요한 주석을 제거했다.
3. setTimeout을 함수로 분리해, 동작을 함수 이름만으로도 전달할 수 있도록 했다.
4. 함수명과 상수명에 day, ms, schedule, blastoff 등 검색할 수 있는 키워드를 포함했다.
```

## QUIZ 02

- Hint❕ : 의미있는 이름을 사용해 주세요.

```javascript
const yyyymmdstr = moment().format("YYYY/MM/DD")

// GOOD 😎
// 위 코드를 깨끗하게 다시 작성해 주세요.
const dateSlash = moment().format("YYYY/MM/DD")

// 어떻게 고쳤는지, 사례에서 무엇을 배워야 하는지 설명해주세요.
1. 날짜 포맷의 특성이 드러나도록 'slash'를 변수명에 포함했다.
```

## QUIZ 03

- Hint❕ : 불필요하게 반복하지 마세요.

```javascript
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue",
}

function paintCar(car, color) {
  car.carColor = color
}

// GOOD 😎
// 위 코드를 깨끗하게 다시 작성해 주세요.
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue",
}

function paintCar(car, color) {
  car.color = color
}

// 어떻게 고쳤는지, 사례에서 무엇을 배워야 하는지 설명해주세요.
1. 불필요한 prefix인 car를 제거하여 반복을 줄였다.
```
