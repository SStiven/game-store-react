export interface CreateGameFormData {
    game: {
        name: string;
        key: string;
        description: string;
        price: number;
        unitInStock: number;
        discount: number;
    };
    genres: string[];
    platforms: string[];
    publisher: string;
}