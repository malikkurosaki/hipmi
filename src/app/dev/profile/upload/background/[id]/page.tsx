import { Profile_getOneById } from "@/app_modules/katalog/profile/fun/get/get_one_profile"
import Profile_UpdateFotoBackground from "@/app_modules/katalog/profile/upload/foto_background"

export default async function Page({params}:{params: {id: string}}) {
    let profileId = params.id
    const dataProfile = await Profile_getOneById(profileId)

    return <>
    <Profile_UpdateFotoBackground dataProfile={dataProfile as any}/>
    </>
    
}