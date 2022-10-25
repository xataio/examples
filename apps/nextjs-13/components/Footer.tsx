import Image from 'next/image';
import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
      <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={20} />
      </span>
    </a>{' '}
    <a href="https://xata.io" target="_blank" rel="noopener noreferrer">
      <span className={styles.logo}>
        <Image src="/xata.svg" alt="Xata Logo" width={100} height={25} style={{ paddingTop: 2 }} />
      </span>
    </a>
  </footer>
);
