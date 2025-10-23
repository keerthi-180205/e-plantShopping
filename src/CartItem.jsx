import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // Use useSelector to get the array of items from the Redux store
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper function to extract and parse the numeric cost from the item string (e.g., "$15" -> 15)
  const extractCost = (costString) => {
    // Extracts the numeric value by removing the first character (the '$') and converting to a float
    return parseFloat(costString.substring(1));
  };

  // 1. Cost of all items in cart (calculateTotalAmount)
  const calculateTotalAmount = () => {
    // Use reduce to iterate over the cart and sum up the total cost
    const total = cart.reduce((cumulativeTotal, item) => {
      const itemCost = extractCost(item.cost);
      return cumulativeTotal + (itemCost * item.quantity);
    }, 0);
    // Return the total formatted to two decimal places
    return total.toFixed(2);
  };

  // 2. Continue shopping (handleContinueShopping)
  const handleContinueShopping = () => {
    // Call the function passed from the parent component
    onContinueShopping();
  };

  // 3. Checkout (handleCheckoutShopping)
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // 4. Increment and decrement (handleIncrement and handleDecrement)

  const handleIncrement = (item) => {
    // Dispatch updateQuantity to increase the quantity by 1
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1,
    }));
  };

  const handleDecrement = (item) => {
    // If the quantity is greater than 1, decrement it
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1,
      }));
    } else {
      // If quantity is 1 (and will drop to 0), remove the item
      dispatch(removeItem(item.name));
    }
  };

  // 5. Remove plant from the cart (handleRemove)
  const handleRemove = (item) => {
    // Dispatch the removeItem action with the item's name
    dispatch(removeItem(item.name));
  };

  // 6. Item subtotal (calculateTotalCost)
  const calculateTotalCost = (item) => {
    // Calculate total cost for an item: cost * quantity
    const itemCost = extractCost(item.cost);
    // Return the subtotal formatted to two decimal places
    return (itemCost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      {/* Display the overall total cart amount */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {/* Map over the cart items to display each product */}
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              {/* Display the unit cost */}
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                {/* Decrement button */}
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                {/* Display current quantity */}
                <span className="cart-item-quantity-value">{item.quantity}</span>
                {/* Increment button */}
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              {/* Display the item subtotal */}
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              {/* Delete/Remove button */}
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;