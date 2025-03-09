import styled from "styled-components";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Props {
  to: string;
  icon: IconDefinition;
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const IconLink = ({ to, icon }: Props) => {
  return (
    <StyledLink to={to}><FontAwesomeIcon icon={icon} /></StyledLink>
  )
}

export default IconLink;