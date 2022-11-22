import {combineReducers} from 'redux';
import {appReducer} from './reducers/appReducer';
import {albumsReducer} from './reducers/albumsReducer';
import {postsReducer} from './reducers/postsReducer';
import {todosReducer} from './reducers/todosReducer';
import {usersReducer} from './reducers/usersReducer';
import {commentsReducer} from './reducers/commentsReducer';

export const rootReducer = combineReducers({
    appState: appReducer,
    albumsState: albumsReducer,
    postsState: postsReducer,
    todosState: todosReducer,
    usersState: usersReducer,
    commentsState: commentsReducer,
})

