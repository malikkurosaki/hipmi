import app_config from "./app_config";
 export const genFetchApi = {
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/test-scroll/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/test-scroll/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
testScroll : async ({isServer, searchParams}: {isServer?: boolean, searchParams?: string}) => {

    return fetch(`${isServer && app_config.host || ''}/api/test-scroll${searchParams || ''}`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/seeder/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/seeder/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
seeder : async ({isServer, searchParams}: {isServer?: boolean, searchParams?: string}) => {

    return fetch(`${isServer && app_config.host || ''}/api/seeder${searchParams || ''}`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/url_foto/[url]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/url_foto/[url]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
profileUrl_fotoUrlByUrl : async ({url, isServer, searchParams}: {url: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/profile/url_foto/${url}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/url_background/[url]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/url_background/[url]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
profileUrl_backgroundUrlByUrl : async ({url, isServer, searchParams}: {url: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/profile/url_background/${url}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/foto/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/foto/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
profileFotoIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/profile/foto/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/background/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/profile/background/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
profileBackgroundIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/profile/background/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/portofolio/logo/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/portofolio/logo/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
portofolioLogoIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/portofolio/logo/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/job/gambar/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/job/gambar/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
jobGambarIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/job/gambar/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/prospektus/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/prospektus/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
investasiProspektusIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/investasi/prospektus/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/midtrans/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/midtrans/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
investasiMidtransIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/investasi/midtrans/${id}${searchParams || ''}`, { method: 'POST',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/gambar/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/gambar/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
investasiGambarIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/investasi/gambar/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/dokumen/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/investasi/dokumen/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
investasiDokumenIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/investasi/dokumen/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/image_cerita/[url]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/image_cerita/[url]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
donasiImage_ceritaUrlByUrl : async ({url, isServer, searchParams}: {url: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/image_cerita/${url}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/image/[url]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/image/[url]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
donasiImageUrlByUrl : async ({url, isServer, searchParams}: {url: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/image/${url}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_pencairan/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_pencairan/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
donasiGambar_pencairanIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar_pencairan/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_kabar/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_kabar/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
donasiGambar_kabarIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar_kabar/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_cerita/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_cerita/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
donasiGambar_ceritaIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar_cerita/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_bukti_transfer/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar_bukti_transfer/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
donasiGambar_bukti_transferIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar_bukti_transfer/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar/[id]/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/donasi/gambar/[id]/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
donasiGambarIdById : async ({id, isServer, searchParams}: {id: string, isServer?: boolean, searchParams?: string}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/donasi/gambar/${id}${searchParams || ''}`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/validasi/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/validasi/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
authValidasi : async ({isServer, searchParams}: {isServer?: boolean, searchParams?: string}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/validasi${searchParams || ''}`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/register/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/register/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
authRegister : async ({isServer, searchParams}: {isServer?: boolean, searchParams?: string}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/register${searchParams || ''}`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/logout/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/logout/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
authLogout : async ({isServer, searchParams}: {isServer?: boolean, searchParams?: string}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/logout${searchParams || ''}`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/login/route.ts](file:///Users/bagasbanuna/Documents/BIP/hipmi/src/app/api/auth/login/route.ts)
 *  @param {} 
 *  @param {boolean} isServer
 *  @param {string} searchParams ?key=value
 */
authLogin : async ({isServer, searchParams}: {isServer?: boolean, searchParams?: string}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/login${searchParams || ''}`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
};