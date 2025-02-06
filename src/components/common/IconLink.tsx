import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"
import styled from "styled-components";

interface Props {
  to: string;
  icon: IconDefinition;
}

const StyledLink = styled(Link)`
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

const IconLink = ({ to, icon }: Props) => {
  return (
    <StyledLink to={to}><FontAwesomeIcon icon={icon} /></StyledLink>
  )
}

export default IconLink;