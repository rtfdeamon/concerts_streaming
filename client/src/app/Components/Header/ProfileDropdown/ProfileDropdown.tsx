'use client'
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks";
import SignOut from "@/app/utils/SignOut";
import { getCurrUser } from "@/app/store/user/userSlice";
import { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/shadComponents/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "@/shadComponents/ui/button";
import Link from "next/link";
import Image from "next/image";
import styles from './ProfileDropdown.module.scss'

export default function ProfileDropdown() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userInfo.user);
  let accessToken: string = '';
  if (typeof window !== 'undefined'){
    console.log(localStorage.getItem('accessToken'), typeof localStorage.getItem('accessToken'));
    if (localStorage.getItem('accessToken') !== 'undefined' && typeof localStorage.getItem('accessToken') !== 'undefined')
    accessToken = JSON.parse(localStorage.getItem('accessToken') as string)
  }
  useEffect(() => {
    dispatch(getCurrUser());
  }, [])  
  return (
    <div className={styles.profileImage}>
        {user?.avatar_url && <Image src={user?.avatar_url as string} className={styles.userIcon} width={40} height={40} alt='user avatar'></Image> }
        <DropdownMenu>
          <DropdownMenuTrigger>
                <Button className={styles.btn}>Profile</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Hello, {user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={'/profile'}>
                    Profile
                  </Link>
                  </DropdownMenuItem>
                {user?.role === 'administrator' && 
                  <DropdownMenuItem>
                        <Link href={'/admin'}>
                          Admin panel
                        </Link>
                  </DropdownMenuItem>
                }
                  <DropdownMenuItem onClick={async () => {
                    accessToken !== 'undefined' && typeof accessToken !== 'undefined' && await SignOut(accessToken)
                    router.push(`${process.env.FRONTEND_URL}/`)
                  }}>
                          Logout
                  </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
