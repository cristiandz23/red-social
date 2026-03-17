import {useImageStractColor} from "../../hooks/useImageStractColor"
import { useRef } from "react";


export const PostImageFrame = ({src}) => {
    const imgRef = useRef(null);
    const bgColor = useImageStractColor(imgRef,src);
       return(
        <div className="rounded-lg overflow-hidden 
        flex items-center justify-center bg-amber-600
        max-h-[500px]" style={{backgroundColor:bgColor}}>
            <img className="rounded-lg object-contain max-h-[500px]" 
            src={src} ref={imgRef} alt="nada"  crossOrigin="anonymous"/>
        </div>
    )
}