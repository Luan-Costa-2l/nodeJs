
type Product = {
    title: string,
    price: number
}

const data: Product[] = [
    { title: 'Product X', price: 10 },
    { title: 'Product Y', price: 15 },
    { title: 'Product Z', price: 20 },
    { title: 'Product X2', price: 25 },
];

export const Product = {
    getAll: (): Product[] => {
        return data;
    },
    getfromPriceAfter: (price: number): Product[] => {
        return data.filter(product => product.price >= price);
    }
};