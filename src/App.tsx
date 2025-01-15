import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="detail" element={<Detail />} />
          </Route>
        </Routes >
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
