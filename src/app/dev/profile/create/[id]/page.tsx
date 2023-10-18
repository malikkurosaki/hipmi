import { CreateProfile } from "@/app_modules/katalog/profile";

export default async function Page({params}: {params: {id: string}}) {
    // console.log(params.id)
    
    return <>
    <CreateProfile userId={params.id}/>
    </>
}