import styled from "styled-components"
import Container from "../styles/Container"
import AuthForm from "../components/User/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { AuthError } from "firebase/auth";
import { breakpoints } from "../styles/breakpoint";

const Login = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (email: string, password: string) => {
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error) => {
          const firebaseError = error as AuthError;
          if (firebaseError.code === 'auth/wrong-password' || firebaseError.code === 'auth/invalid-credential') {
            setError('Incorrect email or password. Please try again.');
          } else if (firebaseError.code === 'auth/user-not-found') {
            setError('No user found with this email address. Please check your email or sign up.');
          } else if (firebaseError.code === 'auth/invalid-email') {
            setError('Invalid email address. Please check your email format.');
          } else if (firebaseError.code === 'auth/user-disabled') {
            setError('Your account has been disabled. Please contact support.');
          } else if (firebaseError.code === 'auth/too-many-requests') {
            setError('Too many unsuccessful login attempts. Please try again later.');
          } else {
            setError('Login failed: ' + firebaseError.message);
          }
        }
      }
    );
  };

  return (
    <S.Main>
      <S.LoginContainer>
        <AuthForm isJoin={false} submitAction={handleLogin} isPending={isPending} error={error} setError={setError} />
      </S.LoginContainer>
    </S.Main>
  );
};

export default Login;

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

  LoginContainer: styled(Container)`
    padding-top: 80px;
    padding-bottom: 100px;

    @media (max-width: ${breakpoints.mobile}) {
      padding-top: 60px;
      padding-bottom: 60px;
    }
  `,
};