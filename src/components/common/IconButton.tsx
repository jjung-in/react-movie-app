import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface Props {
  icon: IconDefinition;
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const IconButton = ({ icon }: Props) => {
  return (
    <StyledButton><FontAwesomeIcon icon={icon} /></StyledButton>
  )
}

export default IconButton;