import { notify } from '../utils/notify'

const extractDbErrMessage = errObj => {
    if (errObj.code === 11000) {
        let keyPattern = errObj.keyPattern;
        let key = Object.keys(keyPattern)[0]
        return `${key} should be unique}`
    }
}

export const errorHandler = err => {
    debugger;
    let errMsg = 'Something Went Wrong'
    let error = err.response;
    if (error) {
        let serverError = error.data;
        if (typeof (serverError.msg) === 'string') {
            errMsg = serverError.msg;
        } else {
            errMsg = extractDbErrMessage(serverError.msg)
        }
    }
    notify.showError(errMsg)
}
