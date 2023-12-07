
import './promoCodes.css'
import copy from 'clipboard-copy';

export const OnePromoCode = ({
    code,
    type,
}) => {
// console.log()





    const handleCopyClick = async () => {
        try {
            await copy(code)
            // alert('Promo code copied to clipboard!');
        } catch (err) {

            console.error('Failed to copy promo code', err);
            alert('Failed to copy promo code. Please try again.');
        }

    }

    return (
        <>
            <div className="promo-code-section">
                <div className="promo-code-type">Type discount: <span>{type}</span></div>
                <div className="promo-code">Promo code:<span> {code}</span></div>
                <button className="promo-code-btn" onClick={handleCopyClick}>Copy</button>
            </div>
        </>
    )

}