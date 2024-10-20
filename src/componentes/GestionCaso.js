import React, { useState } from 'react';
import Franja from './Franja'; 

export const GestionCaso = () => {
  
  return (
    <div>
      <Franja onLogout={() => console.log('Logout clicked')} />

      <div className="footer-margin"></div>
    </div>
  );
};
