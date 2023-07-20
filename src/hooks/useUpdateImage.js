import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import storage from '../utils/firebase';

const useUpdateImage = (path) => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isImageLoading, setImageLoading] = useState(false);
    const [isDefaultImage, setDefaultImage] = useState(false);

    const changeImage = (file) => {
        setImage(file);
    };

    const uploadImage = () => {
        if (image) {
            const avatarRef = ref(storage, `${path}/${image.name + uuidv4()}`);
            uploadBytes(avatarRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrl(url);
                    setImageLoading(false);
                });
            });
        }
    };

    useEffect(() => {
        if (image) {
            setImageLoading(true);
            uploadImage();
        }
    }, [image]);

    return {
        image,
        imageUrl,
        changeImage,
        isDefaultImage,
        setDefaultImage,
        isImageLoading,
    };
};

export default useUpdateImage;
