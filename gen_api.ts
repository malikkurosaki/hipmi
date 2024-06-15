import app_config from "@/util/app_config";

 export const gen_api = {
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/test-scroll/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/test-scroll/route.ts)
 */
testScroll : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/test-scroll/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/seeder/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/seeder/route.ts)
 */
seeder : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/seeder/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/url_foto/[url]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/url_foto/[url]/route.ts)
 */
profileUrl_fotoUrlByUrl : async ({url, isServer}: {url: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/profile/url_foto/${url}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/url_background/[url]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/url_background/[url]/route.ts)
 */
profileUrl_backgroundUrlByUrl : async ({url, isServer}: {url: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/profile/url_background/${url}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/foto/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/foto/[id]/route.ts)
 */
profileFotoIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/profile/foto/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/background/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/background/[id]/route.ts)
 */
profileBackgroundIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/profile/background/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/portofolio/logo/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/portofolio/logo/[id]/route.ts)
 */
portofolioLogoIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/portofolio/logo/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/job/gambar/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/job/gambar/[id]/route.ts)
 */
jobGambarIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/job/gambar/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/prospektus/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/prospektus/[id]/route.ts)
 */
investasiProspektusIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/investasi/prospektus/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/midtrans/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/midtrans/[id]/route.ts)
 */
investasiMidtransIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/investasi/midtrans/${id}/`, { method: 'POST',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/gambar/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/gambar/[id]/route.ts)
 */
investasiGambarIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/investasi/gambar/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/dokumen/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/dokumen/[id]/route.ts)
 */
investasiDokumenIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/investasi/dokumen/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/image_cerita/[url]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/image_cerita/[url]/route.ts)
 */
donasiImage_ceritaUrlByUrl : async ({url, isServer}: {url: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/image_cerita/${url}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/image/[url]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/image/[url]/route.ts)
 */
donasiImageUrlByUrl : async ({url, isServer}: {url: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/image/${url}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_pencairan/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_pencairan/[id]/route.ts)
 */
donasiGambar_pencairanIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar_pencairan/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_kabar/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_kabar/[id]/route.ts)
 */
donasiGambar_kabarIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar_kabar/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_cerita/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_cerita/[id]/route.ts)
 */
donasiGambar_ceritaIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar_cerita/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_bukti_transfer/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_bukti_transfer/[id]/route.ts)
 */
donasiGambar_bukti_transferIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar_bukti_transfer/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar/[id]/route.ts)
 */
donasiGambarIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/validasi/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/validasi/route.ts)
 */
authValidasi : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/validasi/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/register/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/register/route.ts)
 */
authRegister : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/register/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/logout/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/logout/route.ts)
 */
authLogout : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/logout/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/login/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/login/route.ts)
 */
authLogin : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/login/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
};