import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import colors from '../utils/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = [
  {
    username: 'xxxtentacion',
    postText: 'LOVE IS WAR',
    postImg:
      'https://cdn5.beatstars.com/eyJidWNrZXQiOiJidHMtY29udGVudCIsImtleSI6InVzZXJzL3Byb2QvNTE0MTMyL2ltYWdlL01XRVU3WUxjNVVJTS8xNDMwNTI1LkpQRyIsInRpbWVzdGFtcCI6bnVsbCwiZWRpdHMiOnsicmVzaXplIjp7ImZpdCI6bnVsbCwid2lkdGgiOjcwMCwiaGVpZ2h0Ijo3MDB9fX0=?t=1652479038207',
    userPic: 'https://i1.sndcdn.com/artworks-000488281908-i8gu5x-t500x500.jpg',
  },
  {
    username: 'elonmusk',
    postText: "Next I'm buying Coca-Cola to put the cocaine back in",
    userPic:
      'https://pbs.twimg.com/media/FXrRFQLUIAEp0NZ?format=jpg&name=4096x4096',
  },
  {
    username: 'billieeilish',
    userPic:
      'https://i.pinimg.com/originals/b1/68/d8/b168d83208b00d003f3d227b5c7f7e70.jpg',
    postText:
      'custom trench coat and corset by @burberry, boots by @muglerofficial, gloves by @thomasinegloves, jewelry by @anitakojewelry',
    postImg:
      'https://ancre-magazine.com/wp-content/uploads/2021/05/billie-eilish-vogue-00.jpg',
  },
  {
    username: 'tomholland2013',
    userPic: 'https://pbs.twimg.com/media/ElNEF9iXEAAQV0V.jpg',
    postText:
      'My MJ, have the happiest of birthdays. Gimme a call when your up xxx',
    postImg: 'https://pbs.twimg.com/media/FULUFjRXEAchmAv.jpg',
  },
];

const StyledPostWapper = styled.div`
  box-sizing: border-box;
  background-color: grey;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.274);
  margin: 60px auto 0px;
  max-width: 800px;
  height: 100%;
  border-radius: 8px 8px 0 0;
  display: flex;
  padding: 20px;

  .iconWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 130px;

    .userIconImg {
      font-size: 40px;
      color: grey;
      background-color: white;
      border-radius: 100%;
      padding: 18px;
      margin: 10px;
    }

    .userIconImg:last-child {
      font-size: 30px;
      background-color: transparent;
      border: none;
      padding: 0;
      color: #fff;
      cursor: pointer;
      :hover {
        color: ${colors.secondary};
      }
    }
  }

  .userPic {
    width: 85px;
    height: 85px;
    border-radius: 100%;
    border: 3px solid ${colors.secondary};
  }

  .contentContainer {
    span {
      display: block;
      font-size: 21px;
      margin: 18px;
      color: ${colors.secondary};
    }
    p {
      margin: 10px;
      font-size: 19px;
      color: #fff;
    }
    img {
      object-fit: cover;
      border-radius: 8px;
      margin: 10px;
      height: 400px;
      width: 650px;
      overflow: hidden;
    }
  }
`;

const StyledCommentsWrapper = styled.div`
  box-sizing: border-box;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.274);
  border-radius: 0 0 8px 8px;
  border-top: 2px #ffd7d7 solid;

  .userIconImg {
    font-size: 20px;
    color: grey;
    background-color: white;
    border-radius: 100%;
    padding: 12px;
    margin: 10px;
  }

  .commentsTextarea {
    background-color: grey;
    color: #fff;
    outline: none;
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 19px;
    border: none;
    resize: none;
    ::placeholder {
      color: #fff;
      font-size: 19px;
    }
  }

  .commentSubmit {
    background: #fd2d01;
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
`;

const PostBox = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/posts')
      .then((response) => setListOfPosts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return listOfPosts
    .slice(0)
    .reverse()
    .map((post) => (
      <div key={post.id}>
        <StyledPostWapper>
          <div className="iconWrapper">
            {post.userPic ? (
              <img className="userPic" src={post.userPic} alt=" " />
            ) : (
              <FontAwesomeIcon className="userIconImg" icon={faUser} />
            )}
            <FontAwesomeIcon className="userIconImg" icon={faHeart} />
          </div>
          <div className="textWrapper">
            <ul className="contentContainer" id="contentContainer">
              <li>
                {post.username === 'Mr Admin' ? (
                  <span style={{ color: colors.tertiary }}>
                    {post.username}
                  </span>
                ) : (
                  <span>{post.username}</span>
                )}
              </li>
              <li>
                <p>{post.postText}</p>
              </li>
              {console.log(post.image)}
              <li>
                {post.image && (
                  <img src={`http://localhost:5000/${post.image}`} alt="" />
                )}
              </li>
            </ul>
          </div>
        </StyledPostWapper>

        <StyledCommentsWrapper className="writeCommentsWrapper">
          <FontAwesomeIcon className="userIconImg" icon={faUser} />
          <input
            type="textarea"
            placeholder="Ajouter un commentaire..."
            className="commentsTextarea"
          />
          <input className="commentSubmit" type="submit" value="Publier" />
        </StyledCommentsWrapper>
      </div>
    ));
};

export default PostBox;
