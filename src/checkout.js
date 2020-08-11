import React from 'react'
import axios from 'axios'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import AppContext from './context' // lol is this right?
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useHistory} from 'react-router-dom'


const stripePromise = loadStripe("pk_test_Gv5LfVeE9QDKRrtSAXtEIpA000Ydw38yXy")



function Checkout(props) {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutController />
        </Elements>
    )
}
export default Checkout


const CheckoutController = props => {
    const state = React.useContext(AppContext)
    const total = state.getCartTotal()
    const cart = state.cart

    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = React.useState('')
    const history = useHistory()

    return (
        <Formik
            initialValues={{
                name: 'Katie Bankhead',
                address1: '1234',
                address2: '5678',
                city: 'Provo',
                state: 'UT',
                zipcode: '84602',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                console.log('validating', values)
                if (!values.name) {
                    errors.name = "Please enter a value"
                }
                if (!values.address1) {
                    errors.address1 = "Please enter a value"
                }
                if (!values.city) {
                    errors.city = "Please enter a value"
                }
                if (!values.state) {
                    errors.state = "Please enter a value"
                }
                if (!values.zipcode) {
                    errors.zipcode = "Please enter a value"
                }
                return errors
            }}
            onSubmit={async (values, actions) => {
                console.log('actions', actions)
                console.log('submit', values)

                //axios call to API goes here
                const resp = await axios.post('http://localhost:8000/api/sale/', {
                    name: values['name'],
                    address1: values['address1'],
                    address2: values['address2'],
                    city: values['city'],
                    state: values['state'],
                    zipcode: values['zipcode'],
                    total: total,
                    items: cart
                })
                console.log("resp.data", resp.data)

                // call to Stripe
                const stripeResp = await stripe.confirmCardPayment(resp.data['client_secret'], {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: values.name,
                        },
                    }
                })
                console.log("stripeResp", stripeResp)

                // if error, display error
                if(stripeResp.error){
                    setCardError(stripeResp.error.message)
                }
                // else clear cart and redirect to receipt page
                else {
                    state.clearCart();
                    history.push('/receipt')
                }

                await new Promise(resolve => {
                    setTimeout(() => {  // wait 2 seconds, then set the form as "not submitting"
                        resolve()
                    }, 2000)
                })
                console.log('after the 2 seconds')
            }}
        >{form => (
            <PaymentForm form={form} total={total} cardError={cardError} />
        )}</Formik>
    )
}

/**
 * The form layout/html.
 * This component needs finishing.
 */
const PaymentForm = props => ( //fill this out

    <bs.Container className='m-2'>
        <Form className="float-left">
            <div>
                <bs.Row className="p-4">
                    <bs.Col s="5">
                        <bs.Card>
                            <bs.Card.Header as="h5">Shipping</bs.Card.Header>
                            <bs.Card.Body>
                                <Input title="Name:" name="name" type="text" disabled={props.form.isSubmitting} />
                                <Input title="Address 1:" name="address1" type="text" disabled={props.form.isSubmitting} />
                                <Input title="Address 2:" name="address2" type="text" disabled={props.form.isSubmitting} />
                                <Input title="City:" name="city" type="text" disabled={props.form.isSubmitting} />
                                <Input title="State:" name="state" type="text" disabled={props.form.isSubmitting} />
                                <Input title="Zipcode:" name="zipcode" type="text" disabled={props.form.isSubmitting} />
                            </bs.Card.Body>
                        </bs.Card>
                    </bs.Col>
                    <bs.Col s="5">
                        <bs.Card>
                            <bs.Card.Header as="h5">Payment</bs.Card.Header>
                            <bs.Card.Body>
                                <CardElement />
                            </bs.Card.Body>
                        </bs.Card>
                        <center><p className="text-danger">{props.cardError}</p></center>
                        <br />
                        <p>Your card will be charged <strong>${Number(props.total).toFixed(2)}</strong></p>
                        <center><bs.Button
                            variant="warning"
                            size="lg"
                            type="submit"
                            disabled={props.form.isSubmitting}
                            onClick={e => { console.log("my purchase button") }} >
                            {props.form.isSubmitting &&
                                <bs.Spinner animation="border" size="sm" className='m-1' />
                            }
                Purchase
            </bs.Button></center>
                    </bs.Col>
                </bs.Row>
            </div>
        </Form>
    </bs.Container>
)


/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 * This component is finished and doesn't need additional work.
 */
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label>{props.title}</bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                disabled={rProps.form.isSubmitting}
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)