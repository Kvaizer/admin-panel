import React, {useContext, useMemo} from 'react';
import {SliderContext} from '../Slider';
import {Slide} from './Slide/Slide';
import styles from '../Slider.module.sass'

export const SlidesList: React.FC = () => {
    const { slideNumber, items } = useContext(SliderContext);

    return (
        <div
            className={styles.slideList}
            style={{ transform: `translateX(-${slideNumber * 100}%)` }}
        >
            {items.map((slide, index) => (
                <Slide key={index} item={slide} />
            ))}
        </div>
    );
};

