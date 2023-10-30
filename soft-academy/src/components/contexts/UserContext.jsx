import { createContext, useContext } from "react"
import { useLocalStorage } from "../Hooks/useLocalStorage"
import { userServiceFactory } from "../Services/UserService"
import { useNavigate } from "react-router-dom"
// import { Login } from "../Login/Login"
// import { Register } from "../Register/Register"

export const UserContext = createContext()


export const UserProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useLocalStorage('auth', {})
    console.log(`isAuth${isAuth}`)
    const userService = userServiceFactory(isAuth.accessToken)
    const navigate = useNavigate()
    console.log(`isA=uth${isAuth.accessToken}`)
    const onLoginSubmit = async (data) => {

        try {
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
     
            if (confirmPassword !== registerData.password) throw new Error("Please enter a password")

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
        isAuthentication: isAuth.accessToken,
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