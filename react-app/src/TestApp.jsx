import React from 'react'

export default function TestApp() {
    console.log('TestApp rendering')
    return (
        <div style={{ padding: 20, border: '2px solid red' }}>
            <h1>System Check: Minimal React Component</h1>
            <p>If you can see this, React is working.</p>
        </div>
    )
}
