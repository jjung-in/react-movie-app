import Banner from "../components/Movie/Banner";
import MovieSection from "../components/Movie/MovieSection";

const Home = () => {
  return (
    <main>
      <Banner />
      <MovieSection url="nowplaying" />
      <MovieSection url="upcoming" />
      <MovieSection url="toprated" />
    </main>
  )
}

export default Home;