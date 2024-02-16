'use client'
import React, { useState } from "react"
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
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from './Register.module.scss'

export interface IRegister {
    select: string,
    email: string,
    username: string,
    password: string
}
  
  const resolver: Resolver<IRegister> = async (values) => {
    return {
      values: values.email? values : {} || values.username ? values : {} || values.password ? values : {} ,
      errors: !values.username || !values.password
        ? {
          email: {
            type: "required",
            message: "Input your email",
          },
            username: {
              type: "required",
              message: "Input your login",
            },
            password: {
                type: "required",
                message: "Input your password",
              },
          }
        : {},
    }
  }


export default function SignUp() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [emailErr, setEmailErr] = useState(false);
    const [usernameErr, setUsernameErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [select, setSelect] = useState('');
    const [selectErr, setSelectErr] = useState(false);
    const [err, setErr] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<IRegister>({ resolver })
    const onSubmit = handleSubmit(
        async (data: IRegister) => {
          if (data.email.length < 8) {
            setEmailErr(true)
            return
          }
          if (data.username.length < 5) {
            setUsernameErr(true)
            return
          }
          if (data.password.length < 8) {
            setPassErr(true)
            return
          }
          if (select === ''){
            setSelectErr(true)
          }
          data['select'] = select;
          const res:any = await dispatch(signUp(data))
            if(res.meta.requestStatus === 'fulfilled'){
                router.push('/login')
            }
            else if (res.payload.error){
              setErr(true)
            }
        }
    )
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
                          <SelectItem value="sponsor">Sponsor</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {selectErr && <span className={styles.err}>You need to specify your role</span>}
              </div>
                <span className={styles.span}>Email</span>
                <Input
                  className={styles.input}
                  type="text"
                  {...register("email", {
                    minLength: {
                      value: 8,
                      message: "min length is 8",
                    },
                    pattern : {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                  }})} />
            {errors?.email && <p>{errors.email.message}</p>}
            {emailErr && <span className={styles.err}>Email is quired at least 8 symbols</span>}
            <span className={styles.span}>Username</span>
            <Input
                className={styles.input}
                type="text"
                {...register("username", {
                  minLength: {
                    value: 5,
                    message: "min length is 5",
                  },
                  pattern : {
                    value: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
                    message: "Entered value does not match username format",
                }})} />
            {errors?.username && <p>{errors.username.message}</p>}
            {usernameErr && <span className={styles.err}>Username is quired at least 5 symbols</span>}
            <span className={styles.span}>Password</span>
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
            {errors?.password && <p>{errors.password.message}</p>}
            {passErr && <span className={styles.err}>Password is quired at least 5 symbols</span>}
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