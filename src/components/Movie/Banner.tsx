import styled from "styled-components";
import Container from "../../styles/Container";
import BannerCard from "./BannerCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/slick.css";
import { usePopularMovies } from "../../hooks/useMovies";

const S = {
  BannerWrapper: styled.section`
    margin-bottom: 30px;
  `,
}

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
  const { data, isLoading, isError, error } = usePopularMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  return (
    <S.BannerWrapper>
      <Container>
        <Slider {...settings}>
          {data?.results?.map((movie: any) => (
            <BannerCard key={movie.id} movie={movie} />
          ))}
        </Slider>
      </Container>
    </S.BannerWrapper>
  )
}

export default Banner;