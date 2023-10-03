import { HomeLayout } from "@/app_modules/home";

export default async function Layout({children}: {children: any}) {
    return <>
    <HomeLayout>{children}</HomeLayout>
    
    </>
    
}