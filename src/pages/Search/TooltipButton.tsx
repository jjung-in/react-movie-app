import styled from "styled-components";
import { ReactNode } from "react";

interface Props {
  tooltipText: string;
  category?: string;
  onClick?: (category: string) => void;
  children: ReactNode;
  options?: {
    width?: string;
  };
};

const TooltipButton = ({ tooltipText, category, onClick, children, options }: Props) => {
  const handleClick = () => {
    if (category && onClick) {
      onClick(category);
    }
  };

  return (
    <S.ButtonBox>
      <S.Button onClick={handleClick} $options={options || {}}>{children}</S.Button>
      <S.Tooltip>{tooltipText}</S.Tooltip>
    </S.ButtonBox>
  );
};

export default TooltipButton;

const ButtonBox = styled.div`
  position: relative;
`;

const Button = styled.button<{ $options: Props["options"] }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $options }) => $options?.width || "auto"};
  height: 40px;
  padding: 0 15px;
  font-size: 1.25rem;
  border-radius: 10px;
  background-color: #000000;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 7px 10px;
  font-size: 0.75rem;
  border-radius: 5px;
  background-color: #000000;
  white-space: nowrap;
  z-index: 99;
  visibility: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #000000 transparent;
  }

  ${ButtonBox}:hover & {
    visibility: visible;
  }
`;

const S = { ButtonBox, Button, Tooltip };