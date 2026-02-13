import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useLocation } from '../context/LocationContext'
import AddToCartBtn from './AddToCartBtn'

export default function CheckoutPage({ onBack }) {
    const { cartItems, totalPrice, clearCart } = useCart()
    const { location, togglePicker } = useLocation()
    const [paymentMethod, setPaymentMethod] = useState('upi')
    const [tip, setTip] = useState(0)
    const [coupon, setCoupon] = useState('')
    const [couponApplied, setCouponApplied] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [deliveryInstructions, setDeliveryInstructions] = useState('')

    const DELIVERY_CHARGE = 15
    const HANDLING_CHARGE = 4
    const discount = couponApplied ? 20 : 0
    const grandTotal = totalPrice + DELIVERY_CHARGE + HANDLING_CHARGE + tip - discount

    const handleApplyCoupon = () => {
        if (coupon.trim().toUpperCase() === 'BLINKIT20') {
            setCouponApplied(true)
        } else {
            alert('Invalid coupon code. Try BLINKIT20')
        }
    }

    const handlePlaceOrder = () => {
        setShowSuccess(true)
    }

    const handleSuccessDone = () => {
        setShowSuccess(false)
        clearCart()
        onBack()
    }

    if (cartItems.length === 0 && !showSuccess) {
        return (
            <div className="checkoutPage">
                <div className="checkoutEmpty">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <h2>Your cart is empty</h2>
                    <p>Add items to get started</p>
                    <button className="checkoutBackBtn" onClick={onBack}>
                        <i className="fa-solid fa-arrow-left"></i> Continue Shopping
                    </button>
                </div>
            </div>
        )
    }

    if (showSuccess) {
        return (
            <div className="checkoutPage">
                <div className="orderSuccess">
                    <div className="successIcon">
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Your order will be delivered in <strong>8 minutes</strong></p>
                    <div className="successOrderId">
                        Order ID: #BLK{Date.now().toString().slice(-8)}
                    </div>
                    <div className="successDetails">
                        <div className="successDetailRow">
                            <span>Delivering to</span>
                            <strong>{location.locality}, {location.city}</strong>
                        </div>
                        <div className="successDetailRow">
                            <span>Amount Paid</span>
                            <strong>₹{grandTotal}</strong>
                        </div>
                        <div className="successDetailRow">
                            <span>Payment Method</span>
                            <strong>{paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery'}</strong>
                        </div>
                    </div>
                    <button className="successDoneBtn" onClick={handleSuccessDone}>
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="checkoutPage">
            <div className="checkoutHeader">
                <button className="checkoutBackBtn" onClick={onBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h2>Checkout</h2>
                <div className="checkoutSecure">
                    <i className="fa-solid fa-lock"></i> Secure
                </div>
            </div>

            <div className="checkoutBody">
                {/* Left Column */}
                <div className="checkoutLeft">
                    {/* Delivery Address */}
                    <div className="checkoutCard">
                        <div className="checkoutCardHeader">
                            <div className="checkoutCardIcon">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <div>
                                <h3>Delivery Address</h3>
                                <p>{location.fullAddress || `${location.locality}, ${location.city}, ${location.state} - ${location.pincode}`}</p>
                            </div>
                            <button className="checkoutChangeBtn" onClick={togglePicker}>Change</button>
                        </div>
                    </div>

                    {/* Delivery Instructions */}
                    <div className="checkoutCard">
                        <h3>Delivery Instructions</h3>
                        <div className="deliveryInstructions">
                            {['Avoid ringing bell', 'Leave at door', 'Avoid calling', 'Leave with guard'].map(opt => (
                                <button
                                    key={opt}
                                    className={`instructionChip ${deliveryInstructions === opt ? 'active' : ''}`}
                                    onClick={() => setDeliveryInstructions(deliveryInstructions === opt ? '' : opt)}
                                >
                                    <i className={`fa-solid ${opt === 'Avoid ringing bell' ? 'fa-bell-slash' : opt === 'Leave at door' ? 'fa-door-open' : opt === 'Avoid calling' ? 'fa-phone-slash' : 'fa-shield'}`}></i>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="checkoutCard">
                        <div className="checkoutCardHeader">
                            <h3>Your Items</h3>
                            <span className="itemCount">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="checkoutItemsList">
                            {cartItems.map(item => (
                                <div key={item.id} className="checkoutItem">
                                    <img src={`${item.image}`} alt={item.name} />
                                    <div className="checkoutItemInfo">
                                        <div className="checkoutItemName">{item.name}</div>
                                        <div className="checkoutItemQty">{item.quantity}</div>
                                        <div className="checkoutItemPrice">₹{item.price * item.quantity}</div>
                                    </div>
                                    <div className="checkoutItemAction">
                                        <AddToCartBtn product={item} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="checkoutRight">
                    {/* Coupon */}
                    <div className="checkoutCard">
                        <h3><i className="fa-solid fa-tag" style={{ color: '#318616', marginRight: '8px' }}></i>Apply Coupon</h3>
                        <div className="couponBox">
                            <input
                                type="text"
                                value={coupon}
                                onChange={e => setCoupon(e.target.value)}
                                placeholder="Enter coupon code"
                                disabled={couponApplied}
                            />
                            <button
                                onClick={handleApplyCoupon}
                                disabled={couponApplied || !coupon.trim()}
                                className={couponApplied ? 'applied' : ''}
                            >
                                {couponApplied ? '✓ Applied' : 'Apply'}
                            </button>
                        </div>
                        {couponApplied && <div className="couponSuccess">₹20 saved with BLINKIT20</div>}
                    </div>

                    {/* Bill Details */}
                    <div className="checkoutCard">
                        <h3>Bill Details</h3>
                        <div className="billDetails">
                            <div className="billRow">
                                <span><i className="fa-solid fa-receipt"></i> Item Total</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className="billRow">
                                <span><i className="fa-solid fa-truck"></i> Delivery Charge</span>
                                <span>₹{DELIVERY_CHARGE}</span>
                            </div>
                            <div className="billRow">
                                <span><i className="fa-solid fa-bag-shopping"></i> Handling Charge</span>
                                <span>₹{HANDLING_CHARGE}</span>
                            </div>
                            {tip > 0 && (
                                <div className="billRow">
                                    <span><i className="fa-solid fa-heart"></i> Delivery Tip</span>
                                    <span>₹{tip}</span>
                                </div>
                            )}
                            {couponApplied && (
                                <div className="billRow billDiscount">
                                    <span><i className="fa-solid fa-tag"></i> Coupon Discount</span>
                                    <span>-₹{discount}</span>
                                </div>
                            )}
                            <div className="billRow billTotal">
                                <span>Grand Total</span>
                                <span>₹{grandTotal}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Tip */}
                    <div className="checkoutCard">
                        <h3>Tip your delivery partner</h3>
                        <p className="tipText">Your kindness means a lot! 100% of tip goes to them.</p>
                        <div className="tipOptions">
                            {[0, 20, 30, 50].map(amount => (
                                <button
                                    key={amount}
                                    className={`tipBtn ${tip === amount ? 'active' : ''}`}
                                    onClick={() => setTip(amount)}
                                >
                                    {amount === 0 ? 'No Tip' : `₹${amount}`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="checkoutCard">
                        <h3>Payment Method</h3>
                        <div className="paymentMethods">
                            {[
                                { id: 'upi', label: 'UPI (GPay, PhonePe, Paytm)', icon: 'fa-mobile-screen' },
                                { id: 'card', label: 'Credit / Debit Card', icon: 'fa-credit-card' },
                                { id: 'netbanking', label: 'Net Banking', icon: 'fa-building-columns' },
                                { id: 'cod', label: 'Cash on Delivery', icon: 'fa-money-bill-wave' }
                            ].map(method => (
                                <label
                                    key={method.id}
                                    className={`paymentOption ${paymentMethod === method.id ? 'active' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={method.id}
                                        checked={paymentMethod === method.id}
                                        onChange={e => setPaymentMethod(e.target.value)}
                                    />
                                    <i className={`fa-solid ${method.icon}`}></i>
                                    <span>{method.label}</span>
                                    <div className="radioCircle"></div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Place Order */}
                    <button className="placeOrderBtn" onClick={handlePlaceOrder}>
                        <div className="placeOrderInfo">
                            <span className="placeOrderTotal">₹{grandTotal}</span>
                            <span className="placeOrderLabel">TOTAL</span>
                        </div>
                        <div className="placeOrderCta">
                            Place Order
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
