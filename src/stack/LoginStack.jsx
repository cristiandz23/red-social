import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";


export const useCrearUsuarioYSesionMutate = () => {
    const {crearUserYLogin, credenciales} = useAuthStore()
    
    return useMutation({
        mutationKey: ["Iniciar con email test"],
        mutationFn: async () => {
            if (!credenciales) return;
            console.log("use y log " + credenciales.email)
            await crearUserYLogin({
                email: credenciales.email,
                password: credenciales.password
            });
        
        },
        onError: (error) => {
            console.log("hubi error")
            toast.error(`Error: ${error.message}`)
        },
        onSuccess: () => {
            toast.success("Usuario creado e iniciado sesión correctamente+")
            
        }
    });
};