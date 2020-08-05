import React from "react";
import { API } from "../../backend";


const ImageHelper = ({product}) => {
    const imageUrl = product
     ?  `${API}/product/photo/${product._id}` 
     : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
    return(
        <div className="shadow p-3 mb-5 bg-white rounded">
        <img
          src={imageUrl}
          alt="photo"
          style={{ height: "250px", width: "250px" }}
          className="mb-3 rounded"
        />
      </div>
    )
}

export default ImageHelper;