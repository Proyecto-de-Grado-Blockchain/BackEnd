import React from 'react'
import Franja from './Franja'; 

export const Ayuda = () => {
  return (
    <div>
    <Franja onLogout={() => console.log('Logout clicked')} />
    <h4>Ayuda</h4>
    
    </div>
  )
}
