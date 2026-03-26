import { Icon } from "@iconify/react";
import { usePostStore } from "../../store/PostStore";

export const InputPostComponent = () => {
    const {setStateForm} = usePostStore();
    return(
        <div className=" p-4 border-b border-gray-200
         dark:border-gray_600">
            <input onClick={setStateForm}  placeholder="Escribir nueva publicacion" 
            className="w-full p-2 rounded focus_outline-none placeholder-gray-500" />
            <div className="flex gap-4 mt-2 text-gray-400">
                <Icon icon="mdi:image-outline"
                className="text-2xl"/>
                <Icon icon="mdi:format-list-bulleted"
                className="text-2xl"/>
                <Icon icon="mdi:gif"
                className="text-2xl"/>
                <Icon icon="mdi:format-text"
                className="text-2xl"/>
            </div>
        </div>  
    )

}