import MovieBanner from "../components/Movie/MovieBanner";
import MovieList from "../components/Movie/MovieList";

const Home = () => {
  return (
    <main>
      <MovieBanner />
      <MovieList title="Upcoming" />
      <MovieList title="Upcoming" />
      <MovieList title="Upcoming" />
      <MovieList title="Upcoming" />
    </main>
  )
}

export default Home;