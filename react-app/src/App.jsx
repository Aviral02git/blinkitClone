import React, { useState } from 'react'
import Header from './components/Header'
import BannerSection from './components/BannerSection'
import OrderBanner from './components/OrderBanner'
import CategorySection from './components/CategorySection'
import ProductSection from './components/ProductSection'
import Footer from './components/Footer'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import LocationPicker from './components/LocationPicker'
import CheckoutPage from './components/CheckoutPage'
import products from './data/products'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCheckout, setShowCheckout] = useState(false)

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group products by category for homepage
  const dairyProducts = products.filter(p => p.category === 'Dairy, Bread & Eggs')
  const snackProducts = products.filter(p => p.category === 'Snacks & Munchies')

  if (showCheckout) {
    return (
      <>
        <CheckoutPage onBack={() => setShowCheckout(false)} />
        <LocationPicker />
      </>
    )
  }

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      <CartDrawer onCheckout={() => setShowCheckout(true)} />
      <LocationPicker />

      {searchQuery ? (
        <section className="productSection">
          <div className="headingRow">
            <h2>Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"</h2>
          </div>
          <ProductGrid products={filteredProducts} />
        </section>
      ) : (
        <>
          <BannerSection />
          <OrderBanner />
          <CategorySection />
          <ProductSection title="Dairy, Bread & Eggs" products={dairyProducts} />
          <ProductSection title="Snacks & Munchies" products={snackProducts} />
          <Footer />
        </>
      )}
    </div>
  )
}
