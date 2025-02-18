import Banner from "../components/Movie/Banner";
import MovieSection from "../components/Movie/MovieSection";

const Home = () => {
  return (
    <main>
      <Banner />
      <MovieSection category="nowplaying" />
      <MovieSection category="upcoming" />
      <MovieSection category="toprated" />
    </main>
  );
};

export default Home;