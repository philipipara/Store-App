import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { removeCategory, getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";


const ManageCategories = ()  => {


    const [category, setCategory] = useState([]);

    const { user, token} = isAuthenticated();

    const preload = () => {
        getCategories().then(data => {
            // if(data.error) {
            //     console.log(data.error);
            // } else {
            //     setCategory(data)
            // }
            setCategory(data)
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const deleteThisCategory = categoryId => {
        removeCategory(categoryId, user._id, token).then(data => {
            // if(data.error) {
            //     console.log(data.error)
            // } else {
            //     preload();
            // }
            preload();
        })
    }

    return(
        <Base title="Manage Categories">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total Categories</h2>

            {category && category.map((category, index) => {
                return(
                        <div key={index} className="row text-center mb-2 ">
                        <div className="col-4">
                          <h3 className="text-white text-left">{category.name}</h3>
                        </div>
                        <div className="col-4">
                          <Link
                            className="btn btn-success"
                            to={`/admin/category/update/${category._id}`}
                          >
                            <span className="">Update</span>
                          </Link>
                        </div>
                        <div className="col-4">
                          <button onClick={() => {
                              deleteThisCategory(category._id)
                              console.log("button clicked")
                          }} 
                          
                          className="btn btn-danger">
                            Delete
                          </button>
                        </div>
                        </div>
                );
            })}
         
        </div>
      </div>
    </Base>
    );
}

export default ManageCategories;