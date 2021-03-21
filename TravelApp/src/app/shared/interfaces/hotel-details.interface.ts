
export interface IDetailsResponse{
    result:string;
    data:IData;
    transportation?:ITransport;
    neighborhood?:INeighborhood;
}

export interface IData{
    body:IBody;
    common;
}

export interface IBody{
    phpHeader;
            overview?:{
                overviewSections:IOverviewSection[];
            };
            hotelWelcomeRewards?:IHotelWelcomeRewards;
            propertyDescription?:IProperty;
            guestReviews?:IGuestReviews;
            atAGlance?:{
                keyFacts?:{
                    hotelSize?:string[];
                };
                travellingOrInternet?:{
                    travelling?:{
                        children?;
                        pets?;
                        extraPeople?;
                    };
                    internet?:string[];
                };
                transportAndOther?;
            };
            amenities?;
            smallPrint?;
            roomsAndRates?:IRoomsAndRates;
            specialFeatures?;
            miscellaneous?;
            pageInfo?;
            trustYouReviewsCredit?:boolean;
            hotelBadge?;
}

export interface IRoomsAndRates{
    bookingUrl:string;
    rooms:IRooms[];
    ratePlanWithOffersExists:boolean;
    priceColumnHeading:string;
}

export interface IRooms{
name:string;
images:IImages[];
bedChoices;
maxOccupancy;
additionalInfo;
ratePlans;
}
export interface IImages{
    caption:string;
    thumbnailUrl:string;
    fullSizeUrl:string;
}
export interface IGuestReviews{
    brands:IBrands;
    trustYouReviews:ITrustReviews[];
    tripAdvisor;
}
export interface IBrands{
    scale:number;
    formattedScale:string;
    rating:number;
    formattedRating:string;
    lowRating:boolean;
    badgeText:string;
    total:number;
}
export interface ITrustReviews{
    categoryName:string;
    percentage:string;
    text:string;
    sentiment:string;
}
export interface IProperty{
    clientToken:string;
    address;
    priceMatchEnabled:boolean;
    name:string;
    starRatingTitle:string;
    starRating:number;
    featuredPrice:IFeaturedPrice;
    mapWidget;
    roomTypeNames:string[];
    tagline;
    freebees;
}
export interface IFeaturedPrice{
    pricingTooltip:string;
    currentPrice:{
        formatted:string;
        plain:number;
        oldPrice:string;
        priceInfo:string;
        taxInclusiveFormatting:boolean;
        offer;
        bookNowButton;
    };
    oldPrice:string;
    priceInfo:string;
    offer;
    bookNowButton;
}
export interface IHotelWelcomeRewards{
applies:boolean;
info:string;
}

export interface IOverviewSection{
    title:string;
    type:string;
    content:string[];
    contentType:string;
}



export interface ITransport{
    transportLocations:ITransportLocation[];

}

export interface ITransportLocation{
category:string;
locations:ILocations[];

}
export interface ILocations{
    name:string;
    distance:string;
    distanInTime:string;
}
export interface INeighborhood{
    neighborhoodName:string;
}