// api type
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

// checklist component
export type CheckListItem = {
  id: number;
  checkName: string;
  content: string;
  success: boolean;
};
// checks
export type CheckListsContent = {
  checkName: string;
  content: string;
};

export interface CheckDestinationListProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  checklist: CheckListItem[]; // checklist 배열은 별도의 타입으로 정의 가능
  familyId: number;
}

export interface FetchGroupParamsType {
  token?: string;
  groupId: string;
}

export interface FamilyImageParams {
  formData: FormData;
  token?: string;
}
export interface FamilyDetailParams {
  familyId: string;
  token?: string;
}

export interface CreateFamilyRequestParams {
  token?: string; // 인증에 사용할 JWT 토큰
  formData: {
    // 서버로 보낼 데이터 (nickname 등)
    nickname: string; // 가족 이름 (닉네임)
  };
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  profileImage: string;
  nickName: string;
  familyId: number;
}

export interface TravelReviewBody {
  title: string;
  content: string;
}
// api/v1/family/all
export interface FamilyAllItemParams {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface AnniversaryItem {
  id: string;
  content: string;
  date: string;
}

export interface Member {
  id: number;
  username: string;
  email: string;
  profileImage: string;
  nickName: string;
  familyId: number;
}

export type DatePickerValue = {
  year: string;
  month: string;
  day: string;
};

export interface FeedItemProps {
  id: number;
  title: string;
  content: string;
  place: string;
  nickname: string;
  profileImage: string;
  likeCnt: number;
  createDate: string;
  imageList: string[];
  commentList: any[];
  commentCount: number;
  isLiked: boolean;
}
