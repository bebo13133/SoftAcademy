import { useParams } from "react-router-dom";
import { useCourseContext } from "../contexts/CourseContext";
import { useAuthContext } from "../contexts/UserContext";



const useCourseOwnership = (courseId) => {

    const { selectCourse,courses } = useCourseContext();
    const { userId } = useAuthContext();
  

    const currentCourse = selectCourse(courseId);

    return currentCourse && currentCourse._ownerId === userId;
  };
  export default useCourseOwnership