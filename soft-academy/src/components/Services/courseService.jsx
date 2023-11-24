import { requestFactory } from "./requester"

const baseUrl = `http://localhost:3030/data/courses`
const baseUrl2 = `http://localhost:3030/data/students`
const baseUrl3 = `http://localhost:3030/data/payments`

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

// signUp form //
const signup = async (data) => await request.post(baseUrl2,data)


const getAllStudentsPerCourse = async (courseId) => {
 const response = await request.get(`${baseUrl2}?where=courseId%3D%22${courseId}%22`)
 const result = Object.values(response)

 return result

}

//payments///
const pay = async(data) => request.post(baseUrl3,data)


const getAllStudentsPayment = async (courseId) =>{
    const response = await request.get(`${baseUrl3}?where=courseId%3D%22${courseId}%22`)
    const result=Object.values(response)
return result
}



const getAllPaymentsByUser = async(userId) => {
    const response = await request.get(`${baseUrl3}?where=userId%3D%22${userId}%22`)
    const result = Object.values(response)
    return result
}
    return {
        getAll,
        create,
        getOne,
        delete: deleteCourse,
        update: updateCourse,
        signup,
        pay,
        getAllStudentsPerCourse,
        getAllStudentsPayment,
        getAllPaymentsByUser
    }

}