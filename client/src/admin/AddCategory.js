import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createACategory } from "./helper/adminapicall";



const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token} = isAuthenticated();
    const goBack = () => {
        return(
        <div className="mt-5">
            <Link className="btn btn-small btn-info mb-3" to="/admin/dashboard"> Admin Home</Link>
        </div>
        );
    }

    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired
        createACategory(user._id, token, {name}) 
        .then(data => {
            if(data.error) {
                setError(true)
            } else {
                setError("")
                setSuccess(true)
                setName("")
            }
        });


    };

      const successMessage = () => {
          if(success) {
              return <h4 className="text-success">Category Created</h4>
          }
      }

      const errorMessage = () => {
          if(error) {
              return <h4 className="text-danger">Failed to create</h4>
          }
    }

        const categoryForm = () => (
          <form>
              <div className="form-group">
                  <p className="lead">Enter New Category</p>
                  <input 
                  type="text"
                  className="form-control my-3"
                  onChange={handleChange}
                  value={name}
                  autoFocus
                  required
                  placeholder="For ex. Tank tops"/>
                  <button onClick={handleSubmit}className="btn btn-outline-info">
                      Create Category
                  </button>
              </div>
          </form>  
            
        );


    return(
       <Base 
       title="Create a Category"
       description="Add a new product category"
       className="container bg-info p-4"
       >
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
             {successMessage()}
             {errorMessage()}
             {categoryForm()} 
             {goBack()}
            </div>
        </div>
       
       </Base>
    );
};

export default AddCategory;