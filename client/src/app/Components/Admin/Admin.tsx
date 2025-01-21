import CheckIsAuth from '@/app/utils/checkIsAuth'
import CheckIsAdmin from '@/app/utils/CheckIsAdmin'
import Content from './content/Content'
import Navbar from './navbar/Navbar'
import styles from './Admin.module.scss'

export default function Admin() {
  
  return (
    <>
      <CheckIsAuth />
      <CheckIsAdmin />
      <section className={styles.section}>
          <Navbar />
          <Content />
      </section>
    </>
  )
}
