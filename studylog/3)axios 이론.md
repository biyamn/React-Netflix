# 221011 - axios 이론

메인 화면에 새로고침할 때마다 새로운 큰 이미지가 뜨는 이미지 배너를 생성할 것이다. (Banner 컴포넌트)

이때 뜨는 이미지는 [TMDB](https://www.themoviedb.org/)라는 Movie DB를 제공하는 사이트에서 가져올 것이다.

이때 강의에서는 사이트의 데이터를 가져오기 위해 axios라는 라이브러리를 썼는데, axios가 낯설어 그냥 넘어갈 수 없었다. 

그래서 오늘은 axios를 공부해보고 여러 예제를 직접 만들어보며 axios에 대한 궁금증을 해소하려고 한다. 시간이 된다면 같이 사용되는 useEffect에 대해서도 공부해볼 것이다.

<aside>
💡 —————관련 포스팅들—————

[1탄 - 자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)

[2탄 - 자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)

[3탄 - 자바스크립트 async와 await](https://joshua1988.github.io/web-development/javascript/js-async-await/)

[useEffect 완벽가이드](https://overreacted.io/ko/a-complete-guide-to-useeffect/)

[useEffect 리액트 공식문서 설명](https://beta.reactjs.org/learn/synchronizing-with-effects)

[react axios로 API 호출(ft. promise, hooks)](https://goddino.tistory.com/158)

[Axios란? / Axios 사용 및 서버 통신 해보기!](https://velog.io/@zofqofhtltm8015/Axios-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%84%9C%EB%B2%84-%ED%86%B5%EC%8B%A0-%ED%95%B4%EB%B3%B4%EA%B8%B0)

[API란? 비개발자가 알기 쉽게 설명해드립니다!](https://blog.wishket.com/api%EB%9E%80-%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85-%EA%B7%B8%EB%A6%B0%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8/)

[[React] 리액트 Axios](https://mjn5027.tistory.com/32)

[[ES6] Promises](https://ssungkang.tistory.com/entry/ES6-Promises-then-catch-all-race-finally)

—————————————————

</aside>

---

# axios

- axios는 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트로서 HTTP 요청을 promise 기반으로 처리한다.
- Axios는 브라우저, Node.js를 위한 Promise(ES6) API를 활용하는 HTTP 비동기 통신 라이브러리이다.
    - ES6 전에 비동기식 처리를 하려면 콜백 지옥이 따로 없었다고 한다. 하지만 ES6로 넘어오면서 이러한 모습은 then, aync, await로 깔끔하게 정리된다.
- 즉 백엔드랑 프론트엔드랑 통신을 쉽게하기 위해 사용한다.

## API란?

![%EC%BA%A1%EC%B2%98](https://user-images.githubusercontent.com/101965666/195119138-2a61555a-e32c-4e5b-822e-5e78a6bd01d4.png)

- API는 손님(프로그램)이 주문할 수 있게 메뉴(명령 목록)를 정리하고, 주문(명령)을 받으면 요리사(응용프로그램)와 상호작용하여 요청된 메뉴(명령에 대한 값)를 전달한다.
- 쉽게 말해, **API는 프로그램들이 서로 상호작용하는 것을 도와주는 매개체**로 볼 수 있다.

## 서버에서 axios 설치

- npm install axios

## ****axios 요청(request) 파라미터 옵션****

- **HTTP method**: 요청방식(get이 디폴트)
    - get: API를 통해 정보를 받아오는 것(입력한 url에 존재하는 자원에 요청함)
        - 서버에서 어떤 데이터를 가져와소 보여주는 용도
        - 값이나 상태 등을 바꿀 수는 없음
    - post: 정보를 보내는 것
- url: 서버 주소
- baseURL: url을 상대경로로 쓸 때 url 맨 앞에 붙는 주소.
    - baseURL이 https://never/api이고 url이 /post이면 https://never/api/post로 요청이 가게 됨
- headers: 요청 헤더
- data: body에 보내는 데이터(요청 방식이 PUT, POST, PATCH에 해당하는 경우)
- params: URL 파라미터
- responseType: 서버가 응답해주는 데이터의 타입 지정(arraybuffer, document, json, text, stream, blob)
- withCredentials: cross-site access-control 요청 허용 유무. true로 하면 cross-origin으로 쿠키값을 전달할 수 있다

## 자바스크립트의 비동기성

fetch에서 에러가 발생하기 때문에 끝나야 하는데 실제 결과는 example이 찍히고 에러가 발생한다. 그 이유는 자바스크립트의 비동기성 때문이다. 

fetch를 통해 먼저 요청을 보내놓고 그 쪽에서는 일을 진행하고 있지만 프로그램은 계속 실행이 되므로 console.log를 하는 것이다. 그리고 요청의 결과가 나오면 그 다음에 결과인 에러가 발생한다.

```livescript
const example = fetch("http://example.com/");

console.log("example");
```