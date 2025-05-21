---
title: 노마드코더 Flutter 챌린지 후기
description: 
draft: false
tags:
  - flutter
  - nomadcoder
date: 2025-05-21
---

# 갑자기 왜 flutter를?
요즘따라 앱 서비스에 대한 아이디어가 툭툭 떠오르곤 하는데,
문제는 앱 개발을 전혀 배운 적이 없다보니 그냥 계속 묵혀만 두었다.

마침 회사 일도 널널하고, 매일 React만 해서 지겨웠던 찰나,
무심코 노마드코더에 접속했는데, 웬 걸.
3일 후에 시작하는 flutter 챌린지가 있는 것이 아닌가.
주저없이 바로 챌린지 신청을 했다.

**🔽 <font color="#4f81bd">나의 챌린지 졸업작품</font>** 

![[flutter_challenge.gif]] 


# 내가 느낀 Flutter

dart는 호불호가 갈릴 것 같은 언어다. 
문법이 어딘가 여러 언어들이 섞여 있는 듯한 느낌이랄까?

객체지향 프로그래밍 언어인 dart는 react 개발자인 나에게는 확실히 낯설게 다가왔다.
*Named Constructor* 같은 문법은 정말로 생소하고 독특하게 느껴졌다.

```dart
class User {
  String name;
  int age;

  User({ 
	  required this.name, 
	  required this.age
  });

// 이게 바로 named constructor
  User.guest({required String name, required int age}) 
	  : this.name = name,  
		this.age = age;
}
```

그럼에도 불구하고 javascript/react 와 비슷하게 느껴지는 부분도 많았는데,
flutter의 widget은 react의 component와,
dart의 named parameter는 JS의 객체 구조분해와,
flutter의 state는 react의 state와 매우 유사했다.

```dart
Text("Hello", style: TextStyle(fontSize: 16)) // Flutter
```
```javascript
<Text style={{ fontSize: 16 }}>Hello</Text> // React
```


무엇보다 flutter는" 개발자 경험(DX)에 진심이구나"라는 것을 느꼈다.
vscode extension만 설치하면 자동완성,코드 액션을 통한 리팩토링, 디버깅 등이 매우 간편하다.
시뮬레이터 연결도 쉬웠고, hot reload도 빠르게 잘 작동해서 개발하기 편했다.


# 챌린지 추천? 비추천?

챌린지는 2주간 진행되는데, dart와 flutter 강의를 모두 들어야한다.
난 dart 강의를 미리 들어놨고, 생각보다 퀴즈가 많아서 할만 했지만
코드 챌린지에서 시간이 꽤 소요돼서 그부분을 감안해서 **미리 인강을 들어놓는 걸 추천**한다.

강의는 dart 기본 문법, flutter UI, API 요청, 라우팅 정도로 기본적인 내용을 다룬다.
flutter를 찍먹해보기 딱 좋은 구성이라고 생각한다.

한 가지 아쉬운 점은 flutter를 소개하는 파트에서 flutter는 "인터랙션에 특화되어있다"고 강조했지만,
실제로 강의에서는 해당 부분에 대한 내용이 거의 다루어지지 않아 아쉬웠다.
어떤 인터랙션이 가능한지, 그것이 왜 훌륭한지 좀 더 예시가 있었다면 좋았을 것 같다.

2주간 하루 3~4시간 정도 투자할 수 있고, flutter에 관심이 있다면 **충분히 추천!**


# 이 이후에는?

flutter를 조금 더 공부해보고 싶다. 강의에서는 각 위들의 특성에 대해서 아주 자세히 설명하진 않아서 UI 작업을 할때 꽤 애를 먹었다.
expanded가 어떻게 동작하는지, 왜 vscode는 container를 sizedbox로 바꾸라고 하는지 같은 부분은 아직 잘 이해가 되지 않는다.

또 위치 기반의 기능이나 알람 등 앱의 핵심 기능에 대해서도 배워보고 싶어서 따로 flutter 강의를 구매해서 들어볼 생각이다.




