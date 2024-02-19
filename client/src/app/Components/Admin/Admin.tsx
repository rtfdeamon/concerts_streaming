import CheckIsAuth from '@/app/utils/checkIsAuth'
import Content from './content/Content'
import Navbar from './navbar/Navbar'
import styles from './Admin.module.scss'

export default function Admin() {
  return (
    <>
      <CheckIsAuth />
      <section className={styles.section}>
          <Navbar />
          <Content />
      </section>
    </>
  )
}
