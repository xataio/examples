import Link from 'next/link';
import { use } from 'react';
import { getXataClient } from '../services/xata';
import styles from './page.module.css';

const xata = getXataClient();

export default function Home() {
  const data = use(xata.db.drivers.getAll());

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Formula 1 Drivers</h1>

      <div className={styles.items}>
        {data.map((driver) => (
          <Link href={driver.url} className={styles.card}>
            <h2>
              {driver.forename} {driver.surname}
            </h2>
            <p>{driver.nationality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
