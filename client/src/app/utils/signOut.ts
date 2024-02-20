export async function signOut(token: string){
    const res = await fetch(`${process.env.FRONTEND_URL}/auth/signout`, {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
    return res;
}