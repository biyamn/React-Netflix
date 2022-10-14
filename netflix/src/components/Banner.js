//  Banner.js
import React, { useEffect, useState } from 'react';
import requests from "../api/requests";
import axios from "../api/axios";
import "./Banner.css";

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
    // 이렇게 하면 movieDetail 안에
    const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
      params: {append_to_response: "videos"},
    });
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        {/* title이 없으면 name, name이 없으면original_name */}
        <h1>{movie.title || movie.name || movie.original_name}</h1>

        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button info">More Information</button>
        </div>
        
        {/* 설명이 100자 이상이면 100자에서 자르고 ... 출력하기 */}
        <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
      
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
} 

export default Banner;
