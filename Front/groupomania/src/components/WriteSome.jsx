import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrin, faImage } from '@fortawesome/free-solid-svg-icons';
import colors from '../utils/colors';
import { useState, useContext } from 'react';
import { AuthContext } from '../utils/context/authContext';
import { RenderContext } from '../utils/context/renderContext';
import axios from 'axios';

const StyledWrapper = styled.div`
  background-color: #4e5166;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.274);
  margin: 60px auto;
  max-width: 800px;
  height: 250px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  /* border: 1px solid white; */

  textarea {
    box-sizing: border-box;
    width: 100%;
    margin: 30px 0 0 0;
    background-color: #4e5166;
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
    flex-direction: row;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 15px;
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

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }

  input[type='submit']:hover {
    box-shadow: 0px 1px 7px #fd2d01;
  }

  #file-input {
    display: none;
  }
  .iconWrapper label {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-left: 15px;
    color: ${colors.secondary};
  }
  .imgIcon {
    font-size: 30px;
    color: #fff;
    cursor: pointer;
  }

  @media screen and (max-width: 550px) {
    margin-top: 180px;
  }
`;

const WriteSome = () => {
  const [postTxt, setPostTxt] = useState('');
  const [postImg, setPostImg] = useState('');
  const { authState } = useContext(AuthContext);
  const { forceRender, setForceRender } = useContext(RenderContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((postTxt === '') & (postImg === '')) {
      alert('Oups ! vous avez oublié de dire quelque chose');
    } else {
      const form = document.getElementById('postForm');

      const formData = new FormData();
      formData.append('postImg', postImg);
      formData.append('postText', postTxt);
      formData.append('userPic', authState.userPic);

      axios
        .post('http://localhost:5000/posts', formData, {
          headers: { accessToken: localStorage.getItem('Token') },
        })
        .then(() => {
          setForceRender(!forceRender);
        })
        .catch((error) => alert(error.response.data.error));

      form.reset(); // réinitialisation du formulaire après l'envoi
      setPostTxt('');
      setPostImg('');
    }
  };

  return (
    <StyledWrapper>
      <form
        onSubmit={handleSubmit}
        id="postForm"
        action="/"
        method="POST"
        encType="multipart/form-data"
      >
        <textarea
          onChange={(e) => setPostTxt(e.target.value)}
          placeholder="Écrivez quelque chose..."
          name="postText"
          id=""
          className="postForm__textarea"
          cols="30"
          rows="6"
        ></textarea>
        <div className="iconsSubmitWrapper">
          <div className="iconWrapper">
            <label htmlFor="file-input">
              <FontAwesomeIcon className="imgIcon" icon={faImage} />
              {postImg.name}
              <FontAwesomeIcon className="imgIcon" icon={faFaceGrin} />
            </label>
            <input
              onChange={(e) => setPostImg(e.target.files[0])}
              name="image"
              id="file-input"
              type="file"
              accept="image/*"
            />
          </div>

          <input className="SendDataSubmit" type="submit" value="Publier" />
        </div>
      </form>
    </StyledWrapper>
  );
};

export default WriteSome;
