import {
  FetchFeedsParamsType,
  FetchUserParamsType,
  CheckListsContent,
  TravelReviewBody,
} from '@/types/types';
import { fetchAPI } from '@/app/api/fetchInstance';

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;

export async function getFetchFeedList({
  page,
  size,
  token,
}: FetchFeedsParamsType) {
  if (!token) {
    throw new Error('Token is missing.');
  }

  try {
    const res = await fetch(
      `${BASE_URL}api/v1/feed/recommend/feedList?page=${page}&size=${size}&sort=string`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
      },
    );

    if (res.ok) {
      return await res.json();
    }

    // Handle error as plain text if JSON parsing fails
    const errorText = await res.text();
    throw new Error(errorText || 'Failed to fetch feed list.');
  } catch (error) {
    console.error('Error fetching feed list:', error);
    throw error;
  }
}

// Fetch user details
export async function getFetchUser({ token }: FetchUserParamsType) {
  if (!token) {
    throw new Error('Token is missing.');
  }

  try {
    const res = await fetch(`${BASE_URL}users/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    // Handle error as plain text if JSON parsing fails
    const errorText = await res.text();
    throw new Error(errorText || 'Failed to fetch user details.');
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}

// 여행일정추가
export const travelSchedulePost = async (
  name: string,
  startDate: string,
  endDate: string,
  token?: string,
) => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}api/travels`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        startDate,
        endDate,
      }),
    });

    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Failed to create itinerary: ${response.statusText}`);
  } catch (error) {
    console.error('Error: Failed to create itinerary', error);
    throw error;
  }
};

// 가족 정보
export const familyInfo = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}api/v1/family/${id}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 가족프로필이미지
export const familyImg = async (img: File, token?: string) => {
  try {
    const formData = new FormData();
    formData.append('imageFiles', img);

    const response = await fetch(`${BASE_URL}api/v1/family/profile/image`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    }
    return null; // 서버에서 오류가 발생했을 경우 null 반환
  } catch (error) {
    console.error('error', error);
    return null;
  }
};

export const familyAnniversary = async (
  anniversaryContent: string,
  anniversaryDate: string,
  id: string,
  token?: string,
) => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}api/v1/family/${id}/anniversary`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        anniversaryContent,
        anniversaryDate,
      }),
    });

    if (response.ok) {
      return await response.json();
    }
    return null; // 서버에서 오류가 발생했을 경우 null 반환
  } catch (error) {
    console.error('error ', error);
    return null; // catch 블록에서도 null 반환
  }
};

export const travelAllData = async () => {
  try {
    const response = await fetchAPI('api/travels/all', 'GET');
    console.log('API 응답:', response);
    return response; // JSON 형식의 응답 반환
  } catch (error) {
    console.error('Error fetching all travel data:', error);
    throw error;
  }
};

export const DdayData = async () => {
  try {
    const response = await fetchAPI('api/travels/d-day', 'GET');
    console.log('API 응답:', response);
    return response; // JSON 형식의 응답 반환
  } catch (error) {
    console.error('Error fetching Dday data:', error);
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const response = await fetchAPI('users/get', 'GET');
    console.log('API 응답:', response);
    return response; // JSON 형식의 응답 반환
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const familyData = async (id: string) => {
  try {
    const response = await fetchAPI(`api/v1/family/${id}`, 'GET');
    console.log('familyData 응답:', response);
    return response; // JSON 형식의 응답 반환
  } catch (error) {
    console.error('Error fetching family data:', error);
    throw error;
  }
};

export const travelData = async (id: string) => {
  try {
    const response = await fetchAPI(`api/travels/${id}`, 'GET');
    console.log('travelData 응답:', response);
    return response; // JSON 형식의 응답 반환
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

export const travelReviewData = async (id: string) => {
  try {
    const response = await fetchAPI(`api/v1/travels/${id}/reviews`, 'GET');
    console.log('travelReviewData 응답:', response);
    return response; // JSON 형식의 응답 반환
  } catch (error) {
    console.error('Error fetching travel review data:', error);
    throw error;
  }
};

export const postTravelReviewData = async (
  id: string,
  body: TravelReviewBody,
) => {
  try {
    const response = await fetchAPI(
      `api/v1/travels/${id}/reviews`,
      'POST',
      body,
    );
    console.log('travelReviewData 응답:', response);
    return response; // JSON 형식의 응답 반환
  } catch (error) {
    console.error('Error fetching travel review data:', error);
    throw error;
  }
};

export const deleteReview = async (travelId: string, reviewId: number) => {
  try {
    const response = await fetchAPI(
      `api/v1/travels/${travelId}/reviews/${reviewId}`,
      'DELETE',
    );
    console.log('deleteReview 응답:', response);
    return response;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

export const editReview = async (
  travelId: string,
  reviewId: number,
  body: { title: string; content: string },
) => {
  try {
    const response = await fetchAPI(
      `api/v1/travels/${travelId}/reviews/${reviewId}`,
      'PUT',
      body,
    );
    return response;
  } catch (error) {
    console.error('Error editing review:', error);
    throw error;
  }
};

export const deleteTravel = async (travelId: number) => {
  try {
    const response = await fetchAPI(`api/travels/${travelId}`, 'DELETE');
    console.log('deleteTravel 응답:', response);
    return response;
  } catch (error) {
    console.error('Error deleting travel:', error);
    throw error;
  }
};

export const putFamilyImage = async (img: File) => {
  try {
    const formData = new FormData();
    formData.append('imageFiles', img);
    const response = await fetchAPI(
      'api/v1/family/profile/image',
      'PUT',
      formData,
    );
    console.log('putFamilyImage 응답:', response);
    return response;
  } catch (error) {
    console.error('Error putting family image:', error);
    throw error;
  }
};

export const travelDestinationDelete = async (id: number) => {
  try {
    await fetchAPI(`api/travels/${id}`, 'DELETE');
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

// 체크리스트 입력
export const postCheckListItem = async (
  travelId: number,
  newItem: CheckListsContent,
) => {
  try {
    const response = await fetchAPI(
      `api/v1/${travelId}/checks`,
      'POST',
      newItem,
    );
    return response;
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

// 체크리스트아이템 가져오기
export const getCheckListItems = async (travelId: number) => {
  try {
    const response = await fetchAPI(`api/v1/${travelId}/checks`, 'GET');
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

// 체크리스트 삭제하기
export const deleteCheckListItem = async (
  travelId: number,
  checkId: number,
) => {
  try {
    await fetchAPI(`api/v1/${travelId}/checks/${checkId}`, 'DELETE');
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

// 체크리스트 체크 여부
export const putCheckListItem = async (
  travelId: number,
  checkId: number,
  success: boolean,
) => {
  try {
    const response = await fetchAPI(
      `api/v1/${travelId}/checks/${checkId}`,
      'PUT',
      {
        success, // 요청 본문에 success 값 포함
      },
    );
    return response;
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

// 체크리스트 여행생성 api
export const postTravels = async () => {
  try {
    const response = await fetchAPI('api/travels', 'POST');
    return response;
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

// 체크리스트 여행수정 api
export const patchTravels = async (id: number) => {
  try {
    const response = await fetchAPI(`api/travels/${id}`, 'PATCH');
    return response;
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

export const addAnniversary = async (content: string, date: string) => {
  try {
    const response = await fetchAPI('api/v1/anniversary', 'POST', {
      date,
      content,
    });
    console.log('addAnniversary 응답:', response);
    return response;
  } catch (error) {
    console.error('Error adding addAnniversary:', error);
    throw error;
  }
};

export const getFeedList = async (page: number, size: number) => {
  try {
    const response = await fetchAPI(
      `api/v1/feed/recommend/feedList?page=${page}&size=${size}&sort=string`,
      'GET',
    );
    console.log('getFeedList 응답:', response);
    return response;
  } catch (error) {
    console.error('Error fetching feedList data:', error);
    throw error;
  }
};

export const getFetchPersonalFeedList = async (page: number, size: number) => {
  try {
    const response = await fetchAPI(
      `api/v1/feed/feedList?page=${page}&size=${size}&sort=string`,
      'GET',
    );
    console.log('getPersonalFeedList 응답:', response);
    return response;
  } catch (error) {
    console.error('Error fetching feedList data:', error);
    throw error;
  }
};

export const getGroupFeedList = async (page: number, size: number) => {
  try {
    const response = await fetchAPI(
      `api/v1/feed/family/feedList?page=${page}&size=${size}&sort=string`,
      'GET',
    );
    console.log('getGroupFeedList 응답:', response);
    return response;
  } catch (error) {
    console.error('Error fetching group feedList data:', error);
    throw error;
  }
};

export const likeFeed = async (feedId: number) => {
  try {
    const response = await fetchAPI(`api/v1/feed/${feedId}/like`, 'POST');
    console.log('likeFeed 응답:', response);
    return response;
  } catch (error) {
    console.error('Error liking feed:', error);
    throw error;
  }
};

export const removeLikeFromFeed = async (feedId: number) => {
  try {
    const response = await fetchAPI(`api/v1/feed/${feedId}/removeLike`, 'POST');
    console.log('removeLikeFromFeed 응답:', response);
    return response;
  } catch (error) {
    console.error('Error Removing like from feed:', error);
    throw error;
  }
};

export const getAlarmList = async () => {
  try {
    const response = await fetchAPI('/users/get', 'GET');
    console.log('getAlarmList 응답:', response);
    return response;
  } catch (error) {
    console.error('Error getting alarm list:', error);
    throw error;
  }
};

// Fetch feed detail
export async function getFetchFeedDetail(id: string) {
  try {
    const response = await fetchAPI(`api/v1/feed/${id}`, 'GET');
    console.log('getFetchFeedDetail 응답:', response);
    return response;
  } catch (error) {
    console.error('Error fetching feed data:', error);
    throw error;
  }
}

export async function likeComment(id: number) {
  try {
    const response = await fetchAPI(`api/v1/comment/like/${id}`, 'GET');
    console.log('likeComment 응답:', response);
    return response;
  } catch (error) {
    console.error('Error liking commet:', error);
    throw error;
  }
}
export async function removeLikeFromComment(id: number) {
  try {
    const response = await fetchAPI(`api/v1/comment/removeLike/${id}`, 'GET');
    console.log('removeLikeFromComment 응답:', response);
    return response;
  } catch (error) {
    console.error('Error removing like from comment:', error);
    throw error;
  }
}

export const addComment = async (comment: string, feedId: string) => {
  try {
    const response = await fetchAPI(
      `api/v1/comment/${feedId}`,
      'POST',
      comment,
    );
    console.log('addComment 응답:', response);
    return response;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    const response = await fetchAPI(`api/v1/comment/${commentId}`, 'DELETE');
    console.log('deleteComment 응답:', response);
    return response;
  } catch (error) {
    console.error('Error deleting comment :', error);
    throw error;
  }
};

export const creatFeed = async (apiFormData: any) => {
  try {
    const response = await fetchAPI('api/v1/feed', 'POST', apiFormData);
    console.log('CreatFeed 응답:', response);
    return response;
  } catch (error) {
    console.error('Error creating feed :', error);
    throw error;
  }
};

export const createFamily = async (familyName: any) => {
  try {
    const response = await fetchAPI('api/v1/family', 'POST', familyName);
    console.log('createFamily 응답:', response);
    return response;
  } catch (error) {
    console.error('Error creating family :', error);
    throw error;
  }
};

export const updateFamilyProfileImage = async (formData: FormData) => {
  try {
    const response = await fetchAPI(
      'api/v1/family/profile/image',
      'PUT',
      formData,
    );
    console.log('updateFamilyProfileImage 응답:', response);
    return response;
  } catch (error) {
    console.error('Error updating family image :', error);
    throw error;
  }
};

export const getAllFamily = async () => {
  try {
    const response = await fetchAPI('api/v1/family/all', 'GET');
    console.log('getAllFamily 응답:', response);
    return response;
  } catch (error) {
    console.error('Error fetching families:', error);
    throw error;
  }
};

export async function getFamilyDetail(familyId: string) {
  try {
    const response = await fetchAPI(`api/v1/family/${familyId}`, 'GET');
    console.log('getFamilyDetail 응답:', response);
    return response;
  } catch (error) {
    console.error('Error fetching familily detail:', error);
    throw error;
  }
}

export async function joinFamilyDetail(familyId: string) {
  try {
    const response = await fetchAPI(`api/v1/family/${familyId}/join`, 'POST');
    console.log('joinFamilyDetail 응답:', response);
    return response;
  } catch (error) {
    console.error('Error joining family:', error);
    throw error;
  }
}

export const changeNickname = async (nickname: any) => {
  try {
    const response = await fetchAPI('users/update', 'POST', nickname);
    console.log('changeNickname 응답:', response);
    return response;
  } catch (error) {
    console.error('Error changing name :', error);
    throw error;
  }
};
