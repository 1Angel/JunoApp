import Properties from "@/components/Properties";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Explora todas las propiedades - Juno",
    description: "Bienvenido a Juno, Aqui podras buscar casas a tu gusto"
}


export default function Page(){
    return (
        <>
            <p>Home page</p>
            <Properties/>
        </>
    )
}