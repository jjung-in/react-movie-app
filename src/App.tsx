import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="detail" element={<Detail />} />
        </Route>
      </Routes >
    </BrowserRouter>
  )
}

export default App;
