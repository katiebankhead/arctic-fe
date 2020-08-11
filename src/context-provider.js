import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
import {produce} from 'immer'

/** The context provider for our app */
export default class AppProvider extends React.Component {

    constructor(props) {
        super(props)
        this.actions = {
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            getCartTotal: this.getCartTotal,
            clearCart: this.clearCart,
        }
        this.state = {
            categories: [],
            products: [],
            cart: {},
            cartCount: 0,
        }
    }

    // fat arrow function correctly binds the variable
    // fat arrow function doesn't re-assign 'this' like a regular function would
    // we want 'this' to refer to the class, not to the addToCart function
    addToCart = (pid) => {
        
        // call setState and produce to change cart object and total items in cart
        // create a draft of state, and make changes on that draft
        // you can only modify state here
        this.setState(state => produce(state, draft =>{

            // check if item is already in cart
            if(!draft.cart[pid]){ // if not in cart, add pid and qty = 1
                draft.cart[pid] = 1
                
                draft.cartCount += 1
            }
            else { // else, qty++
                const currentQty = draft.cart[pid] 
                let newQty = currentQty + 1

                draft.cart[pid] = newQty

                draft.cartCount += 1
            }

        }))
    }

    removeFromCart = (pid, qty) => {
        this.setState(state => produce(state, draft =>{

            delete draft.cart[pid]
            draft.cartCount -= qty

        }))
    }

    getCartTotal = () => {

        let total = 0
        for(let item of Object.entries(this.state.cart)){
            let prod = Object.values(this.state.products).find(x => x.id === parseInt(item[0]))
            total += prod.price * item[1]
        }
        total = Number(total.toFixed(2))
        return total
    }

    clearCart = () => {
        this.setState(state => produce(state, draft =>{
            draft.cart = {}
            draft.cartCount = 0
    
        }))
    }
    

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/category')
        const prod = await axios.get('http://localhost:8000/api/product')

        this.setState({
            categories: resp.data,
            products: prod.data
        })
    }
}