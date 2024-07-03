export type FormDataType = {
    username: string;
    email: string;
    password: string;
}
export type ErrorType = {
    username: boolean;
    email: EmailErrorsType;
    password: boolean;
}

export type EmailErrorsType = {
    isNotEmpty: boolean;
    isInvalid: boolean;
}
