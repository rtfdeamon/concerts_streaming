async function refreshTokens(accessToken: string, refreshToken: string){
    const res = fetch(`${process.env.BACKEND_URL}/auth/refresh_token`, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({token: refreshToken})
    })
    return res;
}

export async function RefreshTokens(accessToken: string, refreshToken: string){
    const routeHandler = () => {
        location.replace(`${process.env.FRONTEND_URL}/login`)
    }
    localStorage.setItem('flag', JSON.stringify("pending"))
    refreshTokens(accessToken, refreshToken)
    .then(res => res.json())
    .then(res => {
        if (res.access_token){
            localStorage.setItem('refreshToken', JSON.stringify(res.refresh_token))
            localStorage.setItem('accessToken', JSON.stringify(res.access_token))
            localStorage.setItem('authed', JSON.stringify(true))
        }
    })
    .catch(err => {
            localStorage.removeItem('authed')
            routeHandler();
    })
    .finally(() => {
        localStorage.removeItem('flag')
    })
}
