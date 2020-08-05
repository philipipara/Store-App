import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";

import { loadCart } from "./helper/cartHelper";
import StripeCheckOut from "./Stripe";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import { isAuthenticated } from "../auth/helper";



const Cart = () => {
    
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false);
    const { user } = isAuthenticated();
    

    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);
    


    const loadAllProducts = () => {
       
        return(
            <div>
 
                {products == undefined ? 
                <h1>Cart is Empty</h1>
            :
                <h1>You have {products.length} item(s) in your cart</h1>
            }
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

    const ifLoggedIn = () => {
        if(!user) {
            return(
                <Base title="Shopping Cart">
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
        } else {
            return(
                <Base title={`${user.name}'s Cart`}>
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
            )
        }
    }
  
  
    return (
      ifLoggedIn()
    );
  }

export default Cart;
