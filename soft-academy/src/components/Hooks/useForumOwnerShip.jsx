

import { useForumContext } from "../contexts/ForumContext";
import { useAuthContext } from "../contexts/UserContext";


const useForumOwnerShip = (forumId) => {

    const { selectForum,courses } = useForumContext();
    const { userId } = useAuthContext();
  

    const currentCourse = selectForum(forumId);


    return currentCourse && currentCourse._ownerId === userId;
  };
  export default useForumOwnerShip