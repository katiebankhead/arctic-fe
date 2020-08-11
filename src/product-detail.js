import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as bs from 'react-bootstrap'
import AppContext from './context'

export default function ProductDetail(props) {
    const history = useHistory()
    const state = React.useContext(AppContext)
    console.log(state.cart)

    let { productID } = useParams()
    let selectedProduct = state.products.find(p => p.id === parseInt(productID))
    const [index, setIndex] = useState("1")

    if (selectedProduct === undefined) {
        return (
            <h2>Error: Product not found.</h2>
        )
    }
    else {
        return (
            <bs.Container className="my-3">
                <bs.Col md="6">
                    <div className="float-left">
                        <h1>{selectedProduct.name}</h1>
                        <h3>${selectedProduct.price}</h3>
                        <p>{selectedProduct.description}</p>
                            <bs.Button
                                variant='warning'
                                onClick={e => {
                                    state.addToCart(selectedProduct.id);
                                    history.push('/cart')
                                }}
                            >
                                <span className='pr-2'><i className="fas fa-cart-plus"></i></span>
                                Add to Cart
                        </bs.Button>
                    </div>
                </bs.Col>
                <bs.Col md="6" className="float-right d-flex flex-column" >
                    <img src={"/images/" + selectedProduct.filename + "-" + index + ".png"} alt="product" style={{ height: "300px", width: "300px" }} className="border my-1" />
                    <div className="d-flex flex-row">
                        <img onMouseEnter={() => setIndex("1")} src={"/images/" + selectedProduct.filename + "-1.png"} alt="product" style={{ height: "30px", width: "30px" }} className="border mr-1" />
                        <img onMouseEnter={() => setIndex("2")} src={"/images/" + selectedProduct.filename + "-2.png"} alt="product" style={{ height: "30px", width: "30px" }} className="border mr-1" />
                        <img onMouseEnter={() => setIndex("3")} src={"/images/" + selectedProduct.filename + "-3.png"} alt="product" style={{ height: "30px", width: "30px" }} className="border mr-1" />
                        <img onMouseEnter={() => setIndex("4")} src={"/images/" + selectedProduct.filename + "-4.png"} alt="product" style={{ height: "30px", width: "30px" }} className="border" />
                    </div>
                </bs.Col>
            </bs.Container>
        )
    }
}