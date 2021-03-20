export interface IPropertiesResponse{
result:string;
data:IDataInterface;
}

export interface IDataInterface{
    body:IBodyInterface;
    common:ICommonInterface;
}

export interface IBodyInterface{
header:string;
query:IQueryInterface;
searchResults:ISearchResults;
sortResults:{
    options:IOptions[];
    distanceOptionLandmarkId:number;
};
filters:IFilters;
pointOfSale:{
    currency:{
        code:string;
        symbol:string;
        separators:string;
        format:string;
    }
};
miscellaneous:{
    pageViewBeaconUrl:string;
};
pageInfo:{
    pageType:string;
};
}


export interface IFilters{
    applied:boolean;
    name:{
        item:{
            value:string;
        },
        autosuggest:{
            additionalUrlParams:{
                'resolved-location':string;
                'q-destination':string;
                'destination-id':string;
            }
        }
    };
    starRating:{
        applied:boolean;
        items:IValue[];
    };
    guestRating:{
        range:{
            min:{
                defaultValue:number;
            };
            max:{
                defaultValue:number;
            };
        }
    };
    landmarks:{
        selectedOrder;
        items:IItems[];
        distance;
    };
    neighbourhood:{
        applied:boolean;
        items:IItems[];
    };
    accommodationType:{
        applied:boolean;
        items:IItems[];
    };
    facilities:{
        applied:boolean;
        items:IItems[];
    };
    accessibility:{
        applied:boolean;
        items:IItems[];
    };
    themesAndTypes:{
        applied:boolean;
        items:IItems[];
    };
    price:{
        label:string;
        range:{
            min:{
                defaultValue:number;
            },
            max:{
                defaultValue:number;
            },
            increments:number;
        };
        multiplier:number;
    };
    paymentPreference:{
        items:IItems[];
    };
    welcomeRewards:{
        label:string;
        items:IItems[];
    };
}
export interface IItems{
    label:string;
    value:string;
    disabled?:boolean;
}
export interface IValue{
    value:number;
    applied?:boolean;
}
export interface IOptions{
    label:string;
    itemMeta:string;
    choices:IChoices[];
    enhancedChoices;
}
export interface IChoices{
    label:string;
    value:string;
    selected:boolean;
}
export interface IQueryInterface{
    destination:IDestinationInterface;
}

export interface IDestinationInterface{
    id:string;
    value:string;
    resolvedLocation:string;
}

export interface ISearchResults{
    totalCount:number;
    results:IResultInterface[];
    pagination:IPagination;
}


export interface IPagination{
    currentPage:number;
    pageGroup:string;
    nextPageNumber:number;
    nextPageGroup:string;
}
export interface IResultInterface{
    id:number;
    name:string;
    thumbnailUrl?:string;
    starRating?:number;
    urls?;
    address?:IAddressInterface
    welcomeRewards?:{
        collect:boolean;
    }
    guestReviews?:IGuestReviewsInterface;
    tripAdvisorGuestReviews?:{
        rating:number;
        total:number;
    }
    landmarks?:ILandmarksInterface[];
    ratePlan?:IRatePlanInterface;
    neighbourhood?:string;
    deals?:{
        greatRate:boolean;
        priceReasoning:string;
    };
    messaging?:{
        scarcity:string
    };
    badging?;
    pimmsAttributes?:string;
    coupon?:string;
    coordinate?:{
        lat:number;
        lon:number;
    }
    roomsLeft?:number;
    providerType?:string;
    supplierHotelId?:number;
}

export interface IRatePlanInterface{
    price:{
        current:string;
        exactCurrent:number;
        old:string;
        info:string;
        additionalInfo:string;
        totalPricePerStay:string;
    }
    features:{
        freeCancellation:boolean;
        paymentPreference:boolean;
        noCCRequired:boolean;
    };
    type:string;
}

export interface ILandmarksInterface{
    label:string;
    distance:string;
}

export interface IGuestReviewsInterface{
    unformattedRating:number;
    rating:string;
    total:number;
    scale:number;
}

export interface IAddressInterface{
    streetAddress:string;
    extendedAddress:string;
    locality:string;
    postalCode:string;
    region:string;
    countryName:string;
    countryCode:string;
}

export interface ICommonInterface{
    pointOfSale:{
        numberSeparators:string;
        brandName:string;
    };
    tracking:{
        omniture;
    };
}

