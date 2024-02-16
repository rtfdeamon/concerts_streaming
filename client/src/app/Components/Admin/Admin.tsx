import Content from './content/Content'
import Navbar from './navbar/Navbar'
import styles from './Admin.module.scss'

export default function Admin() {
  return (
    <section className={styles.section}>
        <Navbar />
        <Content />
    </section>
  )
}
