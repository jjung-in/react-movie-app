import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { breakpoints } from "../../styles/breakpoint";

interface Props {
  isJoin: boolean;
  submitAction: (email: string, password: string) => void;
  isPending: boolean;
  error: string;
  setError: (error: string) => void;
};

const AuthForm = ({ isJoin, submitAction, isPending, error, setError }: Props) => {
  const authContent = {
    signUp: {
      title: "Sign Up",
      link: "/login",
      linkText: "Sign In",
      linkDescription: "Already have an account?",
    },
    signIn: {
      title: "Sign In",
      link: "/join",
      linkText: "Sign Up",
      linkDescription: "Don't have an account?",
    }
  };
  const { title, link, linkText, linkDescription } = authContent[isJoin ? "signUp" : "signIn"];

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({ email: "", password: "", passwordConfirm: "", });
    setError("");

    if (!inputValue.email) {
      setErrors((prev) => ({ ...prev, email: "Please enter your email." }));
      emailRef.current?.focus();
      return;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address. Please check your email format." }));
      emailRef.current?.focus();
      return;
    }

    if (!inputValue.password) {
      setErrors((prev) => ({ ...prev, password: "Please enter your password." }));
      passwordRef.current?.focus();
      return;
    } else if (isJoin && inputValue.password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
      passwordRef.current?.focus();
      return;
    }

    if (isJoin && inputValue.password !== inputValue.passwordConfirm) {
      setErrors((prev) => ({ ...prev, passwordConfirm: "Passwords do not match." }));
      passwordConfirmRef.current?.focus();
      return;
    }

    submitAction(inputValue.email, inputValue.password);
  };

  return (
    <S.AuthFormBox>
      <S.Title>{title}</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <S.Input
              id="email"
              type="text"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              maxLength={30}
              value={inputValue.email}
              onChange={handleInputChange}
              $isError={errors.email}
              ref={emailRef}
            />
          </label>
          {errors.email && <S.ErrorText><FontAwesomeIcon icon={faCircleCheck} />{errors.email}</S.ErrorText>}
        </div>
        <div>
          <label htmlFor="password">
            <S.Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              maxLength={20}
              value={inputValue.password}
              onChange={handleInputChange}
              $isError={errors.password}
              ref={passwordRef}
            />
          </label>
          {errors.password && <S.ErrorText><FontAwesomeIcon icon={faCircleCheck} />{errors.password}</S.ErrorText>}
        </div>
        {isJoin && (
          <div>
            <label htmlFor="passwordConfirm">
              <S.Input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                placeholder="Confirm your password"
                maxLength={20}
                value={inputValue.passwordConfirm}
                onChange={handleInputChange}
                $isError={errors.passwordConfirm}
                ref={passwordConfirmRef}
              />
            </label>
            {errors.passwordConfirm && <S.ErrorText><FontAwesomeIcon icon={faCircleCheck} />{errors.passwordConfirm}</S.ErrorText>}
          </div>
        )}
        {error && <S.ErrorText><FontAwesomeIcon icon={faCircleCheck} />{error}</S.ErrorText>}
        <S.SubmitButton type="submit" disabled={isPending}>{isPending ? "Loading..." : title}</S.SubmitButton>
      </S.Form>
      <S.LinkWrapper>
        <span>{linkDescription}</span>
        <S.Link to={link}>{linkText}</S.Link>
      </S.LinkWrapper>
    </S.AuthFormBox>
  );
};

export default AuthForm;

const S = {
  AuthFormBox: styled.div`
    width: 100%;
    max-width: 560px;
    padding: 50px 50px 65px 50px;
    background-color: #252525;
    border-radius: 10px;

    @media (max-width: ${breakpoints.mobile}) {
      /* padding: 30px 40px 50px 40px; */
    }
  `,

  Title: styled.h2`
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  Input: styled.input<{ $isError?: string }>`
    width: 100%;
    height: 3rem;
    padding: 0 20px;
    background-color: #2f2f2f;
    border-radius: 5px;
    border: ${({ $isError, theme }) => ($isError ? `1px solid ${theme.colors.pointText}` : "none")};
  `,

  ErrorText: styled.p`
    display: flex;
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.primaryText};

    & svg {
      margin-right: 7px;
      padding-top: 1.5px;
    }
  `,

  SubmitButton: styled.button`
    width: 100%;
    height: 3rem;
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.primaryText};
    font-weight: bold;
    letter-spacing: 1px;
    background-color: ${({ theme }) => theme.colors.pointText};
    border-radius: 5px;
    cursor: pointer;
  `,

  LinkWrapper: styled.div`
    margin-top: 1.5rem;
    text-align: center;
  `,

  Link: styled(Link)`
    padding-left: 10px;
    color: ${({ theme }) => theme.colors.primaryText};

    &:hover {
      text-decoration: underline;
    }
  `,
};