import { Icon } from "@iconify/react"
import { PostImageFrame } from "./PostImageFrame"

export const CardPost = () => {
    return (
        <div className="border-b border-gray-500/50
        p-4">
            <div className=" flex justify-between">
                <div className="flex items-center gap-3">
                    <img src="https://avatars.githubusercontent.com/u/105328?v=4" alt="avatar"
                     className="w-12 h-12 rounded-full"/>
                     <span className="font-bold">
                        nombre de usuariio
                     </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm withspace-nowrap">hace 8 hs</span>
                    <button>
                        <Icon icon="mdi:dots-horizontal"
                         height={26}
                        className="text-gray-500" />
                    </button>
                </div>

            </div>
            <div className="mt-3">
                <p className="mt-2">tituo</p>
                <div>
                    <PostImageFrame src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFxl-2XD9MuKQDwDoMaz0KLgRQcR4EzS_Eg&s"} />
                </div>
                <div className="flex justify-between mt-4">
                    <button>
                        <Icon icon="mdi:heart-outline" className="text-3xl p-1 rounded-full text-gray-400 hover:bg-[rgba(78,184,233,0.2)]
                        cursor-pointer "/>
                    </button>
                    <button className="flex items-center cursor-pointer">
                        <Icon icon="mdi:comment-outline" className="text-3xl p-1 rounded-full
                         text-gray-400"/>
                         <span className="text-xs md:text-sm text-gray-400">Comentar</span>
                    </button>

                </div>
            </div>
            
        </div>
    )
}