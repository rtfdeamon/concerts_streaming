
export default function SignOut(token: string) {
    const signOutHandler = async (token: string) => {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/signout/`, {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        if (typeof window !== 'undefined'){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('authed');
            localStorage.removeItem('role');
            location.replace(`${process.env.FRONTEND_URL}/login`)

        }
        return res
    }
  return signOutHandler(token)
}
