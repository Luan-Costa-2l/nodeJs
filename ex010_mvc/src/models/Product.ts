
type Product = {
    title: string,
    price: number
}

const data: Product[] = [
    { title: 'Product X', price: 10 },
    { title: 'Product Y', price: 15 },
    { title: 'Product Z', price: 20 },
];

export const Product = {
    getAll: (): Product[] => {
        return data;
    }
};