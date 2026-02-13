import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CartProvider } from './context/CartContext'
import { LocationProvider } from './context/LocationContext'
import './style.css'

console.log('main.jsx executing')

try {
  const root = createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <LocationProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LocationProvider>
    </React.StrictMode>
  )
  console.log('Mount called')
} catch (e) {
  console.error('Mount failed', e)
}
