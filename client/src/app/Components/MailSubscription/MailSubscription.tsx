'use client'
import { useState } from 'react'
import { Input } from '@/shadComponents/ui/input'
import { Button } from '@/shadComponents/ui/button'
import { ChangeEvent } from 'react'
import { ToastAction } from '@/shadComponents/ui/toast'
import { useToast } from '@/shadComponents/ui/use-toast'
import styles from './MailSubscription.module.scss'

const reg = new RegExp("^([A-Za-z0-9_\\-\\.])+@");
export default function MailSubscription() {
    const [email, setEmail] = useState('');
    const [err, setErr] = useState(false);
    const { toast } = useToast();
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if (err) setErr(false);
        setEmail(e.target.value)
    }
    const emailHandler = async () => {
        if (email === '') {
            setErr(true)
            return
        }
        else {
            const testRes = reg.test(email)
            if (testRes){
                // логика для пост запроса
                // if (res.ok) toast(true)
                const res = await fetch(`${process.env.BACKEND_URL}/newsletter/subscribe`, {
                    method: 'POST',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify({email})
                })
                const data = await res.json();
                if (data.success){
                    toast({
                        title: "Email newsletter",
                        description: "You have successfully subscribed to our newsletter",
                        action: (
                          <ToastAction altText="Hide">Hide</ToastAction>
                        ),
                      })
                }
                else {
                    toast({
                        title: "Email newsletter",
                        description: "Something went wrong",
                        variant: 'destructive',
                        action: (
                          <ToastAction altText="Hide">Hide</ToastAction>
                        ),
                      })
                }
            } else{
                setErr(true)
            }
        }
    }
  return (
    <div className={styles.form}>
        <h5>Subscribe to stay updated with the latest information</h5>
        <div className={styles.formWrapper}>
            <Input
                onChange={(e) => onChangeHandler(e)}
                className={styles.input}
                value={email}
                type="email"
                placeholder="Type your email adress" />
            <Button className={styles.btn} onClick={emailHandler}>Subscribe</Button>
        </div>
        {err && <span className={styles.error}>Please, input your email in valid format</span>}
    </div>
  )
}
