import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faUser,
  faImage,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import colors from '../utils/colors';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../utils/context/authContext';
import { RenderContext } from '../utils/context/renderContext';
import axios from 'axios';

// const PostList = [
//   {
//     username: 'xxxtentacion',
//     postText: 'LOVE IS WAR',
//     postImg:
//       'https://cdn5.beatstars.com/eyJidWNrZXQiOiJidHMtY29udGVudCIsImtleSI6InVzZXJzL3Byb2QvNTE0MTMyL2ltYWdlL01XRVU3WUxjNVVJTS8xNDMwNTI1LkpQRyIsInRpbWVzdGFtcCI6bnVsbCwiZWRpdHMiOnsicmVzaXplIjp7ImZpdCI6bnVsbCwid2lkdGgiOjcwMCwiaGVpZ2h0Ijo3MDB9fX0=?t=1652479038207',
//     userPic: 'https://i1.sndcdn.com/artworks-000488281908-i8gu5x-t500x500.jpg',
//   },
//   {
//     username: 'elonmusk',
//     postText: "Next I'm buying Coca-Cola to put the cocaine back in",
//     userPic:
//       'https://pbs.twimg.com/media/FXrRFQLUIAEp0NZ?format=jpg&name=4096x4096',
//   },
//   {
//     username: 'billieeilish',
//     userPic:
//       'https://i.pinimg.com/originals/b1/68/d8/b168d83208b00d003f3d227b5c7f7e70.jpg',
//     postText:
//       'custom trench coat and corset by @burberry, boots by @muglerofficial, gloves by @thomasinegloves, jewelry by @anitakojewelry',
//     postImg:
//       'https://ancre-magazine.com/wp-content/uploads/2021/05/billie-eilish-vogue-00.jpg',
//   },
//   {
//     username: 'tomholland2013',
//     userPic: 'https://pbs.twimg.com/media/ElNEF9iXEAAQV0V.jpg',
//     postText:
//       'My MJ, have the happiest of birthdays. Gimme a call when your up xxx',
//     postImg: 'https://pbs.twimg.com/media/FULUFjRXEAchmAv.jpg',
//   },
// ];

const StyledPostWapper = styled.div`
  box-sizing: border-box;
  background-color: #4e5166;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.274);
  margin: 60px auto 0px;
  max-width: 800px;
  height: 100%;
  border-radius: 8px 8px 0 0;
  display: flex;
  padding: 20px;

  .textWrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .deletePost,
  .updatePost {
    position: absolute;
    right: 0px;
    background: ${colors.secondary};
    color: ${colors.primary};
    border: none;
    width: 100px;
    border: 2px solid ${colors.primary};
    height: 30px;
    margin: 0;
    margin-right: 15px;
    padding: 0;
    cursor: pointer;
    font-size: 16px;
    border-radius: 8px;
  }

  .updatePost {
    right: 110px;
  }

  .iconWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 130px;

    .heartIconBtn_liked {
      background-color: transparent;
      font-size: 30px;
      padding: 0;
      border: none;
      width: 60%;
      cursor: pointer;
      path {
        color: ${colors.primary};
        :hover {
          transition: 0.3s;
          color: ${colors.secondary};
        }
      }
    }
    .heartIconBtn_unliked {
      background-color: transparent;
      font-size: 30px;
      padding: 0;
      border: none;
      width: 60%;
      cursor: pointer;
      path {
        color: white;
        :hover {
          color: ${colors.secondary};
        }
      }
    }

    .userIconImg {
      width: 50px;
      height: 50px;
      color: #4e5166;
      background-color: white;
      border-radius: 100%;
      padding: 18px;
    }

    .likeInfo {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding: 14px 0;
      margin-top: 25px;
      label {
        font-size: 16px;
      }
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

  .totalOfLikes {
    color: #fff;
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
      overflow-wrap: break-word;
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
const StyledPopup = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  background-color: #000000cc;

  .popupFormWrapper {
    background-color: #4e5166;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.274);
    margin: 30px auto;
    max-width: 800px;
    height: 90%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .popupForm {
    position: relative;
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .closeBtn {
    position: absolute;
    background: ${colors.tertiary};
    color: white;
    border: none;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 17px;
    border-radius: 8px;
    right: 12px;
    top: 12px;
  }

  .popupFormWrapper2 {
    background-color: #4e5166;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.274);
    margin: 30px auto;
    max-width: 800px;
    height: 50%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .imgName {
    width: 70px;
    margin-top: 10px;
    cursor: pointer;
    color: ${colors.secondary};
  }

  .popupImg {
    object-fit: cover;
    border-radius: 8px;
    height: auto;
    max-width: 50%;
    overflow: hidden;
    margin-top: 30px;
  }

  textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-height: 100px;
    margin-top: 30px;
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
    justify-content: space-between;
    align-items: center;
    gap: 230px;
    width: 100%;
    height: 125px;
    padding-bottom: 25px;
    box-sizing: border-box;
    padding: 15px;
    margin-bottom: 12px;
  }

  .SendDataSubmit {
    background: ${colors.primary};
    color: white;
    border: none;
    width: 170px;
    height: 50px;

    cursor: pointer;
    font-size: 17px;
    border-radius: 8px;
  }

  input[type='submit']:hover {
    box-shadow: 0px 1px 7px #fd2d01;
  }

  #newFile {
    display: none;
  }

  .imgIcon {
    font-size: 30px;
    color: #fff;
    cursor: pointer;
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
  background-color: #4e5166;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.274);
  border-radius: 0 0 8px 8px;
  border-top: 2px #ffd7d7 solid;

  .userIconImg {
    font-size: 20px;
    color: #4e5166;
    background-color: white;
    border-radius: 100%;
    padding: 12px;
    margin: 10px;
  }

  .commentsTextarea {
    background-color: #4e5166;
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
`;

const PostBox = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const { forceRender, setForceRender } = useContext(RenderContext); // transformer ce state en context pour pouvoir l'utiliser partout
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newPostInfo, setNewPostInfo] = useState({ newTxt: '', newImg: '' });

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}`, {
        headers: { accessToken: localStorage.getItem('Token') },
      })
      .then(() => {
        setForceRender(!forceRender);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleALike = (postId) => {
    axios
      .post(
        'http://localhost:5000/likes',
        { PostId: postId },
        {
          headers: {
            accessToken: localStorage.getItem('Token'),
          },
        }
      )
      .then(() => {
        setForceRender(!forceRender);
      });
  };

  const handleClickPopup = (newInfo) => {
    setNewPostInfo({
      //mettre à jour ce state permet d'afficher le text du post dans le placeholder du text-area
      newTxt: newInfo,
      newImg: newPostInfo.newImg,
    });

    setModalIsOpen(!modalIsOpen);
  };

  const handleImgSelection = (e) => {
    setNewPostInfo({
      //mettre à jour ce state permet d'afficher le nom du nouveau fichier sélectionné
      newTxt: newPostInfo.newTxt,
      newImg: e.target.files[0],
    });
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setNewPostInfo({ newTxt: '', newImg: {} });
  };

  const updatePost = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('postText', newPostInfo.newTxt);
    formData.append('postImg', newPostInfo.newImg);

    setNewPostInfo({ newTxt: '', newImg: {} });
    setModalIsOpen(false);

    axios
      .put(`http://localhost:5000/posts/${id}`, formData, {
        headers: {
          accessToken: localStorage.getItem('Token'),
        },
      })
      .then((res) => {
        setForceRender(!forceRender);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/posts', {
        headers: {
          accessToken: localStorage.getItem('Token'),
        },
      })
      .then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(
          response.data.likedPosts.map((like) => {
            // stockage sous forme de tableau de l'id de chaque post liké par l'utilisateur
            return like.PostId;
          })
        );
      })

      .catch((error) => console.log(error));
  }, [forceRender]);

  return listOfPosts.map((post) => (
    <div key={post.id}>
      <StyledPostWapper>
        <div className="iconWrapper">
          {post.userPic ? (
            <img className="userPic" src={post.userPic} alt=" " />
          ) : (
            <FontAwesomeIcon className="userIconImg" icon={faUser} />
          )}

          <div className="likeInfo">
            <button
              onClick={() => {
                HandleALike(post.id);
              }}
              className={
                likedPosts.includes(post.id) // Si l'utilisateur a déjà liké, on affiche un coeur rouge, sinon un coeur blanc
                  ? 'heartIconBtn_liked'
                  : 'heartIconBtn_unliked'
              }
            >
              <FontAwesomeIcon className="heartIconImg" icon={faHeart} />
            </button>
            {post.Likes.length > 0 && (
              <label className="totalOfLikes"> {post.Likes.length}</label>
            )}
          </div>
        </div>
        <div className="textWrapper">
          {(post.userId === authState.userId ||
            authState.userRole === 'isAdmin') && (
            <>
              <button
                onClick={() => handleClickPopup(post.postText)}
                className="updatePost"
              >
                Modifier
              </button>

              {modalIsOpen && (
                <StyledPopup>
                  <div className="popupFormWrapper2">
                    <form
                      className="popupForm"
                      onSubmit={(e) => updatePost(e, post.id)}
                      id="postForm"
                      action="/"
                      method="POST"
                      encType="multipart/form-data"
                    >
                      <button className="closeBtn">
                        <FontAwesomeIcon
                          onClick={handleCloseModal}
                          icon={faXmark}
                        />
                      </button>
                      <textarea
                        onChange={(e) =>
                          setNewPostInfo({
                            newTxt: e.target.value,
                            newImg: newPostInfo.newImg,
                          })
                        }
                        name="postText"
                        value={newPostInfo.newTxt}
                        id=""
                        className="postForm__textarea"
                        cols="30"
                        rows="6"
                      ></textarea>
                      {/* {post.image && (
                        <>
                          <img
                            className="popupImg"
                            src={`http://localhost:5000/${post.image}`}
                            alt=""
                          />
                        </>
                      )} */}

                      <div className="iconsSubmitWrapper">
                        <label htmlFor="newFile">
                          <FontAwesomeIcon className="imgIcon" icon={faImage} />
                        </label>
                        <label htmlFor="newFile" className="imgName">
                          {newPostInfo.newImg && newPostInfo.newImg.name}
                          {/* {newPostInfo.newImg.name} */}
                        </label>
                        <input
                          onChange={handleImgSelection}
                          name="postImg"
                          id="newFile"
                          type="file"
                          accept="image/*"
                        />
                        <input
                          className="SendDataSubmit"
                          type="submit"
                          value="Publier"
                        />
                      </div>
                    </form>{' '}
                  </div>
                </StyledPopup>
              )}

              <button
                onClick={() => {
                  deletePost(post.id);
                }}
                className="deletePost"
              >
                Supprimer
              </button>
            </>
          )}

          <ul className="contentContainer" id="contentContainer">
            <li>
              {post.username === 'Mr Admin' ? (
                <span style={{ color: '#ff9b89' }}>{post.username}</span>
              ) : (
                <span>{post.username}</span>
              )}
            </li>
            <li>
              <p>{post.postText}</p>
            </li>
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
