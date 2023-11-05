import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'

export const CookieConsent = () => {

    const [cookies, setCookies] = useCookies(["cookieConsent"]);

    const setCookieConsent = () => {

        setCookies("cookieConsent", true, { path: "/" })
    }



    return (
        <div className="cookie-consent">
            <p>
                We use cookies to enhance your user experience. By using our website,
                you agree to our use of cookies.{" "}
                <Link to={"/privacy-policy"}>Learn more.</Link>
            </p>
            <Button onClick={setCookieConsent}>
                Accept
            </Button>
        </div>
    )
}