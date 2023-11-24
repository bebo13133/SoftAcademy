import './invoiceCard.css'
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';

export const InvoiceCard = () => {

    return (
        <>
            <section className="invoice-card">
                <div className="card-icons">
                    <FaCcVisa className="icon" />
                    <FaCcMastercard className="icon" />
                    <FaCcAmex className="icon" />
                </div>
                <form className="card-form-invoice">
                    <label>
                        Card Number:
                        <input type="text" className="card-input" placeholder="Enter card number" />
                    </label>
                    <label>
                        Name on Card:
                        <input type="text" className="card-input" placeholder="Enter name on card" />
                    </label>
                    <div className="flex-row">
                        <label>
                            Expiry Date:
                            <input type="text" className="card-input small" placeholder="MM/YY" />
                        </label>
                        <label>
                            Security Code:
                            <input type="text" className="card-input small" placeholder="CVC" />
                        </label>
                    </div>
                    <button className="pay-button">Pay</button>
                </form>
            </section>
        </>
    )

}