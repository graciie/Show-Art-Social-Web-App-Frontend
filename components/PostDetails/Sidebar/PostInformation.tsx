import { axiosApi } from 'libs/commons';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';

type PostInformationProps = Pick<
  Post,
  'id' | 'title' | 'description' | 'meta'
> & {
  onLikeChange: (like: boolean) => void;
};

type PostInformation = (
  props: PostInformationProps
) => React.ReactElement<PostInformationProps>;

const fetcherLiked = (url: string) =>
  axiosApi.get<{ hasLiked: boolean }>(url).then((res) => res.data);

const PostInformation: PostInformation = ({
  id,
  title,
  description,
  meta,
  onLikeChange,
}) => {
  const { user } = useUser();
  const { data, mutate } = useSWR(
    user ? `/api/posts/${id}/like` : null,
    fetcherLiked
  );

  const likes = async () => {
    try {
      await axiosApi.post(`/api/posts/${id}/like`);
      mutate({ hasLiked: true }); // like
      onLikeChange(true);
    } catch (err) {
      console.error(err);
    }
  };
  const unlike = async () => {
    try {
      await axiosApi.delete(`/api/posts/${id}/like`);
      mutate({ hasLiked: false }); // disliking
      onLikeChange(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sidebar-userdetails prose prose-zinc dark:prose-invert max-w-full p-5 break-words">
      <h1>{title}</h1>
      <p>{description ? description : 'description...'}</p>
      {user &&
        (!data?.hasLiked ? (
          <button className="btn btn-outline btn-primary" onClick={likes}>
            Like
          </button>
        ) : (
          <button className="btn btn-outline btn-primary" onClick={unlike}>
            Unlike
          </button>
        ))}
      <p>
        views: {meta.views} likes: {meta.likes.length}
      </p>
    </div>
  );
};

export default PostInformation;
