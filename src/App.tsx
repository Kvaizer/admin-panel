import React from 'react';
import {Posts} from './Components/Posts/Posts';
import HomePage from './Components/HomePage/HomePage';
import {Route, Routes} from 'react-router-dom';
import {Albums} from './Components/Albums/Albums';
import {PostForm} from './Components/Posts/PostForm/PostForm';
import {AlbumViewer} from './Components/Albums/ALbumViewer/AlbumViewer';

const App = React.memo(() => {
    return (
            <Routes>
                <Route index element={<HomePage/>}/>
                    <Route path='posts'>
                        <Route index element={<Posts/>}/>
                        <Route index={false} path='create' element={<PostForm/>}/>
                        <Route index={false} path=':postId' element={<PostForm/>}/>
                    </Route>
                <Route path='albums' >
                        <Route index element={<Albums/>}/>
                        <Route index={false} path=':albumId' element={<AlbumViewer/>}/>
                </Route>
                <Route path='todos' element={<div>Todos</div>}>

                </Route>
            </Routes>
    );
})

export default App;
