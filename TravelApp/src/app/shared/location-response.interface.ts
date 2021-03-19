

export interface ILocationResponse{
    term:string;
    moresuggestions:number;
    autoSuggestInstance;
    trackingID:string;
    misspellingfallback;
    suggestions:ISuggestion[];

}

export interface ISuggestion{
group:string;
entities:ISuggestionItem[];
}

export interface ISuggestionItem{
    geoId:string;
    destinationId:string;
    landmarkCityDestinationId;
    type:string;
    caption:string;
    redirectPage:string;
    latitude:number;
    longitude:number;
    name:string;
}

export interface IQuery{
    query:string;
    checkIn:string;
    checkOut:string;
    adults1?:number;
}