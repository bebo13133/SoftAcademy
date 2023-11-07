import { UserContext, useAuthContext } from '../contexts/UserContext'

import { useForm } from '../Hooks/useForm'
import { Link } from 'react-router-dom'

export const Login = () => {



    const { onLoginSubmit } = useAuthContext()


    const { onSubmit, values, onChangeHandler } = useForm({
        email: "",
        password: "",
    }, onLoginSubmit)


    return (
        <>
      <section id="login-page-login" className="auth">
            <form id="login" method="POST" onSubmit={onSubmit}>

                <div className="container-login">
                    <div className="brand-logo-login"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="peter@gmail.com" value={values.email} onChange={onChangeHandler} />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" value={values.password} onChange={onChangeHandler} />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you have profile click <Link to={"/register"}>here</Link></span>
                    </p>
                </div>
            </form>
        </section>
        </>
    )

}
 