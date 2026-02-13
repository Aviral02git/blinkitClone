import React from 'react'
import AddToCartBtn from './AddToCartBtn'

export default function ProductSection({ title, products }) {
    return (
        <section className="productSection">
            <div className="headingRow">
                <h2>{title}</h2>
                <a href="#">see all</a>
            </div>
            <div className="productRow">
                {products.map(product => (
                    <div className="productItems" key={product.id}>
                        <div className="productImg">
                            <img width="70%" src={`${product.image}`} alt={product.name} />
                            <p>
                                <img src="assets/images/icons/15-mins.avif" width="15" />
                                15 MIN
                            </p>
                        </div>
                        <div className="productContent">
                            <h3>{product.name}</h3>
                            <p>{product.quantity}</p>
                            <div className="btn-price-outer">
                                <b>₹{product.price}</b>
                                <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <AddToCartBtn product={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
