import { EmailErrorsType, ErrorType, FormDataType } from "../types";
import { emailRegex, passwordRegex } from "./variables";

export const validateData = (formData: FormDataType): ErrorType => {
    const {username, email, password} = formData;
    return{
        username: validateUsername(username),
        email: validateEmail(email),
        password: validatePassword(password)
    }
}

const validateUsername = (username: string): boolean => !(username.trim() !== '');

const validateEmail = (email: string): EmailErrorsType => ({
    isNotEmpty: email.trim() !== "", 
    isInvalid: !emailRegex.test(email) && email.length > 0
});

const validatePassword = (password: string): boolean => !passwordRegex.test(password);