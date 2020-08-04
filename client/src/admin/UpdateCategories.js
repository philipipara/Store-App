import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getACategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory =({match}) => {
    

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const preload = categoryId => {
        getACategory(categoryId).then(data => {
        if(data.error){
            setError(true);
        } else{
            setName(data.name);
        }
      });
    };

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const handleChange = event => {
        setError("");
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired
        updateCategory(match.params.categoryId,user._id, token, {name})
            .then(data => {
                if(data.error){
                    setError(true);
                } else {
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            });
    };


   
  
    const successMessage = () => (
        <div className="alert alert-success mt-3"
          style={{display: success ? "" : "none"}}
        >
          <h4>Category Updated Successfully</h4>
        </div>
    )

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex.Summer"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
    );

      return (
        <Base
        title="Update Category"
        className="container bg-info p-4">
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {/* {errorMessage()} */}
                {myCategoryForm()}
            </div>
        </div>
        </Base>
    );


}



export default UpdateCategory;