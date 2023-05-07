import React, { useState } from 'react'
import styled from "styled-components";
import home_logo from '../imgs/home-logo.svg';
import search_icon from "../imgs/search-icon.svg";
import nav_home from "../imgs/nav-home.svg";
import nav_network from "../imgs/nav-network.svg";
import nav_jobs from "../imgs/nav-jobs.svg";
import nav_message from "../imgs/nav-messaging.svg";
import nav_notifications from "../imgs/nav-notifications.svg";
import userIcon from "../imgs/user.svg";
import down_icon from "../imgs/down-icon.svg";
import nav_work from "../imgs/nav-work.svg";
import { useSelector, useDispatch } from 'react-redux';
import { getArticlesAPI, signOutAPI } from '../redux/actions';
import { getArticles } from '../redux/actions/actions';


export default function Header() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [text, setText] = useState('');
    const handleSearch = (e) => {
        let value = e.target.value;
        setText(value)
        const article = state.userArticles.articles.filter((art) => art.description.includes(value));
        if (value.length > 0) {
            dispatch(getArticles(article))
        } else {
            dispatch(getArticlesAPI())
        }
    }

    return (
        <Container>
            <Content>
                <Logo>
                    <a href="/home">
                        <img src={home_logo} alt="" />
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input type="text" value={text} onChange={handleSearch} placeholder='Search' />
                        <SearchIcon>
                            <img src={search_icon} alt="" />
                        </SearchIcon>
                    </div>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList className='active'>
                            <a href="">
                                <img src={nav_home} alt="" />
                                <span>Home</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a href="">
                                <img src={nav_network} alt="" />
                                <span>My Network</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a href="">
                                <img src={nav_jobs} alt="" />
                                <span>Jobs</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a href="">
                                <img src={nav_message} alt="" />
                                <span>Messaging</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a href="">
                                <img src={nav_notifications} alt="" />
                                <span>Notifications</span>
                            </a>
                        </NavList>
                        <User>
                            <a>
                                {state.userState.user && state.userState.user.photoURL ? <img src={state.userState.user.photoURL} /> : <img src={userIcon} alt="" />}

                                <span>
                                    Me
                                    <img src={down_icon} alt="" />
                                </span>
                            </a>
                            <SignOut onClick={() => dispatch(signOutAPI())}>
                                <a>Sign Out</a>
                            </SignOut>
                        </User>
                        <Work>
                            <a>
                                <img src={nav_work} alt="" />
                                <span>
                                    Work
                                    <img src={down_icon} alt="" />
                                </span>
                            </a>
                        </Work>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    )
}


const Container = styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 25px;
    width: 100vw;
    z-index: 111;
    @media (max-width: 767px){
        padding: 15px;
    }
`;
const Content = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
    max-width: 1128px;

`;
const Logo = styled.span`
    margin-right: 8px;
    font-size: 0px
`;
const Search = styled.div`
    opacity: 1;
    flex-grow: 1;
    position: relative;
    & > div{
        max-width: 280px;
        input{
            border: none;
            box-shadow: none;
            background-color: #eee;
            border-radius: 2px;
            color: rgba(0,0,0,0.9);
            width: 218px;
            padding: 0 8px 0 40px;
            line-height: 1.75;
            font-weight: 400;
            font-size: 14px;
            height: 34px;
            border-color: #dce6f1;
            vertical-align: text-top;
        }
    }
`;
const SearchIcon = styled.div`
    width: 40px;
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 12px;
    border-radius: 0 2px 2px 0;
    margin: 0;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Nav = styled.nav`
    margin-left: auto;
    display: block;
    @media(max-width:768px) {
        position: fixed;
        left:0;
        bottom:0;
        background:white;
        width:100%;
    }
`;
const NavListWrap = styled.ul`
    display: flex;
    flex-wrap:nowrap;
    list-style-type: none;
    .active {
        span:after{
            content:'';
            transform: scaleX(1);
            border-bottom: 1px solid #fff;
            bottom: 0;
            left: 0;
            position:absolute;
            transition: transform .2s ease-in-out;
            width:100%;
            border-color: rgba(0,0,0,0.9);
        }
    }
`;
const NavList = styled.li`
    display: flex;
    align-items: center;
    a{
        align-items: center;
        background: transparent;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: 400px;
        justify-content: center;
        line-height: 1.5;
        min-height: 50px;
        min-width: 80px;
        position:relative;
        text-decoration: none;
        span{
            color: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
        }
        @media(max-width: 768px){
            min-width: 70px;
        }
    }
    &:hover, &:active{
        a{
            span{
                color: rgba(0,0,0,0.9);
            }
        }
    }
`;
const SignOut = styled(NavList)`
position: absolute;
top:40px;
background-color: white;
border-radius: 0 0 5px 5px;
width: 100px;
height: 40px;
font-size: 16px;
transition-duration: 167ms;
text-align: center;
display: none;
cursor: pointer;
@media (max-width: 768px){
    position: absolute;
    top: -45px;
    right: 15px;
    background: #eee;
}
`;
const User = styled(NavList)`
    a > svg {
        width:24px;
        border-radius: 50%;
    }
    a > img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    span {
        display: flex;
        align-items: center;
    }
    &:hover {
${SignOut} {
    display: flex;
    align-items: center;
    justify-content: center;
}
    }
`;

const Work = styled(User)`
border-left: 1px solid rgba(0,0,0,0.08);
@media (max-width: 575px) {
    display: none;
}
`;