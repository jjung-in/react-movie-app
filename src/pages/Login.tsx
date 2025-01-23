import styled from "styled-components"
import Container from "../styles/Container"
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { AuthError } from "firebase/auth";

const LoginContainer = styled(Container)`
  max-width: 560px;
  padding: 80px 0 100px;
`;

const LoginWrapper = styled.div`
  padding: 50px 50px 65px 50px;
  background-color: #252525;
  border-radius: 10px;
`;

const Title = styled.h2`
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Input = styled.input<{ $isError?: string }>`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: #2f2f2f;
  border-radius: 5px;
  border: ${({ $isError, theme }) => ($isError ? `1px solid ${theme.colors.pointText}` : "none")};
`;

const ErrorText = styled.p`
  display: flex;
  margin-top: 10px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primaryText};

  svg {
    margin-right: 7px;
    padding-top: 1.5px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: bold;
  letter-spacing: 1px;
  background-color: ${({ theme }) => theme.colors.pointText};
  border-radius: 5px;
  cursor: pointer;
`;

const SignUpWrapper = styled.p`
  margin-top: 15px;
  text-align: center;
`;

const SignUpLink = styled(Link)`
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.primaryText};

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setError("");

    if (!email) {
      setEmailError("Please enter your email.");
      emailRef.current?.focus();
      return;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError("Invalid email address. Please check your email format.");
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      setPasswordError("Please enter your passowrd.");
      passwordRef.current?.focus();
      return;
    }

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
  }

  return (
    <main>
      <LoginContainer>
        <LoginWrapper>
          <Title>Login</Title>
          <Form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">
                <Input
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="off"
                  maxLength={30}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  $isError={emailError}
                  ref={emailRef}
                />
              </label>
              {emailError && <ErrorText><FontAwesomeIcon icon={faCircleCheck} />{emailError}</ErrorText>}
            </div>
            <div>
              <label htmlFor="password">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  maxLength={20}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  $isError={passwordError}
                  ref={passwordRef}
                />
              </label>
              {passwordError && <ErrorText><FontAwesomeIcon icon={faCircleCheck} />{passwordError}</ErrorText>}
            </div>
            {error && <ErrorText><FontAwesomeIcon icon={faCircleCheck} />{error}</ErrorText>}
            <SubmitButton type="submit" disabled={isPending}>{isPending ? "Loading..." : "Login"}</SubmitButton>
          </Form>
          <SignUpWrapper>
            <span>Don't have an account?</span>
            <SignUpLink to="/join">Sign Up</SignUpLink>
          </SignUpWrapper>
        </LoginWrapper>
      </LoginContainer>
    </main>
  )
}

export default Login;