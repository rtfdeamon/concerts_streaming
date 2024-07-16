import Link from 'next/link'
import styles from './Refund.module.scss'

export default function Refund() {
  return (
    <section className={styles.wrapper}>
        <h5 className={styles.title}>Digital Platform Entertainment</h5>
        <h5 className={styles.title}>Cancel/Refund Policy  Effective March 01, 2024</h5>
        <div className={styles.contentBlock}>
            <h6 className={styles.subtitle}>Cancel Request Policy:</h6>
            <p className={styles.text}>

            </p>
        </div>
        <div className={styles.contentBlock}>
            <h6 className={styles.subtitle}>Listener/Viewer account holders:</h6>
            <p className={styles.text}>
              Are provided a free account but may request in writing to have their account closed. Send your request to <Link href={'contact@dp-ent.com'}>contact@dp-ent.com</Link> and your access will be closed and lose program access up to 3 days from the date of their written cancellation notice.
            </p>
        </div>
        <div className={styles.contentBlock}>
            <h6 className={styles.subtitle}>Artists, Directory, Services:</h6>
            <p className={styles.text}>
            Monthly payers may cancel 72 hours prior to next *billing cycle with a written notice sent to contact@dp-ent.com  Any notice received less than 72 hours of next billing cycle will be billed for the next month. No refunds for cancellations as all sales are final. Monthly member payers will lose program access up to 3 days from the date of their written cancellation notice.
            </p>
            <p className={styles.text}>
            *Billing Cycle is the day of the month you enrolled.
            </p>
        </div>
        <div className={styles.contentBlock}>
            <h6 className={styles.subtitle}>Advertisers:</h6>
            <p className={styles.text}>
            3-, 6-, or 9-month payers may cancel any time with a 30 day prior to the next *ads renewal date  written notice sent to         <Link href={'contact@dp-ent.com'}>contact@dp-ent.com</Link>
            Any notice received less than 30 days prior to the next ads renewal date will be billed for the next ad run period previously chosen.  No refunds for cancellations as all sales are final. Advertiser member payers will lose program access up to 3 days from the date of their written cancellation notice.            </p>
            <p className={styles.text}>
            *Ads Renewal Date is the day of the month you enrolled.            </p>
        </div>
        <div className={styles.contentBlock}>
            <h6 className={styles.subtitle}>**Payment failures will result in 2 auto reattempts. After 3 payment failures program access is suspended. </h6>
            <p className={styles.text}>
            3-, 6-, or 9-month payers may cancel any time with a 30 day prior to the next *ads renewal date  written notice sent to         <Link href={'contact@dp-ent.com'}>contact@dp-ent.com</Link>
            Any notice received less than 30 days prior to the next ads renewal date will be billed for the next ad run period previously chosen.  No refunds for cancellations as all sales are final. Advertiser member payers will lose program access up to 3 days from the date of their written cancellation notice.            </p>
            <p className={styles.text}>
            To reactivate your account or any questions regarding your account please contact <Link href={'contact@dp-ent.com'}>contact@dp-ent.com</Link>
            </p>
        </div>
        <div className={styles.contentBlock}>
            <h6 className={styles.title}>Refund Policy:  </h6>
            <p className={styles.text}>
            Any refunds processed for “Cancellation” in accordance with the cancel/refund policy may take up to 7-10 business days to show on your statement depending on the financial institution/card that was used to create and pay for the member account. 
            Questions regarding a cancellation or refund, please contact <Link href={'contact@dp-ent.com'}>contact@dp-ent.com</Link> and instructions will be provided. 
            </p>
            <p className={styles.text}>
            Any policies for Digital Platform Entertainment are subject to change with or without notice at any time. 
            For questions regarding your account, refunds and or cancellations please reach out to contact@dp-ent.com 
            </p>
        </div>
    </section>
  )
}
