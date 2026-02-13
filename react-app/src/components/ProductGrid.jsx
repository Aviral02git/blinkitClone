import React from 'react'
import AddToCartBtn from './AddToCartBtn'

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="searchEmptyState">
        <img src="https://cdn.grofers.com/assets/web/empty_state/empty_state.png" alt="No results" style={{ width: '200px', opacity: 0.6 }} />
        <h3>No results found</h3>
        <p>Try searching with a different keyword</p>
      </div>
    )
  }

  return (
    <div className="productRow">
      {products.map(p => (
        <div key={p.id} className="productItems">
          <div className="productImg">
            <img width="70%" src={`images/${p.image}`} alt={p.name} />
            <p>
              <img src="images/15-mins.avif" width="15" />
              15 MIN
            </p>
          </div>
          <div className="productContent">
            <h3>{p.name}</h3>
            <p>{p.quantity}</p>
            <div className="btn-price-outer">
              <b>₹{p.price}</b>
              <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-end' }}>
                <AddToCartBtn product={p} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
