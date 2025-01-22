import styled from "styled-components";
import Container from "../styles/Container"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

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
  color: ${({ $isError, theme }) => ($isError ? theme.colors.primaryText : theme.colors.secondaryText)};

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

interface Errors {
  username?: boolean;
  password?: boolean;
  confrimPassword?: boolean;
}

const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if (username.length < 3) newErrors.username = true;
    if (password.length < 4 || password.length > 20) newErrors.password = true;
    else if (!/[a-z]/.test(password) || !/\d/.test(password)) newErrors.password = true;
    else if (/[A-Z]/.test(password)) newErrors.password = true;
    else if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) newErrors.password = true;
    if (!confirmPassword || password !== confirmPassword) newErrors.confrimPassword = true;
    setErrors(newErrors);
  }

  return (
    <main>
      <JoinContainer>
        <JoinWrapper>
          <Title>Sign Up</Title>
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
              <ErrorText $isError={errors.username}><FontAwesomeIcon icon={faCircleCheck} />Username must be at least 3 characters long.</ErrorText>
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
              <ErrorText $isError={errors.password}><FontAwesomeIcon icon={faCircleCheck} />Password must be 4-20 characters long and contain both a lowercase letter and a number.</ErrorText>
            </div>
            <div>
              <label htmlFor="confirm-password">
                <Input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  maxLength={20}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  $isError={errors.confrimPassword}
                />
              </label>
              <ErrorText $isError={errors.confrimPassword}><FontAwesomeIcon icon={faCircleCheck} />Passwords do not match</ErrorText>
            </div>
            <SubmitButton type="submit">Sign Up</SubmitButton>
          </Form>
        </JoinWrapper>
      </JoinContainer>
    </main>
  )
}

export default Join