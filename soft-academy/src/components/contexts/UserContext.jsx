import { createContext, useContext } from "react"
import { useLocalStorage } from "../Hooks/useLocalStorage"
import { userServiceFactory } from "../Services/UserService"
import { useNavigate } from "react-router-dom"
// import { Login } from "../Login/Login"
// import { Register } from "../Register/Register"

export const UserContext = createContext()


export const UserProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useLocalStorage('auth', {})

    const userService = userServiceFactory(isAuth.accessToken)
    const navigate = useNavigate()

    const onLoginSubmit = async (data) => {

        try {
            if (!data.password || !data.email) return alert("Some fields is empty")
            if (data.password.length <= 5) return alert("Minimum characters is 6")
            const newUser = await userService.login(data)
            setIsAuth(newUser)
            navigate("/catalog")
        } catch (err) {
            console.log("PROBLEM")

        }

    }

    const onRegisterSubmit = async (data) => {


        try {
            const { confirmPassword, ...registerData } = data

            if (confirmPassword !== registerData.password) return alert("Please enter a valid passwordor email")
            if (!confirmPassword || !registerData.password || !registerData.email) return alert("Some fields is empty")
            if (confirmPassword.length <= 5 || registerData.password.length <= 5) return alert("Minimum characters is 6")
            const newUser = await userService.register(registerData)
            setIsAuth(newUser)
            navigate("/catalog")

        } catch (err) {
            throw new Error(err.message)
        }

    };

    const onLogout = () => {
        try {
            userService.logout()

            setIsAuth({})

        } catch (err) {
            throw new Error(err.message)

        }

    }
    const contextService = {
        onLoginSubmit,
        userId: isAuth._id,
        userEmail: isAuth.email,
        token: isAuth.accessToken,
        isAuthentication: !!isAuth.accessToken,
        onRegisterSubmit,
        onLogout


    }

    return (

        <UserContext.Provider value={contextService}>

            {/* <Login /> */}
            {/* <Register/> */}
            {children}
        </UserContext.Provider>

    )


}
export const useAuthContext = () => {
    const context = useContext(UserContext);

    return context;
};