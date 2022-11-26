import React, {useContext} from 'react';
import {SliderContext} from '../Slider';
import {Dot} from './Dot/Dot';
import styles from '../Slider.module.sass'

export const Dots: React.FC = () => {
    const { slidesCount } = useContext(SliderContext);

    const renderDots = () => {
        const dots = [];

        for (let i = 0; i < slidesCount; i++) {
            dots.push(<Dot key={i} number={i} />);
        }

        return dots;
    };

    return <div className={styles.dots}>{renderDots()}</div>;
};

