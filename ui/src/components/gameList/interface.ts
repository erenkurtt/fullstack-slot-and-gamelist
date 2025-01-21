export interface GameListItem {
    id: string;
    slug: string;
    title: string;
    providerName: string;
    thumb: thumbObj
}

interface thumbObj {
    url: string;
}