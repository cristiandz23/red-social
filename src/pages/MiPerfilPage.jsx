import { useUsuariosStore } from "../store/UsuariosStore"

export const MiPerfilPage = () => {
    const {dataUsuarioAuth} = useUsuariosStore();

    return (
        <div className="bg-amber-400 h-screen flex flex-col">
            <span>Mi perfil Page</span>
            <span>{dataUsuarioAuth?.nombre}</span>
        </div>
    )

}