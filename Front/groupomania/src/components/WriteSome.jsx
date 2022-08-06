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
  background-color: grey;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.274);
  margin: 60px auto;
  max-width: 800px;
  height: 250px;
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
    flex-direction: row;
    height: 80px;
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
    width: 100%;
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
    /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.274); */
    cursor: pointer;
    :first-child {
    }
  }

  @media screen and (max-width: 550px) {
    margin-top: 180px;
  }
`;

const WriteSome = () => {
  const [postTxt, setPostTxt] = useState('');
  const [postImg, setPostImg] = useState(''); //changer ce state dans le type nécéssaire pour poster une image
  const { authState } = useContext(AuthContext);
  const { forceRender, setForceRender } = useContext(RenderContext);

  // const [username, serUsername] = useState('');                       //faire en sorte que ces states soient globals pour les récupérer depuis la DB lors du login
  // const [userPic, serUserPic] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('postImg', postImg);
    formData.append('postText', postTxt);
    formData.append('userPic', authState.userPic);

    console.log(formData);

    axios
      .post('http://localhost:5000/posts', formData, {
        headers: { accessToken: localStorage.getItem('Token') },
      })
      .then(() => {
        setForceRender(!forceRender);
      })
      .catch((error) => alert(error.response.data.error));
  };

  const handlefileselection = (e) => {
    setPostImg(e.target.files[0]);
  };

  return (
    <StyledWrapper>
      <textarea
        onChange={(e) => setPostTxt(e.target.value)}
        placeholder="Écrivez quelque chose..."
        name="postText"
        id=""
        cols="30"
        rows="6"
      ></textarea>
      <div className="iconsSubmitWrapper">
        <form
          onSubmit={handleSubmit}
          action="/"
          method="POST"
          encType="multipart/form-data"
        >
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
        </form>
      </div>
    </StyledWrapper>
  );
};

export default WriteSome;
