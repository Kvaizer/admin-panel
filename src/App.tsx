import React from 'react';
import {Posts} from './Components/Posts/Posts';
import {Route, Routes} from 'react-router-dom';
import {Albums} from './Components/Albums/Albums';
import {PostForm} from './Components/Posts/PostForm/PostForm';
import {AlbumViewer} from './Components/Albums/ALbumViewer/AlbumViewer';
import {TodoListPage} from './Components/TodoList/TodoListPage';
import {Layout} from './Components/Layout/Layout';
import {Error404} from './Components/Error404/Error404';
import {HomePage} from './Components/HomePage/HomePage';

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='posts'>
                    <Route index element={<Posts/>}/>
                    <Route index={false} path='create' element={<PostForm/>}/>
                    <Route index={false} path=':postId' element={<PostForm/>}/>
                </Route>
                <Route path='albums'>
                    <Route index element={<Albums/>}/>
                    <Route index={false} path=':albumId' element={<AlbumViewer/>}/>
                </Route>
                <Route path='todos' element={<TodoListPage/>}/>
                <Route path='*' element={<Error404/>}/>
            </Route>
        </Routes>
    );
}

export default App;
