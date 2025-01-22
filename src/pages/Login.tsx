import styled from "styled-components"
import Container from "../styles/Container"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

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

const Input = styled.input<{ $isError?: boolean }>`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: #2f2f2f;
  border-radius: 5px;
  border: ${({ $isError, theme }) => ($isError ? `1px solid ${theme.colors.pointText}` : "none")};
`;

const ErrorText = styled.p<{ $isError?: boolean }>`
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

interface Errors {
  username?: boolean;
  password?: boolean;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if (!username) newErrors.username = true;
    if (!password) newErrors.password = true;
    setErrors(newErrors);
  }

  return (
    <main>
      <LoginContainer>
        <LoginWrapper>
          <Title>Login</Title>
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  autoComplete="off"
                  maxLength={20}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  $isError={errors.username}
                />
              </label>
              {errors.username && <ErrorText $isError={errors.username}><FontAwesomeIcon icon={faCircleCheck} />Please enter your username.</ErrorText>}
            </div>
            <div>
              <label htmlFor="password">
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  maxLength={20}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  $isError={errors.password}
                />
              </label>
              {errors.password && <ErrorText $isError={errors.password}><FontAwesomeIcon icon={faCircleCheck} />Please enter your password.</ErrorText>}
            </div>
            <SubmitButton type="submit">Login</SubmitButton>
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

export default Login