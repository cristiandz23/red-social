import { useRef, useState } from "react"
import { usePostStore } from "../store/PostStore";
import imageCompression from "browser-image-compression";
import { Icon } from "@iconify/react";

export const useImageSelector = () => {
    const [file, setFile] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const [fileType, setFileType] = useState("");
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false)
    const { setFile: setFilePost, setStateImage} = usePostStore();

    const openFileSelector = () => {
        fileInputRef.current?.click();
    }
    const handleImageChange = async (e) => {
        const selectedFile = e.target.files[0];
        const sizeMb = selectedFile.size / (1024 * 1024);
        if (!selectedFile) return;
        const type = selectedFile.type;
        if (!type.startsWith("image/") && !type.starWith("video/")) {
            alert("Solo se permiten  imagees o videos");
            return;
        }

        if (type.startsWith("image/")) {
            if (sizeMb > 2) {
                alert("el archivo supea el limite de 8MB");
                return
            }
            try {
                const options = {
                    maxSizeMB: sizeMb - 1 ? 0.1 : 0.2,
                    maxWidthOrHeigth: 1920,
                    useWebWorker: true
                };
                const compressedFile = await imageCompression(selectedFile, options);
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onload = () => setFileUrl(reader.result)
                setFile(compressedFile);
                setFilePost(compressedFile);
                setFileType("image");

            } catch (error) {
                console.error("Error al comprimir la imagen: ", error);
                alert("Error al procesar la imagen");
            }
        } else {
            const videoUrl = URL.createObjectURL(selectedFile);
            setFile(selectedFile);
            setFilePost(selectedFile);
            setFileUrl(videoUrl);
            setFileType("video");
        }
    }

    const removeImage = () => {
        setFile("");
        setFileUrl("");
        setFileType("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        };
    }

    const handledDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true)
    }
    const hanldeDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }

    const hanldeDragDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) return;
        await handleImageChange({ target: { files: [droppedFile] } });
        setIsDragging(false);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true)


    }

    return {
        file, isDragging, fileUrl, fileType, fileInputRef,
        handleImageChange, openFileSelector, removeImage, handledDragEnter, hanldeDragLeave, hanldeDragDrop, handleDragOver,setStateImage
    }
}

export const ImageSelector = () => {
    const { file, isDragging, fileUrl, fileType, fileInputRef,
        hanfleImageChange, handleImageChange, openFileSelector, removeImage, handledDragEnter, hanldeDragLeave,
        hanldeDragDrop, handleDragOver,setStateImage } = useImageSelector()
    return <div className="relative w-full max-w-md
     bg-[#242526] rounded-lg shadow-xl 
        overflow-hidden curspr-pointer" >
        <header className="relative h-12 flex items-center
            justify-center border-b border-gray-700">
            <h2 className="text-white font-medium">agregar fotos o videos</h2>
            <button className="absolute right-4 text-gray-400
                 hover:text-white transition-colors duration-200">
                <Icon icon="mdi:close" onClick={setStateImage} className="text-xl" />
            </button>
        </header>
        <main className={`p-8 flex flex-col items-center justify-center 
                              min-h-[240px] transition-colors duration-300 
                               ${isDragging ? "bg-[#3a3b3c]" : "bg-[#171718]"}`}

            onDragEnter={handledDragEnter}
            onDragLeave={hanldeDragLeave}
            onDrop={hanldeDragDrop}
            onDragOver={handleDragOver}
        >
            {

                fileUrl ? (
                    <div className="relative inline-block group">
                        {

                            fileType === "image" ? (<img src={fileUrl} className="w-full max-w-[280px] 
                                        max-h-[280px] rounded-lg object-contain transition-transform 
                                        duration-300 group:hover:scale-[1.02]"
                            />) :
                                (<video controls src={fileUrl} className="w-full max-w-[280px] max-h-[280px] rounded-lg object-contain"
                                />)
                        }
                        <button type="button" onClick={removeImage} className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-60
                                rounded-full border-none cursor-pointer flex items-center justify-center
                                transition duration-300 opacity-0 group-hover:opacity-100 hover:bg-opacity-80">
                            <Icon icon="mdi:close" className="text-white text-lg" />
                        </button>
                        <button type="button" onClick={openFileSelector} className="
                                absolute bottom-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full
                                 border-none cursor-pointer flex items-center justify-center 
                                 transition duration-300 opacity-0 group-hover:opacity-100">
                            <Icon icon="lets-icons:edit-fill" className="text-white text-lg" />
                        </button>

                    </div>
                ) : (
                    <>
                        <div>
                            <div className="w-16 h-16 rounded-full bg-[#3a3b3c]
                            flex items-center justify-center mb-4">
                                <Icon icon="mdi:video-image" className="text-3xl text-[#e4e6eb]" />
                            </div>
                            <h3 className="text-white text-lg font-mediun mb-1">Agregar fotos/video</h3>
                            <p className="text-gray-400 text-sm">  Arrastre y suelta aqui</p>
                            <button onClick={openFileSelector} className="mt-6 px-4 py-2 bg-[#3a3b3c] text-white rounded-lg
                         hover:bg-[#4a4b4c] transition-colors duration-200 ">
                                Seleccionar archivos
                            </button>
                        </div>

                    </>


                )
            }

        </main>

        <input type="file" accept="image/*, video/*"
            onChange={handleImageChange} ref={fileInputRef} />
    </div>
}