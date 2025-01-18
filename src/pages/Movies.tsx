import { Outlet } from "react-router-dom"
import styled from "styled-components";
import Container from "../styles/Container"

const MoviesContainer = styled(Container)`
  padding: 20px 0;
`;

const Movies = () => {
  return (
    <main>
      <section>
        <MoviesContainer>
          <Outlet />
        </MoviesContainer>
      </section>
    </main>
  )
}

export default Movies