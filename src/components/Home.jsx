import React from 'react';
import imageSrc from './Frontpage.jpg' 


export default function Home() {

    return (
        <div>
      <h2>Welcome to workout</h2>
        <img src={imageSrc} alt="Pic for frontpage" width={'50%'} />
      </div>
    );
  }