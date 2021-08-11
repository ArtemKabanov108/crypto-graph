import React from "react";
import {NeonInput} from "../../common/Inputs/NeonInput/NeonInput";
import {ButtonBox, Form, LineBox, LinkBox} from "./loginForm.style";
import {Checkbox} from "../../common/Inputs/CheckBox/Checkbox";
import {Link} from "../../common/Links/Link";
import {Glassbtn} from "../../common/Buttons/Glassbutton";

export const LoginForm = () => {
    return (
        <Form>
            <NeonInput labelText={'Email'} placeholderText={'Enter your email'}/>
            <NeonInput labelText={'Password'} placeholderText={'Enter your password'}/>
            <LineBox>
                <Checkbox checkboxText={'Remember My'}/>
                <LinkBox>
                    <Link textLink={'Forgot password'} />
                </LinkBox>
            </LineBox>
            <ButtonBox>
                <Glassbtn
                    text={'Login with Google'}
                    fontSize={'1'}
                />
                <Glassbtn
                    padding={'8px 30px 8px 30px'}
                    text={'Login'}
                    fontSize={'1'}
                />
            </ButtonBox>
            {/*<ButtonSubmit/>*/}
        </Form>
    )
}