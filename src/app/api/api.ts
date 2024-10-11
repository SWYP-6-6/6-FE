import {
  FetchFeedParamsType,
  FetchFeedsParamsType,
  FetchUserParamsType,
  LikeRequestParams,
  CommentLikeRequestParams,
} from '@/types/types';

import { fetchAPI } from '@/app/api/fetchInstance';

const BASE_URL = 'http://13.209.88.22:8080/';

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

export async function getFetchPersonalFeedList({
  page,
  size,
  token,
}: FetchFeedsParamsType) {
  if (!token) {
    throw new Error('Token is missing.');
  }

  try {
    const res = await fetch(
      `${BASE_URL}api/v1/feed/feedList?page=${page}&size=${size}&sort=string`,
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

// Fetch feed detail
export async function getFetchFeedDetail({ id, token }: FetchFeedParamsType) {
  if (!token) {
    throw new Error('Token is missing.');
  }

  try {
    const res = await fetch(`${BASE_URL}api/v1/feed/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    // Handle error as plain text if JSON parsing fails
    const errorText = await res.text();
    throw new Error(errorText || 'Failed to fetch feed detail.');
  } catch (error) {
    console.error('Error fetching feed detail:', error);
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

// Fetch user details
export async function getFetchGroup({ token, groupId }: FetchGroupParamsType) {
  if (!token) {
    throw new Error('Token is missing.');
  }

  try {
    const res = await fetch(`${BASE_URL}api/v1/family/${groupId}`, {
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
    throw new Error(errorText || 'Failed to fetch Group details.');
  } catch (error) {
    console.error('Error fetching Group details:', error);
    throw error;
  }
}

// Like feed
export const likeFeed = async ({ feedId, token }: LikeRequestParams) => {
  try {
    const response = await fetch(`${BASE_URL}api/v1/feed/${feedId}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    });

    if (response.ok) {
      return await response.json();
    }

    const errorText = await response.text();
    throw new Error(errorText || 'Failed to like the feed.');
  } catch (error) {
    console.error('Error liking feed:', error);
    throw error;
  }
};

// Remove like from feed
export const removeLikeFromFeed = async ({
  feedId,
  token,
}: LikeRequestParams) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/v1/feed/${feedId}/removeLike`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
      },
    );

    if (response.ok) {
      return await response.json();
    }

    // Handle error as plain text if JSON parsing fails
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to remove like from the feed.');
  } catch (error) {
    console.error('Error removing like from feed:', error);
    throw error;
  }
};

export const likeComment = async ({
  commentId,
  token,
}: CommentLikeRequestParams) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/v1/comment/like/${commentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
      },
    );

    if (response.ok) {
      return await response.json();
    }

    const errorText = await response.text();
    throw new Error(errorText || 'Failed to like the commet.');
  } catch (error) {
    console.error('Error liking commet:', error);
    throw error;
  }
};

// Remove like from feed
export const removeLikeFromComment = async ({
  commentId,
  token,
}: CommentLikeRequestParams) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/v1/comment/removeLike/${commentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
      },
    );

    if (response.ok) {
      return await response.json();
    }

    // Handle error as plain text if JSON parsing fails
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to remove like from the comment.');
  } catch (error) {
    console.error('Error removing like from comment:', error);
    throw error;
  }
};

export const createFamily = async ({
  token,
  formData,
}: CreateFamilyRequestParams) => {
  try {
    const response = await fetch(`${BASE_URL}api/v1/family`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
      body: JSON.stringify({ familyName: formData.nickname }),
    });

    // 오류가 발생했을 때 (status 400 또는 500대)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to create family.');
    }

    // 성공하면 JSON 데이터를 반환
    return await response.json();
  } catch (error) {
    console.error('Error creating family:', error);
    throw error; // 오류를 다시 throw해서 catch로 전달
  }
};

export const updateFamilyProfileImage = async ({
  token,
  formData,
}: FamilyImageParams) => {
  const response = await fetch(`${BASE_URL}api/v1/family/profile/image`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to update family profile image.');
  }
};

export async function getAllFamily({ token }: FetchUserParamsType) {
  if (!token) {
    throw new Error('Token is missing.');
  }

  try {
    const res = await fetch(`${BASE_URL}api/v1/family/all`, {
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
    throw new Error(errorText || 'Failed to fetch families.');
  } catch (error) {
    console.error('Error fetching families:', error);
    throw error;
  }
}

export async function getFamilyDetail({ token, familyId }: FamilyDetailParams) {
  if (!token) {
    throw new Error('Token is missing.');
  }

  try {
    const res = await fetch(`${BASE_URL}api/v1/family/${familyId}`, {
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
    throw new Error(errorText || 'Failed to fetch family detail.');
  } catch (error) {
    console.error('Error fetching family detail:', error);
    throw error;
  }
}

export async function joinFamilyDetail({
  token,
  familyId,
}: FamilyDetailParams) {
  if (!token) {
    throw new Error('Token is missing.');
  }

  try {
    const res = await fetch(`${BASE_URL}api/v1/family/${familyId}/join`, {
      method: 'POST',
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
    throw new Error(errorText || 'Failed to join family.');
  } catch (error) {
    console.error('Error joining family:', error);
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
    console.error('Error fetching travel data:', error);
    throw error;
  }
};
