import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function ProductCard(props) {

    let image = "/images/" + props.product.filename + "-1.png"
    let name = props.product.name
    let price = props.product.price
    let details = '/product/' + props.product.id

    return(
        <Card style={{ width: '12rem' }}>
            <Card.Img variant= "top" src={image}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>${price}</Card.Text>
            </Card.Body>
            <Link to={details} className = 'btn btn-dark' style={{position: 'absolute', right: '5px', top: '5px'}}>Details</Link>
        </Card>
    )
}