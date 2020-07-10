import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";



const UserDashboard = () => {
     
    return (
        <Base title="User Dashboard"
               description="Manage your orders">
            <h1>SUP PUSSY</h1>
            <Link to="/">
                <button className="btn btn-success">Start Shopping</button>
            </Link>
        </Base>
    );
}

export default UserDashboard;