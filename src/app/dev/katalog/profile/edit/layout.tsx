import { EditProfileLayout } from "@/app_modules/katalog";

export default function Layout({children}: {children: any}){
    return <>
    <EditProfileLayout>{children}</EditProfileLayout>
    </>
}