import { Link } from "react-router-dom"
import "./footer.css"

export const Footer = () => {

    return (
        <>
            <footer className="footer">
                {/* Section 1: All Rights Reserved */}
                <section className="footer-section rights-reserved">
                    <h3>All Rights Reserved</h3>
                    <ul><li className="navbar-brand " style={{ fontSize: "16px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "16px", textTransform: "none", color: "black" }}>Academy</span></li></ul>
                    <p>&copy; 2023  </p>
                </section>

                {/* Section 2: Address and Phone Column */}
                <section className="footer-section contact">
                    <h3>Contact</h3>
                    <p>Address: str.Krusha Planina 56a, Sofia, Bulgaria</p>
                    <p>Phone: +359 894 371 779</p>
                </section>

                {/* Section 3: Terms */}
                <section className="footer-section terms">
                    <h3>Terms</h3>
                    <ul>
                        <li><Link to="/terms">Terms and Conditions</Link></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </section>

                {/* Section 4: Social Media */}
                <section className="footer-section social-media">
                    <h3>Social Media</h3>
                    <div className="social-icons">
                        <Link to="https://www.facebook.com/groups/706263354783010" target="_blank"><img src="/img/Facebook_Logo_2023.png" alt="Facebook" /></Link>
                        <a href="https://twitter.com" target="_blank"><img src="/img/twiter-png.webp" alt="Twitter" /></a>
                        <a href="https://instagram.com" target="_blank"><img src="/img/insagram.png" alt="Instagram" /></a>
                    </div>
                </section>
            </footer>

            {/* <div id="scroll-Top">
                    <div className="return-to-top">
                        <i className="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
                    </div>

                </div> */}


        </>

    )
}