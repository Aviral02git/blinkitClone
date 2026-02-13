import React from 'react'

export default function CategorySection() {
    const images = [
        "paan-corner_web.jpeg",
        "Slice-2_10.jpeg",
        "Slice-3_9.jpeg",
        "Slice-4_9.jpeg",
        "Slice-5_4.jpeg",
        "Slice-6_5.jpeg",
        "Slice-7_3.avif",
        "Slice-8_4.jpeg",
        "Slice-9_3.jpeg",
        "Slice-10.jpeg",
        "Slice-11.avif",
        "Slice-12.avif",
        "Slice-13.avif",
        "Slice-14.avif",
        "Slice-15.avif",
        "Slice-16.avif",
        "Slice-17.avif",
        "Slice-18.avif",
        "Slice-19.avif",
        "Slice-20.avif"
    ]

    return (
        <section className="categorySection">
            {images.map((img, index) => (
                <div className="categoryItems" key={index}>
                    <img src={`assets/images/categories/${img}`} alt={`Category ${index + 1}`} />
                </div>
            ))}
        </section>
    )
}
