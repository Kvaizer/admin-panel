import {combineReducers} from 'redux';
import {appReducer} from './reducers/appReducer';
import {albumsReducer} from './reducers/albums/albumsReducer';
import {postsReducer} from './reducers/posts/postsReducer';
import {todosReducer} from './reducers/todos/todosReducer';
import {usersReducer} from './reducers/users/usersReducer';
import {commentsReducer} from './reducers/posts/commentsReducer';

export const rootReducer = combineReducers({
    appState: appReducer,
    albumsState: albumsReducer,
    postsState: postsReducer,
    todosState: todosReducer,
    usersState: usersReducer,
    commentsState: commentsReducer,
})

