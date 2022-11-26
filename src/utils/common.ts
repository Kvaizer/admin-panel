import cat from '../assets/img/cat.jpg'
import dog from '../assets/img/dog.jpg'
import racсoon from '../assets/img/racoon.jpg'

export const imagePicker = () => {
    const images = [cat, dog, racсoon]
    return images[Math.floor(Math.random() * images.length)]
}

export const convertFileToBase64 = (file: File , callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const file64 = reader.result as string
        callBack(file64)
    }
    reader.readAsDataURL(file)
}

