import { AdminSidebar } from "./AdminSideBar"
import { useEffect, useRef, useState } from "react"
import emailjs from '@emailjs/browser'
import "./emailAdmin.css"
import { useParams } from "react-router-dom"
import { userServiceFactory } from "../Services/userService"
import { useAuthContext } from "../contexts/UserContext"

const EmailAdmin = () => {
    const [emails, setEmails] = useState({})
    const[user,setUsers] = useState([])
    // const [userName, setUserName] = useState("");
    // const [userEmail, setUserEmail] = useState("");
    const [userSubject, setUserSubject] = useState("");
    const [message, setMessage] = useState("");
    const [toEmail,setToEmail] = useState("")
    const { token } = useAuthContext()
    const userService = userServiceFactory(token)
const {userId}  = useParams()

    const form = useRef() // връща стоиност , която ще се използва сам о1 път
    useEffect(() => {
        userService.getAll()
            .then(result => {
          
                setUsers(result.find(user => user._id === userId))
            })
            .catch(error => {
                console.log(error.message || error)
            })
    }, [userId])
 
    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm(
                "service_zxhuqbx",
                "template_ym4dhid",
                form.current,   // Взимам като 3 параметър според изискванията на emailjs информацията от формата с помоща ref={form}
                "iRYFR4BuAXZEBF1ld",
            )
            .then(result => {
                // setEmails(state=>[{...state,[e.target.name]: e.target.value}]);   
            }).then(
                (result) => {
                    console.log("Email sent successfully:", result);
                    // setUserName(""); // Clear the form inputs
                    // setUserEmail("");
                    // setToEmail("")
                    setUserSubject("");
                    setMessage("");
                },

                (err) => {
                    throw new Error(err)
                }
            )
        console.log(form.current)
    
    }

    return (

        <>
            <div className="admin-dashboard-email">

                <section className="sidebar">
                    <AdminSidebar />
                </section>


                <section className="email-section">

                    <div className="row-admin">

                        <div className="col-lg-7 form-container">
                            <ul>
                                <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right", }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                            </ul>
                            <form ref={form} onSubmit={sendEmail} className="custom-form mb-4 mb-lg-0">
                            <div className="form-group">
                                    <input type="text" className="form-control" name="to_email" id="client" placeholder={"To..."} value={user.email} onChange={(e) => setToEmail(user.email)} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="user_subject" id="subject" placeholder="Subject" value={userSubject} onChange={(e) => setUserSubject(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="message" placeholder="Type Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                </div>
                                <button type="submit" className="btn btn-light">Send</button>
                            </form>
                        </div>
                    </div>

                </section>
            </div>

        </>
    )

}
export default EmailAdmin