import { User_getUserId } from "@/app_modules/fun_global/get_user_token";
import { CreateProfile } from "@/app_modules/katalog/profile";

export default async function Page({params}: {params: {id: string}}) {
    const userId = await User_getUserId()

    return <>
    <CreateProfile userId={userId}/>
    </>
}