declare type JSONPrimitive = string | number | boolean | null;
declare type JSONCustom = Date;
declare type JSONValue = JSONPrimitive | JSONObject | JSONArray | JSONCustom;
declare type JSONObject = { [key: string]: JSONValue };
declare type JSONArray = Array<JSONValue>;

declare type PaginatedData<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page?: number;
  totalPages: number;
  offset?: number;
  prevPage: number | null;
  nextPage: number | null;
  pagingCounter: number;
};

declare type InfiniteKeyLoader<T> = (
  index: number,
  previousPageData: T | null
) => string | null | undefined | false;

declare type InfiniteFetcher<
  D extends object,
  K = InfiniteKeyLoader<D>
> = ReturnType<K> extends infer S | null | false | undefined
  ? (arg0: S) => D | Promise<D>
  : never;

declare type User = {
  id: string;
  username: string;
  email: string;
  emailVerified?: boolean;
  picture: string;
  details?: {
    bio?: string;
    workplace?: string;
    socials?: {
      twitter?: string;
      facebook?: string;
      website?: string;
    };
    location?: {
      city?: string;
      country?: string;
    };
  };
  posts: Post[];
  likedPosts: Post[];
  followers: User[];
  following: User[];
  countPosts: number;
  countLikedPosts: number;
  countFollowers: number;
  countFollowings: number;
};

type PostVisibility = 'public' | 'private';

declare type PostComment = {
  id: string;
  user: Pick<User, 'id' | 'username' | 'picture'>;
  comment: string;
  date: string;
};

declare type Post = {
  id: string;
  title: string;
  owner: User;
  image: string;
  description?: string;
  visibility: PostVisibility;
  date: string;
  tags: Tag[];
  meta: {
    likes: User[];
    views: number;
  };
  comments: PostComment[];
  countLikes: number;
  countComments: number;
};

declare type Tag = {
  name: string;
  description?: string;
  posts: Post[];
};

declare type PaginatedPosts = PaginatedData<Post>;
