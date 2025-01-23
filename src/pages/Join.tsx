import styled from "styled-components";
import Container from "../styles/Container"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJoin } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { AuthError } from "firebase/auth";

const JoinContainer = styled(Container)`
  max-width: 560px;
  padding: 80px 0 100px;
`;

const JoinWrapper = styled.div`
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

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const { mutate, isPending } = useJoin();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);


  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
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
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      passwordRef.current?.focus();
      return;
    }

    if (!confirmPassword || password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      confirmPasswordRef.current?.focus();
      return;
    }

    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/login");
        },
        onError: (error) => {
          const firebaseError = error as AuthError;
          if (firebaseError.code === 'auth/email-already-in-use') {
            setEmailError('This email is already in use. Please use a different email.');
            emailRef.current?.focus();
          } else if (firebaseError.code === 'auth/invalid-email') {
            setEmailError('Invalid email address. Please check your email format.');
            emailRef.current?.focus();
          } else if (firebaseError.code === 'auth/invalid-email') {
            setPasswordError("Password must be at least 6 characters.");
            passwordRef.current?.focus();
          } else {
            setError('Registration failed: ' + firebaseError.message);
          }
        }
      }
    );
  }

  return (
    <main>
      <JoinContainer>
        <JoinWrapper>
          <Title>Sign Up</Title>
          <Form onSubmit={handleJoin}>
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
                  maxLength={30}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  $isError={passwordError}
                  ref={passwordRef}
                />
              </label>
              {passwordError && <ErrorText><FontAwesomeIcon icon={faCircleCheck} />{passwordError}</ErrorText>}
            </div>
            <div>
              <label htmlFor="confirm-password">
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  maxLength={20}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  $isError={confirmPasswordError}
                  ref={confirmPasswordRef}
                />
              </label>
              {confirmPasswordError && <ErrorText><FontAwesomeIcon icon={faCircleCheck} />{confirmPasswordError}</ErrorText>}
            </div>
            {error && <ErrorText><FontAwesomeIcon icon={faCircleCheck} />{error}</ErrorText>}
            <SubmitButton type="submit" disabled={isPending}>{isPending ? "Loading..." : "Sign Up"}</SubmitButton>
          </Form>
        </JoinWrapper>
      </JoinContainer>
    </main>
  )
}

export default Join;