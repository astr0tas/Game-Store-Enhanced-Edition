import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context';
const Product = (props) => {
    const {id , productName, price, productImage} = props.data;
    const {addToCart, cartItems} = useContext(ShopContext);

    const cartItemAmount = cartItems[id];
  return (
    <div className='product'>
      <img src={productImage} alt={productName} />
      <div className="description">
        <p> <b> {productName} </b></p>
        <p>${price}</p>
        <div className="btn btn-primary" onClick={() => addToCart(id)}>
          Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}</div>
      </div>
    </div>
  )
}

export default Product
