
export async function RefreshTokens(accessToken: string, refreshToken: string){
    const routeHandler = () => {
        location.replace(`${process.env.FRONTEND_URL}/login`)
    }
    async function refreshTokens(accessToken: string, refreshToken: string){
        const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh_token/`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({token: refreshToken})
        })
        if (!res.ok){
              routeHandler();
        }
        const data = await res.json();
        localStorage.setItem('refreshToken', data.refresh_token)
        localStorage.setItem('accessToken', data.access_token)
    }
    await refreshTokens(accessToken, refreshToken)
    return
}