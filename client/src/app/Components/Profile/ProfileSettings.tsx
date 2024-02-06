'use client'
import Image from "next/image";
import DefaultImage from '../../.././../public/default.jpeg'
import { Input } from "@/shadComponents/ui/input";
import { Button } from "@/shadComponents/ui/button";
import { Label } from "@/shadComponents/ui/label";
import styles from './ProfileSettings.module.scss';

export default function ProfileSettings() {
  return (
    <div className={styles.menuWrapper}>
        <h5 className={styles.title}>Profile</h5>
        <div className={styles.imageWrapper}>
          <span className={styles.span}>Avatar</span>
          <Image className={styles.avatar} src={DefaultImage} width={80} height={80} alt="Image" /> 
        </div>
        <div className={styles.fileInput}>
          <Label className={styles.span} htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" accept="image/png, image/gif, image/jpeg" />
        </div>
        <div className={styles.profileName}>
          {/* <span>Profile's name</span> <Input type="text" placeholder={User.Name} /> */}
          <span className={styles.span}>Profile's name</span> <Input type="text" placeholder="Test" />
        </div>
        <Button className={styles.btn}>Save changes</Button>
    </div>
  )
}
