import styled from "styled-components";
import Container from "../styles/Container"
import AuthForm from "../components/User/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJoin } from "../hooks/useAuth";
import { AuthError } from "firebase/auth";
import { breakpoints } from "../styles/breakpoint";

const Join = () => {
  const { mutate, isPending } = useJoin();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleJoin = (email: string, password: string) => {
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/login");
        },
        onError: (error) => {
          const firebaseError = error as AuthError;
          if (firebaseError.code === 'auth/email-already-in-use') {
            setError('This email is already in use. Please use a different email.');
          } else if (firebaseError.code === 'auth/invalid-email') {
            setError('Invalid email address. Please check your email format.');
          } else if (firebaseError.code === 'auth/invalid-email') {
            setError("Password must be at least 6 characters.");
          } else {
            setError('Registration failed: ' + firebaseError.message);
          }
        }
      }
    );
  };

  return (
    <S.Main>
      <S.JoinContainer>
        <AuthForm isJoin={true} submitAction={handleJoin} isPending={isPending} error={error} setError={setError} />
      </S.JoinContainer>
    </S.Main>
  );
};

export default Join;

const S = {
  Main: styled.main`
    min-height: calc(100vh - 171px);
    
    @media (max-width: ${breakpoints.tablet}) {
      min-height: calc(100vh - 141px);
    }

    @media (max-width: ${breakpoints.mobile}) {
      min-height: calc(100vh - 121px);
    }
  `,

  JoinContainer: styled(Container)`
    padding-top: 80px;
    padding-bottom: 100px;

    @media (max-width: ${breakpoints.mobile}) {
      padding-top: 60px;
      padding-bottom: 60px;
    }
  `,
};