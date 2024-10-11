const BASE_URL = 'http://13.209.88.22:8080/';
// const NEXT_PUBLIC_BASE_URL =
//   process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // 기본값 설정

export interface FetchFeedsParamsType {
  page: number;
  size: number;
  token?: string;
}

export interface FetchFeedParamsType {
  id: string;
  token?: string;
}

export interface FetchUserParamsType {
  token?: string;
}

export interface LikeRequestParams {
  feedId: number;
  token: string;
}
export interface CommentLikeRequestParams {
  commentId: number;
  token: string;
}

// Fetch feed list
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
