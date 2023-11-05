import Button from '@mui/material/Button'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'

export const CookieConsent = () => {

    const [cookies, setCookies] = useCookies(["cookieConsent"]);
    const [isVisible, setIsVisible] = useState(false); // използвам стейт за таймаоута за да моаг да регурирам  показването 

    const setCookieConsent = () => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 14);   //взимам датата и добавям 14 дена след което да се изтрията кукитата

        setCookies("cookieConsent", true, { path: "/", expires: expirationDate })   //WARNING!
        setIsVisible(false);
    }

    useEffect(() => {

        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => {
            clearTimeout(timeout); // изчиствам таймаута
        };
    }, [])

    return isVisible ? (
        <div className={`cookie-consent ${isVisible ? 'show' : ''}`}>
            {/* горният клас го ползвам за анимацията в css */}
            <p>
                We use cookies to enhance your user experience. By using our website,
                you agree to our use of cookies.{" "}
                <Link to={"/privacy-policy"}>Learn more.</Link>
            </p>
            <Button onClick={setCookieConsent}>
                Accept
            </Button>
        </div>
    ) : null
}