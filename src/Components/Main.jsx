import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PostModal from './PostModal';
import { useDispatch, useSelector } from 'react-redux';
import userIcon from "../imgs/user.svg";
import photo_icon from "../imgs/photo-icon.svg";
import video_icon from "../imgs/video-icon.svg";
import event_icon from "../imgs/event-icon.svg";
import article_icon from "../imgs/article-icon.svg";
import loader from "../imgs/loader.svg";
import ellipsis from "../imgs/ellipsis.svg";
import like from '../imgs/like-icon.svg';
import comment from '../imgs/comment-icon.svg';
import share from '../imgs/share-icon.svg';
import send from '../imgs/send-icon.svg';
import ReactPlayer from 'react-player';
import { getArticlesAPI } from '../redux/actions/index';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';


export default function Main() {
  const state = useSelector(state => state);
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(!modal)
  };
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getArticlesAPI())
  }, []);

  const handleDelete = (id) => {
    deleteDoc(doc(db, "articles", id)).then(() => console.log('done delete')).catch((err) => console.log(err))

  }


  return (
    <Container>
      <ShareBox>
        <div>
          {state.userState.user && state.userState.user.photoURL ? (
            <img src={state.userState.user.photoURL} alt="" />
          ) : <img src={userIcon} alt="" />}
          <button onClick={handleClick} disabled={state.userArticles.loading ? true : false}>Start a post</button>
        </div>
        <div>
          <button>
            <img src={photo_icon} alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src={video_icon} alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src={event_icon} alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src={article_icon} alt="" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      {state.userArticles.articles.length === 0 ? (<p style={{'textAlign':'center'}}>There are no articles</p>) : (
        <Content>
          {state.userArticles.loading && <img src={loader} />}
          {state.userArticles.articles.length > 0 && state.userArticles.articles.map((article, index) => (
            <Article key={index}>
              <SharedActor>
                <a>
                  <img src={article.actor.image} alt="" />
                  <div>
                    <span>{article.actor.name}</span>
                    <span>{article.actor.descripition}</span>
                    <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                  </div>
                </a>
                <button>
                  <img src={ellipsis} alt="" />
                  <div onClick={() => handleDelete(article.id)}>
                    Delete
                  </div>
                </button>
              </SharedActor>
              <Description>{article.description}</Description>
              <SharedImg>
                <a>
                  {!article.shareImg && article.video ? (<ReactPlayer url={article.video} width='100%' />) : (article.shareImg && <img src={article.shareImg} />)}
                </a>
              </SharedImg>
              <SocialCounts>
                <li>
                  <button>
                    <img src="https://static-exp1.licdn.com/sc/h/2uxqgankkcxm505qn812vqyss" alt="" />
                    <img src="https://static-exp1.licdn.com/sc/h/f58e354mjsjpdd67eq51cuh49" alt="" />
                    <span>75</span>
                  </button>
                </li>
                <li>
                  <a>{article.comments} comments</a>
                </li>
                <li>
                  <a>
                    1 share
                  </a>
                </li>
              </SocialCounts>
              <SocialActions>
                <button>
                  <img src={like} alt="" />
                  <span>Like</span>
                </button>
                <button>
                  <img src={comment} alt="" />
                  <span>Comment</span>
                </button>
                <button>
                  <img src={share} alt="" />
                  <span>Share</span>
                </button>
                <button>
                  <img src={send} alt="" />
                  <span>Send</span>
                </button>
              </SocialActions>
            </Article>
          ))}
        </Content>
      )}
      <PostModal handleClick={handleClick} modal={modal} />

    </Container>
  )
}


const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position:relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 1px rgb(0 0 0 / 20%)
`
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
      border-radius: 5px;
      &:hover {
        background: rgba(0,0,0,0.08);
      }
    }
    &:first-child{
      display: flex;
      align-items: center;
      padding: 8px 16px 8px 16px;
      img{
          width: 48px;
          border-radius: 50%;
          margin-right: 8px;
      }
      button{
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: white;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
        font-size: 14px;
        &:hover{
          background: rgba(0, 0, 0, 0.08);
        }
        text-align: left;
      }
    }
    &:nth-child(2){
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img{
          margin: 0 4px;
        }
        span {
          color: #70b5f9;
          margin-top: 2px;
        }
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 70px;
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  marign: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  display: flex;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img{
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basic: 0;
      margin-left: 8px;
      overflow: hidden;
      span{
        text-align: left;
        &:first-child{
          font-size: 14px;
          font-weight: 700;
          color: rgba(0,0,0,1);
        }
        &:nth-child(2),&:nth-child(3){
          font-size: 12px;
          color: rgba(0,0,0,0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top:0;
    background: trnsparent;
    border: none;
    outline: none;
    div{
      display: none;
      transition: all .4s 
    }
    &:hover div{
      width: 90px;
      height: 40px;
      position: absolute;
      display:flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      top: 15px;
      right: 35px;
      background-color:#F0F0F0;
      border-radius: 10px 0px 10px 10px;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  word-break: break-all;
  color: rgba(0,0,0,0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li{
    margin-right: 5px;
    font-size: 12px;
    button{
      display: flex;
      align-items: center;
      border: none;
      background-color: white;
    }
  }
`;
const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  flex-wrap: wrap;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: rgba(0,0,0,0.6);
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s;
    width: calc(100% / 4);
    height: 60px;
    justify-content: center;

    &:hover{
      background: rgba(0,0,0,0.08);
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
        margin-top: 3px;
        font-weight: 600;
      }
    }
  }
`;