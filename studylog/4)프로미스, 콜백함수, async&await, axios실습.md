# 221012 - Promise, 콜백함수, async&await, axios 실습

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

## 콜백함수

- 파라미터로 함수를 전달받아 함수의 내부에서 실행하는 함수
- 콜백함수는 이름이 없는 익명함수를 사용하는데, 함수의 내부에서 실행되기 때문에 이름을 붙이지 않아도 된다
- **비동기 처리를 유연하게 하기 위한 함수**(feat. 콜백 함수 지옥)
- 비동기 처리란? 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것
- 자바스크립트에서 비동기 처리가 필요한 이유: 화면에서 서버로 데이터를 요청했을 때 서버가 언제 그 요청에 대한 응답을 줄지도 모르는데 마냥 다른 코드를 실행 안 하고 기다릴 순 없기 때문
- 함수를 콜백함수로 사용할 경우, 함수의 이름만 넘겨주면 된다.
    
    ```jsx
    function whatYourName(name, callback) {
        console.log('name: ', name);
        callback();
    }
    // callback() 아님
    ```
    
- 두 번째 인수로 전달된 함수(대개 익명 함수)(여기서는 callback)는 원하는 동작이 완료되었을 때 실행된다.(콜백 함수는 기능이 끝난 후 실행될 함수이므로
    
    ```jsx
    function loadScript(src, **callback**) {
      let script = document.createElement('script');
      script.src = src;
    
      script.onload = () => **callback**(script);
    
      document.head.append(script);
    }
    ```
    
- 무언가를 비동기적으로 수행하는 함수는 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 `콜백`을 인수로 반드시 제공해야 한다

## Promise란?

- 프로미스는 자바스크립트 비동기 처리에 사용되는 객체이다.
- 프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용한다.
- 서버에다가 ‘데이터 하나 보내주세요’ 라는 요청을 보냈을 때 데이터를 받아오기도 전에 마치 데이터를 다 받아온 것 마냥 화면에 데이터를 표시하려고 하면 오류가 발생하거나 빈 화면이 뜬다. 이와 같은 문제점을 해결하기 위한 방법 중 하나가 프로미스이다.
    
    ```jsx
    // 예시
    function getData(callback) {
      // new Promise() 추가
      return new Promise(function(resolve, reject) {
        $.get('url 주소/products/1', function(response) {
          // 데이터를 받으면 resolve() 호출
          resolve(response);
        });
      });
    }
    
    // getData()의 실행이 끝나면 호출되는 then()
    getData().then(function(tableData) {
      // resolve()의 결과 값이 여기로 전달됨
      console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
    });
    ```
    
- 프로미스의 3가지 상태
    - pending(대기): 비동기 처리 로직이 아직 완료되지 않은 상태
    - fulfilled(이행): 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태. then()을 이용하여 처리 결과 값을 받을 수 있음
    - rejected(실패): 비동기 처리가 실패하거나 오류가 발생한 상태. catch()로 실패한 이유(실패 처리의 결과 값)을 받을 수 있음

## async와 await

- async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법이다.  **기존의 비동기 처리 방식인 콜백함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게** 도와준다.
- 위에서 아래로 한 줄 한 줄 차근히 읽으면서 사고할 수 있게 코드를 구성하는 방식이 async, await 문법의 목적이다.
- 기본 문법
    
    ```jsx
    **async** function 함수명() {
      **await** 비동기_처리_메서드_명();
    }
    ```
    
    - 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 `await`
    가 의도한 대로 동작한다.
    - 일반적으로 `await`의 대상이 되는 비동기 처리 코드는 Axios 등 프로미스를 반환하는 API 호출 함수이다.

## 실습 1 - 인터넷 예제

아래처럼 실습할 수 있게 예제를 제공하는 TMBD에서 데이터를 axios로 가져와서  페이지에 출력해보려고 한다. (다른 블로그에서 코드 가져와서 수정함)

![%EC%BA%A1%EC%B2%98](https://user-images.githubusercontent.com/101965666/195373780-97ae75b3-3552-48b6-a01b-22c1235137af.png)

```jsx
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function AxiosApi() {
    
    const [title, setTitle] = useState([]);

    // 통신 메서드
    function searchApi() {
        const url = "https://jsonplaceholder.typicode.com/posts";
        axios.get(url)
        .then(function(response) {
          setTitle(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
        
    }

    // 조회 데이터 존재할 경우
    if(title.length > 0) {
        return (
            title.map(title => (
                (title.id < 10) ? (
                    <div key={title.id}>
                        <p>{`title ${title.id} : ${title.title}`}</p>
                    </div>)
                : null
            ))
        );
    } else { // 조회 데이터 존재하지 않을 경우
        return (
            <div>
                <button onClick={searchApi}> 불러오기 </button>
            </div>
        )
    }
}
export default AxiosApi;
```

그럼 아래와 같이 성공적으로 데이터를 받아온 것을 알 수 있다!

![%EC%BA%A1%EC%B2%98 1](https://user-images.githubusercontent.com/101965666/195374329-3ca2de6e-f545-46e2-b3f3-764c072624ee.png)


## 실습2 - 강의에서 사용한 예제

드디어! 강의 코드를 이해해보자. 이걸 이해하려고 axios, 프로미스, 콜백함수, async&await, API, 비동기를 공부해보았다.(아주 얕게 아는 상태이지만, 그래도 이런게 있다는 걸 안 것이 큰 성과임!!)

일단 강의에서는 api라는 폴더 아래에 axios.js와 requests.js를 두었다. 

그리고 배너의 이미지를 TMDB에서 가져와야 하므로 Banner.js에 axios 코드를 작성하였다.

![%EC%BA%A1%EC%B2%98 2](https://user-images.githubusercontent.com/101965666/195373776-3b2ad954-f105-4436-94c7-5e8831b4cd03.png)
)

하나씩 차근차근 살펴보자. 아래는 axios.js로 axios만의 instance를 만든 것이다.  원래 아래와 같이 baseURL 다음에 물음표를 친 후 api_key와 language를 모두 입력해줘야 하는데, 매번 이렇게 하기 번거로우므로 axios instance를 만든 것이다.

[https://api.themoviedb.org/3/movie/now_playing?api_key=adb01f6c1b0929b51b4cb6942788b2fb&language=ko-KR](https://api.themoviedb.org/3/movie/now_playing?api_key=adb01f6c1b0929b51b4cb6942788b2fb&language=ko-KR) 

```jsx
// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  // ? 없어도 알아서 넣어줌!
  params: {
      api_key: "adb01f6c1b0929b51b4cb6942788b2fb",
      language: "ko-KR",
  },
});

export default instance;
```

아래는 requests.js로 각 주소를 변수에 넣어서 주소를 쉽게 가져다 쓸 수 있게 했다.

```jsx
// requests.js
const requests = {
  fetchNowPlaying: "movie/now_playing",
  fetchNetflixOriginals: "/discover/tv?with_networks=213",
  fetchTrending: "/trending/all/week",
  fetchTopRated: "/movie/top_rated",
  fetchActionMovies: "/discover/movie?with_genres=28",
  fetchComedyMovies: "/discover/movie?with_genres=35",
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  fetchDocumentaries: "/discover/movie?with_genres=99",
}

export default requests;
```

아래는 Banner.js이다. useEffect 안에 fetchData()라는 함수를 넣었다. 왜 그런 건지는 사실 잘 모르겠다. 다만 useEffect가 일단 함수를 한 번 실행 후 [] 안의 변수가 바뀔 때마다 실행되고, [] 안에 아래와 같이 아무것도 없다면 실행되지 않는다는 것만 알겠다. 주석으로 설명을 써놓았다.

다만, request라는 변수를 response라고 바꿨다.(강의와 다르게) requests와 헷갈렸기 때문이다.

```jsx
//  Banner.js
import React, { useEffect, useState } from 'react';
import requests from "../api/requests";
import axios from "../api/axios";

const Banner = () => {

  const [movie, setMovie] = useState([]);
  // [] 안의 변수들이 바뀔 때마다 함수가 실행됨(()=>fetchData())
  // 일단 함수를 한 번 실행 후 [] 안의 변수가 바뀔 때마다 실행
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    // requests는 src/api/requests.js에 있음
    // pending(보류)는 await로 없앨 수 있음
    // await을 쓰면 await 뒤에 거를 기다려줌. 받아 올 때까지
    const response = await axios.get(requests.fetchNowPlaying); 
    // 콘솔은 많이 찍을 수록 좋음! 나중에는 다 지워야 하지만. 에러를 잡으려고 썼다.
    // console.log(response);
    // console.log(response.data.results.length);
    // console.log(Math.random() * response.data.results.length);
    // 여러개의 영화 중 하나를 골라서 ID 잡아오기
    const movieId = 
    response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const results= await axios.get(`movie/${movieId}`, {
      params: {append_to_response: "videos"},
    });
    
    console.log('results', results);
  };

  return (
    <div>
      
    </div>
  );
};

export default Banner;
```