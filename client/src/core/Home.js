import React, { useState, useEffect } from "react";
import "../styles.css";
import {  ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
    const [products, setProducts] = useState([]);
    // const [error, setError] = useState(false);
  
    // const loadAllProduct = () => {
    //   getProducts().then(data => {
    //     if (data.error) {
    //       setError(data.error);
    //     } else {
    //       setProducts(data);
    //     }
    //   });
    // };


    const loadAllProduct = () => {
      getProducts().then(data => {
        setProducts(data);
      })
    }
  
    useEffect(() => {
      loadAllProduct();
    }, []);
  
    return (
      <Base title="Welcome to the Jersey Store" description="Find your MLB drip">
        <div className="row text-center">
        <ToastContainer />
          <div className="row">
            {products && products.map((product, index) => {
              return (
                <div key={index} className="col-4 mb-4">
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </Base>
    );
  }

