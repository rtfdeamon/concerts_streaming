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

export default function ProfileSettings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userInfo.user);
  const [storageUserRole, setStorageUserRole] = useLocalStorage('role', typeof user?.role !== 'undefined' ? user?.role : '');
  const [name, setUserName] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(storageUserRole === 'artist' ? 'artist' : undefined);
  const { toast } = useToast();
  const [selectedSocial, setSelectedSocial] = useState<string | undefined>()
  const [selectedRole, setSelectedRole] = useState<string | undefined>()
  const [subCategory, setSubCategory] = useState<string | undefined>()
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>()
  const [ein, setEin] = useState<string | undefined>()
  const [websiteUrl, setWebsiteUrl] = useState<string | undefined>()
  const [businessName, setBusinessName] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }
  const categoryChangeHandler = (e: string) => {
    setCategory(e);
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
        dispatch(changeCurrUserPhoto(link.url.split('?')[0]))
        toast({
          title: "Profile's changes",
          description: "Photo successfully changed",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
      }
    }
  }
  // const saveUserChanges = async () => {
  //   if (name !== '' && typeof name !== 'undefined'){
  //     const res:any = await dispatch(changeCurrUserName(name)); 
  //     if (res?.payload?.id){
  //       toast({
  //         title: "Profile's changes",
  //         description: "You have successfully changed your profile info",
  //         action: (
  //           <ToastAction altText="Hide">Hide</ToastAction>
  //         ),
  //       })
  //     } else {
  //       toast({
  //         title: "Profile's changes",
  //         description: "Something went wrong",
  //         variant: "destructive",
  //         action: (
  //           <ToastAction altText="Hide">Hide</ToastAction>
  //         ),
  //       })
  //     }
  //   }
  // }
  const changeProfile = async () => {
    const res:any = await dispatch(changeProfileInfo(
      {name, description: desc, artist_genre: category, category,
      subcategory: subCategory, websiteUrl, businessName, ein, phoneNumber, email}
    )); 
    if (res.payload.id){
      toast({
        title: "Profile's changes",
        description: "You have successfully changed your profile info",
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
    } else {
      toast({
        title: "Profile's changes",
        description: "Something went wrong",
        variant: "destructive",
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
    }
}

  const saveChangesHandler = async () => {
      changeProfile()
  }
  useEffect(() => {
    dispatch(getCurrUser())
  }, [])
  useEffect(() => {
    typeof user?.role !== 'undefined' && setStorageUserRole(user?.role);
  }, [user?.role])

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

  return (
    <div className={styles.menuWrapper}>
      {user?.role.includes('service') && 
                                      //@ts-ignore
      !user?.plan?.is_paid && (
                <ServicePaypalModal isOpen={true} />
      )}
        {selectedSocial && <SocialMediaModal
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
        />}
        {/* <h5 className={styles.title}>Profile</h5> */}
        <div className={styles.imageWrapper}>
         {user?.avatar_url && <Image className={styles.avatar} src={user?.avatar_url as string} width={500} height={400} alt="Image" /> }
        </div>
          <ul className={styles.socialItems}>
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
          </ul>
      <div className={styles.fileInput}>
        <Label className={styles.span} htmlFor="picture">Picture</Label>
        <Input onChange={(e) => onUploadHandler(e)} id="picture" type="file" accept="image/png, image/gif, image/jpeg" />
      </div>
      {user?.role !== 'service' && user?.role !== 'administrator'
      && user?.role !== 'directory' && user?.role !== 'viewer' 
      && user?.role !== 'sponsor' && user?.role !== 'advertiser' && (
        <div className={styles.profileName}>
        <Label className={styles.span} htmlFor="Category">Category</Label>
          <Select onValueChange={categoryChangeHandler} value={category || 
                                            //@ts-ignore
            user?.category}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                  <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="actors">Actors</SelectItem> 
                  <SelectItem value="authirs">Authors</SelectItem>
                  <SelectItem value="bloggers">Bloggers</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="cosmetology">Cosmetology</SelectItem>
                  <SelectItem value="culinary">Culinary</SelectItem>
                  <SelectItem value="cheer">Cheer</SelectItem>
                  <SelectItem value="dancer">Dancer</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="modeling">Modeling</SelectItem>
                  <SelectItem value="artist">Music Artist</SelectItem>
                  <SelectItem value="painter">Painter</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="podcaster">Podcaster</SelectItem>
                  <SelectItem value="producer">Producer</SelectItem>
                  <SelectItem value="sound Engineer">Sound Engineer</SelectItem>
                  <SelectItem value="videography">Videography</SelectItem>
                  <SelectItem value="writer">Writer</SelectItem>
                  </SelectGroup>
              </SelectContent>
          </Select>
        </div>
      )}
              {
          category === 'cosmetology' && (
            <div className={styles.profileName}>
            <Label className={styles.span} htmlFor="Category">Subcategory</Label>
            <Select onValueChange={setSubCategory} value={subCategory || 
                                              //@ts-ignore
              user?.subcategory}>
              <SelectTrigger>
                <SelectValue placeholder="Cosmetology subcategory" />
              </SelectTrigger>
              <SelectGroup>
                  <SelectLabel>Cosmetology subcategory</SelectLabel>
                      <SelectItem value="Hair">Hair</SelectItem>
                      <SelectItem value="Hair">Nails</SelectItem>
                      <SelectItem value="Hair">Skin</SelectItem>
                  </SelectGroup>
            </Select>
          </div>
          )
        }
        {
          category === 'artist' && (
            <div className={styles.profileName}>
            <Label className={styles.span} htmlFor="Category">Subcategory</Label>
            <Select onValueChange={setSubCategory} value={subCategory || 
                                              //@ts-ignore
              user?.subcategory}>
              <SelectTrigger>
                <SelectValue placeholder="Music Genre" />
              </SelectTrigger>
              <SelectGroup>
                  <SelectLabel>Genre</SelectLabel>
                      <SelectItem value="alternative">Alternative</SelectItem>
                      <SelectItem value="blues">Blues</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="funk">Funk</SelectItem>
                      <SelectItem value="hiphop">Hip hop</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="latin">Latin</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="punk">Punk</SelectItem>
                      <SelectItem value="hiphop">Hip-hop & R&B</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                  </SelectGroup>
            </Select>
          </div>
          )
        }
        <div className={styles.profileName}>
          {/* <span>Profile's name</span> <Input type="text" placeholder={User.Name} /> */}
          <span className={styles.span}>Profile's name</span>
          <Input onChange={(e) => onChangeHandler(e)} type="text" placeholder={user?.name || "Name"} />
        </div>
        <div className={styles.profileName}>
          <span className={styles.span}>Email</span>
          <Input onChange={(e) => setEmail(e.target.value)} type="text" placeholder={
                                            //@ts-ignore
            user?.email || "Email"} />
        </div>
        <div className={styles.profileName}>
          <span className={styles.span}>Phone number</span>
          <Input onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder={
                                            //@ts-ignore
            user?.phone || "Phone"} />
        </div>
        <div className={styles.profileName}>
          <span className={styles.span}>Business name</span>
          <Input onChange={(e) => setBusinessName(e.target.value)} type="text" placeholder={
                                            //@ts-ignore
            user?.business_name || "Bussiness name"} />
        </div>
        <div className={styles.profileName}>
          <span className={styles.span}>Website url</span>
          <Input onChange={(e) => setWebsiteUrl(e.target.value)} type="text" placeholder={
                                            //@ts-ignore
            user?.website || "Website"} />
        </div>
        {!user?.role.includes('service') && !user?.role.includes('artist') &&
        <div className={styles.profileName}>
          <span className={styles.span}>EIN number</span>
          <Input
            onChange={(e) => setEin(e.target.value)}
            type="text"
            disabled={
                                              //@ts-ignore
              user?.ein}
            placeholder={"EIN"}
          />
        </div>
        }
        {user?.role !== 'administrator' && user?.role !== 'service' && user?.role !== 'advertiser' && user?.role !== 'sponsor' &&
          <>
            <div className={styles.profileName}>
              <span className={styles.span}>Profile's description</span>
              <Textarea placeholder={
                                                //@ts-ignore
                user?.description || "Type description of your profile"} onChange={(e) => descHandler(e)} />
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
        <Button onClick={saveChangesHandler} className={styles.btn}>Save changes</Button>
    </div>
  )
}