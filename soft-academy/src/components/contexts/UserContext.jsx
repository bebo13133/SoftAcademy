import { createContext, useContext, useState,useCallback } from "react"
import { useLocalStorage } from "../Hooks/useLocalStorage"
import { userServiceFactory } from "../Services/userService"
import { useNavigate } from "react-router-dom"
// import { Login } from "../Login/Login"
// import { Register } from "../Register/Register"

export const UserContext = createContext()


export const UserProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useLocalStorage('auth', {})
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); //error messages

    const userService = userServiceFactory(isAuth.accessToken)
    const navigate = useNavigate()
   

    const onLoginSubmit = async (data) => {

        try {
            if (!data.password || !data.email) {
             
                setErrorMessage("Some fields is empty")
            
                setTimeout(() => {
                    setErrorMessage('');
                  }, 4000);
            
                  return;
            }
            if (data.password.length <= 5) {
            
                setErrorMessage("Minimum characters is 5")
            
                setTimeout(() => {
                    setErrorMessage('');
                  }, 4000);
            
                  return;
            } 
            const newUser = await userService.login(data)
            setIsAuth(newUser)
            navigate("/")
        } catch (err) {
            // console.log("PROBLEM")
            throw new Error(err.message)
        }

    }

    const onRegisterSubmit = async (data) => {


        try {
            const { confirmPassword, ...registerData } = data

            if (confirmPassword !== registerData.password){
              
                setErrorMessage("Please enter a valid password email")
            
                setTimeout(() => {
                    setErrorMessage('');
                  }, 4000);
            
                  return;
            }
            if (!confirmPassword || !registerData.password || !registerData.email){
                setErrorMessage("Some fields is empty")
            
                setTimeout(() => {
                    setErrorMessage('');
                  }, 4000);
            
                  return;
            }
            if (confirmPassword.length <= 5 || registerData.password.length <= 5) {
                setErrorMessage("Minimum characters is 5")
            
                setTimeout(() => {
                    setErrorMessage('');
                  }, 4000);
            
                  return;
            }
            const newUser = await userService.register(registerData)
            setIsAuth(newUser)
            navigate("/")

        } catch (err) {
            throw new Error(err.message)
        }

    };

    const onChangePassword = async (data)=>{

        const {oldPassword, confirmPassword, ...registerData } = data

        try{

            const userId = isAuth._id
            const newPass = await userService.changePassword(userId, registerData.newPassword)
           
        }catch (err) {
            throw new Error(err.message)
        }

    }


    const onLogout = () => {
        try {
            userService.logout()
            setIsAuth({})
        } catch (err) {
            throw new Error(err.message)

        }
    }

    const updateAvatarUrl = useCallback((newUrl) => {
      setAvatarUrl(newUrl);
    }, []);   // ползвам го за да сменя снимката на аватара в реално време ,като при зареждане на сайта съм сложил заявка която да я вземе от firebase
  



    const contextService = {
        onLoginSubmit,
        avatarUrl,
        updateAvatarUrl,
        userId: isAuth._id,
        userEmail: isAuth.email,
        token: isAuth.accessToken,
        isAuthentication: !!isAuth.accessToken,
        onRegisterSubmit,
        onLogout,
        onChangePassword
    }

    return (

        <UserContext.Provider value={contextService}>

       
            {children}

            {errorMessage && (
        <div className={`error-message ${errorMessage && 'show-error custom-style'}`}>
          <p>{errorMessage}</p>
        </div>
      )}
        </UserContext.Provider>

    )


}
export const useAuthContext = () => {
    const context = useContext(UserContext);

    return context;
};