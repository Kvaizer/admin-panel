import React, {useContext} from 'react';
import styles from '../Slider.module.sass'
import classnames from "classnames";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {SliderContext} from '../Slider';
import preloader from '../../../../assets/img/preloader.gif'

export const Arrows: React.FC = () => {
    const { changeSlide, isFetching } = useContext(SliderContext);

    const leftArrowClickHandler = () => {
        changeSlide(-1);
    }

    const rightArrowClickHandler = () => {
        changeSlide(1)
    }

    return (
        <div className={styles.arrows}>
            <div className={classnames(styles.arrow, styles.left)}  onClick={leftArrowClickHandler} >
                <KeyboardDoubleArrowLeftIcon/>
            </div>
            <div className={classnames(styles.arrow, styles.right)} onClick={rightArrowClickHandler} >
                <KeyboardDoubleArrowRightIcon/>
            </div>
        </div>
    );
};

