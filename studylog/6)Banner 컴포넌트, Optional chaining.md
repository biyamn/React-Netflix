# 221014 - Banner 컴포넌트, Optional chaining(?.)

## 100자 이상 설명 자르기

영화의 overview를 가져와서 설명을 화면에 출력하는데, 설명이 너무 길어지면 미관상 좋지 않았다. 그래서 100자를 넘어가면 100자에서 자르고 그 뒤는 `...`으로 표시하기로 했다.

```jsx
const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
};

<h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
```

근데 여기서 처음에 나오는 str과 붙어있는 ?는 대체 뭘까? 삼항연산자인가? 근데 왜 .length와 스페이스로 떨어뜨려 놓으면 에러가 뜨지? 커뮤니티에 물어봤다.

이것은 바로…! Optional chaining (?.)라는 것이다!

## Optional chaining

mdn 주소: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

모던JavaScript튜토리얼: [https://ko.javascript.info/optional-chaining](https://ko.javascript.info/optional-chaining)

### 등장 배경

예를 들어 사용자가 여러 명 있는데 그중 몇 명은 주소 정보를 가지고 있지 않다고 가정해보자. 이럴 때 `user.address.street`를 사용해 주소 정보에 접근하면 에러가 발생할 수 있습니다.

그래서 사용된 것이 && 연산자인데, 예를 들면 다음과 같다.

```jsx
let user = {}; // 주소 정보가 없는 사용자

alert( user && user.address && user.address.street ); // undefined, 에러 발생 X
```

하지만 이렇게 AND를 연결해서 사용하면 코드가 아주 길어진다는 단점이 있었다. 그래서 Optional chaining이 등장했다.

아래는 `||`을 사용하여 값이 있는지를 확인한 예시이다. obj.first가 null이나 undefiend가 아니면(값이 있으면) obj.first.name을 출력한다. 

```jsx
const nestedProp = ((obj.first === null || obj.first === undefined) ? undefined : obj.first.name);
```

이를 Optional chaining을 이용해 바꾸면 아래와 같이 간단하게 바뀐다.

```jsx
const nestedProps = obj.first?.name;
```

Banner 컴포넌트에서 직접 사용한 코드를 사용하여 예시를 들어보자.

```jsx
str?.length > n ? str.substr(0, n-1) + "..." : str;
```

여기서 str?.lengh는 

str이 null 혹은 undefind일때 -> null 혹은 undefined
str이 null 혹은 undefined 가 아닐때 -> str.length

가 된다.

따라서 str의 값이 있고 str.length가 n보다 크면 str.substr(0, n-1) + "..."을 반환하고, 없으면 str을 반환한다.

만약 str의 값이 undefined 혹은 null이라면 위의 전체 식의 결과가 undefined가 된다.(오류가 뜨지 않는다는 것이 중요! 그래서 str.length가 있는지 없는지 확인할 수 없으면 이렇게 사용한다.)