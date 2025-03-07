export interface NewsArticle {
    _id: string;
    pub_date: string;
    source: string;
    web_url: string;
    abstract: string;
    multimedia: {
        url: string;
    }[];
}

export interface NewsState {
    news: NewsArticle[];
    loading: boolean;
    error: string | null;
}
