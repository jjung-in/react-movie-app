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
import Movies from "./pages/Movies";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="search" element={<Search />} />
            <Route path="movies/:category" element={<Movies />} />
            <Route path="login" element={<Login />} />
            <Route path="join" element={<Join />} />
          </Route>
        </Routes >
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
