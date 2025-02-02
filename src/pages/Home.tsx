import MovieBanner from "../components/Movie/MovieBanner";
import MovieList from "../components/Movie/MovieList";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      <MovieBanner />
      {isAuthenticated && <MovieList url="like" />}
      <MovieList url="nowplaying" />
      <MovieList url="upcoming" />
      <MovieList url="popular" />
    </main>
  )
}

export default Home;