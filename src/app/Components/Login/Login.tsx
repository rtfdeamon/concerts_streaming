'use client'
import React from "react"
import { useState, useEffect } from "react"
import { useForm, Resolver } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { useLocalStorage } from "@/app/hooks/useLocalStorage"
import { login } from "@/app/store/login/loginSlice"
import { Input } from "@/shadComponents/ui/input"
import { Button } from "@/shadComponents/ui/button"
import Link from "next/link"
import styles from './Login.module.scss'

export interface ILogin {
    username: string
    password: string
  }
  
  const resolver: Resolver<ILogin> = async (values: ILogin) => {
    return {
      values: values.username ? values : {} || values.password ? values : {} ,
      errors: !values.username || !values.password
        ? {
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


export default function Login() {
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch()
    const router = useRouter();
    const token = useAppSelector(state => state.login.token)
    const authed = localStorage.getItem('authed')
    if (authed){
      router.push('/')
    }
    if (token !== '' && Object.values(token)[0] != 'Cannot to sign in'){
      useLocalStorage('authed', true);
      useLocalStorage('token', Object.values(token)[0]);
      if (localStorage.getItem('token') === Object.values(token)[0] && localStorage.getItem('authed') === 'true'){
        router.push('/')
      }
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<ILogin>({ resolver })
    const onSubmit = handleSubmit(
        async (data: ILogin) => {
          setError(false);
          const res = await dispatch(login(data))
        }
    )
    useEffect(() => {
      if (Object.values(token)[0] != 'Cannot to sign in'){
        setError(true);
      }
    }, [token])
  return (
    <>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Log in</h1>
        {error && <span className={styles.span}>Please, input correct username/password</span>}
          <form className={styles.form}
            onSubmit={onSubmit}
          >
              {/* // onSubmit={onSubmit}> */}
              <span className={styles.span}>Username</span>
              <Input
                  className={styles.input}
                  type="text"
                  {...register("username", {pattern : {
                      value: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
                      message: "Entered value does not match email format",
                  }})} />
              {errors?.username && <p className={styles.error}>{errors.username.message}</p>}
              <span className={styles.span}>Password</span>
              <Input
                  className={styles.input}
                  type="password"
                  {...register("password", {
                      required: "required",
                      minLength: {
                        value: 5,
                        message: "min length is 5",
                      },
                      })} />
              {errors?.password && <p className={styles.error}>{errors.password.message}</p>}
              <Button
                  className={styles.btn}
                  type="submit"
              >Login</Button>
          </form>
          <p className={styles.link}>Did not register yet? <Link href='/register'> Sign up</Link></p>
        </div>
    </>
  )
}