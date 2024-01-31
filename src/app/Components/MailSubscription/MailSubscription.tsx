'use client'
import { useState } from 'react'
import { Input } from '@/shadComponents/ui/input'
import { Button } from '@/shadComponents/ui/button'
import { ChangeEvent } from 'react'
import styles from './MailSubscription.module.scss'

const reg = new RegExp("^([A-Za-z0-9_\\-\\.])+@");
export default function MailSubscription() {
    const [email, setEmail] = useState('');
    const [err, setErr] = useState(false);
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if (err) setErr(false);
        setEmail(e.target.value)
    }
    const emailHandler = () => {
        if (email === '') return
        else {
            const testRes = reg.test(email)
            testRes ? console.log('post req logic')
            :   setErr(true)
        }
    }
  return (
    <div className={styles.form}>
        <h5>Subcribe to get newest information</h5>
        <div className={styles.formWrapper}>
            <Input
                onChange={(e) => onChangeHandler(e)}
                className={styles.input}
                type="email"
                placeholder="Type your email adress" />
            <Button className={styles.btn} onClick={emailHandler}>Subscribe</Button>
        </div>
        {err && <span className={styles.error}>Please, input your email in valid format</span>}
    </div>
  )
}
