import { Link } from "react-router-dom"
import './privacy-policy.css'
export const PrivacyPolicy = () => {
    return (

        <div className="App">

            <div className="privacy-policy">
                <h2>Privacy Policy</h2>
                <p>
                    Last updated: [Date]
                </p>
                <p>
                    1. Introduction
                    This Privacy Policy describes how <span style={{ color: "red" }}>SoftAcademy</span> ("we", "us", or "our") collects, uses, and shares information when you use our website <span style={{ color: "red" }}>SoftAcademy.eu</span> (the "Site"). By accessing or using the Site, you agree to the practices described in this Privacy Policy.
                </p>

                <p>
                    2. Information We Collect

                </p>
                <p>
                    2.1.Personal Information
                    We may collect personal information that you voluntarily provide, such as your name, email address, and other contact information, when you fill out forms on the Site or contact us.

                </p>
                <p>

                    2.2.Non - Personal Information
                    We may collect non - personal information about your interaction with the Site, such as your IP address, browser type, and usage data.

                </p>
                <p>
                    3. How We Use Information
                    We may use the information we collect for various purposes, including:

                </p>
                <p>
                    3.1.To provide and maintain the Site.

                </p>
                <p>
                    3.2.To respond to your requests, comments, or questions.

                </p>
                <p>
                    3.3.To send periodic emails, updates, or other communications.

                </p>
                <p>
                    3.4.To improve our services and your experience on the Site.

                </p>
                <p>
                    4. Sharing of Information
                    We do not sell or rent your personal information to third parties.However, we may share information with service providers, business partners, or other third parties as necessary for the purposes described in this Privacy Policy.

                </p>
                <p>
                    5. Cookies and Tracking Technologies
                    The Site may use cookies and other tracking technologies to collect and store information.You can control the use of cookies through your browser settings.

                </p>
                <p>
                    6. Third - Party Links
                    The Site may contain links to third - party websites or services.We are not responsible for the privacy practices of these third parties.We encourage you to review their privacy policies.

                </p>
                <p>
                    7. Data Security
                    We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.

                </p>
                <p>
                    8. Changes to this Privacy Policy
                    We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons.We will post the updated Privacy Policy on the Site, and the revised policy will be effective when posted.

                </p>
                <p>
                    9. Contact Us

                    If you have any questions or concerns about this Privacy Policy, please contact us at  <Link to={`/contact`} className="edit-btn">Contact</Link>.

                    This is a general template.Please consult with a legal professional to ensure that your privacy policy complies with all applicable laws and regulations in your jurisdiction and is tailored to your specific website or application.

                </p>


            </div>
        </div>

    )
}



























