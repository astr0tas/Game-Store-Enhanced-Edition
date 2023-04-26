import React from 'react'
import Navbar from '../../navbar'
import { PRODUCTS } from './products'
import Product from './product'
import './shop.css'
const Shop = () => {
  return (
    <div className='shop'>
      <Navbar/>
      <div className="shopTitle">
        <h1> Concept Demo Shop</h1>
      </div>
      <div className="products" >
      {PRODUCTS.map((product) => (<Product data={product}/>))}
      </div>
    </div>
  )
}

export default Shop
