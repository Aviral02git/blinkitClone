import React, { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext({
    cartItems: [],
    isCartOpen: false,
    addToCart: () => console.log('addToCart called outside provider'),
    decreaseQuantity: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    toggleCart: () => { },
    totalPrice: 0,
    totalItems: 0
})

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        console.warn('useCart used outside of CartProvider')
    }
    return context
}

export function CartProvider({ children }) {
    console.log('CartProvider rendering')
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('blinkit_cart')
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart from local storage", e)
            }
        }
    }, [])

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('blinkit_cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const decreaseQuantity = (productId) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === productId)
            if (existing && existing.quantity > 1) {
                return prev.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
            }
            return prev.filter(item => item.id !== productId)
        })
    }

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const toggleCart = () => {
        setIsCartOpen(prev => !prev)
    }

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

    const value = {
        cartItems,
        isCartOpen,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        toggleCart,
        totalPrice,
        totalItems
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
