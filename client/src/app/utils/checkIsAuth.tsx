'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { ToastAction } from '@/shadComponents/ui/toast'
import { useToast } from '@/shadComponents/ui/use-toast'

export default function CheckIsAuth({type}:{type?: string}) {
  const [isAuth, setIsAuth] = useState<boolean | null >(null);
  const router = useRouter();
  const { toast } = useToast();
  let timeoutId: NodeJS.Timeout;
  const timeOut = !type ? 1500 : 0;

  if (typeof window !== 'undefined' && localStorage.getItem('authed') !== null){
    setIsAuth(JSON.parse(localStorage.getItem('authed') as string) as boolean)
  }

  const toastHandler = () => {
    router.push('/login')
  }

  if (!isAuth && typeof window !== 'undefined'){
    localStorage.removeItem('authed');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    toast({
      title: "Sorry, you need to be sign in for this page",
      action: (
        <ToastAction onClick={() => toastHandler()} altText="Sign in">Sign in</ToastAction>
      ),
    })
    timeoutId = setTimeout(() => {
      router.push('/login')
    }, timeOut)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    }
  }, [])

  return (
    <>
      {!isAuth && 
        <div className="absolute bg-red top-0 left-0 right-0 bottom-0 z-50">
        </div>
      }
    </>
  )
}

