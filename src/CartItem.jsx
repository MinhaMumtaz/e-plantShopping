import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    // Get all cart data from Redux
    const { items: cart, totalAmount } = useSelector(state => state.cart);

    // Handle quantity increase
    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            newQuantity: item.quantity + 1
        }));
    };

    // Handle quantity decrease
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                newQuantity: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // Handle item removal
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div className="cart-container">
            <h2>Total: ${totalAmount.toFixed(2)}</h2>
            
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>${item.price.toFixed(2)} each</p>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <p>Item Total: ${(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => handleRemove(item)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            )}
            
            <div className="cart-actions">
                <button onClick={onContinueShopping}>
                    Continue Shopping
                </button>
                <button disabled={cart.length === 0}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItem;