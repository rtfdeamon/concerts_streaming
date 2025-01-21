export const getHostName = (url: string) =>{
    if (url.includes('http')) return url
    return `https://${location.hostname}${url}`
}