'use client'

import { Button } from "@mantine/core";
import makuro_test from "./makuro_test";

export default function ViewMakuro() {

    return <>
        <Button
            onClick={() => makuro_test()}
        >Tekan Aja</Button>
    </>
}