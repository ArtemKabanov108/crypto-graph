import React, {useState} from "react";
import {NeonInput} from "../../common/Inputs/NeonInput/NeonInput";
import {LinkBoxReg} from "./registerForm.style";
import {Form, LineBox} from "../commonStylesForm/common.styles"
import {Glassbtn} from "../../common/Buttons/Glassbutton/Glassbutton";
import {colors} from "../../../styles-common/common.style";
import AuthStore from "../../../store/authentication/auth.store";

export const RegisterForm = ({handleLinkToLogin}) => {

    const [nickname, setNicknameRegister] = useState({
        nickname: ''
    })
    const [email, setEmailRegister] = useState({
        email: ''
    })
    const [password, setPasswordRegister] = useState({
        password: ''
    })

    const handleFormEmailRegister = (payloadInputLogin) => {
        setEmailRegister(payloadInputLogin)
    }
    const handleFormPasswordRegister = (payloadInputPassword) => {
        setPasswordRegister(payloadInputPassword)
    }
    const handleFormNicknameRegister = (payloadInputPassword) => {
        setNicknameRegister(payloadInputPassword)
    }

    const addToStoreDataRegister = async () => {
        try {
            if (nickname && email && password) await AuthStore.handleAddCredoRegister({email, password, nickname})
        } catch (e) {
            throw new Error(e)
        }
    }

    return (
        <Form onSubmit={addToStoreDataRegister}>
            <NeonInput onFormHandle={handleFormNicknameRegister} labelText={'Nickname'} placeholderText={'Enter your email'}/>
            <NeonInput onFormHandle={handleFormEmailRegister} labelText={'Email'} placeholderText={'Enter your email'}/>
            <NeonInput onFormHandle={handleFormPasswordRegister} labelText={'Password'} placeholderText={'Enter your password'}/>
            <LineBox>
                {/*<Checkbox clue={"LogIn and Remember Me."} checkboxText={'Auto LogIn'}/>*/}
                <LinkBoxReg>
                    <Glassbtn
                        buttonType={'submit'}
                        padding={'8px 30px 8px 30px'}
                        text={'Registration'}
                        fontSize={'1'}
                        handleClick={addToStoreDataRegister}
                    />
                    <Glassbtn
                        buttonType={'button'}
                        background={colors.transparentBackgroundZero}
                        text={'Link to Login'}
                        handleClick={handleLinkToLogin}
                        fontSize={'0.9'}
                    />
                </LinkBoxReg>
            </LineBox>
        </Form>
    )
}