import { createContext, useContext, useState, useCallback } from "react"
import { useLocalStorage } from "../Hooks/useLocalStorage"
import { userServiceFactory } from "../Services/userService"
import { useNavigate } from "react-router-dom"
import emailjs from '@emailjs/browser'
import {v4} from "uuid"

import { useLoginRegisterValidation } from "../Hooks/useLoginRegisterValidation"
// import { Login } from "../Login/Login"
// import { Register } from "../Register/Register"

export const UserContext = createContext()


export const UserProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useLocalStorage('auth', {})
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchResult, setSearchResult] = useState([])
    // const [voucherCodes,setPromoCodes] = useState([])
    const { formError, setSpecificErrorToTrue } = useLoginRegisterValidation()

    const voucherCodes =[]
  
    // const [formErrors, setFormErrors] = useState({
    //     email: false,
    //     password: false,
    //     confirmPassword:false,
    //   });

    
    const [users, setUsers] = useState([])
    // console.log("errorMessage",errorMessage)
    const userService = userServiceFactory(isAuth.accessToken)
    const navigate = useNavigate()

    const showErrorAndSetTimeouts = (error) => {

        setErrorMessage(error)
        setTimeout(() => {
            setErrorMessage('')
        }, 4000);
       
    
    }
    const checkFieldNotEmpty = (fieldName, value) => {
        if (!value) {
            setSpecificErrorToTrue(fieldName)
            showErrorAndSetTimeouts("Some field is empty")
            throw new Error("Some field is empty")
        }
        return true
    }
    const checkLengthField = (fieldName, value, minLength) => {
        if (value.length < minLength) {
            setSpecificErrorToTrue(fieldName)
            showErrorAndSetTimeouts(`Minimum field length is ${minLength}`)
            throw new Error(`Minimum field length is ${minLength}`)
        }
        return true
    }
    const checkPassAndConfirmPass = (fieldName, pass, confirmPass) => {
        if (pass !== confirmPass) {
            setSpecificErrorToTrue(fieldName)
            showErrorAndSetTimeouts(`Please enter valid password `)
            throw new Error(`Please enter valid password `)
        }
        return true
    }
    
    const validateLoginData = (data) => {
        if (!checkFieldNotEmpty( 'email', data.email)) {
            console.log('Validation failed ');
            return
        }
        if (!checkFieldNotEmpty( 'password', data.password)) {
            console.log('Validation failed ');
            return
        }
     
        if (!checkLengthField('password', data.password, 5)) {
            return
        }
      
        if (!checkLengthField('email', data.email, 9)) {
            return
        }
    }


    const validateRegisterData = (data,confirmPassword) => {
        if (!checkFieldNotEmpty( 'email', data.email)) {
            console.log('Validation failed ');
            return
        }
        if (!checkFieldNotEmpty( 'password', data.password)) {
            console.log('Validation failed ');
            return
        }
     
        if (!checkLengthField('password', data.password, 5)) {
            return
        }
      
        if (!checkLengthField('email', data.email, 9)) {
            return
        }
     
           if (!checkFieldNotEmpty( 'confirmPassword', confirmPassword)) {
            console.log('Validation failed ');
            return
        }
        if (!checkLengthField('confirmPassword', confirmPassword, 5)) {
            return
        }
        if (!checkPassAndConfirmPass('confirmPassword', confirmPassword, data.password)) {
            return
        }
    }



    const onLoginSubmit = async (data) => {

        validateLoginData(data)
        const trimmedData = {};
        Object.keys(data).forEach(key => {
            trimmedData[key] = data[key].trim();
        });   //тримвам спейсовете
    
        try {
           
     
            const users = await userService.getAll()
            setUsers(users)

            const newUser = await userService.login(trimmedData)
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
      
        const { confirmPassword, ...registerData } = data
        const trimmedRegisterData = {};
        Object.keys(registerData).forEach(key => {
            trimmedRegisterData[key] = registerData[key].trim();
        });
    
        // Тримване на данните в confirmPassword
        const trimmedConfirmPassword = confirmPassword.trim();


        validateRegisterData(trimmedRegisterData,trimmedConfirmPassword)

       
      
        try {

            const newUser = await userService.register(trimmedRegisterData)
            setIsAuth(newUser)
            const codes = v4()
            const promoCodes=codes.slice(0,8)
     
            // setPromoCodes(state=>[...state,promoCodes])
            const newPromoCodes = await userService.createPromo({code:promoCodes, type:"20% for all courses"})
            navigate("/")

            const sendEmail = () => {

                const templateParams = {
                    to_email: registerData.email,
                    message: `Welcome to SoftAcademy . Your username: ${registerData.email}  password:${registerData.password}`,
                    to_name: `${registerData.email}`,
                    promo_code: promoCodes,
                    
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
            const trimmedSearchTerm = data.searchTerm.trim();

            if (!data.searchTerm && data.searchCriteria === "all"|| !data.searchTerm && data.searchCriteria === "") {
                setSearchResult(result)
            }
            if (data.searchTerm && data.searchCriteria === "all" || data.searchTerm && data.searchCriteria === "") {

                setSearchResult(result.filter(x => x._id.toLowerCase().includes(trimmedSearchTerm.toLowerCase())))
            }
            if (data.searchCriteria === "id") {
                setSearchResult(result.filter(x => x._id.toLowerCase().includes(trimmedSearchTerm.toLowerCase())));
            }
            if (data.searchCriteria === "email") {
                setSearchResult(result.filter(x => x.email.toLowerCase().includes(trimmedSearchTerm.toLowerCase())));
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
        formError,
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
