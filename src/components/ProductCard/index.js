import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { fetchProductStart, setProduct } from './../../redux/Products/products.actions'
import { addProduct } from './../../redux/Cart/cart.actions'
import Button from './../forms/Button'
import './styles.scss'


const mapState = state => ({
    product: state.productsData.product
})

const ProductCard = ({}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { productID } = useParams()
    const { product } = useSelector( mapState )

    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc 
    } = product

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )
        return() => {
            dispatch(
                setProduct({})
            )
        }
    }, [])


    const handleAddToCart = ( product ) => {
        if(!product) return
        dispatch(
            addProduct(product)
        )
        history.push('/cart')
    }


    const configAddToCartBtn = {
        type:'button'
    }

    return(
        <div className="productCard">
            <h1 className="hero">
                <img src={ productThumbnail } />
            </h1>
            <div className="productDetails">
                <ul>
                    <li>
                        {productName}
                    </li>
                    <li>
                        ${productPrice}
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick ={ () => handleAddToCart(product)}>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span
                            dangerouslySetInnerHTML={{__html: productDesc}}
                        />                    
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductCard