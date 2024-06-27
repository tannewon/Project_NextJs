'use client'

import Link from 'next/link';
import styles from '../styles/home.module.css';
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div style={{ position: 'relative' }}>
      <div className="logo" style={{borderRadius:'20px'}}>
      <Image style={{width:'1400px',height:'600px'}}  src="/anh.jpg" alt="logo nine dev" width={100} height={100} />
      </div >
        <h1
          className="title-welcome-hotel-yawn_yawn"
          style={{
            color: 'yellow',
            fontSize: '70px',
            position: 'absolute',
            top: '250px',
            left: '700px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span
            className="gol"
            style={{ textShadow: '2px 2px 4px #FFC300' }}
          >
            <b>DEV VN </b>
          </span>
        </h1>
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Homepage</h1>
        <p className={styles.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
          ullam qui, provident sequi odit aliquam repudiandae inventore nemo
          excepturi officiis distinctio, molestias hic veritatis facilis?
          Exercitationem quia hic praesentium sed!
        </p>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eius
          aperiam assumenda ducimus necessitatibus exercitationem consequuntur
          iure dolore doloremque, doloribus molestiae dolores reiciendis optio
          corrupti voluptas veritatis, suscipit perferendis. Dolores.
        </p>
        <Link href="/dashboard">
          <div className={styles.btn}>See List Nine Dev</div>
        </Link>
      </div>
    </div>
  );
}
