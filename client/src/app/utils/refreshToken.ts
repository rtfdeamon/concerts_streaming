import { useLocalStorage } from "../hooks/useLocalStorage";
import { IToken } from "../types/interfaces";

async function refreshTokens(refreshToken: string){
    const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh_token`, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({token: refreshToken})
    })
    const data = await res.json();
    return data;
}
export async function RefreshTokens(refreshToken: string){
    const res: IToken = await refreshTokens(refreshToken);
    console.log('res', res)
    const [storageAccessToken, setStorageAccessToken] = useLocalStorage('accessToken', res?.accessToken);
    const [storageRefreshToken, setStorageRefreshToken] = useLocalStorage('refreshToken', res?.refreshToken);
    return [storageAccessToken, storageRefreshToken]
}