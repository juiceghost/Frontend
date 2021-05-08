import { useState, useEffect } from 'react';

export const useLqdrPrice = () => {
    const [price, setPrice] = useState(0)
    useEffect(() => {
        const fetchPrice = async () => {
            setPrice(1)
        }
        fetchPrice()
    }, [])

    return price
}