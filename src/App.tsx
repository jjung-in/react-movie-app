import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Join from "./pages/Join";
import NowPlaying from "./pages/NowPlaying";
import Upcoming from "./pages/Upcoming";
import Popular from "./pages/Popular";
import Like from "./pages/Like";
import Movies from "./pages/Movies";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="search" element={<Search />} />
            <Route path="/movies" element={<Movies />}>
              <Route path="nowplaying" element={<NowPlaying title="현재 상영작" />} />
              <Route path="upcoming" element={<Upcoming title="상영 예정작" />} />
              <Route path="popular" element={<Popular title="인기 작품" />} />
              <Route path="like" element={<Like title="찜한 작품" />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="join" element={<Join />} />
          </Route>
        </Routes >
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
