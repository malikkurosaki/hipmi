'use client'
import { test_server } from "@/app_modules/investasi/edit_intro/_makuro/test_server";
import { Button } from "@mantine/core";

export default function ViewMakuro() {

    return <>
        <Button
            onClick={() => test_server()}
        >Tekan Aja</Button>
    </>
}