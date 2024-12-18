import { API_ENDPOINTS, BASE_API_URL } from '@/utils';
import CoreAPIService from './CoreAPIService';

const {
  COMMENT: {
    GET_ALL_COMMENTS,
    GET_COMMENT,
    CREATE_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    GET_COMMENTS_FOR_POST,
  },
} = API_ENDPOINTS;

class CommentAPIService {
  private services: CoreAPIService;

  constructor(baseURL?: string) {
    this.services = new CoreAPIService(baseURL as string);
  }

  // Create a new comment
  createComment = async (data: any) => {
    const endpoint = `${CREATE_COMMENT}`; // Correct string interpolation
    return this.services.post(endpoint, data);
  };

  // Get comments for a specific post
  commentForPost = async (id: string) => {
    const endpoint = `${GET_COMMENTS_FOR_POST}?post_id=${id}`; // Correct string interpolation
    return this.services.get<any>(endpoint);
  };

  // Additional methods for other comment-related APIs can be added here
}

const CommentAPIServices = new CommentAPIService(BASE_API_URL);
export default CommentAPIServices;
