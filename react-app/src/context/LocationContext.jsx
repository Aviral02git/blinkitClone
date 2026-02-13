import React, { createContext, useState, useContext, useEffect } from 'react'

const LocationContext = createContext()

export function useLocation() {
    return useContext(LocationContext)
}

const DEFAULT_LOCATION = {
    locality: 'Sector 45',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122003',
    fullAddress: '1003, Sector 45 Rd, Block C, Block Cs, Sector 45, Gurugram,...'
}

export function LocationProvider({ children }) {
    const [location, setLocationState] = useState(() => {
        const saved = localStorage.getItem('blinkit_location')
        if (saved) {
            try { return JSON.parse(saved) } catch (e) { /* ignore */ }
        }
        return DEFAULT_LOCATION
    })
    const [isPickerOpen, setIsPickerOpen] = useState(false)

    useEffect(() => {
        localStorage.setItem('blinkit_location', JSON.stringify(location))
    }, [location])

    const setLocation = (loc) => {
        setLocationState({
            locality: loc.locality,
            city: loc.city,
            state: loc.state,
            pincode: loc.pincode,
            fullAddress: `${loc.locality}, ${loc.city}, ${loc.state} - ${loc.pincode}`
        })
        setIsPickerOpen(false)
    }

    const togglePicker = () => setIsPickerOpen(prev => !prev)
    const closePicker = () => setIsPickerOpen(false)

    return (
        <LocationContext.Provider value={{ location, setLocation, isPickerOpen, togglePicker, closePicker }}>
            {children}
        </LocationContext.Provider>
    )
}
