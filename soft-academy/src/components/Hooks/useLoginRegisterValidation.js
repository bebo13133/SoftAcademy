import { useState } from "react";

export const useLoginRegisterValidation = () => {
    const [formError, setFormErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    });

    const setSpecificErrorToTrue = (fieldNames) => {

        if (!Array.isArray(fieldNames)) {
            fieldNames = [fieldNames];
          } // проверява мдали е мсаив или не , ако не е го правя на масив 
      
          setFormErrors((state) => {
            const updatedErrors = { ...state };
            fieldNames.forEach((fieldName) => {
              if (updatedErrors[fieldName] !== undefined) {
                updatedErrors[fieldName] = true;
              }
            });
            return updatedErrors;
          });

          setTimeout(() => {
            setFormErrors((state) => {
              const updatedErrors = { ...state };
              fieldNames.forEach((fieldName) => {
                if (updatedErrors[fieldName] !== undefined) {
                  updatedErrors[fieldName] = false;
                }
              });
              return updatedErrors;
            });
          }, 4000);
          return
    }
    return { formError, setSpecificErrorToTrue }

}