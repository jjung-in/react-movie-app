import styled from "styled-components";
import Container from "../../styles/Container";
import BannerCard from "./BannerCard";
import Slider from "react-slick";
import Spinner from "../common/Spinner";
import { breakpoints } from "../../styles/breakpoint";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/slick.css";
import { usePopularMovies } from "../../hooks/useMovies";

const settings = {
  infinite: true,
  centerMode: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  focusOnSelect: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Banner = () => {
  const { data, isFetching } = usePopularMovies();

  return (
    <S.BannerWrapper>
      <Container>
        {isFetching ? (
          <Spinner height="200px" />
        ) : (
          <Slider {...settings}>
            {data?.results?.map((movie) => (
              <BannerCard key={movie.id} movie={movie} />
            ))}
          </Slider>
        )}
      </Container>
    </S.BannerWrapper>
  );
};

export default Banner;

const S = {
  BannerWrapper: styled.section`
    margin-bottom: 30px;

    @media (max-width: ${breakpoints.mobile}) {
      display: none;
    }
  `,
};