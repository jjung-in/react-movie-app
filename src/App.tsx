import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Likes from "./pages/Likes";
import Login from "./pages/Login";
import Join from "./pages/Join";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />} >
              <Route path="/" element={<Home />} />
              <Route path="detail/:id" element={<Details />} />
              <Route path="search" element={<Search />} />
              <Route path="likes" element={<Likes />} />
              <Route path="login" element={<Login />} />
              <Route path="join" element={<Join />} />
            </Route>
          </Routes >
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;
