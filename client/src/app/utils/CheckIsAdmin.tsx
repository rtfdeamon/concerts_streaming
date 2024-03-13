'use client'
import { useRouter } from "next/navigation";

export default function CheckIsAdmin() {
  const router = useRouter();
  if (typeof window !== 'undefined'){
    if (typeof localStorage.getItem('role') !== null){
      const role = JSON.parse(localStorage.getItem('role') as string);
      role !== 'administrator' && router.back();
    }
  }
  return <></>
}
