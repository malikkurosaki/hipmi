import { sessionCreate } from "@/app/auth/_lib/session_create";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { data } = await req.json();

    const cekUsername = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (cekUsername)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Username sudah digunakan",
        }),
        { status: 400 }
      );

    const createUser = await prisma.user.create({
      data: {
        username: data.username,
        nomor: data.nomor,
      },
    });

    const token = await sessionCreate({
      sessionKey: process.env.NEXT_PUBLIC_BASE_SESSION_KEY!,
      encodedKey: process.env.NEXT_PUBLIC_BASE_TOKEN_KEY!,
      user: createUser as any,
    });

    try {
      const createUserSession = await prisma.userSession.create({
        data: {
          token: token as string,
          userId: createUser.id,
        },
      });

      if (!createUserSession)
        return new Response(
          JSON.stringify({
            success: false,
            message: "Gagal Membuat Session",
          }),
          { status: 400 }
        );
    } catch (error) {
      console.log(error);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Berhasil Login",
      }),

      { status: 200 }
    );
  }
  return new Response(
    JSON.stringify({ success: false, message: "Method Not Allowed" }),
    { status: 405 }
  );
}
