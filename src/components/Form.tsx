import React, { useEffect, useState } from "react";
import { ErrorType, FormDataType } from "../types";
import { validateData } from "../helpers/validateData";
import { defaultDataState, defaultErrorState } from "../helpers/variables";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Form = () => {
    const [formData, setFormData] = useState<FormDataType>({
        ...defaultDataState,
    });
    const [errors, setErrors] = useState<ErrorType>({ ...defaultErrorState });
    const [pwdVisibility, setPwdVisibility] = useState(false);
    const [isFirstRun, setIsFirstRun] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (
            !isFirstRun &&
            !errors.email.isInvalid &&
            !errors.password &&
            errors.email.isNotEmpty &&
            !errors.username
        ) {
            setSuccess(true);
        } else {
            setIsFirstRun(false);
        }
    }, [errors]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedFormData = {
            ...formData,
            [e.currentTarget.name]: e.target.value,
        };
        setFormData(updatedFormData);
        if (pwdVisibility) {
            changePasswordVisibility();
            
        }
    };

    const clearForm = () => {
        setFormData({ ...defaultDataState });
    };

    const changePasswordVisibility = () => {
        setPwdVisibility(!pwdVisibility);
    };

    const checkData = () => {
        setErrors(validateData(formData));
    };

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkData();
    };

    const resetForm = () => {
        setSuccess(false);
        clearForm();
    };
 
    return (
        <>
            {success && (
                <div className="poppins w-full h-full absolute top-0 left-0 z-30 bg-zinc-900 bg-opacity-50 flex justify-center items-center flex-col text-white">
                    <div className=" bg-zinc-800 p-[40px] rounded-2xl">
                        <h1 className="text-[28px]">
                            Form is successfully submitted!
                        </h1>
                        <button className="button mt-6" onClick={resetForm}>
                            Reset
                        </button>
                    </div>
                </div>
            )}
            <form className="text-white poppins" onSubmit={onSubmitHandler}>
                <div className="field">
                    <label className="label">Username:</label>
                    <input
                        className={`input ${errors.username && 'input-error'}`}
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={onChangeHandler}
                    />
                    {errors.username && <span className="error">Username is required</span>}
                </div>
                <div className="field">
                    <label className="label">Email:</label>
                    <input
                        className={`input ${(!errors.email.isNotEmpty || errors.email.isInvalid) && 'input-error'}`}
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={onChangeHandler}
                    />
                    {!errors.email.isNotEmpty && <span className="error">Email is required</span>}
                    {errors.email.isInvalid && <span className="error">Email is invalid</span>}
                </div>
                <div className="field">
                    <label className="label">Password:</label>
                    <div className={`pwd-field ${errors.password && 'pwd-field-error'}`}>
                        <input
                            className="input input-pwd" 
                            type={pwdVisibility ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={onChangeHandler}
                        />
                        <button
                            type="button"
                            onClick={changePasswordVisibility}
                            disabled={formData.password ? false : true}
                        >
                            {pwdVisibility ? (
                                <FaRegEye className="icon" />
                            ) : (
                                <FaRegEyeSlash className="icon" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <span className="error mb-6">
                            Password must be at least 8 characters long
                            including big and small letters, special symbols and numbers
                        </span>
                    )}
                </div>
                <button className="button mt-5" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};

export default Form;
