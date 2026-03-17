import { Icon } from "@iconify/react";

export const HeaderStick = () => {
    return(
         <div className="sticky top-0 z-10 border-b border-gray-600 px-4 py-3 ">
                <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    INICIO
                </h1>
                <button className="flex gap-2">
                    <span>200 USUARIOS</span>
                    <Icon icon="mdi:dots-vertical" className="text-2xl text-gray-40" />
                </button>
                </div>
            </div>
    )
 }
 
 
