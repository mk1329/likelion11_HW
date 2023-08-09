import React, { useEffect, useState } from "react";
import { Container, LogoImg, NavInput, UserImg } from "./Styled.jsx"
import { useNavigate } from "react-router-dom";

export default function Nav() {

  const [show, setShow] = useState(false);

  // 스크롤하면 nav의 색이 변경
  useEffect(() => {
    window.addEventListener("scroll", () => {
      // 50 이상 내려가면
      if (window.scrollY > 50) {
        // nav의 배경색이 채워짐
        setShow(true);
      } else {
        // 50 위로 올라오면 다시 투명해짐
        setShow(false);
      }
    });

    // 컴포넌트가 언마운트될 때 등록한 스크롤 이벤트를 제거
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const [searchValue, setsearchValue] = useState("");
  const navigate = useNavigate();

  // 검색어에 해당하는 페이지로 이동
  // 검색창을 nav바 안에 넣음 ...
  const handleChange = (e) => {
    setsearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return(
    <Container show={`${show}`}>
      {/* show={show ? 'true' : 'false'} */}
      {/* show={`${show}`} */}
        <LogoImg
            alt="Netflix logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png"
        />
        <NavInput
          value={searchValue}
          onChange={handleChange}
          className="nav__input"
          type="text"
          placeholder="영화제목을 입력해주세요."
        />
        <UserImg 
            alt="User logged"
            src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
        />
    </Container>
  )
}