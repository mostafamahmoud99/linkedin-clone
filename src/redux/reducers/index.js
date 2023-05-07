import {combineReducers} from 'redux';
import userReducer from './userReducer';
import articlesReducer from './articlesReducer';



const rootReducer = combineReducers({
    userState : userReducer,
    userArticles : articlesReducer,
});

export default rootReducer;