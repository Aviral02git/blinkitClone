import React from 'react'
import { useCart } from '../context/CartContext'

export default function AddToCartBtn({ product }) {
    const { cartItems, addToCart, decreaseQuantity } = useCart()

    const cartItem = cartItems.find(item => item.id === product.id)
    const quantity = cartItem ? cartItem.quantity : 0

    if (quantity === 0) {
        return (
            <button
                className="add-btn"
                onClick={() => addToCart(product)}
                style={{
                    border: '1px solid #318616',
                    color: '#318616',
                    backgroundColor: '#f7fff9',
                    borderRadius: '8px',
                    padding: '6px 16px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer'
                }}
            >
                ADD
            </button>
        )
    }

    return (
        <div
            className="counter-btn"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#318616',
                color: 'white',
                borderRadius: '8px',
                padding: '6px 8px',
                fontWeight: '600',
                fontSize: '13px',
                minWidth: '70px',
                gap: '8px'
            }}
        >
            <button
                onClick={() => decreaseQuantity(product.id)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}
            >
                -
            </button>
            <span>{quantity}</span>
            <button
                onClick={() => addToCart(product)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}
            >
                +
            </button>
        </div>
    )
}
