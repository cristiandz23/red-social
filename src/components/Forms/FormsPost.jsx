import { BtnClose } from "../ui/buttons/BtnClos"
import { useUsuariosStore } from "../../store/UsuariosStore"
import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Icon } from "@iconify/react";
import { ImageSelector } from "../../hooks/useImageSelector";
import { usePostStore } from "../../store/PostStore";
import { useInsertarPostMutate } from "../../stack/PostStack";
import { useForm } from "react-hook-form";

export const FormPost = () => {

    const { dataUsuarioAuth } = useUsuariosStore();
    const [showEmpjiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);
    const pickerRef = useRef(null);
    const [postText, setPostText] = useState("")
    const {stateImage, setStateImage, setStateForm,file} = usePostStore();
    const {mutate,isPending} = useInsertarPostMutate();
    const {handleSubmit,setValue} = useForm();
    const canPosting = file !== null || postText.trim() > 0

    const addEmoji = (emojiData) => {

        const emojiChar = emojiData.emoji;
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const originalText = textarea.value;

        const newText = originalText.substring(0, start) + emojiChar +
            originalText.substring(end);

        setPostText(newText);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {

            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)

    }, [])

    const handleTextChange = (e) => {
        setPostText(e.target.value);
        setValue("titulo",e.target.value);
    }

    return (
        <section className="fixed z-50 flex items-center justify-center inset-0">
            <div className="absolute  backdrop-blur-sm 
        inset-0 cursor-pointer">
            </div>
            <section className="bg-white relative w-full max-w-md
            rounded-lg shadow-xl dark:bg-bg-primary ">

                <header className="flex items-center justify-between p-4 border-b border-gray-500/40">
                    <h2 className="text-xl font-semibold">Crear publicacion</h2>
                    <BtnClose funcion={setStateForm} />
                </header>

                <main className="p-4 space-y-4" >
                    <section className="flex items-center gap-1">
                        <img className="w-10 h-10 rounded-full mr-3 object-cover" src={dataUsuarioAuth?.foto_perfil} alt="" />
                        <div>
                            <span className="font-medium">{dataUsuarioAuth?.nombre}</span>
                        </div>
                    </section>

                    <form onSubmit={handleSubmit(mutate)}>
                        <div
                            className="relative ">
                            <textarea
                                ref={textareaRef}
                                value={postText}
                                onChange={handleTextChange}
                                placeholder="¿Que estas pensando?"
                                className="w-full placeholder-gray-500 outline-none min-h-20 border
                                max-h-30 border-gray-500/40 rounded-sm" />
                            {
                                showEmpjiPicker &&
                                <div ref={pickerRef} className="absolute top-10 left-10 mt-2">
                                    <EmojiPicker onEmojiClick={addEmoji} theme="auto" searchDisabled />
                                </div>
                            }
                            <div className=" mt-4 flex items-center justify-between">

                                <button disabled={!canPosting || isPending} type="submit" 
                                className={`text-white py-2 px-4 rounded-lg
                                font-medium cursor-pointer 
                                ${canPosting? "bg-primary cursor-pointer" : "bg-gray-400 cursor-not-allowed" }`}>
                                    Publicar</button>

                                <button onClick={() => {if(!stateImage){
                                    setShowEmojiPicker(!showEmpjiPicker )}
                                }} type="button" className="p-1 text-black dark:text-white/50 
                                rounded-full hover:bg-gray-700 cursor-pointer">
                                    <Icon icon="mdi:emoticon-outline" className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </form>
                    {
                        stateImage && <ImageSelector/>
                    }
                    
                </main>
                {
                    !stateImage && <footer className="p-4 border-t border-gray-500/40 ``">
                    <div className="flex items-center justify-between border border-gray-500/40 rounded-sm p-3">
                        <span className="text-sm dark:text-white text-black/70">
                            Agregar a tu publicacion</span>
                        <div className="flex space-x-4">
                            <button onClick={setStateImage} className="p-1 rounded-full hover:bg-gray-400 text-black/50 
                             dark:text-white/50 400">
                                <Icon icon="mdi:image" className="text-2xl cursor-pointer" />
                            </button>
                        </div>

                    </div>
                </footer>
                }
                
            </section>


        </section>
    )
}