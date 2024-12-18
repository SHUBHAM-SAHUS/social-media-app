import { PostAPIServices } from '@/api-services';
import CommentAPIServices from '@/api-services/CommentAPIService';
import { useQuery } from 'react-query';

const useGetUserPost = (userId: string) => {
  const fetchPostsWithComments = async (): Promise<any[]> => {
    if (!userId) return [];

    try {
      const posts = await PostAPIServices.userPost(userId);


      const postsWithComments = await Promise.all(
        posts.map(async (post: any) => {
          try {
            const comments = await CommentAPIServices.commentForPost(post.id);
            return { ...post, comments };
          } catch {
            return { ...post, comments: [] }; // Default to empty comments on error
          }
        }),
      );

      return postsWithComments;
    } catch (error: any) {
      throw error;
    }
  };

  const {
    data: postsWithComments,
    isLoading,
    error,
    refetch,
  } = useQuery(['userPostsWithComments', userId], fetchPostsWithComments, {
    enabled: !!userId, // Fetch only if userId exists
  });

  return {
    posts: postsWithComments || [],
    isLoading,
    error,
    refetch,
  };
};

export default useGetUserPost;
