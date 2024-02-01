'use client'
import React from "react"
import { useForm, Resolver } from "react-hook-form"
import { useAppDispatch } from "@/app/hooks/rtkHooks"
import { useLocalStorage } from "@/app/hooks/useLocalStorage"
import { signUp } from "@/app/store/register/registerSlice"
import { Input } from "@/shadComponents/ui/input"
import { Button } from "@/shadComponents/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from './Register.module.scss'

export interface IRegister {
    email: string
    username: string
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
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<IRegister>({ resolver })
    const onSubmit = handleSubmit(
        async (data: IRegister) => {
          const res = await dispatch(signUp(data))
          if (res){
            useLocalStorage('authed', true);
           }
          // console.log(res)
          //   if(res.meta.requestStatus === 'fulfilled'){
          //       router.push('/login')
          //   }
        }
    )
  return (
    <>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Register</h1>
        <form
          onSubmit={onSubmit}
            className={styles.form}>
            {/* // onSubmit={onSubmit}> */}
                <span className={styles.span}>Email</span>
                <Input
                  className={styles.input}
                  placeholder="Email"
                  type="text"
                  {...register("email", {pattern : {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                  }})} />
            {errors?.username && <p>{errors.username.message}</p>}
            <span className={styles.span}>Username</span>
            <Input
                className={styles.input}
                placeholder="Username"
                type="text"
                {...register("username", {pattern : {
                    value: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
                    message: "Entered value does not match username format",
                }})} />
            {errors?.username && <p>{errors.username.message}</p>}
            <span className={styles.span}>Password</span>
            <Input
                className={styles.input}
                placeholder="Password"
                type="password"
                {...register("password", {
                    required: "required",
                    minLength: {
                      value: 5,
                      message: "min length is 5",
                    },
                    })} />
            {errors?.password && <p>{errors.password.message}</p>}
            <Button
              className={styles.btn}
              type="submit"
              >Login</Button>
              <p className={styles.link}>Already have an account? <Link href='/login'>Login</Link></p>
        </form>
      </div>
    </>
  )
}