import React from "react";
import "../styles.css";
import { API} from "../backend";
import Base from "./Base";
import Card from "./Card";

export default function Home(){
    
    return(
        <Base title="Home Page" description="Welcome to the T-shirt store">
           <div className="row text-center">
               <div className="col-4">
                   <Card/>
               </div>
               <div className="col-4"></div>
               <div className="col-4"></div>
           </div>
        </Base>
    );
}

