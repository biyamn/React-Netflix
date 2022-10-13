# 221013 - JavaScript로 axios 실습

# 1. 자바스크립트 axios 실습

어떤 분이 리액트 실습이 어려우면 일단 자바스크립트로 axios를 사용하는 연습을 해보라고 하셔서 그렇게 하기로 했다.

## 콘솔에 데이터 받아오기

일단 자바스크립트로 영화를 콘솔에 받아오는 것부터 시작했다. 

```jsx
key = "내 키 값"
const fetchTrending = **async**() => {
  const url = "https://api.themoviedb.org/3/trending/all/week?api_key=" + key + "&language=ko-KR"
  const response = **await** axios.get(url);
  for(let i=0; i<10; i++) {
    if (response.data.results[i].title == undefined) {
      h1Response.textContent = response.data.results[i].name
    }
    else {
      h1Response.textContent = response.data.results[i].title
    }
  }
}
fetchTrending()
```

- url: API key와 language를 설정하지 않고 주소를 `https://api.themoviedb.org/3/trending/all/week`라고만 하면 정상적인 화면이 뜨지 않았다. API 키와 language가 있어야 했는데, 그래서 이 부분이 신기했다.
- async와 await를 이용함
- `response`, `response.data`, `response.data.results` 모두 콘솔에 출력해보며 원하는 데이터에 접근하려고 했다.
- 그런데 results의 값은 영화의 개수만큼 여러개였다. 그래서 for문으로 영화 0번째, 1번째, …9번째를 선택해서 제목을 선택하기 위해 `response.data.results[i].title`라는 코드를 사용했다.
- 문제 발생!
    - 영화 제목을 출력하니 몇개의 제목은 undefined로 뜨는 현상을 발견했다.
    - 그래서 데이터를 자세히 보니, 제목이 name으로 정의되고 있었다(title이 아니라)
    - 따라서 제목이 undefined이면 name을 찾아 그걸 출력하도록 했다.

### 성공!!

![%EC%BA%A1%EC%B2%98](https://user-images.githubusercontent.com/101965666/195642296-d7b0a670-2121-4c0c-bd42-2531d6c91561.png)

## 화면에 출력하기

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- 버튼 생성 -->
  <button id="get-button">최신 영화 10선 불러오기</button>
  <!-- 영화 제목 출력 예정 -->
  <h1></h1>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

- ‘최신 영화 10선 불러오기’라는 버튼을 만들고, 이를 클릭하면 h1 태그에 출력되게 했다.
- axios는 script로 받아왔다.

```jsx
const key = "adb01f6c1b0929b51b4cb6942788b2fb";

document.getElementById("get-button").onclick = function () {
  const fetchTrending = async() => {
    const url = "https://api.themoviedb.org/3/trending/all/week?api_key=" + key + "&language=ko-KR"
    const response = await axios.get(url);
    const h1Response = document.querySelector('h1')
    for(let i=0; i<10; i++) {
      if (response.data.results[i].title == undefined) {
        h1Response.textContent = response.data.results[i].name
      }
      else {
        h1Response.textContent = response.data.results[i].title
      }
    }
  }
  fetchTrending()
};
```

- 버튼을 클릭하면 데이터를 가져오는 fetchTrending이 실행되게 했다.

### 문제 발생!

하지만 문제가 발생했다. 10편의 영화를 불러와서 제목을 모두 쓰려고 했는데, 같은 h1태그에 영화 제목을 계속 불러오다보니 가장 마지막에 있던 영화 제목만 화면에 출력되고 나머지는 출력되지 않았다. 이걸 어떻게 해결할 수 있을까?

![%EC%BA%A1%EC%B2%98 1](https://user-images.githubusercontent.com/101965666/195642334-70013926-11f8-44d3-85a8-ae3c6abacb8e.png)

성공했다!!!! document.createElement로 매번 h3을 만들어주고, (h1에서 h3으로 변경함) .appendChild()로 h3들을 붙여주면 된다.

![%EB%85%B9%ED%99%94_2022_10_13_19_09_13_0](https://user-images.githubusercontent.com/101965666/195642343-5557eacb-988f-4d95-bff4-054f7a4468fa.gif)

```jsx
const key = "adb01f6c1b0929b51b4cb6942788b2fb";

document.getElementById("get-button").onclick = function () {
  const fetchTrending = async() => {
    const url = "https://api.themoviedb.org/3/trending/all/week?api_key=" + key + "&language=ko-KR"
    const response = await axios.get(url);
    for(let i=0; i<10; i++) {
      if (response.data.results[i].title == undefined) {
        newH3 = document.createElement('h3')
        newH3.textContent = response.data.results[i].name
        document.body.appendChild(newH3);
      }
      else {
        newH3 = document.createElement('h3')
        newH3.textContent = response.data.results[i].title
        document.body.appendChild(newH3);
      }
    }
  }
  fetchTrending()
};
```

<aside>
💡 위의 코드 리뷰를 받았다! 하나하나 수정해보자.

</aside>

- 이벤트 리스너는 onclick에 = 해서 넣는 것보다 addEventListener('click', fn) 형태로 넣는 것이 더 선호됨
    
    이유는 이벤트 리스너를 여러 개 붙일 수 있다는 점이나, 아니면 addEventListener의 3번째 인자에 각종 옵션을 넘겨서 특수한 동작을 의도할 수 있다는 점 등 addEventListener가 상대적으로 더 많은 기능을 가지고 있어서 보통 이쪽으로 통일해서 사용하는 편임
    
- ⭕ 지금 보면 핸들러 자체는 일반 function이고 내부에 async 화살표 함수를 정의해서 이걸 부르는 방식으로 하고 있는데, 그냥 이벤트 핸들러를 async 함수로 만들어도 이 경우에는 특별히 이상 없이 잘 작동한다!
- ⭕ URL 만들 때 Template Literal 문자열 사용하면 좀 더 이쁘게 만들 수 있을 것 같다
- ⭕ for 문 돌 때 지금처럼 하면 results 안에 값이 10개보다 적게 들어 있을 때 에러가 남.
    
     for문을 `for (let i = 0; i < Math.min([http://response.data](https://t.co/Oow8XVepID).results.length, 10); i++)` 로 바꾸거나 `for (const result of [http://response.data](https://t.co/Oow8XVepID).results.slice(0, 10))`으로 바꾸고 내부에서 result를 사용하는 방법이 있다
    
- ⭕ if랑 else에서 각각 첫 줄과 셋째 줄이 중복되는데 첫 줄과 셋째 줄을 if 문 밖으로 빼고 if 안에는 textContent 설정하는 거만 남겨 두면 코드 중복을 줄일 수있다!

아래는 수정한 코드!! 정상적으로 동작한다~~~

```jsx
const key = "adb01f6c1b0929b51b4cb6942788b2fb";

document.getElementById('get-button').addEventListener('click', async function getUrl() {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=ko-KR`
    console.log(url);
    const response = await axios.get(url);
    console.log(response);
    for(let i=0; i<Math.min(response.data.results.length, 10); i++) {
      newH3 = document.createElement('h3')
      if (response.data.results[i].title == undefined) {
        newH3.textContent = response.data.results[i].name
      }
      else {
        newH3.textContent = response.data.results[i].title
      }
      document.body.appendChild(newH3);
    }
})
```

# 2. Banner 컴포넌트 나머지 만들기

아래에서 ‘// 궁금한 곳’을 봐보자.

```jsx
const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(requests.fetchNowPlaying);
    const movieId = 
    response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;
		
		// 궁금한 곳(data: movieDetail)
    const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
      params: {append_to_response: "videos"},
    });
    console.log(movieDetail);
  };
};
```

1. {data: movieDetail} 대신 result를 넣어봤다(이해가 안돼서)
    
    그리고 console.log(result)를 해봤다.
    
    그럼 아래와 같이 여러 데이터가 담긴 객체가 출력된다.
    
    ![%EC%BA%A1%EC%B2%98 2](https://user-images.githubusercontent.com/101965666/195642354-64254745-638b-42bc-b758-4950231e5e1c.png)
    
    하지만 나는 여기서 data만 가져오고 싶다. 그걸 {data: movieDetail}로 해결할 수 있는 것 같다.
    
2. result 대신 {data: movieDetail}라고 써봤다. 
    
    data만 콘솔창에 출력되는 것을 알 수 있다!!!
    
    
    ![캡처 PNG (6)](https://user-images.githubusercontent.com/101965666/195642943-aa2bfa68-6398-40f3-96fc-33f299fbc430.png)

    
    이것은 바로 구조분해 할당이라고 한다!!!!!! mdn 자료는 [여기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 있다.
    
    ```jsx
    const {data: movieDetail} = await axios.get(url)
    ```
    
    (아니 구조분해할당 자주 보기도 하고 읽기도 했는데,,, 이렇게 보니까 하나도 모르겠다. 아직 익숙해지지 않았나보다. mdn 문서를 읽어보자!!
    
    ### 구조분해할당
    
    구조분해할당이란?
    
    구문은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식이다. 예제를 살펴보자.
    
    ```jsx
    let a, b, rest;
    [a, b] = [10, 20];
    
    console.log(a);
    // 10
    
    console.log(b);
    // 20
    
    [a, b, ...rest] = [10, 20, 30, 40, 50];
    
    console.log(rest);
    // [30,40,50]
    
    // 왼쪽 오른쪽 순서 바뀌면 안됨
    ({ a, b } = { a: 10, b: 20 });
    console.log(a); // 10
    console.log(b); // 20
    ```
    
    예제를 살펴봤으니 이제 실제 문제에 접근해보자.
    
    ```jsx
    const {data: movieDetail} = await axios.get(url)
    ```
    
    - 받아온 것을 이름 변경해서 movieDetail에 저장한다는 뜻
    
    아래는 내가 만든 예시인데, 객체 안에 data, title, content 객체를 만들고 {data: movieDetail}에 대입했더니 data에 해당하는 데이터만 movieDetail에 저장되는 것을 확인할 수 있었다!! 이해 완료!!
    
    ```jsx
    const {data: movieDetail} = {
      data: {a:1, b:2, c:3, d:4}, 
      title: {e: "111", f: "222", g: "333"},
      content: {a:111, b:"eee"}
    };
    console.log(movieDetail)
    
    // [object Object] {
    //   a: 1,
    //   b: 2,
    //   c: 3,
    //   d: 4
    // }
    ```