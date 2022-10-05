# 1005 - 영화API, axios(+인스턴스), Netflix 구조 생성

# The Movie DB API 생성하기

영화 정보를 가져오기 위해 The Movie DB API를 생성한다.([이곳에서](http://themoviedb.org)!)

내 API 키: adb01f6c1b0929b51b4cb6942788b2fb

### API 사용법

![캡처](https://user-images.githubusercontent.com/101965666/194058477-a05ade14-365b-4a5d-b1ed-d8daff118276.PNG)

# The Movie DB API 요청을 위한 Axios 인스턴스 생성 및 요청 보내기

### Axios란?

- 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
- 쉽게 말하면 백엔드와 프론트엔드의 통신을 쉽게 하기 위해 Ajsx와 더불어 사용되는 라이브러리
    
    ![1](https://user-images.githubusercontent.com/101965666/194058480-8d4c8c20-cd4f-4274-bd10-89044d7b6762.PNG)
    
    - 리액트에서 The Movie DB API 서버에 “영화 정보 좀 보내줘”라고 Axios를 통해 말하면 서버는 “응 여기!” 하며 영화 정보를 Axios를 통해 프론트엔드에 보내준다.

### Axios 사용 방법

- axios 모듈 설치 `npm install axios --save`
    - 설치 후 package.json에 가면 axios가 들어간 것 확인 가능
- axios.get(”주소”)
    - (예) axios.get(”https://api.themoviedb.org/3/trending/all/week”)

### Axios를 인스턴스화 하는 이유

- 인스턴스화란?
    
    계속 사용하는(겹치는) 주소는 인스턴스화하여 중복된 부분을 계속 입력하지 않도록 한다.
    

### Axios 인스턴스 만드는 순서

1. 인스턴스 생성할 폴더 파일 생성
    
    src/axios.js
    
    src/requests.js
    
2. 파일에 입력
    
    ```jsx
    // axios.js
    
    import axios from "axios";
    
    const instance = axios.create({
      baseURL: "https://api.themoviedb.org/3/",
      params: {
          api_key: "adb01f6c1b0929b51b4cb6942788b2fb",
          language: "ko-KR",
      },
    });
    
    export default instance;
    ```
    
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
    

# 넷플릭스 애플리케이션 전체 구조 생성하기

![3](https://user-images.githubusercontent.com/101965666/194058486-6d11c5f7-d3f0-4d08-9d54-0cf6c67678fe.PNG)

- Navigation Bar(Nav.js)
    
    맨 위에 있는 바로, 기본 상태에서는 보이지 않지만 스크롤을 내리면 보인다.
    
- Banner(Banner.js)
    
    영화가 크게 보이는 배너
    
- Row
    
    TopRated, Comedy, Horror 등 주제에 따라서 영화를 나열하는 공간. 여러 개 있을 예정이다. 
    
- Footer
    
    맨 아래에 정보 등을 적는 공간
    
    src 아래에 components 폴더를 만들고, 그 아래에 Banner.js/css, Footer.js, Nav.js/css, Row.js/css를 넣어준다. 그리고 영화를 클릭하면 나오는 모달창을 구현하기 위해 일단 MovieModal이라는 폴더만 만들어 준다.(나중에 추가할 것)
    

![4](https://user-images.githubusercontent.com/101965666/194058490-97c21b6b-b8dc-4c54-85f9-72fa0b269919.PNG)