import React from 'react'
import ShopA from './../../assests/A.jpg'
import ShopR from './../../assests/R.jpg'
import './styles.scss'

const Directory = props => {
    return(
        <div className="directory" >
            <div className="wrap">
            
                <div 
                className="item"
                style={{
                        backgroundImage:`url(${ShopA})`
                    }}
                >
                    <a href="/#">
                        shop1
                    </a>
                </div>
                
                <div 
                className="item"
                style={{
                        backgroundImage:`url(${ShopR})`
                    }}
                >
                    <a href="/#">
                        shop2
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Directory