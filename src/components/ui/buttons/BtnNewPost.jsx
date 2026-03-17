import { Icon } from "@iconify/react"

export const BtnNewPost = () => {
    return (
        <button className="mt-4 flex justify-start
         bf-primary hover:bg-primary/90 text-white font-semibold
         p-2 rounded-full cursor-pointer items-center gap-2 transition-150">
            <Icon icon={"ic:baseline-add"} width={20} height={20}>
            </Icon>
            <span className="hidden sm:block" >Nueva Publicacion</span>
        </button>
    )
}