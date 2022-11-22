import React from 'react';
import {Posts} from './Components/Posts/Posts';
import HomePage from './Components/HomePage/HomePage';
import { Route, Routes } from "react-router-dom";
import Post from './Components/Posts/Post/Post';



const App = React.memo(() => {
  return (
    <div>
       {/*<Routes>*/}
       {/*    <Route index element={<HomePage />} />*/}
       {/*    <Route path='/posts'>*/}
       {/*         /!*<Route path=':postId' element={<Post/>}*!/*/}
       {/*    </Route>*/}
       {/*</Routes>*/}
        <Posts/>
    </div>
  );
})

export default App;
