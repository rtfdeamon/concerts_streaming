'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/shadComponents/ui/dropdown-menu"
import { Button } from "@/shadComponents/ui/button"
import styles from './ProfileDropdown.module.scss'
import Link from "next/link"

export default function ProfileDropdown() {
  return (
    <div className={styles.profileImage}>
        <Link href={'/profile/${userID}'} className={styles.userIcon}></Link>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className={styles.btn}>Profile</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
