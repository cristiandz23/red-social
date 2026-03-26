import { Icon } from "@iconify/react";
import { HeaderStick } from "../components/HomePageComponents/HeaderStick";
import { InputPostComponent } from "../components/HomePageComponents/InputPostComponent";
import {CardPost} from "../components/HomePageComponents/CardPost";
import { FormPost } from "../components/Forms/FormsPost";
import { usePostStore } from "../store/PostStore";
import { Toaster } from "sonner";

export const HomePage = () => {
    const {stateForm, setStateForm} = usePostStore();
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
           <div className="overflow-y-auto">
            <InputPostComponent />
            <CardPost/>
           </div>
        </article>
        <article className="dark:bg-blue">
        derechaaaaa
        </article>

        </section>
    </main>    
)
}