import React, {useCallback, useState} from 'react';
import {UserPropsType} from '../../API/users/usersTypes';
import {useAppSelector} from '../../utils/hooks';
import styles from './User.module.sass'
import PopUpUser from './PopUpUser/PopUpUser';
import {selectUserById} from '../../Store/reducers/users/selectors';

export const UserInPost: React.FC<UserPropsType> = React.memo(({userId}) => {
    const user = useAppSelector(state => selectUserById(state, {userId}))

    const [viewFullUser, setViewFullUser] = useState<boolean>(false)

    const onMouseOverHandler = useCallback(() => setViewFullUser(true), [])
    const onMouseLeaveHandler = useCallback(() => setViewFullUser(false), [])

    return (
        <div className={styles.container}>
            <div>
                <img src={user.avatar} alt={'image'} className={styles.avatar}/>
            </div>
            <div
                onMouseOver={onMouseOverHandler}
                onMouseLeave={onMouseLeaveHandler}
                className={styles.username}>
                {user.name}
            </div>
            {viewFullUser ? <PopUpUser user={user} avatar={user.avatar}/> : null}
        </div>
    );
})

