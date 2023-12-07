import { Fade } from "react-awesome-reveal"
import { ProfileSidebar } from "../ProfileSidebar"
import { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/UserContext"
import { userServiceFactory } from "../../Services/userService"
import { OnePromoCode } from "./OnePromoCode"
import { Pagination } from "../../Pagination/Pagination"
import { usePaginations } from "../../Hooks/usePaginations"
import Footer from "../../Footer/Footer"

export const MyPromoCodes = () => {
    const [promoCodes, setPromoCodes] = useState([])
    const { userId, token } = useAuthContext()

    const userService = userServiceFactory(token)



    const resultPerPage = 3
    const { getPaginationData } = usePaginations(resultPerPage)
    const { totalPages, currentPage, currentResult, paginate, setCurrentPage } = getPaginationData(promoCodes)


    useEffect(() => {

        userService.getPromoCodes(userId)
            .then(result => {
                setPromoCodes(result)

                // console.log(result,"codes")
            })
            .catch(error => {

                console.error('Error fetching promo codes:', error);
            })
    }, [userId])







    return (

        <>
            <ProfileSidebar />
            <Fade delay="50" duration="4000" triggerOnce='true'>

                <section id="explore" className="explore" style={{ height: "420px" }}>

                    <div className="container">
                        <div className="section-header">
                            <h2 style={{ color: "rgb(2 93 139)", textShadow: "0 4px 8px rgb(109 20 37)" }}>Beloved Courses</h2>
                            <p style={{ fontSize: "22px", color: "#fffefd" }}>Explore your Favorites and Elevate your learning Journey</p>
                        </div>
                    </div>
                    <section className="promo-code-main">
                        {currentResult.length > 0 ? currentResult.map(code => <OnePromoCode key={code._id} {...code} />) : <h3 className="no-articles">No promo codes yet</h3>}
                    </section>
                    <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
             
                </section>
             
            </Fade>



        </>
    )

}