import React from 'react'
import { useCart } from '../context/CartContext'
import AddToCartBtn from './AddToCartBtn'

export default function CartDrawer({ onCheckout }) {
    const { isCartOpen, toggleCart, cartItems, totalPrice } = useCart()

    if (!isCartOpen) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100%',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'white',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                padding: '15px',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2>My Cart</h2>
                <button
                    onClick={toggleCart}
                    style={{ border: 'none', background: 'transparent', fontSize: '20px', cursor: 'pointer' }}
                >
                    &times;
                </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
                {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                        Your cart is empty
                    </div>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #f9f9f9', paddingBottom: '10px' }}>
                            <img src={`${item.image}`} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '4px' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '14px', marginBottom: '4px' }}>{item.name}</div>
                                <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{item.quantity}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontWeight: 'bold' }}>₹{item.price * item.quantity}</div>
                                    <div style={{ width: '70px' }}>
                                        <AddToCartBtn product={item} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div style={{ padding: '15px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <span>Delivery Charge</span>
                        <span>₹15</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>
                        <span>Grand Total</span>
                        <span>₹{totalPrice + 15}</span>
                    </div>
                    <button style={{
                        width: '100%',
                        backgroundColor: '#0c831f',
                        color: 'white',
                        border: 'none',
                        padding: '15px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }} onClick={() => { toggleCart(); if (onCheckout) onCheckout() }}>
                        Proceed to Pay
                    </button>
                </div>
            )}
        </div>
    )
}
