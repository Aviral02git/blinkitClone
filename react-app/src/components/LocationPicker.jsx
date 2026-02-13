import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '../context/LocationContext'
import locations from '../data/locations'

export default function LocationPicker() {
    const { isPickerOpen, closePicker, setLocation } = useLocation()
    const [query, setQuery] = useState('')
    const [geoStatus, setGeoStatus] = useState('')
    const [geoLoading, setGeoLoading] = useState(false)
    const inputRef = useRef(null)
    const modalRef = useRef(null)

    // Focus input when modal opens
    useEffect(() => {
        if (isPickerOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100)
        }
        if (isPickerOpen) {
            setQuery('')
            setGeoStatus('')
        }
    }, [isPickerOpen])

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') closePicker() }
        if (isPickerOpen) document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [isPickerOpen, closePicker])

    if (!isPickerOpen) return null

    // Filter locations
    const filtered = query.trim().length > 0
        ? locations.filter(loc =>
            loc.pincode.includes(query) ||
            loc.locality.toLowerCase().includes(query.toLowerCase()) ||
            loc.city.toLowerCase().includes(query.toLowerCase())
        )
        : locations.slice(0, 10) // Show popular locations by default

    // Detect current location
    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            setGeoStatus('Geolocation is not supported by your browser')
            return
        }

        setGeoLoading(true)
        setGeoStatus('Detecting your location...')

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`,
                        { headers: { 'Accept-Language': 'en' } }
                    )
                    const data = await res.json()
                    const addr = data.address || {}

                    setLocation({
                        locality: addr.suburb || addr.neighbourhood || addr.village || addr.town || addr.county || 'Unknown',
                        city: addr.city || addr.state_district || addr.town || 'Unknown',
                        state: addr.state || 'Unknown',
                        pincode: addr.postcode || '000000'
                    })
                    setGeoStatus('')
                } catch (err) {
                    setGeoStatus('Could not detect address. Please search manually.')
                }
                setGeoLoading(false)
            },
            (err) => {
                setGeoLoading(false)
                if (err.code === 1) {
                    setGeoStatus('Location permission denied. Please allow location access.')
                } else {
                    setGeoStatus('Could not detect location. Please search manually.')
                }
            },
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }

    const handleSelect = (loc) => {
        setLocation(loc)
    }

    return (
        <div className="locationOverlay" onClick={(e) => { if (e.target === e.currentTarget) closePicker() }}>
            <div className="locationModal" ref={modalRef}>
                <div className="locationModalHeader">
                    <h3>Choose your delivery location</h3>
                    <button className="locationCloseBtn" onClick={closePicker}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <button
                    className="locationDetectBtn"
                    onClick={handleUseMyLocation}
                    disabled={geoLoading}
                >
                    <i className={`fa-solid ${geoLoading ? 'fa-spinner fa-spin' : 'fa-location-crosshairs'}`}></i>
                    <div>
                        <div className="detectBtnTitle">Use my current location</div>
                        <div className="detectBtnSubtitle">Using GPS</div>
                    </div>
                </button>

                {geoStatus && (
                    <div className={`geoStatus ${geoStatus.includes('denied') || geoStatus.includes('Could not') ? 'geoError' : ''}`}>
                        {geoStatus}
                    </div>
                )}

                <div className="locationDivider">
                    <span>or search your area</span>
                </div>

                <div className="locationSearchBox">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by pincode, locality or city..."
                    />
                    {query && (
                        <button onClick={() => setQuery('')} className="locationSearchClear">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}
                </div>

                <div className="locationList">
                    {filtered.length === 0 ? (
                        <div className="locationEmpty">
                            <i className="fa-solid fa-map-location-dot"></i>
                            <p>No locations found for "{query}"</p>
                        </div>
                    ) : (
                        filtered.map((loc, i) => (
                            <div
                                key={`${loc.pincode}-${i}`}
                                className="locationItem"
                                onClick={() => handleSelect(loc)}
                            >
                                <div className="locationItemIcon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="locationItemInfo">
                                    <div className="locationItemName">{loc.locality}</div>
                                    <div className="locationItemDetail">{loc.city}, {loc.state} - {loc.pincode}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
