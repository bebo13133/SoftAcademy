export const LectorPage = ({
    lectorImage,
    description,
    firstName,
    lastName,
}) => {
    return (
        <>
            <div>
                <div className="lector-card">
                    <img className="lector-img" src={lectorImage} alt="lector-img" />
                    <h2>Lector: <span>{firstName} {lastName}</span> </h2>
                    <p className="lector-disc">{description}
                    </p>
                </div>

            </div>
        </>
    )
}