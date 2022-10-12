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