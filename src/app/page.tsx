'use client'

import Link from 'next/link';
import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Homepage</h1>
      <p className={styles.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate ullam qui, provident sequi odit aliquam repudiandae inventore nemo excepturi officiis distinctio, molestias hic veritatis facilis? Exercitationem quia hic praesentium sed!</p>
      <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eius aperiam assumenda ducimus necessitatibus exercitationem consequuntur iure dolore doloremque, doloribus molestiae dolores reiciendis optio corrupti voluptas veritatis, suscipit perferendis. Dolores.</p>
      <Link href='/dashboard'>
        <div className={styles.btn}>See List Nine Dev</div>
      </Link>
    </div>
  )
}