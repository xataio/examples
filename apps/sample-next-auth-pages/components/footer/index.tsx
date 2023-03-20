import Image from 'next/image'
import xataWhite from '~/public/xatafly-white.svg'
import styles from './footer.module.css'

export const Footer = () => (
  <footer className={styles.wrap}>
    <a href="https://xata.io">
      by <Image src={xataWhite} alt="Xata white logo" />
    </a>
  </footer>
)
