export interface GameResponse {
    id: string;
    name: string;
    key: string;
    description: string | null;
    price: number;
    unitInStock: number;
    discount: number;
}