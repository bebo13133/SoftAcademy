import { Fragment, useRef, useState } from "react"
import emailjs from '@emailjs/browser'
export const Contact = () => {
    // const [emails, setEmails] = useState({})

    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm(
                "service_zxhuqbx",
                "template_7tkpsx5",
                form.current,
                "iRYFR4BuAXZEBF1ld",
        )
            .then(result => {
                console.log(result)
                console.log("message: ")
            }, (err) => {
                throw new Error(err)
            }
            )


    }


    return (
        <Fragment>
            <section className="contact-us-softacademy">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="section-title-soft">
                                <h2>Contact Us</h2>
                                <p><b>Contact whit SoftAcademy</b> is designed with a Google map. contact form pages design is created by using Bootstrap and custom CSS</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-7">
                            <form ref={form} onSubmit={sendEmail} className="mb-4 mb-lg-0">
                                <div className="form-row">
                                    <div className="col-md-6 form-group">
                                        <input type="text" name="user_name" className="form-control" id="name" placeholder="Your Name" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <input type="email" className="form-control" name="user_email" id="email" placeholder="Your Email" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="user_subject" id="subject" placeholder="Subject" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="message" placeholder="Type Message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-light">Send</button>
                            </form>
                        </div>

                        <div className="col-lg-5">
                            <div className="map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2931.622694212767!2d23.31366527659344!3d42.71170931281226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sbg!2sbg!4v1698768478344!5m2!1sbg!2sbg" width="130%" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>

                                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2931.622694212767!2d23.31366527659344!3d42.71170931281226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sbg!2sbg!4v1698768478344!5m2!1sbg!2sbg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}