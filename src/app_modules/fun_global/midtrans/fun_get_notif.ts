"use server";

export default async function funGetNotif({
  params,
}: {
  params: { data: any };
}) {
  const body = params.data;
  console.log(body);

  return {
    status: 200,
    message: "OK",
  };
}
