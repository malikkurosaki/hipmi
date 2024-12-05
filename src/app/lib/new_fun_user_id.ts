import { jwtVerify } from "jose";
import _ from "lodash";
import { cookies } from "next/headers";

export async function newFunGetUserId() {
  const c = cookies().get(process.env.NEXT_PUBLIC_BASE_SESSION_KEY!);

  if (!c || !c?.value || _.isEmpty(c?.value) || _.isUndefined(c?.value)) {
    return null;
  }

  const token = c.value;
  const dataUser = await decrypt({
    token: token,
    encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
  });

  return dataUser?.id;
}

async function decrypt({
  token,
  encodedKey,
}: {
  token: string;
  encodedKey: string;
}): Promise<Record<string, any> | null> {
  try {
    const enc = new TextEncoder().encode(encodedKey);
    const { payload } = await jwtVerify(token, enc, {
      algorithms: ["HS256"],
    });
    return (payload.user as Record<string, any>) || null;
  } catch (error) {
    console.error("Gagal verifikasi session", error);
    return null;
  }
}
