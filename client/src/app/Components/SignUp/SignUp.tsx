'use client'
import React, { ChangeEvent, useEffect, useState } from "react"
import { useForm, Resolver } from "react-hook-form"
import { useAppDispatch } from "@/app/hooks/rtkHooks"
import { signUp } from "@/app/store/register/registerSlice"
import { Input } from "@/shadComponents/ui/input"
import { Button } from "@/shadComponents/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadComponents/ui/select"
import { Label } from "@/shadComponents/ui/label";
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import styles from './Register.module.scss'
import { ToastAction } from "@radix-ui/react-toast"
import { useToast } from "@/shadComponents/ui/use-toast"
import { generateUploadLink } from "@/app/utils/generateUploadLink"
import { changeCurrUserPhoto } from "@/app/store/user/userSlice"

export interface IRegister {
    select: string,
    email: string,
    username: string,
    name: string,
    password: string
    ein: string
}
  


export default function SignUp() {
  const resolver: Resolver<IRegister> = async (values) => {
    return {
      values: values.password ? values : {} || values.select? values: {} || values.password? values : {} || values.email ? values : {},
      errors: !values.username || !values.password || select === '' || !values.email
        ? {
            username: {
              type: "required",
              message: "Username is required at least 5 symbols",
            },
            password: {
                type: "required",
                message: "Password is required at least 8 symbols",
              },
              select: {
                type: "required",
                message: "Select your role",
              },
          }
        : {},
    }
  }
    const dispatch = useAppDispatch();
    const router = useRouter();
    let authed: string | null = null;
    if (typeof window !== "undefined") {
      authed = localStorage.getItem('authed')
    }
    const [select, setSelect] = useState('');
    const [err, setErr] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        } = useForm<IRegister>({ resolver })
    const [file, setFile] = useState<File | undefined>(undefined)
        
    const onSubmit = handleSubmit(
        async (data: IRegister) => {
            data['select'] = select;
            const res:any = await dispatch(signUp(data));
            if (res.payload.error){
                setErr(true);
            } 
            else {
                console.log('res', res)
                const accessToken = res.payload['access_token']
                localStorage.setItem('accessToken', JSON.stringify(accessToken))
                onUploadHandler()
                .then(() => {
                  router.push('/login');
                })
                .finally(() => {
                  router.push('/login');
                })
            }
          }
    )

    const { toast } = useToast();

    const onUploadHandler = async () => {
      if (file){
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
        } else {
          toast({
            title: "Something went wrong with saving your photo",
            variant: "destructive",
            action: (
              <ToastAction altText="Hide">Hide</ToastAction>
            ),
          })
        }
      }
    }

  useEffect(() => {
    if (authed === 'true') {
      router.push('/profile')
    }
  }, [authed])

  return (
    <>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Register</h1>
        {err && <span className={styles.err}>Something went wrong with sign up</span>}
        <form
          onSubmit={onSubmit}
            className={styles.form}>
            {/* // onSubmit={onSubmit}> */}
            <span className={styles.span}>Who you are?</span>
              <div className={styles.select}>
                <Select onValueChange={(e) => setSelect(e)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Who you are?</SelectLabel>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="artist">Artist</SelectItem>
                          <SelectItem value="sponsor">Advertiser</SelectItem>
                          <SelectItem value="service">Directory/Service</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors?.select && <span className={styles.err}>You need to specify your role</span>}
              </div>
                {/* <span className={styles.span}>Email</span>
                <Input
                  className={styles.input}
                  type="text"
                  {...register("email", {
                    required: "required",
                    minLength: {
                      value: 8,
                      message: "min length is 8",
                    },
                    pattern : {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                  }})} />
            {errors?.email && <p className={styles.err}>{errors.email.message}</p>} */}
            {/* {emailErr && <span className={styles.err}>Email is required at least 8 symbols</span>} */}
            <span className={styles.span}>Email</span>
              <Input
                className={styles.input}
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  }
                })} />
              {errors?.email && <p className={styles.err}>{errors.email.message}</p>}

            {select === 'service' && (
              <>
                <span className={styles.span}>EIN</span>
                  <Input
                    className={styles.input}
                    type="text"
                    {...register("ein", {
                      required: "required",
                      minLength: {
                        value: 9,
                        message: "min length is 9",
                      },
                      pattern : {
                        value: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
                        message: "Entered value does not match ein format",
                    }})} />
              </>
            )}
            <span className={styles.span}>Username</span>
            <Input
                className={styles.input}
                type="text"
                {...register("username", {
                  required: "required",
                  minLength: {
                    value: 5,
                    message: "min length is 5",
                  },
                  pattern : {
                    value: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
                    message: "Entered value does not match username format",
                }})} />
            {errors?.username && <p className={styles.err}>{errors.username.message}</p>}
            <div className={styles.fileInput}>
            <span className={styles.span}>Picture</span>
            <Input
              style={{marginTop: '10px'}}
              onChange={(e) => {
                if (e.target.files){
                  setFile(e.target.files[0])
                }
              }}
              id="picture"
              type="file"
              accept="image/png, image/gif, image/jpeg"
            />
            </div>
            {/* {usernameErr && <span className={styles.err}>Displayed name is required at least 5 symbols</span>} */}
            {/* <span className={styles.span}>Displayed name</span>
            <Input
                className={styles.input}
                type="text"
                {...register("name", {
                  required: "required",
                  minLength: {
                    value: 5,
                    message: "min length is 5",
                  },
                  pattern : {
                    value: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
                    message: "Entered value does not match username format",
                }})} /> */}
            {/* {errors?.name && <p className={styles.err}>{errors.name.message}</p>} */}
            {/* {diplsayedNameErr && <span className={styles.err}>Displayed name is required at least 5 symbols</span>} */}
            <span className={styles.span} style={{marginTop: '10px'}}>Password</span>
            <Input
                className={styles.input}
                type="password"
                {...register("password", {
                    required: "required",
                    minLength: {
                      value: 8,
                      message: "min length is 8",
                    },
                    })} />
            {errors?.password && <p className={styles.err}>{errors.password.message}</p>}
            {/* {passErr && <span className={styles.err}>Password is required at least 8 symbols</span>} */}
            <Button
              className={styles.btn}
              type="submit"
              >Register</Button>
              <p className={styles.link}>Already have an account? <Link href='/login'>Login</Link></p>
        </form>
      </div>
    </>
  )
}