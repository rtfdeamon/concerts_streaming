'use client'
import React from "react"
import { useForm, Resolver } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/app/hooks/rtkHooks"
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
  const dispatch = useAppDispatch()
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<ILogin>({ resolver })
    const onSubmit = handleSubmit(
        async (data: ILogin) => {
          const res = await dispatch(login(data))
          if (res){
              useLocalStorage('authed', true);
          }
          // console.log(res)
          //   if(res.meta.requestStatus === 'fulfilled'){
          //       router.push('/')
          //   }
        }
    )
  return (
    <>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Log in</h1>
          <form className={styles.form}
            onSubmit={onSubmit}
          >
              {/* // onSubmit={onSubmit}> */}
              <span className={styles.span}>Username</span>
              <Input
                  className={styles.input}
                  placeholder="Username"
                  type="text"
                  {...register("username", {pattern : {
                      value: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
                      message: "Entered value does not match email format",
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
          </form>
          <p className={styles.link}>Did not register yet? <Link href='/register'> Sign up</Link></p>
        </div>
    </>
  )
}