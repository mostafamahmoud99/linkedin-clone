import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import card_back from "../imgs/card-bg.svg";
import photo from "../imgs/photo.svg";
import wedget from "../imgs/widget-icon.svg";
import item from "../imgs/item-icon.svg";
import plus from "../imgs/plus-icon.svg";

export default function Leftside() {
  const { userState } = useSelector((user) => user);
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo />
            <Link>
              Welcome, {userState.user ? userState.user.displayName : 'there!'}
            </Link>
          </a>
          <a>
            <AddPhotoText>Add a photo</AddPhotoText>
          </a>
        </UserInfo>
        <Widget>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src={wedget} alt="" />
          </a>
        </Widget>
        <Item>
          <span>
            <img src={item} alt="" />
            My Items
          </span>
        </Item>
      </ArtCard>
      <CommunityCard>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src={plus} alt="" />
          </span>
        </a>
        <a>
          <span>Follows Hasntags</span>
        </a>
        <a>
          Discover more
        </a>
      </CommunityCard>
    </Container>
  )
};

const Container = styled.div`
  grid-area: leftside;
`;
const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;
const CardBackground = styled.div`
  background-image: url("${card_back}");
  background-position: center;
  background-size: 462px;
height: 54px;
margin: -12px -12px 0;
`;
const Photo = styled.div`
  box-shadow: none;
  background-image: url("${photo}");
  width: 72px;
  height:72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;
const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600
`;
const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.33;
`;
const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  font-weight: 600;
  padding-bottom: 12px;
  & > a{
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color : rgba(0, 0, 0, 0.08);
    }
  div{
    display: flex;
    flex-direction: column;
    text-align: left;
    span {
      font-size: 12px;
      line-height: 1.333;
      &:first-child {
        color: rgba(0,0,0,0.6);
      }
      &:nth-child(2) {
        color: rgba(0,0,0,1);
      }
    }
  }
}
svg{
  color: rgba(0,0,0,1)
}

`;
const Item = styled.a`
  border-color: rgba(0,0,0,0.8);
  text-align: left;
  padding: 12px;
  font-weight: 600;
  font-size: 12px;
  display: block;
  span{
    display: flex;
    align-items: center;
    color: rgba(0,0,0,1);
    svg{
      color: rgba(0,0,0,0.6);
    }
  }

  &:hover {
    background-color: rgba(0,0,0,0.08);
  }
`;
const CommunityCard = styled(ArtCard)`
  font-weight: 600;
  padding: 8px 0 0;
text-align: center;
display: flex;
flex-direction: column;
a{
  color: black;
  padding: 4px 12px 4px 12px;
  font-size: 12px;

  &:hover {
    color: #0a66c2;
  }

  span{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &:last-child {
    color: rgba(0,0,0,0.6);
    text-decoration: none;
    border-top: 1px solid #d6cec2;
    padding: 12px;
    &:hover{
      background-color: rgba(0,0,0,0.08);
    }
  }
}
`