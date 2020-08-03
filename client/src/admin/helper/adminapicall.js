
import { API } from "../../backend";


//manage categories
export const removeCategory =(categoryId, token, userId) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        response.json()
    })
    .catch(err => console.log(err))
}


export const getACategory= categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



export const createACategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
         body: JSON.stringify(category)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err));
    
};

//get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`

        },
        body: category
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}



//product calls

//creat a product
export const createAProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`

        },
        body: product
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

//get a product
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`

        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}


//get a product
export const getAProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



//updated product
export const updateProduct = (productId, userId, token,product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`

        },
        body: product
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

