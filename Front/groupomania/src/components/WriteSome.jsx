import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinWide, faImage } from '@fortawesome/free-solid-svg-icons';
import colors from '../utils/colors';

const StyledWrapper = styled.div`
  background-color: grey;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.274);
  margin: 60px auto;
  max-width: 660px;
  height: 270px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  /* border: 1px solid white; */

  textarea {
    margin: 30px 0 0 0;
    background-color: grey;
    color: #fff;
    font-size: 20px;
    padding: 10px;
    resize: none;
    cursor: text;
    outline: none;
    border-top: 1px solid;
    border-bottom: 1px solid;

    ::placeholder {
      color: #fff;
      font-size: 20px;
      padding-left: 10px;
    }
  }

  .iconsSubmitWrapper {
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 10px;
  }

  input[type='submit'] {
    background: ${colors.primary};
    color: white;
    border: none;
    width: 170px;
    height: 50px;
    margin: 0;
    margin-right: 15px;
    padding: 0;
    cursor: pointer;
    font-size: 17px;
    border-radius: 8px;
  }

  input[type='submit']:hover {
    box-shadow: 0px 1px 7px #fd2d01;
  }

  #file-input {
    display: none;
  }
  .iconWrapper label {
    display: flex;
    gap: 15px;
    margin-left: 15px;
  }
  .imgIcon {
    font-size: 30px;
    color: #fff;
    cursor: pointer;
  }
`;

const WriteSome = () => {
  return (
    <StyledWrapper>
      <textarea
        placeholder="Écrivez quelque chose..."
        name=""
        id=""
        cols="30"
        rows="6"
      ></textarea>
      <div className="iconsSubmitWrapper">
        <form className="iconWrapper">
          <label for="file-input">
            <FontAwesomeIcon className="imgIcon" icon={faImage} />
            <FontAwesomeIcon className="imgIcon" icon={faFaceGrinWide} />
          </label>
          <input id="file-input" type="file" accept="image/*" />
        </form>
        <input className="SendDataSubmit" type="submit" />
      </div>
    </StyledWrapper>
  );
};

export default WriteSome;
