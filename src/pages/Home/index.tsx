import BannerSection from "./BannerSection";
import MovieSection from "./MovieSection";

const Home = () => {
  return (
    <main>
      <BannerSection />
      <MovieSection category="nowplaying" />
      <MovieSection category="upcoming" />
      <MovieSection category="toprated" />
    </main>
  );
};

export default Home;