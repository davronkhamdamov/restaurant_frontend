export const CurrencyFormatter = (amount: number | undefined) => {
    return new Intl.NumberFormat("uz-UZ", {
        style: "currency",
        currency: 'UZS',
        currencyDisplay: 'code',
        maximumFractionDigits: 0
    }).format(amount || 0).replace("UZS", '').replace(",", ' ').trim() + " UZS"
}
