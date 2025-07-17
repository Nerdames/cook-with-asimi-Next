import Link from 'next/link'
import styles from './Pager.module.css'
import 'boxicons/css/boxicons.min.css'

const Pager: React.FC = () => {
  return (
    <div className={styles.pager}>
      <Link href="/page/1" className={`${styles['pager-item']} ${styles.active}`}>1</Link>
      <Link href="/page/2" className={styles['pager-item']}>2</Link>
      <Link href="/page/3" className={styles['pager-item']}>3</Link>
      <Link href="/page/4" className={styles['pager-item']}>4</Link>
      <Link href="/page/2" className={styles['pager-item']}>
        <span>Next</span>
        <i className="bx bx-right-arrow-alt"></i>
      </Link>
    </div>
  )
}

export default Pager
