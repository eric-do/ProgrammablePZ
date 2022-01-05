import { SetState } from  'zustand';
import { useStore, StoreState } from 'store'
import { User } from '../types';
import {
  getFollowers,
  getFollowing,
  getSocialMetadata
} from 'features/profile/api'

interface RequestParams {
  id: string | undefined;
  limit: number;
  offset: number;
}

export interface SocialState {
  followers: User[];
  following: User[];
  followingCount: number;
  followerCount: number;
  setFollowers: (options: RequestParams) => void;
  setFollowing: (options: RequestParams) => void;
  setMetadata: ({ id }: { id: string }) => void;
  resetSocial: () => void;
}

export const createSocialSlice: any = (set: SetState<StoreState>) => ({
  followers: [],
  following: [],
  followingCount: 0,
  followerCount: 0,
  setFollowers: async ({ id, limit, offset }: RequestParams) => {
    if (id) {
      const followers = await getFollowers({ user_id: id, limit, offset });
      set({ followers });
    }
  },
  setFollowing: async ({ id, limit, offset }: RequestParams) => {
    if (id) {
      const following = await getFollowing({ user_id: id, limit, offset });
      set({ following });
    }
  },
  setMetadata: async ({ id }: { id: string }) => {
    const {
      friend_count: followingCount,
      follower_count: followerCount
    } = await getSocialMetadata(id);
    set({ followingCount, followerCount });
  },
  resetSocia: () => {
    set({
      followers: [],
      following: []
    })
  }
})