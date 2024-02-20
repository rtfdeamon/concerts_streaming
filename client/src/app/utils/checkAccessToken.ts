import { RefreshTokens } from "./refreshToken";

export async function checkAccessToken(){
    let accessToken: Array<string>
    let token: string
    if (typeof window !== 'undefined'){
        // arr = localStorage.getItem('refreshToken')?.split('') as Array<string>;
        // arr.pop();
        // arr.shift();
        // token = arr.join('');
        accessToken = localStorage.getItem('accessToken')?.split('') as Array<string>;
        accessToken?.pop();
        accessToken?.shift();
        if (accessToken){
            token = accessToken.join('').split('.')[1];
            const expired: any = atob(token)
            const expiresDate: number = JSON.parse(expired).exp;
            const currDate = Math.floor(new Date().getTime()/1000);
            if (expiresDate - currDate > 0){
                return
            } else {
                let refreshToken: string | Array<string> = localStorage.getItem('refreshToken')?.split('') as Array<string>
                refreshToken?.pop();
                refreshToken?.shift();
                refreshToken = refreshToken.join('');
                RefreshTokens(accessToken.join(''), refreshToken)
            }
        }
    }
}