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

export interface CheckDestinationListProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  checklist: CheckListItem[]; // checklist 배열은 별도의 타입으로 정의 가능
  familyId: number;
}
