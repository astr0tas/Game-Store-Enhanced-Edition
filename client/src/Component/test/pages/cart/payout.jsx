import React, { useContext } from 'react'
import Navbar from '../../navbar'
import Product from '../shop/product'
import { PRODUCTS } from '../shop/products'
import { ShopContext } from '../../context/shop-context';
import {PayedItem} from './payeditem'
import './payout.css';
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
        <h1>Your payed Items</h1>
        <div className="cartItems ">
            {PRODUCTS.map((product) =>{if (cartItems[product.id] !== 0) {
                return <PayedItem data ={product}/>
            }
        })}
        </div>
        <div className="checkout">
            <p>Amount payed: ${totalAmount}</p>
        <div className="btn btn-primary" onClick={() => navigate("/shop")}>Continue Shopping</div>
        {/* {console.log(cartItems[9])} */}
        {/* {TextNumCode(5,8)} */}
        </div>
        

      </div>
    </div>
  )
}

export default Cart
