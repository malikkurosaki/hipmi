import Coba_TestLoading from "@/app_modules/zCoba";

export default async function Page() {


   await new Promise((a, b) => {
     setTimeout(a, 3000);
   });

  return (
    <>
      <Coba_TestLoading />
     
    </>
  );
}
