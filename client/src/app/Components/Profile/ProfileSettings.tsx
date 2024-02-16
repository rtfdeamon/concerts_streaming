'use client'
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { getCurrUser, changeCurrUserName, changeCurrUserPhoto } from "@/app/store/user/userSlice"
import { Input } from "@/shadComponents/ui/input";
import { Button } from "@/shadComponents/ui/button";
import { Label } from "@/shadComponents/ui/label";
import { useToast } from "@/shadComponents/ui/use-toast";
import { ToastAction } from "@/shadComponents/ui/toast";
import Image from "next/image";
import DefaultImage from '../../.././../public/default.jpeg'
import { IUser } from "@/app/types/interfaces";
import { ChangeEvent } from "react";
import styles from './ProfileSettings.module.scss';
import { generateUploadLink } from "@/app/utils/generateUploadLink";

export default function ProfileSettings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userInfo.user);
  const [userName, setUserName] = useState('');
  const { toast } = useToast();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }

  const onUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files){
      const file = e.target.files[0]
      const formData = new FormData();
      formData.append('file', file);
      const uploadType = 'avatar'
      const link:any = await generateUploadLink(uploadType);
      const res = await fetch(`${link.url}`, {
        method: 'PUT',
        headers: {
          'Content-type' : 'image/png'
        },
        body: file
      })
      if (res.ok){
        dispatch(changeCurrUserPhoto(link.url.split('?')[0]))
        toast({
          title: "Profile's changes",
          description: "Photo successfully changed",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
      }
    }
  }

  const saveChangesHandler = async () => {
    // if res.ok 
    // else desc: 'Something went wrong'
    if (userName !== ''){
      const res:any = await dispatch(changeCurrUserName(userName)); 
      if (res.payload.id){
        toast({
          title: "Profile's changes",
          description: "You have successfully changed your profile info",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
      } else {
        toast({
          title: "Profile's changes",
          description: "Something went wrong",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
      }
    }
  }

  useEffect(() => {
    dispatch(getCurrUser())
  }, [])

  return (
    <div className={styles.menuWrapper}>
        <h5 className={styles.title}>Profile of {user?.name}</h5>
        <div className={styles.imageWrapper}>
         {user?.avatar_url && <Image className={styles.avatar} src={user?.avatar_url as string} width={500} height={400} alt="Image" /> }
        </div>
        <div className={styles.fileInput}>
          <Label className={styles.span} htmlFor="picture">Picture</Label>
          <Input onChange={(e) => onUploadHandler(e)} id="picture" type="file" accept="image/png, image/gif, image/jpeg" />
        </div>
        <div className={styles.profileName}>
          {/* <span>Profile's name</span> <Input type="text" placeholder={User.Name} /> */}
          <span className={styles.span}>Profile's name</span>
          <Input onChange={(e) => onChangeHandler(e)} type="text" placeholder="Test" />
        </div>
        <Button onClick={saveChangesHandler} className={styles.btn}>Save changes</Button>
    </div>
  )
}
