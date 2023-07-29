"use client"

import { Button } from "@mantine/core"
import { useRouter } from "next/navigation"

export function LoginPage(){
    const router = useRouter()
    return <>
    <div>ini login</div>
    <Button onClick={() =>router.push("/dev/registrasi") }>Register</Button>
    </>
}