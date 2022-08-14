import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesUp,
  faAngleUp,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import colors from '../utils/colors';

const StyledButton = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${colors.tertiary};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;

  .icone {
    font-size: 25px;
    color: #fff;
  }

  @media screen and (max-width: 990px) {
    display: none;
  }
`;

const handleClick = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const ScrollUpBtn = () => {
  return (
    <StyledButton className="btn">
      <FontAwesomeIcon
        onClick={handleClick}
        className="icone"
        icon={faAngleUp}
      />
    </StyledButton>
  );
};

export default ScrollUpBtn;
