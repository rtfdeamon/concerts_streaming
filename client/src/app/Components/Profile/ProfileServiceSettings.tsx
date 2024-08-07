'use client'
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { getCurrUser, changeProfileInfo, changeCurrUserPhoto } from "@/app/store/user/userSlice";
import { useToast } from "@/shadComponents/ui/use-toast";
import { ToastAction } from "@/shadComponents/ui/toast";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/shadComponents/ui/select";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { generateUploadLink } from "@/app/utils/generateUploadLink";
import { ChangeEvent, ChangeEventHandler } from "react";
import Image from "next/image";
import { Label } from "@/shadComponents/ui/label";
import { Button } from "@/shadComponents/ui/button";
import { Input } from "@/shadComponents/ui/input";
import { Textarea } from "@/shadComponents/ui/textarea";


import styles from './ProfileSettings.module.scss';

import InstIcon from '../../../../public/instagram-icon.svg'
import LinkedInIcon from '../../../../public/linkedin-icon.svg'
import SnapChatIcon from '../../../../public/snapchat-icon.svg'
import SpotifyIcon from '../../../../public/spotify-icon.svg'
import TikTokIcon from '../../../../public/tiktok-icon.svg'
import TwitterIcon from '../../../../public/twitter-icon.svg'
import YoutubeIcon from '../../../../public/youtube-icon.svg'
import SocialMediaModal from "./SocialMediaModal";
import ServicePaypalModal from "./ServicePaypalModal";
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import SocialMediaServiceModal from "./SocialMediaServiceModal";

async function saveService({
  //@ts-ignore
  title, description, image_url, email, business_name, website, phone }){
  try{
    const res = await fetch(`${process.env.BACKEND_URL}/services/current/`, {
      method: 'PATCH',
      headers:{
          'Content-type' : 'application/json',
          'Authorization' : `Bearer ${await getTokenForApi()}`
      },

      body: JSON.stringify({
        title, description, email, image_url,
        business_name, website, phone
      })
    })
    const data = await res.json()
    return data;
  } catch(err){
    throw err
  }
}

export default function ProfileServiceSettings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userInfo.user);
  const [storageUserRole, setStorageUserRole] = useLocalStorage('role', typeof user?.role !== 'undefined' ? user?.role : '');
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>()
  const [ein, setEin] = useState<string | undefined>()
  const [websiteUrl, setWebsiteUrl] = useState<string | undefined>()
  const [businessName, setBusinessName] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [link, setLink] = useState<string | undefined>()
  const [service, setService] = useState<any>()
  const [selectedSocial, setSelectedSocial] = useState<string | undefined>()
  //@ts-ignore
  const [instagram, setInstagram] = useState<string | undefined>(user?.links['instagram'])
                                  //@ts-ignore
  const [snapChat, setSnapChat] = useState<string | undefined>(user?.links['snapChat'])
                                  //@ts-ignore
  const [spotify, setSpotify] = useState<string | undefined>(user?.links['spotify'])
                                  //@ts-ignore
  const [tiktok, setTiktok] = useState<string | undefined>(user?.links['tiktok'])
                                  //@ts-ignore
  const [twitter, setTwitter] = useState<string | undefined>(user?.links['twitter'])
                                  //@ts-ignore
  const [youtube, setYoutube] = useState<string | undefined>(user?.links['youtube'])
                                  //@ts-ignore
  const [linkedIn, setLinkedIn] = useState<string | undefined>(user?.links['linkedIn'])

  useEffect(() => {
    async function getService() {
      const res = await fetch(`https://concertplatform.mmvs.video/operations/services/current/`, {
        method: 'GET',
        headers: {
                  'Authorization' : `Bearer ${await getTokenForApi()}`
                }
      })
      const data = await res.json();
      setService(data);
    }
    getService()
  }, [])

  const createService = async () => {
    try{
      const res = await fetch(`${process.env.BACKEND_URL}/services/`, {
        method: 'POST',
        headers: {
                  'Content-type' : 'application/json',
                  'Authorization' : `Bearer ${await getTokenForApi()}`
                },
        body: JSON.stringify({
          title, description: desc, email, ein, image_url: link,
          business_name: businessName, website: websiteUrl, phone: phoneNumber
        })
      })
      const data = await res.json()
      //@ts-ignore
      if (Object.values(data)[0][0] === "This field is required."){
        console.log('fdsfs')
        toast({
          title: "Please, fill all required fields",
          variant: 'destructive',
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
        throw new Error()
      }
      else {
        toast({
          title: "Profile's changes",
          description: "You have successfully changed your profile info",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
        location.reload()
      }
      return data
    } catch(err){
      toast({
        title: "Please, fill all required fields",
        variant: 'destructive',
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const descHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  }
  const onUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files){
      const file = e.target.files[0]
      const formData = new FormData();
      formData.append('file', file);
      const uploadType = 'avatar'
      const link:any = await generateUploadLink(uploadType);
      const res = await fetch(`${link.url}`, {
        method: 'PUT',
        headers: {
          'Content-type' : 'image/png'
        },
        body: file
      })
      if (res.ok){
        setLink(link.url.split('?')[0])
      }
      // const res = await fetch(`${link.url}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-type' : 'image/png'
      //   },
      //   body: file
      // })
    }
  }

  const saveChangesHandler = async () => {
    {service?.hasOwnProperty('description') ||  service?.hasOwnProperty('title') || service?.hasOwnProperty('image_url') ? 
      saveService({
          //@ts-ignore
          title, description: desc, email, image_url: link,
          business_name: businessName, website: websiteUrl, phone: phoneNumber
      })
      .then(() => {
        toast({
          title: "Profile's changes",
          description: "You have successfully changed your profile info",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
      })
      .catch(() => {
        toast({
          title: "Something went wrong",
          variant: 'destructive',
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
      })
      :
      createService()
    }
  }
  useEffect(() => {
    dispatch(getCurrUser())
  }, [])
  useEffect(() => {
    typeof user?.role !== 'undefined' && setStorageUserRole(user?.role);
  }, [user?.role])

  return (
    <div className={styles.menuWrapper}>
      {user?.role.includes('service') && 
                                      //@ts-ignore
      !user?.plan?.is_paid && (
                <ServicePaypalModal isOpen={true} />
      )}
        <h5 className={styles.title}>Profile</h5>
        {
                                            //@ts-ignore
            user?.plan?.is_paid && (
                <>
                    <p className='text-xl text-center mt-6 mb-6'>Current plan: 
                    {                                   //@ts-ignore
                        user?.plan?.plan === '00000001-8000-11ee-8000-102030405060' && ' Basic'
                            ||                                 //@ts-ignore
                        user?.plan?.plan === '00000002-8000-11ee-8000-102030405060' && ' Advanced'
                            ||                                 //@ts-ignore
                        user?.plan?.plan === '00000003-8000-11ee-8000-102030405060' && ' Professional'
                        ||                                 //@ts-ignore
                        user?.plan?.plan === '00000010-8000-11ee-8000-102030405060' && ' Service'
                    }</p>
                    <span className='text-xl text-center mb-6'>Active untill: {
                                                    //@ts-ignore
                    new Date(user?.plan?.end_date).toLocaleDateString()}</span>
                </>
            )}
        <div className={styles.imageWrapper}>
         {service?.image_url && <Image className={styles.avatar} src={link || service?.image_url as string} width={500} height={400} alt="Image" /> }
        </div>
        {/* <ul className={styles.socialItems}>
            <li
              className={styles.socialItem}
              onClick={() => setSelectedSocial('instagram')}
            >
              <Image src={InstIcon} alt="inst" />
            </li>
            <li
              className={styles.socialItem}
              onClick={() => setSelectedSocial('snapchat')}
            >
              <Image src={SnapChatIcon} alt="snapchat" />
            </li>
            <li
              className={styles.socialItem}
              onClick={() => setSelectedSocial('spotify')}
            >
              <Image src={SpotifyIcon} alt="spotify" />
            </li>
            <li
              className={styles.socialItem}
              onClick={() => setSelectedSocial('tiktok')}
            >
              <Image src={TikTokIcon} alt="inst" />
            </li>
            <li
              className={styles.socialItem}
              onClick={() => setSelectedSocial('twitter')}
            >
              <Image src={TwitterIcon} alt="twitter" />
            </li>
            <li
              className={styles.socialItem}
              onClick={() => setSelectedSocial('youtube')}
            >
              <Image src={YoutubeIcon} alt="youtube" />
            </li>
            <li
              className={styles.socialItem}
              onClick={() => setSelectedSocial('linkedin')}
            >
              <Image src={LinkedInIcon} alt="linkedin" />
            </li>
          </ul> */}
      <div className={styles.fileInput}>
        <Label className={styles.span} htmlFor="picture">Picture</Label>
        <Input onChange={(e) => onUploadHandler(e)} id="picture" type="file" accept="image/png, image/gif, image/jpeg" />
      </div>
        {selectedSocial && <SocialMediaServiceModal
          isOpen={Boolean(selectedSocial)}
          setIsOpen={setSelectedSocial}
          media={selectedSocial}
          instagram={instagram}
          snapChat={snapChat}
          spotify={spotify}
          tiktok={tiktok}
          twitter={twitter}
          youtube={youtube}
          linkedIn={linkedIn}
          setInstagram={setInstagram}
          setSnapChat={setSnapChat}
          setSpotify={setSpotify}
          setTiktok={setTiktok}
          setTwitter={setTwitter}
          setYoutube={setYoutube}
          setLinkedIn={setLinkedIn}
          />
        }
        <div className={styles.profileName}>
          {/* <span>Profile's name</span> <Input type="text" placeholder={User.Name} /> */}
          <span className={styles.span}>Service title</span>
          <Input onChange={(e) => onChangeHandler(e)} type="text" placeholder={service?.title || "Title"} />
        </div>
        {/* <div className={styles.profileName}>
          <span className={styles.span}>EIN number</span>
          <Input
            onChange={(e) => setEin(e.target.value)}
            type="text"
            disabled={
                                              //@ts-ignore
              service?.ein}
            placeholder={service?.ein || "EIN"}
          />
        </div> */}
        {/* <div className={styles.profileName}>
          <span className={styles.span}>Email</span>
          <Input onChange={(e) => setEmail(e.target.value)} type="text" placeholder={
                                            //@ts-ignore
            service?.email || "Email"} />
        </div> */}
        {/* <div className={styles.profileName}>
          <span className={styles.span}>Phone number</span>
          <Input onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder={
              //@ts-ignore
             service?.phone || "Phone"} />
        </div> */}
        {/* <div className={styles.profileName}>
          <span className={styles.span}>Business name</span>
          <Input onChange={(e) => setBusinessName(e.target.value)} type="text" placeholder={
                                            //@ts-ignore
            service?.business_name || "Bussiness name"} />
        </div> */}
        {/* <div className={styles.profileName}>
          <span className={styles.span}>Website url</span>
          <Input onChange={(e) => setWebsiteUrl(e.target.value)} type="text" placeholder={
                                            //@ts-ignore
            service?.website || "Website"} />
        </div> */}
        {
          <>
            <div className={styles.profileName}>
              <span className={styles.span}>Profile's description</span>
              <Textarea placeholder={
                                                //@ts-ignore
                service?.description || "Type description of your profile"} onChange={(e) => descHandler(e)} />
            </div>
            {/* <div className={styles.profileName}>
              <span className={styles.span}>Change your genre</span>
                <Select
                      onValueChange={categoryChangeHandler}
                      value={category}
                        >
                            <SelectTrigger className="w-full"
                                >
                                <SelectValue placeholder="Select concert genre" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Genre</SelectLabel>
                                    <SelectItem value="electronic">Electronic</SelectItem>
                                    <SelectItem value="country">Country</SelectItem>
                                    <SelectItem value="hiphop">Hip hop</SelectItem>
                                    <SelectItem value="funk">Funk</SelectItem>
                                    <SelectItem value="jazz">Jazz</SelectItem>
                                    <SelectItem value="latin">Latin</SelectItem>
                                    <SelectItem value="pop">Pop</SelectItem>
                                    <SelectItem value="punk">Punk</SelectItem>
                                    <SelectItem value="alternative">Alternative</SelectItem>
                                    <SelectItem value="classical">Classical</SelectItem>
                                    <SelectItem value="r&b">R&B</SelectItem>
                                    <SelectItem value="rock">Rock</SelectItem>
                                    <SelectItem value="blues">Blues</SelectItem>
                                    <SelectItem value="metal">Metal</SelectItem>
                                    <SelectItem value="indie">Indie</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
            </div> */}
          </>
        }
        <Button onClick={saveChangesHandler} className={styles.btn}>
          {service?.hasOwnProperty('description') ||  service?.hasOwnProperty('title') || service?.hasOwnProperty('image_url') ?
          "Save changes" : "Create"}
        </Button>
    </div>
  )
}