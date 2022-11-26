import React from 'react';
import {NavLink} from 'react-router-dom';
import {Paper} from '@mui/material';

const HomePage = () => {
    return (
        <Paper>
            <NavLink to='/posts'><button>Posts</button></NavLink>
            <NavLink to='/albums'><button>Albums</button></NavLink>
            <NavLink to='/todos'><button>Todos</button></NavLink>
        </Paper>
    );
};

export default HomePage;