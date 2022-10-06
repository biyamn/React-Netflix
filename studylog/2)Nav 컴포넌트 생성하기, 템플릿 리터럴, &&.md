# 1006 - Nav 컴포넌트 생성하기, 조건에 따라 달라지는 className

# Nav 컴포넌트 생성하기

1. div가 아니라 nav로 감싼다
2. 넷플릭스 로고를 img 태그에 넣는다
3. 사용자 프로필을 img 태그에 넣는다
4. css를 꾸민다(className을 true, false 이렇게 두 개 만들어서 nav bar의 상태에 따라서 달라지게 함. 예를 들어 className이 true이면 css에 .true를 만들어 특정 DOM이 true일 때만 css가 적용되도록!

# useEffect

강의를 듣는데 useEffect가 나왔다. 자세히 설명을 안하고 넘어가셔서 당황했음.. 그래서 검색을 해서 알아봤다. 

useEffect는 렌더링, 혹은 변수의 값 혹은 오브젝트가 달라지게 되면 그것을 인지하고 업데이트를 해주는 함수이다.

1. 선언방법
    
    첫번째 인자(effect)는 함수, 두번째 인자는 배열(deps)이 들어간다.
    
    `useEffect(effect, [, deps]);`
    
    - effect
        - 렌더링 이후 실행할 함수. 리액트는 이 함수를 기억했다가 DOM 업데이트 후 불러낸다.
        - effect 함수에서 함수를 return 할 경우 그 함수가 컴포넌트가 Unmount될 때 정리의 개념으로 한 번 실행된다.
    - deps
        - 배열의 형태로, 특정한 값이 변경될 때 effect 함수를 실행하고 싶을 경우 배열 안에 그 값을 넣어준다.
        - 빈 배열을 입력할 경우 컴포넌트가 Mount 될 때에만 실행된다.

# scrollY

App 컴포넌트에 height: 115vh를 개발자 도구에서 주면 스크롤이 생긴다. 그리고 스크롤을 내리고 올려봤을 때, scrollY는 다음과 같다.

```jsx
useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("window.scrollY", window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    })

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });
```

![%EC%BA%A1%EC%B2%98](https://user-images.githubusercontent.com/101965666/194291782-2c9ec2f7-0370-4b8c-930a-dfcd2f827e1c.png)


→ 우리는 스크롤을 어느정도 내렸을 때 nav bar가 검정색으로 변하는 것을 원한다!

# nav bar 동작하게 만들기

- 우리는 스크롤을 어느정도 내리면 nab bar가 검정색으로 변하도록(원래 투명함) 만들려고 한다!

이와 같이 className에 자바스크립트를 넣어 준다. 

```jsx
// Nav.js
<nav className={`nav ${show && "nav__black"}`}>
// 얘와 같다는 걸 발견!
<nav className={"nav" + (show ? " nav__black" : '')}>

// 결과 1(show가 true일 때): <nav class="nav nav__black">
// 결과 2(show가 false일 때): <nav class="nav false">
```

```jsx
// Nav.css
.nav__black {
  background-color: #111;
}
```

근데… `{`nav ${show && "nav__black"}`}` 이 어떻게 동작하는 건지 모르겠다. 

### 모르겠는 부분

1. ${}과 백틱은 왜 사용되었는지
2. 여기서 &&가 갑자기 왜 나오는지

커뮤니티에 질문을 올렸다!

### 알게 된 거

1. 문자열 안에서 변수를 사용하는 방법(*템플릿 문자열 리터럴*)
    - ${변수}로 문자열 안에서 변수를 쓸 수 있음
    - 그렇게 쓰려면 문자열 전체를 백틱으로 감싸야 함
    - [템플릿 리터럴 관련 링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)
2. &&가 반환하는 값에 답이 있다.
    - AND 연산자(&&)는 두 피연산자가 모두 참일 때 true, 아닌 경우 false를 반환한다.
        - **AND 연산자는 첫 번째 *falsy*를 반환한다. 피연산자에 *falsy*가 없다면 마지막 값을 반환한다. (OR은 첫 번째 *truthy*를 반환하고 *truthy*가 없다면 마지막 값 반환)**
        - `alert( 1 && 2 && null && 3 ); // null` (AND는 첫번째 *falsy*인 null 반환)
        - `alert( null || 0 || 1 ); // 1` (1은 *truthy* 0은 *falsy -* OR은 첫번째 *truthy* 1 반환)
        - [관련 링크](https://ko.javascript.info/logical-operators)
        - [단축평가에 관한 링크](https://curryyou.tistory.com/193)
    - a && b는 다음과 같은 의미로 사용됨.
        
        **if a가 *truthy*인가? => b, else => a (b 평가 없음)**
        
        - 따라서 condition && value에서 조건이 참이라면 value고 거짓이면 false(==contidion 값)이 됨.
        - true && “문자열” → 문자열, false && “문자열” → false(문자열은 *truthy*임)