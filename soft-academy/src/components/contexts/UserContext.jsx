import { createContext, useContext, useState, useCallback } from "react"
import { useLocalStorage } from "../Hooks/useLocalStorage"
import { userServiceFactory } from "../Services/userService"
import { useNavigate } from "react-router-dom"
import emailjs from '@emailjs/browser'
import {v4} from "uuid"
// import { Login } from "../Login/Login"
// import { Register } from "../Register/Register"

export const UserContext = createContext()


export const UserProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useLocalStorage('auth', {})
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchResult, setSearchResult] = useState([])
    // const [voucherCodes,setPromoCodes] = useState([])
    const voucherCodes =[]
  
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
        confirmPassword:false,
      });

    
    const [users, setUsers] = useState([])
    // console.log("errorMessage",errorMessage)
    const userService = userServiceFactory(isAuth.accessToken)
    const navigate = useNavigate()


    const onLoginSubmit = async (data) => {

        try {

            if (!data.email && !data.password) {
                setErrorMessage("Some fields is empty")
                setFormErrors({ password:true,email: true})

              
                setTimeout(() => {
                    setErrorMessage('');
                    setFormErrors({ password:false,email: false})
                }, 4000);

                return;
            }
            if (!data.email ) {
                setErrorMessage("Some fields is empty")
                setFormErrors(state=>({ ...state,email: true}))
              
                setTimeout(() => {
                    setErrorMessage('');
                    setFormErrors(state=>({ ...state,email: false}))
                }, 4000);

                return;
            }
            if (!data.password ) {
                setErrorMessage("Some fields is empty")
                setFormErrors(state=>({ ...state,password: true}))
              
                setTimeout(() => {
                    setErrorMessage('');
                setFormErrors(state=>({ ...state,password: false}))

                }, 4000);

                return;
            }
            if (data.password.length <= 5) {

                setErrorMessage("Minimum characters is 5")
                setFormErrors(state=>({ ...state,
                    password: true}))
                setTimeout(() => {
                    setErrorMessage('');
                    setFormErrors(state=>({ ...state,password: false}))

                }, 4000);

                return;
            }
            if (data.email.length <= 9) {

                setErrorMessage("Minimum characters is 9")
                setFormErrors(state=>({ ...state,email: true}))

                setTimeout(() => {
                    setErrorMessage('');
                setFormErrors(state=>({ ...state,email: false}))

                }, 4000);

                return;
            }
            const users = await userService.getAll()
            setUsers(users)

            const newUser = await userService.login(data)
            setIsAuth(newUser)
            navigate("/")
        } catch (err) {


            if (err.code === 403) {
                setErrorMessage("Please enter a valid password or email address")
                setTimeout(() => {
                    setErrorMessage('');
                }, 4000);
            } else {
                throw new Error(err.message)
            }

        }

    }

    const onRegisterSubmit = async (data) => {


        try {
            const { confirmPassword, ...registerData } = data

           
            if (!confirmPassword && !registerData.password && !registerData.email) {
                setErrorMessage("Some fields is empty")
                setFormErrors({ password:true,confirmPassword: true, email:true})

                setTimeout(() => {
                    setErrorMessage('');
                setFormErrors({ password:false,confirmPassword: false, email:false})

                }, 4000);

                return;
            }
            if (!registerData.email) {
                setErrorMessage("Some fields is empty")
                setFormErrors(state=>({ ...state,email: true}))


                setTimeout(() => {
                    setErrorMessage('');
                setFormErrors(state=>({ ...state,email: false}))

          

                }, 4000);

                return;
            }
            if ( !registerData.password) {
                setErrorMessage("Some fields is empty")
                setFormErrors(state=>({ ...state,password: true}))


                setTimeout(() => {
                    setErrorMessage('');
                setFormErrors(state=>({ ...state,password: false}))
      
                }, 4000);

                return;
            }
            if ( !confirmPassword) {
                setErrorMessage("Some fields is empty")
                setFormErrors(state=>({ ...state,confirmPassword: true}))


                setTimeout(() => {
                    setErrorMessage('');
                setFormErrors(state=>({ ...state,confirmPassword: false}))
      
                }, 4000);

                return;
            }
            if (confirmPassword !== registerData.password) {

                setErrorMessage("Please enter a valid password email")
                setFormErrors({ password:true,confirmPassword: true})

                setTimeout(() => {
                    setErrorMessage('');
                setFormErrors({ password:false,confirmPassword: false})

                }, 4000);

                return;
            }
            if (confirmPassword.length <= 5 || registerData.password.length <= 5) {
                setErrorMessage("Minimum characters is 5")
                setFormErrors({ password:true,confirmPassword: true})

                setTimeout(() => {
                    setErrorMessage('');
                setFormErrors({ password:false,confirmPassword: false})

                }, 4000);

                return;
            }
            if (data.email.length <= 9) {
                setFormErrors(state=>({ ...state,email: true}))

                setErrorMessage("Minimum characters is 9")

                setTimeout(() => {
                    setErrorMessage('');
                setFormErrors(state=>({ ...state,email: false}))

                }, 4000);

                return;
            }
            const newUser = await userService.register(registerData)
            setIsAuth(newUser)
            const codes = v4()
            const promoCodes=codes.slice(0,8)
     
            // setPromoCodes(state=>[...state,promoCodes])
            const newPromoCodes = await userService.createPromo({code:promoCodes})
            navigate("/")

           

            const sendEmail = () => {

                const templateParams = {
                    to_email: registerData.email,
                    message: `Welcome to SoftAcademy . Your username: ${registerData.email}  password:${registerData.password}`,
                    to_name: `${registerData.email}`,
                    promo_code: promoCodes
                }
    
                emailjs
                    .send(
                        "service_zxhuqbx",
                        "template_ym4dhid",
                        templateParams,   // Взимам като 3 параметър според изискванията на emailjs информацията 
                        "iRYFR4BuAXZEBF1ld",
                    )
                    .then(result => {
                  
    
                        console.log("Email sent successfully:", result);
    
                    },
    
                        (err) => {
                            throw new Error(err)
                        }
                    )
                console.log(templateParams)
    
            }
    
    
            sendEmail()



        } catch (err) {


            if (err.code === 403) {
                setErrorMessage("Please enter a valid password or email address")
                setTimeout(() => {
                    setErrorMessage('');
                }, 4000);
            } else {
                throw new Error(err.message)
            }
        }

    };

    const onChangePassword = async (data) => {

        const { oldPassword, confirmPassword, ...registerData } = data

        try {

            const userId = isAuth._id
            const newPass = await userService.changePassword(userId, data.oldPassword, data.newPassword)


        } catch (err) {
            throw new Error(err.message)
        }

    }

    const onSearchSubmitAdmin = async (data) => {

        try {
            const result = await userService.getAll()

            if (!data.searchTerm || data.searchCriteria === "all") {
                setSearchResult(result)
            }
            if (data.searchCriteria === "id") {
                setSearchResult(result.filter(x => x._id.toLowerCase().includes(data.searchTerm.toLowerCase())));
            }
            if (data.searchCriteria === "email") {
                setSearchResult(result.filter(x => x.email.toLowerCase().includes(data.searchTerm.toLowerCase())));
            }

            navigate("/admin/search-customer")
        } catch (error) {
            console.log(error.message || error);


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
        onChangePassword,
        users,
        onSearchSubmitAdmin,
        searchResult,
        formErrors,
        voucherCodes
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
