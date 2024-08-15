// pages/api/vnpay/create-order.ts
import { NextApiRequest, NextApiResponse } from 'next';

const VNPAY_URL = 'https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder';
// Thay bằng khóa bí mật của bạn nếu cần
const VNPAY_SECRET_KEY = 'YOUR_SECRET_KEY'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Log dữ liệu yêu cầu để kiểm tra cấu trúc
      console.log("Request body:", req.body);

      const response = await fetch(VNPAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      // Kiểm tra phản hồi từ API VNPAY
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API response error:", errorText);
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API response data:", data);
      res.status(200).json({ paymentUrl: data.paymentUrl });
    } catch (error) {
      console.error("Error during fetch:", error);
      res.status(500).json({ error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
