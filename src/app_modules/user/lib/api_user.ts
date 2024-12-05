export const apiGetUserLogin = async () => {
   const response = await fetch(`/api/new/user`)
   return await response.json().catch(() => null)
}