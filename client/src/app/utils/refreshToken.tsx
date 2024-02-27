import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SignOut from "./SignOut";
import { IToken } from "../types/interfaces";
import { ToastAction } from '@/shadComponents/ui/toast'
import { useToast } from '@/shadComponents/ui/use-toast'

export async function RefreshTokens(accessToken: string, refreshToken: string){
    const router = useRouter();
    const [storageAccessToken, setStorageAccessToken] = useLocalStorage('accessToken', '');
    const [storageRefreshToken, setStorageRefreshToken] = useLocalStorage('refreshToken', '');
    const { toast } = useToast();
    const routeHandler = () => {
        router.push(`${process.env.FRONTEND_URL}/login`)
    }
    useEffect(() => {
        async function refreshTokens(accessToken: string, refreshToken: string){
    
            const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh_token`, {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({token: refreshToken})
            })
            if (!res.ok){
                await SignOut(accessToken)
                toast({
                    title: "Your session is closed",
                    description: "You need to sign in again",
                    action: (
                      <ToastAction altText="Sign in">Sign in</ToastAction>
                    ),
                  })
                  routeHandler();
            }
            const data = await res.json();
            setStorageRefreshToken(data.refresh_token);
            setStorageAccessToken(data.access_token);
        }
        refreshTokens(accessToken, refreshToken)
    }, [])
    return [storageAccessToken, storageRefreshToken]
}