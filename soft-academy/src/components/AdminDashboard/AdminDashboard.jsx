import './adminDashboard.css'
import { Link } from 'react-router-dom'


export const AdminDashboard = () => {
    return (
        <>
            <div className="admin-dashboard">
                <section className="sidebar">
                    <div className="customers">
                 
                        
                        <Link to="/customers-list"><h2>Customers</h2></Link>
                    </div>
                    <div className="admin-chat">
                     
                        
                        <Link to="/admin-chat"><h2>Admin Chat</h2></Link>

                    </div>
                </section>
             

                <section className="render-section">

                </section>
            </div>
        </>

    )
}