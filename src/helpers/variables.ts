import { ErrorType, FormDataType } from "../types"

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;

export const defaultErrorState: ErrorType = {
    username: false,
    email: {isNotEmpty: true, isInvalid: false},
    password: false
}
export const defaultDataState: FormDataType = {
    username: '',
    email: '',
    password: ''
}