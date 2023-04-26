import React, { useContext } from "react";
import { ShopContext } from '../../context/shop-context';
import {TextNumCode} from '../../GenerateRandomCode'
export const PayedItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const {addToCart, cartItems, removeFromCart,updateCartItemCount} = useContext(ShopContext);
  return (
    <div className="cartItem">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        
        <p> Price: ${price}</p>
        <p>Quantity bought: {cartItems[id]}</p>
        
        {/* Conditionally render a div if the price is greater than 0 */}
        

          {/* Iterate over an array and render elements */}
          {/* {Array.from({ length: 3 }, (_, index) => (
            <div key={index}>
              <p>Item {index + 1}</p>
            </div>
          ))} */}
      </div>
      <div class="container">
      {cartItems[id] > 0 && (
            <div>
            {[...Array(cartItems[id])].map((_, index) => (
              <p key={index}>{TextNumCode(5, 8)}</p>
            ))}
            </div>
          )}
      </div>
    </div>
  );
};
 