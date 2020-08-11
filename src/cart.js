import React from 'react'
import { Link } from 'react-router-dom'
import * as bs from 'react-bootstrap'
import AppContext from './context'

export default function Cart(props) {
    const state = React.useContext(AppContext)
    let cartArray = Object.entries(state.cart)
    let total = 0
    for (let item of cartArray) {
        total += (state.products.find(x => x.id === parseInt(item[0])).price * parseInt(item[1]))
    }

    console.log(state.cart)
    console.log(cartArray)

    return (
        <bs.Container className="my-3">
            <h1>Shopping Cart</h1>
            <bs.Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Extended</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(cartArray).map((item) => {
                        return (
                            <tr key={parseInt(item[0])}>
                                <td>
                                    <img src={"/images/" + state.products.find(x => x.id === parseInt(item[0])).filename + "-1.png"} 
                                    alt="product" style={{ height: "50px", width: "50px" }} className="border mr-1" />
                                </td>
                                <td>{state.products.find(x => x.id === parseInt(item[0])).name}</td>
                                <td>{item[1]}</td>
                                <td>${state.products.find(x => x.id === parseInt(item[0])).price}</td>
                                <td>${(state.products.find(x => x.id === parseInt(item[0])).price) * parseInt(item[1])}</td>
                                <td>
                                    <bs.Button
                                        variant="outline-secondary"
                                        onClick={e => {
                                            state.removeFromCart(item[0], item[1]);
                                        }}
                                    >
                                        Remove
                                        </bs.Button>
                                </td>
                            </tr>

                        )
                    }
                    )
                    }
                </tbody>
            </bs.Table>
            <h4><strong>Total: ${Number(total).toFixed(2)}</strong></h4>
            <Link to="/checkout" className="btn btn-warning">Go to Checkout</Link>
        </bs.Container>
    )
}