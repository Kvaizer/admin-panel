import classnames from 'classnames';
import React, {useContext} from 'react';
import {SliderContext} from '../../Slider';
import styles from '../../Slider.module.sass'

type DotPropsType = {
    number: number
}

export const Dot: React.FC<DotPropsType> = ({number}) => {
    const { goToSlide, slideNumber } = useContext(SliderContext);

    return (
        <div
            className={classnames(styles.dot, slideNumber === number ? styles.selected : '')}
            onClick={() => goToSlide(number)}
        />
    );
};

