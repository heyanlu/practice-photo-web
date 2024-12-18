import React, { useEffect, useState } from 'react';
import config from './config';

function App() {
  const [imageUrl, setImageUrl] = useState('');

  const fetchImage = () => {
    const endpoint = config.VITE_API_URL + '/image';

    fetch(endpoint) 
      .then((response) => response.json()) // Parse JSON response
      .then(data => {
        console.log(data)
        setImageUrl(data.imageUrl);
      })
      .catch((err) => console.error('Error fetching image:', err));
  }

  useEffect(() => {
    fetchImage(imageUrl);
  }, []);

  return (
    <div className="App">
      <h1>Image from AWS S3</h1>
      {imageUrl ? (
        <img src={imageUrl} alt="S3" style={{ width: '500px' }} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default App;
