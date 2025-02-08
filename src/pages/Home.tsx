import Banner from "../components/Movie/Banner";
import MovieList from "../components/Movie/MovieList";

const Home = () => {
  return (
    <main>
      <Banner />
      <MovieList url="nowplaying" />
      <MovieList url="upcoming" />
      <MovieList url="toprated" />
    </main>
  )
}

export default Home;