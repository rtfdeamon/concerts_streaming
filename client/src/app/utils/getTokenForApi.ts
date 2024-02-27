
import { checkAccessToken } from "./checkAccessToken";
export async function getTokenForApi(){
    checkAccessToken();
    let arr: Array<string>
    let token: string
    if (typeof window !== 'undefined'){
        arr = localStorage.getItem('accessToken')?.split('') as Array<string>;
        arr.pop();
        arr.shift();
        token = arr.join('');
        return token
    }
}
