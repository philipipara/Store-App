import React, {useState, useEffect} from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckOutButton from "react-stripe-checkout";
import { API } from "../backend";




const StripeCheckOut = ({products, setReload = f => f, reload=undefined}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        address: ""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

   const getTotal = () => {
       let amount = 0;
       products && products.map(p => {
           amount = amount + p.price 
       })
       return amount;
   }

//    useEffect(() => {
//     loadCart();
//   }, [reload]);

   const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-type": "application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)

        }).then(response => {
            
            const {status} = response;
            console.log("STATUS", status);
            cartEmpty(() => {
                console.log("Did we crash")
            });
            setReload(!reload)
        }).catch(err => console.log(err))
   }

   const showStripeButton = () => {
       return isAuthenticated() ? (
           <StripeCheckOutButton
           stripeKey="pk_test_51H37VqKO109xIGILXjamqQwKfZ0YWxh6H9q1FwyOv4ax6cVNZw2mPRmGXDLV73OgdDQskYtFatgpRAb5KzJOOZkm00iAZ8AMfl"
           token={makePayment}
           amount={getTotal() * 100}
           name="Complete Order"
           shippingAddress
           billingAddress
           >
           <button className="btn btn-success">
               Pay with Stripe
           </button>
           </StripeCheckOutButton>
       ) : (
           <Link to="/signin">
               <button className="btn btn-danger">Login</button>
           </Link>
       )
   }

    


    return (
        <div>
            <h3 className="text-white"> Total:  ${getTotal()}</h3>
            {showStripeButton()}
            
        </div>
    )
}

export default StripeCheckOut;