import React, {useState} from "react";
import {NeonInput} from "../../common/Inputs/NeonInput/NeonInput";
import {LinkBoxLog, RegisterBox} from "./loginForm.style";
import {Form, LineBox, ButtonBox} from "../commonStylesForm/common.styles";
import {Checkbox} from "../../common/Inputs/CheckBox/Checkbox";
import {Link} from "../../common/Links/Link";
import {Glassbtn} from "../../common/Buttons/Glassbutton/Glassbutton";
import {colors} from "../../../styles-common/common.style";
import LogInStore from "../../../store/logIn/logIn.store"


export const LoginForm = ({handleLinkToRegister}) => {

    const [loginState, setLoginState] = useState('')
    const [passwordState, setPasswordState] = useState('')

    const handleFormEmail = (payloadInputLogin) => {
        setLoginState(payloadInputLogin)
    }
    const handleFormPassword = (payloadInputPassword) => {
        setPasswordState(payloadInputPassword)
    }

    const addToStoreDataLogin = async () => {
        try {
            if (loginState && passwordState) await LogInStore.handleAddCredoLogin({email: loginState, password: passwordState})
        } catch (e) {
            throw new Error(e)
        }
    }

    return (
        <Form action={"#"}>
            <NeonInput
                onFormHandle={handleFormEmail}
                labelText={'Email'}
                placeholderText={'Enter your email'}
            />
            <NeonInput
                onFormHandle={handleFormPassword}
                labelText={'Password'}
                placeholderText={'Enter your password'}
            />
            <LineBox>
                <Checkbox checkboxText={'Remember My'}/>
                <LinkBoxLog>
                    <Link textLink={'Forgot password'} />
                </LinkBoxLog>
            </LineBox>
            <RegisterBox>
                <Glassbtn
                    background={colors.transparentBackgroundZero}
                    text={'Registration'}
                    handleClick={handleLinkToRegister}
                    fontSize={'0.9'}
                />
            </RegisterBox>
            <ButtonBox>
                <Glassbtn
                    text={'Login with Google'}
                    fontSize={'1'}
                />
                <Glassbtn
                    padding={'8px 30px 8px 30px'}
                    text={'Login'}
                    fontSize={'1'}
                    handleClick={addToStoreDataLogin}
                />
            </ButtonBox>
        </Form>
    )
}