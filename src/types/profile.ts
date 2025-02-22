
export interface ProfileData {
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  social_links: Record<string, string>;
  wishlist_public: boolean;
  followers_count: number;
  following_count: number;
}
