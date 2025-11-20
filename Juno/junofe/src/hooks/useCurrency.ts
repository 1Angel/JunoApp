import { useEffect, useState } from "react";

export function useCurrency(value: number) {

    const [formatCurrency, setFormatCurrency] = useState('');

    const changeCurrency = Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
        maximumSignificantDigits: 6
    });

    useEffect(() => {
        setFormatCurrency(changeCurrency.format(value))
    }, [formatCurrency])

    return formatCurrency;

}