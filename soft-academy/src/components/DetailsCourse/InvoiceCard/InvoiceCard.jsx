import { useParams } from 'react-router-dom';
import './invoiceCard.css'
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import { useAuthContext } from '../../contexts/UserContext';
import { useForm } from '../../Hooks/useForm';

export const InvoiceCard = () => {
    const { userId } = useAuthContext()
    const objectId = useParams()
    const courseId = objectId.courseId
    // console.log(courseId)

    const { onChangeHandler, onSubmitWithOut, values } = useForm({
        cardNumber: "",
        ownerName: "",
        expiDate: "",
        cvc: "",
    }, onSubmitPayment)

    return (
        <>
            <section className="invoice-card">
                <div className="card-icons">
                    <FaCcVisa className="icon" style={{ color: "#0157a2" }} />
                    <FaCcMastercard className="icon " style={{ color: "#0a3a82" }} />
                    <FaCcAmex className="icon" style={{ color: " #007bc1" }} />
                </div>
                <form className="card-form-invoice" onSubmit={onSubmitWithOut}>
                    <label>
                        Card Number:
                        <input type="text" name="cardNumber" className="card-input" value={values.cardNumber} placeholder="Enter card number" OnChange={onChangeHandler} />
                    </label>
                    <label>
                        Name on Card:
                        <input type="text" name="ownerName" className="card-input" value={values.ownerName} placeholder="Enter name on card" OnChange={onChangeHandler} />
                    </label>
                    <div className="flex-row">
                        <label>
                            Expiry Date:
                            <input type="text" name="expiDate" className="card-input small" value={values.expiDate} placeholder="MM/YY" OnChange={onChangeHandler} />
                        </label>
                        <label>
                            Security Code:
                            <input type="text" name="cvc" className="card-input small" value={values.cvc} placeholder="CVC" OnChange={onChangeHandler} />
                        </label>
                    </div>
                    <button type="submit" className="pay-button">Pay</button>
                </form>
            </section>
        </>
    )

}