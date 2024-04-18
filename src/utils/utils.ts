import { Bounce, toast } from "react-toastify";

export const CurrencyFormatter = (amount: number | undefined) => {
    return new Intl.NumberFormat("uz-UZ", {
        style: "currency",
        currency: 'UZS',
        currencyDisplay: 'code',
        maximumFractionDigits: 0
    }).format(amount || 0).replace("UZS", '').replace(",", ' ').trim() + " UZS"
}

export const notify = (text: string, type: "error" | "success" | "warning") => {
    return toast[type](text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}
