import MovieBanner from "../components/Movie/MovieBanner";
import MovieList from "../components/Movie/MovieList";

const Home = () => {
  return (
    <main>
      <MovieBanner />
      {/* <MovieList title="찜한 작품" url="like" /> */}
      <MovieList title="현재 상영작" url="nowplaying" />
      <MovieList title="상영 예정작" url="upcoming" />
      <MovieList title="인기 작품" url="popular" />
    </main>
  )
}

export default Home;