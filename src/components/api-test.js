import { useState } from 'react';

const TestAPI = () => {
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    const base64Image = '/assets/product/product-2.jpg'; // Replace with the actual base64 image
    const arrayData = [{
      id: '1f4e1bd0a87cea23cdb83d18',
      ref: 'D1046',
      amount: 96.43,
      customer: {
        name: 'Anje Keizer'
      },
      createdAt: 1684757200000,
      status: 'cours',
      image: '/assets/products/product-4.png',
      latitude: '',
      longitude: '',
      predictions: [],
      message: 'Les déchets sont encombrants !',
    }]; // Replace with your random array data

    try {
      const response = await fetch('/api/receive-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64Image, arrayData }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data);
        console.log(data); // Handle the response from the API endpoint
      } else {
        console.error('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        Send
      </button>
      {response && <p>{response.message}</p>}
    </div>
  );
};

export default TestAPI;
