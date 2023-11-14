import { Link } from "react-router-dom"
import "./footer.css"

const Footer = () => {

    return (
        <>
            <footer className="footer">
                {/* Section 1: All Rights Reserved */}
                <section className="footer-section rights-reserved">
                <h3>Designs</h3>
                    <div className="divider"></div>
                    <ul><li className="navbar-brand " style={{ fontSize: "16px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "16px", textTransform: "none", color: "black" }}>Academy</span></li></ul>
                    <br />
                    <h6 style={{color:"white", fontSize:"16px"}}>All Rights Reserved</h6>
                    
                    <h6 style={{color:"white", fontSize:"16px"}}>&copy; 2023  </h6>
                </section>

                {/* Section 2: Address and Phone Column */}
                <section className="footer-section contact">
                    <Link to={"/contact"}><h3>Contact</h3></Link>
                    <div className="divider"></div>
                    <p>Address: str.Krusha Planina 56a, Sofia, Bulgaria</p>
                    <p>Phone: +359 894 371 779</p>
                </section>

                {/* Section 3: Terms */}
                <section className="footer-section terms">
                    <h3>Terms</h3>
                    <div className="divider"></div>
                    <ul>
                        <li><Link to="/terms">Terms and Conditions</Link></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </section>
                {/* Section 4: Partners */}
                
                <section className="footer-section terms">
                    <h3>Partners</h3>
                    <div className="divider"></div>
                    <ul>
                        <li><Link to="https://dabags.eu/" target="_blank">DaBags</Link></li>
                        <li><Link to="https://softuni.bg/" target="_blank">SoftUni</Link></li>
                        <li><Link to="https://ambitioned.com/" target="_blank">Ambitioned</Link></li>
                        <li><Link to="https://bebodesigns.eu/" target="_blank">BeboDesigns</Link></li>
                        <li><Link to="https://csmega-bg.com/" target="_blank">Csmega-bg</Link></li>
                        
                     
                    </ul>
                </section>
                {/* Section 5: Social Media */}
                <section className="footer-section social-media">
                    <h3>Social Media</h3>
                    <div className="divider"></div>
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
export default Footer