import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MovieModal from "../MovieModal/MovieModal";
import {
  RowContainer, RowPosters, RowPoster, RowTitle
} from './Styled'

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar";


export default function Row({ isLarge, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  // fetchUrl이 변화할 때마다 fetchMovieData를 실행
  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  // 비동기 함수
  const fetchMovieData = async () => {
    // 받아온 fetchUrl로 GET 요청
    const request = await axios.get(fetchUrl);
    console.log(request)

    setMovies(request.data.results);
  };

  // modal이 열린 상태 저장
  const [modalOpen, setModalOpen] = useState(false);
  // 선택한 영화를 저장
  const [movieSelected, setMovieSelected] = useState({});

  // 영화를 선택하면 해당 영화의 정보를 가진 모달창을 열기 위함
  const handelClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
      <RowContainer>
        <RowTitle>{title}</RowTitle>
        <RowPosters>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
          >
            {movies.map((movie) => (
              <SwiperSlide>
                <RowPoster
                  key={movie.id}
                  isLarge={isLarge ? 'true' : 'false'}
                  src={`https://image.tmdb.org/t/p/original/${isLarge
                      ? movie.poster_path
                      : movie.backdrop_path
                    }`}
                  alt={movie.name}
                  onClick={() => handelClick(movie)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </RowPosters>
      </RowContainer>
    </>
  )
}