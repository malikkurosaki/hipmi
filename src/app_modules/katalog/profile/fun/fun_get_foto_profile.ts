import { myConsole } from "@/app/fun/my_console";
import { getFotoProfile } from "./api-get-foto-profile";

export  async function loadFotoProfile(id: string, setFoto: any) {
    myConsole(id)
    await getFotoProfile(id)
    .then((res) => res)
    .then((val) => {
        setFoto(val?.url)
    })
    
}