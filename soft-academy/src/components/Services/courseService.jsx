import { requestFactory } from "./requester"

const baseUrl = `http://localhost:3030/data/courses`

export const courseServiceFactory = (token) => {
    const request = requestFactory(token)

    const getAll = async () => {
        const result = await request.get(baseUrl)

        const courses = Object.values(result)
        return courses
    }

    const getOne = async (courseId) => {
        const oneCourse = await request.get(`${baseUrl}/${courseId}`)

        return oneCourse

    }

    const create = async (courseData) => {

        const result = await request.post(baseUrl, courseData)
        return result
    }
    const deleteCourse = (courseId) => request.del(`${baseUrl}/${courseId}`)
    const updateCourse = (courseId, data) => request.put(`${baseUrl}/${courseId}`, data)
    return {
        getAll,
        create,
        getOne,
        delete: deleteCourse,
        update: updateCourse,
    }

}