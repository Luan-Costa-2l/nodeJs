
export const Math = {
    sum: (n1: number, n2: number): number => {
        return n1 + n2;
    },
    sub: (n1: number, n2: number): number => {
        return n1 - n2;
    },
    mut: (n1: number, n2: number): number => {
        return n1 * n2;
    },
    div: (n1: number, n2: number): number | false => {
        return (n2 === 0) ? false : n1 / n2;
    }
}