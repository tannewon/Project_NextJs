'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../styles/dashboard.module.css';
import Link from 'next/link';

const fetchData = async () => {
  const res = await fetch('https://6520d2b6906e276284c4b174.mockapi.io/product');
  if (!res.ok) {
    throw new Error('Fail to fetch data');
  }
  return res.json();
};
const DataComponent = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
console.log(data)
  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data.map((item) => (
        <Link href={`/dashboard/${item.id}`} key={item.id}>
          <div className={styles.single}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '300px', height: '200px' }}
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default function DashboardPage() {
  return (
    <div>
      <h1>All List Nine Dev</h1>
      <Link href="/dashboard/add">
        <button style={{ backgroundColor: 'green' }}>ADD Product</button>
      </Link>
      <DataComponent />
    </div>
  );
}
