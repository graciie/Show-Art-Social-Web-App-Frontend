import React from 'react';
import Image from 'next/image';
import Sidebar from './Sidebar/Sidebar';
import { usePost } from 'data/use-post';
import { axiosApi } from 'libs/commons';
import styles from './PostDetails.module.css';
import Loading from '@/Loading';

type PostDetailsProps = {
  id: string;
};

type PostDetails = (
  props: PostDetailsProps
) => React.ReactElement<PostDetailsProps>;

/**
 * Composant des détails d'un post.
 *
 * @author Roger Montero
 */
const PostDetails: PostDetails = ({ id }) => {
  const { post, mutate } = usePost(id);

  if (!post) return <Loading />;

  /**
   * Fonction pour envoyer un commentaire et update la liste de commentaires local.
   *
   * @author Roger Montero
   */
  const handleSendComment = async (comment: string) => {
    try {
      const res = await axiosApi.post<PostComment[]>(
        `/api/posts/${id}/comment`,
        { comment }
      );
      mutate({ ...post, comments: res.data });
    } catch (err) {
      // failed to post comment
      console.log(err);
    }
  };

  /**
   * Fonction pour mettre à jour localement le nombre de likes du post.
   *
   * @author Roger Montero
   */
  const handleLikeChange = async (hasLiked: boolean) => {
    const count = hasLiked ? post.countLikes + 1 : post.countLikes - 1;
    mutate({ ...post, countLikes: count });
  };

  return (
    <div className={styles['content-view']}>
      <div className={styles['content-image']}>
        <Image
          src={post.image}
          alt="Album"
          layout="fill"
          className="object-contain object-center"
        />
      </div>
      <div className={styles['content-sidebar']}>
        <div className="relative overflow-hidden p-2 h-full bg-gradient-to-tr from-base-100 to-base-300">
          <div className="overflow-y-auto overflow-x-hidden scroll-smooth scroll-py-6 h-full scrollbar scrollbar-thin scrollbar-thumb-slate-900">
            <Sidebar
              post={post}
              onSendComment={handleSendComment}
              onLikeChange={handleLikeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
