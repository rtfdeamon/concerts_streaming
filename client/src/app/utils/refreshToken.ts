import { IToken } from "../types/interfaces";

export async function refreshTokens(refreshToken: string){
    const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh_token`, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({token: refreshToken})
    })
    const data: IToken = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
}