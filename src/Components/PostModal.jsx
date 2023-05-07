import React, { useState } from 'react';
import close from "../imgs/close-icon.svg";
import userIcon from "../imgs/user.svg";
import share_img from "../imgs/share-image.svg";
import share_video from "../imgs/share-video.svg";
import share_comment from "../imgs/share-comment.svg";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { Timestamp } from 'firebase/firestore';
import { postArticles } from '../redux/actions';

export default function PostModal(props) {
  const state = useSelector(data => data);
  const dispatch = useDispatch()
  const [editorText, setEditorText] = useState('');
  const [assetArea, setAssetArea] = useState('');
  const [shareImage, setShareImage] = useState('');
  const [videoLink, setVideoLink] = useState('');



  function switchAssetArea(area) {
    setShareImage("")
    setVideoLink("")
    setAssetArea(area)
  }

  function reset(e) {
    setEditorText('');
    setAssetArea('');
    setVideoLink('');
    setShareImage('');
    props.handleClick(e);
  }

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image , the file is a ${typeof image}`);
      return;
    } else {
      setShareImage(image)
    }

  }

  const handlePostArticles = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: state.userState.user,
      description: editorText,
      timestamp: Timestamp.now()
    };
    reset(e)
    dispatch(postArticles(payload));
  }

  return (
    <>
      {props.modal && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src={close} alt="" />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                {state.userState.user && state.userState.user.photoURL ? (
                  <img src={state.userState.user.photoURL} alt="" />
                ) : <img src={userIcon} alt="" />}
                <span>{state.userState.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder='What do you want to talk about?'
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input type="file" name='image' id='file' style={{ display: 'none' }} onChange={handleChange} />
                    <p>
                      <label htmlFor="file"
                        style={{ cursor: "pointer", display: "block", marginBottom: "15px" }}
                      >
                        Select an image to share
                      </label>
                    </p>
                    {shareImage && (<img src={URL.createObjectURL(shareImage)} alt='img' />)}
                  </UploadImage>
                ) : assetArea === 'media' && (
                  <>
                    <input type="text"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      placeholder='Please input a video link'
                      style={{ width: '100%', height: "30px" }}
                    />
                    {videoLink && (
                      <ReactPlayer width='100%' url={videoLink} />
                    )}
                  </>
                )}
              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src={share_img} alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src={share_video} alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src={share_comment} alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton onClick={(e) => handlePostArticles(e)} disabled={!editorText ? true : false}>
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  )
}


const Container = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    z-index: 99999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 99%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0,0,0,0.15);
  align-items: center;
  h2{
    line-height: 1.5;
    font-weight: 400;
    font-size: 18px;
    color: rgba(0,0,0,0.6);
  }
  button{
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0,0,0,0.15);
    background: none;
    border-radius: 50%;
    cursor: pointer;
    &:hover{
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
  svg,img {
    pointer-events: none;
  }
`;
const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,img{
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span{
    font-weight: 600;
    line-height: 1.5;
    font-size: 16px;
    margin-left: 5px;
  }
`;
const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 16px 16px;
  height: 30px;
`;
const AssetButton = styled.div`
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: 14px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%
  cursor: pointer;
  &:hover{
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${(props)=> (props.disabled ? "rgb(235,235,235)" : "#0a66c2")};
  color: ${(props)=> props.disabled ? "rgb(0,0,0,0.25)" : "#fff"};
  cursor: ${(props)=> (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  font-size: 16px;
  border-radius: 30px;
  &:hover{
    background: "#004182"
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    border: none;
    line-height: 1.5;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img{
    width: 100%;
  }
`;



const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;
`;
