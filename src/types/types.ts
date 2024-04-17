import { ReactNode } from "react";

export interface ContentLayoutProps {
    path: string;
    icon: ReactNode;
    text: string
}
export interface StaffsType {
    id: string
    name: string
    surname: string
    login: string
    role: string
    created_at: Date
}
export interface AddModalProps {
    isOpen: boolean
    setIsOpen: (arg: boolean) => void
}
export interface ProductType {
    id: string
    img_url: string
    name: string
    price: number
    weight: number
}
export interface MeatsType {
    id: string
    name: string
    price: string
    img_url: string
}
export interface OrdersType {
    id: string
    count: number
    name: string
    price: number
    img_url: string
}
export interface EditModalType {
    id: string
    isOpen: boolean
    setData: (arg: boolean) => void
}
