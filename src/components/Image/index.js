import { forwardRef, useState } from "react";
import images from "~/assets/images";
import classNames from "classnames/bind";
import styles from "./Images.module.scss"


const Image = forwardRef(({ src, alt, fall, className,...props }, ref) => {
	// eslint-disable-next-line jsx-a11y/alt-text
	const [fallback, setFallback] = useState("");
	const handleError = () => {
        if(fall){
            setFallback(fall)
        }else{
            setFallback(images.noImage);
        }
	};
	return (
		<img
            className={classNames(styles.wrapper, className)}
			ref={ref}
			src={fallback || src}
			alt={alt}
			{...props}
			onError={handleError}
		/>
	);
});

export default Image;
