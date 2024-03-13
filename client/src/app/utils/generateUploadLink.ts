import { getTokenForApi } from "./getTokenForApi";

export interface ILink{
    link: string
}
export async function generateUploadLink(uploadType: string){
    const res = await fetch(`${process.env.BACKEND_URL}/upload/generate-link`, {
        method: 'POST',
        headers:{
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${await getTokenForApi()}`
        },
        body: JSON.stringify({upload_type: uploadType})
    })
    const data = await res.json() as ILink;
    return data;
}