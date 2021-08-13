import React from "react";
import {NeonInput} from "../../common/Inputs/NeonInput/NeonInput";
import {ButtonBox, LinkBoxReg} from "./registerForm.style";
import {Form, LineBox} from "../commonStylesForm/common.styles"
import {Checkbox} from "../../common/Inputs/CheckBox/Checkbox";
import {Glassbtn} from "../../common/Buttons/Glassbutton/Glassbutton";
import {colors} from "../../../styles-common/common.style";

export const RegisterForm = ({handleLinkToLogin}) => {
    return (
        <Form>
            <NeonInput labelText={'Nickname'} placeholderText={'Enter your email'}/>
            <NeonInput labelText={'Email'} placeholderText={'Enter your email'}/>
            <NeonInput labelText={'Password'} placeholderText={'Enter your password'}/>
            <LineBox>
                <Checkbox clue={"Send massage on your email with registration credentials."} checkboxText={'Send my credo'}/>
                <LinkBoxReg>
                    <Glassbtn
                        background={colors.transparentBackgroundZero}
                        text={'Link to Login'}
                        handleClick={handleLinkToLogin}
                        fontSize={'0.9'}
                    />
                </LinkBoxReg>
            </LineBox>
            <ButtonBox>
                <Glassbtn
                    padding={'8px 30px 8px 30px'}
                    text={'Registration'}
                    fontSize={'1'}
                />
            </ButtonBox>
        </Form>
    )
}