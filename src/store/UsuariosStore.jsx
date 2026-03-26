import { supabase } from "../supabase/supabase.config"
import { create } from "zustand";

const tabla = "usuarios"
export const useUsuariosStore = create((set) =>({

    dataUsuarioAuth:null,
    mostrarUsuarioAuth: async (p) => {
        const {data,error} = await supabase
        .from(tabla).select()
        .eq("id_auth",p.id_auth)
        .maybeSingle();
        if(error){
            throw new Error(error.message);
        }
        set({dataUsuarioAuth: data});
        return data;
    }
    
    

}))