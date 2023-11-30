const showErrorAndSetTimeout = (dispatch, error) => {

    dispatch(setError(error))
    setTimeout(() => {
        dispatch(setError(''));
    }, 4000);

}

const checkFieldNotEmpty = (dispatch, fieldName, value) => {
    if (!value) {
        setSpecificErrorToTrue(fieldName)
        showErrorAndSetTimeout(dispatch, "Some field is empty")
        throw new Error("Some field is empty")
    }
    return true
}
const checkNumericField = (dispatch, fieldName, value) => {
    if (isNaN(value)) {
        setSpecificErrorToTrue(fieldName)
        showErrorAndSetTimeout(dispatch, "The Field must be a number")
        throw new Error("The Field must be a number")
    }
    return true
}

const checkLengthField = (dispatch, fieldName, value, minLength) => {
    if (value.length < minLength) {
        setSpecificErrorToTrue(fieldName)
        showErrorAndSetTimeout(dispatch, `Minimum field length is ${minLength}`)
        throw new Error(`Minimum field length is ${minLength}`)
    }
    return true
}



const validateCourseData = (dispatch, courseData) => {
    if (!checkFieldNotEmpty(dispatch, 'courseName', courseData.courseName)) {
        console.log('Validation failed for courseName');
        return
    }
    if (!checkFieldNotEmpty(dispatch, 'firstName', courseData.firstName)) {
        console.log('Validation failed for lastName');
        return
    }
    if (!checkFieldNotEmpty(dispatch, 'lastName', courseData.lastName)) {
        console.log('Validation failed for lastName');
        return
    }
    if (!checkFieldNotEmpty(dispatch, 'email', courseData.email)) {
        return
    };
    if (!checkFieldNotEmpty(dispatch, 'ownerCourse', courseData.ownerCourse)) {
        return
    };
    if (!checkFieldNotEmpty(dispatch, 'price', courseData.price)) {
        return
    };
    if (!checkFieldNotEmpty(dispatch, 'description', courseData.description)) {
        return
    };
    if (!checkFieldNotEmpty(dispatch, 'lectorDescription', courseData.lectorDescription)) {
        return
    };
    if (!checkFieldNotEmpty(dispatch, 'weeksCourse', courseData.weeksCourse)) {
        return
    };
    if (!checkFieldNotEmpty(dispatch, 'creditsCourse', courseData.creditsCourse)) {
        return
    };

    if (!checkNumericField(dispatch, 'price', courseData.price)) {
        return
    }
    if (!checkNumericField(dispatch, 'weeksCourse', courseData.weeksCourse)) {
        return
    }
    if (!checkNumericField(dispatch, 'creditsCourse', courseData.creditsCourse)) {
        return
    }
    if (!checkLengthField(dispatch, 'firstName', courseData.firstName, 4)) {
        return
    }
    if (!checkLengthField(dispatch, 'lastName', courseData.lastName, 4)) {
        return
    }
    if (!checkLengthField(dispatch, 'courseName', courseData.courseName, 2)) {
        return
    }
    if (!checkLengthField(dispatch, 'email', courseData.email, 9)) {
        return
    }
    if (!checkLengthField(dispatch, 'description', courseData.description, 20)) {
        return
    }
    if (!checkLengthField(dispatch, 'lectorDescription', courseData.lectorDescription, 20)) {
        return
    }
}