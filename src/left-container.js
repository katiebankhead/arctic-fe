import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppContext from './context'

function LeftContainer() {

    const context = React.useContext(AppContext)

    return (
        <bs.Nav defaultActiveKey="/home" className="flex-column">
            <Link to={'/'} className="nav-link">All Products ({context.products.length})</Link>
            <bs.Nav.Item>
                {context.categories.map((category) => {
                    return (
                        <Link key={category.id} to={`/category/${category.title}`} className="nav-link">
                            {category.title} ({context.products.filter(prod=> prod.category.id === category.id).length})</Link>
                    )
                })
                }
            </bs.Nav.Item>
        </bs.Nav>
    )
}

export default LeftContainer;


    // const categories = {}
    // let totalProducts = 0

    // //make an array out of an object
    // //const is technically okay because it is recreatead every loop (let would also be fine)
    // for (const p of Object.values(PRODUCTS)) {
    //     //categories[p.category] = (categories[p.category] || 0) + 1
    //     if (p.category in categories) {
    //         //basically a dictionary, where the key is the category name and count is the value
    //         categories[p.category] += 1 //add a count for the category type
    //         totalProducts += 1
    //     }
    //     else {
    //         //if no products in that category have previously been counted, start the count
    //         categories[p.category] = 1
    //         totalProducts += 1
    //     }
    // }