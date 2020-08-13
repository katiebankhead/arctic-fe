import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppContext from './context'

function LeftContainer() {

    const context = React.useContext(AppContext)

    return (
        <bs.Nav defaultActiveKey="/home" className="flex-column">
            <Link to={'/'} className="nav-link text-dark font-weight-bold">All Products ({context.products.length})</Link>
            <bs.Nav.Item>
                {context.categories.map((category) => {
                    return (
                        <Link key={category.id} to={`/category/${category.title}`} className="nav-link text-dark">
                            {category.title} ({context.products.filter(prod=> prod.category.id === category.id).length})</Link>
                    )
                })
                }
            </bs.Nav.Item>
        </bs.Nav>
    )
}

export default LeftContainer;