import classnames from 'classnames';
import React, {useContext} from 'react';
import styles from '../../Slider.module.sass'
import {SliderContext} from '../../Slider';

type SlidePropsType = {
    item: {
        url: string,
        title: string
    }
}

export const Slide: React.FC<SlidePropsType> = ({item: {url, title}}) => {
    const {size} = useContext(SliderContext)

    return (
        <div className={styles.slide}>
            <img src={url} alt={title} className={size ? styles.slideImageLarge : styles.slideImageSmall}/>
            <div className={styles.slideTitle}>{title}</div>
        </div>
    );
};

