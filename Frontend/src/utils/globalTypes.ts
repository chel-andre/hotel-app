export interface hotelDataType{
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    isFeatured: boolean;
    starRating: number;
    imageUrl: string[];
    lastUpdated: Date;
}