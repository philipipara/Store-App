import React, {Fragment, useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import { loadCart, cartEmpty } from "./helper/cartHelper";


const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#5bc0de" };
  } else {
    return { color: "white" };
  }
};


// const [reload, setReload] = useState(false)

// useEffect(() => {
//   loadCart()
// }, [reload]);



const Menu = ({ history }) => {
  const {user} = isAuthenticated();
    return(

      <div>
      <ul className="nav nav-tabs bg-dark">
       {isAuthenticated() && (
          <li className="nav-item mr-auto">
            <span
              className="nav-link text-success">
              Welcome {user.name}
            </span>
          </li>
        )}
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart 
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link"
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
        )}
       {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
       )}
  
        {!isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signup")}
                    className="nav-link"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signin")}
                    className="nav-link"
                    to="/signin"
                    
                  >
                    Sign In
                  </Link>
                </li>
                </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-danger"
              onClick={() => {
                signout(() => {
                  history.push("/");
                  
                });
                
              }}
            >
              Signout
            </span>
          </li>
        )}
       
  
      </ul>
    </div>
    )


};

export default withRouter(Menu);
