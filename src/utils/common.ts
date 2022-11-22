import cat from '../assets/img/cat.jpg'
import dog from '../assets/img/dog.jpg'
import racсoon from '../assets/img/racoon.jpg'

export const imagePicker = () => {
    const images = [cat, dog, racсoon]
    return images[Math.floor(Math.random() * images.length)]
}