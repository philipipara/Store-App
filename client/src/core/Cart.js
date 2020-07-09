import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";

import { loadCart } from "./helper/cartHelper";
import StripeCheckOut from "./Stripe";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from "react-toastify";


const Cart = () => {
    
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);
    
    const loadAllProducts = () => {
        return(
            <div>
                <h1>Section load Products</h1>
                {products && products.map((product, index) => {
                    return(
                    <Card
                    key={index}
                    product={product}
                    removeFromCart={true}
                    addtoCart={false}
                    setReload={setReload}
                    reload={reload}
                    />
                    )
                })}
            </div>
        )
    }

    const loadCheckout = () => {
        return(
            <div>
                <h1>For Checkout</h1>
            </div>
        )
    }
  
  
    return (
      <Base title="Cart Page" description="See Items in your Cart">
          <ToastContainer />
        <div className="row text-center">
            <div className="col-6">{loadAllProducts()}</div>
            <div className="col-6">
                <StripeCheckOut
                products={products} 
                setReload={setReload}
                />
                </div>
        </div>
      </Base>
    );
  }

export default Cart;
