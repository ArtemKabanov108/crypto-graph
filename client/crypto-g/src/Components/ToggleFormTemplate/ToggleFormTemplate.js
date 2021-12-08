import React, {useState} from "react";
import {LoginForm} from "../Forms/LoginForm/LoginForm";
import {RegisterForm} from '../Forms/RegistrationForm/RegisterForm'

export const ToggleFormTemplate = () => {
    const [toggleForm, setFormToggle] = useState(true)

    const handleToggleForm = () => {
        toggleForm ? (setFormToggle(false)) : (setFormToggle(true))
    }

    return (
        <div>
            {toggleForm ? <LoginForm handleLinkToRegister={handleToggleForm}/> : <RegisterForm handleLinkToLogin={handleToggleForm}/>}
        </div>
    )
}