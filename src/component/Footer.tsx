"use client"
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isDashboard = pathname.includes('dashboard');

  if (isDashboard) {
    return null;
  }

  return (
    <footer style={{ backgroundColor: "orange", marginTop: "100px", color: 'white' }}>
      Copyright 2023 Nine Dev
    </footer>
  );
};

export default Footer;
