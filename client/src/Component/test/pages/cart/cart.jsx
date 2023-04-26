import React, { useContext } from 'react'
import Navbar from '../../navbar'
import Product from '../shop/product'
import { PRODUCTS } from '../shop/products'
import { ShopContext } from '../../context/shop-context';
import {CartItem} from './cart-item'
import './cart.css';
import { useNavigate } from 'react-router-dom';

import {TextNumCode} from '../../GenerateRandomCode'

const Cart = () => {
    const {cartItems, getTotalCartAmount} = useContext(ShopContext);
    const totalAmount = getTotalCartAmount()
    const navigate = useNavigate()

    
  return (
    <div>
      <Navbar/>
      <div className="cart">
        <h1>Your cart Items</h1>
        <div className="cartItems">
            {PRODUCTS.map((product) =>{if (cartItems[product.id] !== 0) {
                return <CartItem data ={product}/>
            }
        })}
        </div>
        <div className="checkout">
            <p>Subtotal: ${totalAmount}</p>
        <div className="btn btn-primary" onClick={() => navigate("/shop")}>Continue Shopping</div>
        <div className="btn btn-danger" onClick={() => navigate("/payout")}>Checkout</div>
        {console.log(cartItems[9])}
        {/* {TextNumCode(5,8)} */}
        </div>
        

      </div>
    </div>
  )
}

export default Cart
