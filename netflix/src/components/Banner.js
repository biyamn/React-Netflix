  import React, { useEffect, useState } from 'react';
  import requests from "../api/requests";
  import axios from "../api/axios";

  const Banner = () => {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);

    // 비동기로 요청하기 때문에 받고 난 다음에 request에 
    const fetchData = async () => {

      // 현재 상영중인 영화 정보를 가져오기(여러 영화)
      // requests는 src/api/requests.js에 있음
      // pending(보류)는 await로 없앨 수 있음
      const request = await axios.get(requests.fetchNowPlaying); 
      
      // 여러개의 영화 중 하나를 골라서 ID 잡아오기
      const movieId = 
        request.data.results[
          Math.floor(Math.random() * requests.data.results.length)
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