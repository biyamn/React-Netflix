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