import { useEffect, useState } from "react"
import axios from "../../api/axios"
import requests from "../../api/requests"
import {
    BannerContainer, BannerContents, BannerTitle, BannerButton, BannerPlay, BannerInfo, BannerDes, BannerFadeBottom, BannerPlayContainer, BannerIframe
} from './Styled'

export default function Banner() {
    
    const [movie, setMovie] = useState([])

    // 첫 렌더링 때만 fetchMovie 실행
    useEffect(()=>{
        fetchMovie()
    },[])

    // 비동기 함수
    const fetchMovie = async() => {
        
        // 현재 상영 영화 정보 url인 fetchNowPlaying에 GET을 요청해 받아온 값을 request에 저장
        const request = await axios.get(requests.fetchNowPlaying)
        // 현재 상영 영화 리스트들 중 하나를 랜덤으로 선택하기
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id

        // 랜덤으로 선택된 영화의 상세 정보를 가져오기 위해 GET 요청
        // params에 videos 정보를 추가로 요청해 함께 가져옴
        const {data : movieDetail} = await axios.get(`movie/${movieId}`,{
            params:{append_to_response:"videos"},
        });

        // 영화의 상세 정보를 movie에 저장
        setMovie(movieDetail)
    }
    console.log(movie)

    // overveiw 정보 글자수 자르기 함수
    const truncate = (str,n)=>{
        return str?.length > n ? str.substr(0,n-1) + "...": str
    }

    // play 버튼
    const [isClicked, setIsClicked] = useState(false)

    if(!isClicked) {
        console.log(movie)
        return(
            <BannerContainer
                movie={movie.backdrop_path}
                style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            }}
            >
                <BannerContents>
                    <BannerTitle>
                    {movie.title || movie.name || movie.original_name}
                    </BannerTitle>
                    <BannerButton>
                        <BannerPlay onClick={()=>{setIsClicked(true)}}>Play</BannerPlay>
                        <BannerInfo>More Information</BannerInfo>
                    </BannerButton>
                    <BannerDes>{truncate(movie.overview,100)}</BannerDes>
                </BannerContents>
                <BannerFadeBottom /> 
            </BannerContainer>
        )
    } else {
        return(
            <BannerPlayContainer>
                <BannerIframe
                    width="640"
                    height="360"
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=&autoplay=1&mute=1&playlist=${movie.videos.results[0].key}`}
                    title="YouTube video player" 
                    frameborder="0" 
                    allow=" autoplay; fullscreen" allowFullScreen
                />
            </BannerPlayContainer>
    )}
}