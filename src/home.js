import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from './product-card'
import { Row, Col } from 'react-bootstrap'
import AppContext from './context'

function Home() {
    const state = React.useContext(AppContext)

    let { categoryName } = useParams()

    //declare vars
    let productValues = []
    let outerArray = []
    let innerArray = []
    productValues = state.products

    if (categoryName !== undefined) {
        // productValues = productValues.filter(x => x.state.categories.id === categoryID)
        productValues = state.products.filter(x => x.category.title === categoryName)
    }

    // iterate through largest array
    //creates array structure for products
    for (let i = 0; i < productValues.length; i += 4) {
        innerArray = [productValues[i]]

        //error handling for the end of product list
        if ((i + 1) < productValues.length) {
            innerArray.push(productValues[i + 1])
        }

        if ((i + 2) < productValues.length) {
            innerArray.push(productValues[i + 2])
        }

        if ((i + 3) < productValues.length) {
            innerArray.push(productValues[i + 3])
        }

        outerArray.push(innerArray)
    }

    return (
        <div className="m-5">
            {outerArray.map((row, key) => {
                return (
                    <Row key={key} className="mb-5">
                        {row.map((item) => {
                            return (
                                // <Col key={item.id} md="3" className="my-0.25 mx-0.25">
                                <Col key={item.id}>
                                    <ProductCard product={item} />
                                </Col>
                            )
                        }
                        )}
                    </Row>

                )
            })
            }
        </div>
    );

}

export default Home;