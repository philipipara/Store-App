import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, getACategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory =({match}) => {
    const {user, token } = isAuthenticated();

    const [value, setValue] = useState({
        name:"",
        error: "",
        formData: "",
        createdCategory: ""
    })

    const {name, formData, error, createdCategory} = value;

    const preload = (categoryId) => {
        getACategory(categoryId).then(data => {
           
                setValue({
                    ...value,
                    name: data.name,
                    formData: new FormData()
                });
                preloadCategories();
            
        })
    }

    useEffect(() => {
        preload(match.params.productId)
    }, []);


    const preloadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                setValue({...value, error: data.error})
            } else {
                setValue({
                    categories: data, 
                    formData: new FormData()
                });
            }
        });
    }

    const handleChange = name => event =>{
        const value =  name === event.target.name;
        formData.set(name, value);
        setValue({...value, [name]: value})
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValue({...value, error: "", loading: true});
        updateCategory(match.params.categoryId, user._id, token, formData).then(data => {
            if(data.error){
                setValue({...value, error: data.errror})
            } else {
                setValue({
                    ...value,
                    name: "",
                    createdCategory: data.name
                })
            }
        })
    }
  
    const successMessage = () => {
        return(
        <div className="alert alert-success mt-3"
        style={{display: createdCategory ? "" : "none"}}>
            <h4>{createdCategory} updated successfully</h4>
        </div>
        )
    };

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
                <button onClick={onSubmit}className="btn btn-outline-info">
                    Update Category
                </button>
            </div>
        </form>  
          
      );

      return (
        <Base
        title="Add a Product"
        className="container bg-info p-4">
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {/* {errorMessage()} */}
                {categoryForm()}
            </div>
        </div>
        </Base>
    );


}



export default UpdateCategory;