
export interface IReviewsResponse{
result:string;
reviewData:IReviewData;
}

export interface IReviewData{
    guestReviewGroups:{
        guestReviewPagination;
        guestReviewOverview;
        guestReviews:IHotelGuestReviews[];
    };
    hotelId:string;
    omniture;
}

export interface IHotelGuestReviews{
id:string;
title:string;
reviews:IReview[];
}

export interface IReview{
    recommendedBy:string;
    rating:number;
    formattedRating:string;
    qualitativeBadgeText:string;
    postedOn:string;
    title:string;
    summary:string;
    reviewType:string;
}