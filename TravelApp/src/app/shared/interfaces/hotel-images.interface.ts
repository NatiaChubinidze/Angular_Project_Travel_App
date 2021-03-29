export interface IPhotos{
    hotelId:string;
    hotelImages:IHotelImage[];
    roomImages;
    featuredImageTrackingDetails;
    propertyImageTrackingDetails;
}

export interface IHotelImage{
    baseUrl:string;
    imageId:number;
    mediaGUID:string;
    sizes;
    trackingDetails;
}