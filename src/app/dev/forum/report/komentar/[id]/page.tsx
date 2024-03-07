import { Forum_ReportKomentar } from "@/app_modules/forum";

export default async function Page({params}: {params: {id: string}}) {
    let komentarId = params.id
    return<>
    <Forum_ReportKomentar id={komentarId}/>
    </>
}