import {useUsuariosStore} from "../store/UsuariosStore"
import {useSuscription} from "../store/AuthStore"
import { useQuery } from "@tanstack/react-query";

export const useMostrarUsuariosAuthQuery = () => {
    const {mostrarUsuarioAuth} =useUsuariosStore();
    const {user} = useSuscription();

    return useQuery({
        queryKey: ["Mostrar user auth"],
        queryFn: () => mostrarUsuarioAuth({id_auth:user?.id})
    })
}