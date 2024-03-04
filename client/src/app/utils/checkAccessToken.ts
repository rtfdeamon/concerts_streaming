'use client'
import { RefreshTokens } from "./refreshToken";

export async function checkAccessToken(){
    let accessToken: Array<string>
    let token: string
    if (typeof window !== 'undefined'){
        accessToken = localStorage.getItem('accessToken')?.split('') as Array<string>;
        accessToken?.pop();
        accessToken?.shift();
        if (accessToken){
            token = accessToken.join('').split('.')[1];
            const expired: any = atob(token)
            const expiresDate: number = JSON.parse(expired).exp;
            const currDate = Math.floor(new Date().getTime()/1000);
            let flag = localStorage.getItem('flag')
            if (!flag){
            // if (expiresDate - currDate > 0){
            //     return
            // } else {
                let refreshToken: string | Array<string> = localStorage.getItem('refreshToken')?.split('') as Array<string>
                refreshToken?.pop();
                refreshToken?.shift();
                refreshToken = refreshToken.join('');
                await RefreshTokens(accessToken.join(''), refreshToken)
            // }
        }
            else {
                let intervalId: NodeJS.Timeout; 
                 await new Promise((res, rej) => {
                    intervalId =  setInterval(() => {
                        flag = localStorage.getItem('flag')
                        if (flag === null) {
                            res(clearInterval(intervalId))  
                        }
                    }, 100)
            })}
        }
    }
}