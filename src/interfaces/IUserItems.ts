export interface User {
  user_id: string;
  profile_image: string;
  display_name: string;
  reputation: number;
  last_access_date: number;
  location: string;
}

export interface UserItemsProps {
  users: User[];
  blockedUsers: string[];
  followedUsers: string[];
  clickedProfileId: string | null;
  toggleFollowUser: (userId: string) => void;
  toggleBlockUser: (userId: string) => void;
  convertTimestampToDate: (timestamp: number) => string;
}