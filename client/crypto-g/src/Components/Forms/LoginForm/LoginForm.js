import React, {useState} from "react";
import {NeonInput} from "../../common/Inputs/NeonInput/NeonInput";
import {LinkBoxLog, RegisterBox} from "./loginForm.style";
import {Form, LineBox, ButtonBox} from "../commonStylesForm/common.styles";
import {Checkbox} from "../../common/Inputs/CheckBox/Checkbox";
import {Link} from "../../common/Links/Link";
import {Glassbtn} from "../../common/Buttons/Glassbutton/Glassbutton";
import {colors} from "../../../styles-common/common.style";
import AuthStore from "../../../store/authentication/auth.store"
import ModalStore from "../../../store/modalWindow/modal.store";

export const LoginForm = ({handleLinkToRegister}) => {

    const [login, setLoginState] = useState('')
    const [password, setPasswordState] = useState('')

    const handleFormEmail = (payloadInputLogin) => {
        setLoginState(payloadInputLogin)
    }
    const handleFormPassword = (payloadInputPassword) => {
        setPasswordState(payloadInputPassword)
    }

    const addToStoreDataLogin = async (e) => {
        e.preventDefault()
        try {
            if (login && password) await AuthStore.handleAddCredoLogin({email: login, password})
        } catch (err) {
            throw new Error(err)
        }
    }

    return (
        <Form onSubmit={addToStoreDataLogin}>
            <NeonInput
                typeInput={'email'}
                onFormHandle={handleFormEmail}
                labelText={'Email'}
                placeholderText={'Enter your email'}
            />
            <NeonInput
                typeInput={'password'}
                onFormHandle={handleFormPassword}
                labelText={'Password'}
                placeholderText={'Enter your password'}
            />
            <LineBox>
                <Checkbox checkboxText={'Remember Me'}/>
                <LinkBoxLog>
                    <Link textLink={'Forgot password'} />
                </LinkBoxLog>
            </LineBox>
            <RegisterBox>
                <Glassbtn
                    buttonType={'button'}
                    background={colors.transparentBackgroundZero}
                    text={'Registration'}
                    handleClick={handleLinkToRegister}
                    fontSize={'0.9'}
                />
            </RegisterBox>
            <ButtonBox>
                <Glassbtn
                    buttonType={'button'}
                    text={'Login with Google'}
                    fontSize={'1'}
                />
                <Glassbtn
                    handleClick={ModalStore.closeModal}
                    buttonType={"submit"}
                    padding={'8px 30px 8px 30px'}
                    text={'Login'}
                    fontSize={'1'}
                />
            </ButtonBox>
        </Form>
    )
}