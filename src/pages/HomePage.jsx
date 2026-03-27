import { Icon } from "@iconify/react";
import { HeaderStick } from "../components/HomePageComponents/HeaderStick";
import { InputPostComponent } from "../components/HomePageComponents/InputPostComponent";
import {CardPost} from "../components/HomePageComponents/CardPost";
import { FormPost } from "../components/Forms/FormsPost";
import { usePostStore } from "../store/PostStore";
import { Toaster } from "sonner";
import { useMostrarPostQuery } from "../stack/PostStack";
import { useEffect, useRef } from "react";

export const HomePage = () => {
    const {stateForm, setStateForm} = usePostStore();
    const {data:dataPost, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading:isLoadingPost} = useMostrarPostQuery();
    const scrollRef = useRef(null);
    useEffect(() => {
        const el = scrollRef.current;
        const hanldeControlScroll = () => {
            if(el.scrollTop + el.clientHeight >= el.scrollHeight - 200 && hasNextPage && !isFetchingNextPage){
                fetchNextPage();
            }
        };
        if(el){
            el.addEventListener("scroll",hanldeControlScroll);
            return () => el.removeEventListener("scroll",hanldeControlScroll);
        }
    },[fetchNextPage,hasNextPage,isFetchingNextPage]);

    return (
    <main className="flex min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto">
        <Toaster position="top-left"/>
       {
        stateForm && <FormPost/>
       }
        
        <section className="flex flex-col h-screen w-full"> 
             
        <article className="flex flex-col h-screen overflow-hidden border 
        border-gray-200 border-t-0 border-b-0 dark:border-gray-200">
           <HeaderStick  />
           <div ref={scrollRef} className="overflow-y-auto">
            <InputPostComponent />
            {
                dataPost?.pages?.map(
                    (page,pageIndex) => (
                        page?.map((item, index) => <CardPost  key={`${pageIndex}-${index}`} item={item} />))
                )
            }
            
           </div>
        </article>
        <article className="dark:bg-blue">
        derechaaaaa
        </article>

        </section>
    </main>    
)
}