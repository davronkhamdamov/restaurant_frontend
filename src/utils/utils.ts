export const CurrencyFormatter = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
        style: "currency",
        currency: 'UZS',
        currencyDisplay: 'code',
        maximumFractionDigits: 0
    }).format(amount).replace("UZS", '').replace(",", ' ').trim() + " UZS"
}
