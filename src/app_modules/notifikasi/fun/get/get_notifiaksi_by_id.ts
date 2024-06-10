"use server"

import { user_getOneUserId } from "@/app_modules/fun_global/get_user_token"

export default async function notifikasi_getByUserId() {
    const userId = await user_getOneUserId()


}