import React, { useState, useEffect } from 'react'
import Button from './../forms/Button'
import FormInput from './../forms/FormInput'
import { CountryDropdown } from 'react-country-region-selector'
import { apiInstance, apiPayment } from './../../Utils'

import { selectCartTotal, selectCartItemsCount, selectCartItems  } from './../../redux/Cart/cart.selectors'
import { saveOrderHistory } from './../../redux/Orders/orders.actions'

import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './styles.scss'

// const MerchantID =' MS1520047025'
// const HashKey = 'VCgPtQUR51Y2ztI01WSUkYd2g7V4WOOw'
// const HashIV = 'P943iZdo8Qpb1bkC'

// const Amt = '32'
// const dateTime = Date.now()
// const TimeStamp = Math.floor(dateTime / 1000)
// const ItemDesc = 'testproduct'
// const Email = 'minieyeshsien00%40gmail.com'
// const Version = '1.5'

// //AES356加密
// const NewebPay = require('node-newebpay')
// let key = 'VCgPtQUR51Y2ztI01WSUkYd2g7V4WOOw'
// let iv = 'P943iZdo8Qpb1bkC'
// let trade_info = {
//   MerchantID: 'MS1520047025',
//   RespondType: 'JSON',
//   TimeStamp: '1630402488',
//   Version: 1.5,
//   MerchantOrderNo: '1630402488', 
//   Amt: 40,
//   ItemDesc: 'TEST',
//   Email:'minieyeshsien00@gmail.com'
// }
// let trade_info_aes = NewebPay(key, iv).TradeInfo(trade_info).encrypt()
// console.log(trade_info_aes) 

// let trade_sha = NewebPay(key, iv).TradeInfo(trade_info_aes).TradeSha()
// console.log(trade_sha)


const initialAddressState = {
    line1:'',
    line2:'',
    city:'',
    state:'',
    postal_code:'',
    country:'',
}

const initialPayForm = {
    MerchantID:'MS1520047025',
    Version:'1.5',
    RespondType:'JSON',
    MerchantOrderNo:'MerchantOrderNo',
    TimeStamp:'TimeStamp',
    Amt:'Amt',
    TradeInfo:'TradeInfo',
    TradeSha:'TradeSha'

}

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems,
})

const PaymentDetails = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { total, itemCount, cartItems } = useSelector(mapState)

    const [ billingAddress, setBillingAddress] = useState({...initialAddressState})
    const [ shippingAddress, setShippingAddress] = useState({...initialAddressState})
    const [ payForm, setPayForm] = useState({...initialPayForm})

    const [ recipientName, setRecipientName ] = useState('')
    const [ nameOnCard, setNameOnCard ] = useState('')


    useEffect(() => {
        if (itemCount < 1) {
          history.push('/dashboard');
        }
    }, [itemCount]);

    const handleForm = evt => {
        const { name, value } = evt.target;
        setPayForm({
        ...payForm,
        [name]: value
        });
    }
 
    const handleFormSubmit = async evt => {
        // evt.preventDefault()

        // dispatch(clearCart())
        // console.log('clear')


        //  history.push('/')


        // if(
        //     !shippingAddress.line1 || !shippingAddress.city ||
        //     !shippingAddress.state || !shippingAddress.postal_code 
            
        // ){
        //     return
        // }


        // apiInstance.post('/order',{
        //    payForm,
        // })
        // history.push('/')

        //同源政策，has been blocked by CORS policy
        // apiPayment.post('/order',{
        //    payForm,
        // })
    }

    const handleOrder = () => {
        const configOrder = {
            orderTotal: total,
            orderItems: cartItems.map(item => {
                const { documentID, productThumbnail, productName,
                productPrice, quantity } = item
    
                return{
                    documentID,
                    productThumbnail,
                    productName,
                    productPrice,
                    quantity
                }
            })
        }

        dispatch(
            saveOrderHistory(configOrder)
        )
    } 

    

    const {MerchantOrderNo, TimeStamp, Amt, TradeInfo, TradeSha} = payForm





    return (
        <div className="paymentDetails">
            <form name='Newebpay' method='post' action='https://ccore.newebpay.com/MPG/mpg_gateway' >

                    <input                   
                    name="MerchantID" 
                    value="MS122606138"
                    type="text"
                    />


                    <input                   
                    name="Version" 
                    value="1.5"
                    type="text"
                    />

                    <input                   
                    name="RespondType" 
                    value="JSON"
                    type="hidden"
                    />

                    <input                   
                    name="TimeStamp" 
                    value={TimeStamp}
                    type="text"
                    onChange={handleForm}
                    />

                    <input                   
                    name="MerchantOrderNo" 
                    value={TimeStamp}
                    type="text"
                    />

                    <input                   
                    name="Amt" 
                    value={Amt}
                    type="text"
                    onChange={handleForm}
                    />

                    <input                   
                    name="ItemDesc" 
                    value="TEST"
                    type="text"
                    />

                    <input                   
                    name="Email" 
                    value="minieyeshsien00@gmail.com"
                    type="email"
                    />

                    <input                   
                    name="TradeInfo" 
                    value={TradeInfo}
                    type="text"
                    onChange={handleForm}
                    />

                    <input                   
                    name="TradeSha" 
                    value={TradeSha}
                    type="text"
                    onChange={handleForm}
                    />

                    <input type='submit' value='Submit' />
                    
            </form>

            

            <Button type="button" onClick={handleOrder}>
                    save order
            </Button>


        


            <form >
                
                {/* <div className="group">
                    <h2>
                        Shipping Address
                    </h2>
                    
                    <FormInput
                        placeholder="Recipient Name"
                        value={recipientName}
                        type="text"
                    />

                    <FormInput
                        placeholder="Line 1"
                        value={shippingAddress.line1}
                        type="text"
                    />
                   
                    <FormInput
                        placeholder="Line 2"
                        value={shippingAddress.line2}
                        type="text"
                    />

                    <FormInput
                        placeholder="City"
                        value={shippingAddress.city}
                        type="text"
                    />

                    <FormInput
                        placeholder="State"
                        value={shippingAddress.state}
                        type="text"
                    />

                    <FormInput
                        placeholder="Postal Code"
                        value={shippingAddress.postal_code}
                        type="text"
                    />

                    <div className="formRow checkoutInput">
                        <CountryDropdown
                            value={shippingAddress.country}
                            valueType="short"
                        />
                    </div>
                </div> */}





                {/* <div className="group">
                    <h2>
                        Billing
                    </h2>

                    <FormInput
                        placeholder="Recipient Name"
                        type="text"
                    />

                    <FormInput
                        placeholder="Line 1"
                        type="text"
                    />
                   
                    <FormInput
                        placeholder="Line 2"
                        type="text"
                    />

                    <FormInput
                        placeholder="City"
                        type="text"
                    />

                    <FormInput
                        placeholder="State"
                        type="text"
                    />

                    <FormInput
                        placeholder="Postal Code"
                        type="text"
                    />

                    <div className="formRow checkoutInput">
                        <CountryDropdown
                            valueType="short"
                        />
                    </div>
                    
                </div> */}



                {/* <div className="group">
                    <h2>
                        Card Details
                    </h2>
                </div> */}



                {/* <Button
                    type="submit"
                >
                    Pay Now
                </Button> */}



            </form>
        </div>
    )
}

export default PaymentDetails

