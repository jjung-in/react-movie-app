import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { darkTheme } from './styles/theme';
import { AuthProvider } from './context/AuthContext';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Details from './pages/Details';
import Search from './pages/Search';
import FavoritesPage from './pages/Favorites';
import Login from './pages/Login';
import Join from './pages/Join';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='detail/:id' element={<Details />} />
              <Route path='search' element={<Search />} />
              <Route path='favorites' element={<FavoritesPage />} />
              <Route path='login' element={<Login />} />
              <Route path='join' element={<Join />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
