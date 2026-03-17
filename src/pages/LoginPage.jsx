import logo from "../assets/react.svg"
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useGenerarCodigosAleatorios } from "../hooks/useGenerarCodigosAleatorios";
import {useAuthStore} from "../store/AuthStore"
import {useCrearUsuarioYSesionMutate} from "../stack/LoginStack"
import { Toaster } from "sonner";
import {useForm} from "react-hook-form"


export const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { setCredenciales } = useAuthStore()
    const [email,setEmail] =useState();
    const [password, setPassword] = useState();
    
     const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const {handleSubmit} = useForm();
    const {isPending, mutate} = useCrearUsuarioYSesionMutate();    

    useEffect(() => {
            const response = useGenerarCodigosAleatorios()
            const correoCompleto = response + "@gmail.com"
            setCredenciales({email:correoCompleto, password: response})
            setEmail(correoCompleto);
            setPassword(response)
        }, []);



    return (
        <main className="flex h-screen w-full">
            <Toaster/>
            <section className="hidden md:flex md:w-1/2 bg-[#00b0f0] flex flex-col justify-center 
            items-center overflow-hideen ">
                <div className="px-8 ">
                    <div className="flex items-center gap-3">
                        <img 
                            src={logo} className="h-10 w-10"/>
                        <span className="text-4xl font-blond text-[#CCEFFC]"> texto</span>
                    </div>
                    <span className="text-3xl texto-semibold mb-2">TEXTO MAS TEXTO</span>
                    <span className="text-3xl font-semibold mb-2"></span>
                </div>

            </section>
            <section className="bg-white w-full md:w-1/2 justify-center
            flex items-center px-6 md:px-16 py-8">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-medium mb-6 text-center">Iniciar Sesion 
                        <span className="text-[#0091EA]">
                            (modo invitado)
                        </span>
                    </h1>
                    <form className="space-y-4"  onSubmit={handleSubmit(mutate)}>
                        <div>
                            <input 
                            value={email}
                            placeholder="Email" className="w-full px-4 py-3 border border-gray-300
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aff0]" />
                        </div>
                        <div className="relative ">
                            <input 
                            value={password}
                            type={showPassword?"text" : "password"}
                            placeholder="Password"  
                            className="w-full px-4 py-3 border border-gray-300
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aff0]" />
                            <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2
                             text-gray-500 cursor-pointer"      
                                onClick={togglePasswordVisibility}>
                                <Icon icon= {showPassword?"mdi:eye-off":"mdi:eye"}/>
                            </button>
                        </div>
                        <div className="mt-6">
                            <button disabled={isPending} type="submit" className="bg-gray-400 w-full py-2
                            rounded-lg text-white font-semibold hover:bg-[#00AFF0] transition-all duration-300">
                                    Iniciar Sesion
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-xs">
                        Al iniciar sesion y usar onlydevs, aceptas nuentros
                        {" "}
                        <a href="#" className="text-[#00aff0]">
                            terminos de servicios
                        </a> {" y "}
                        <a href="#" className="text-[#00aff0]">
                            Politica de privacidad
                        </a>{" y confirmas que tienes al menos 18 años"}
                        <div className="text-center text-[#00aff0] mt-5 p-2 ">
                            <a href="#"> ¿Has olvidado tu contraseña?</a>
                            <div className="mt-4">
                            <a href="#"> Registrarse</a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    )
}