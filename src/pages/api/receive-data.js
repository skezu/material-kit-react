/*import { orders } from "../index";
import express from 'express';

const app = express();
app.use(express.json());

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { base64Image, arrayData } = req.body;

    // Log the received base64 image
    console.log('Received base64 image:', base64Image);

    // Log the received array
    console.log('Received array:', arrayData);

    // Handle the received data here
    // orders = [...orders] + arrayData[0];

    res.status(200).json({ message: 'Data received successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
*/