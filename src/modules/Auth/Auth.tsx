import React, {useEffect, useState} from 'react';
import './auth.scss';
import {useForm} from "react-hook-form";
import {useErrorStore} from "../../store/global.ts";
import Submit from "../../UI/Submit/Submit.tsx";
import {ReactComponent as NameSVG} from "../../assets/icons/account.svg";
import {ReactComponent as EmailSVG} from "../../assets/icons/email.svg";
import {ReactComponent as PsswdSVG} from "../../assets/icons/lock.svg";
import {ReactComponent as ShowSVG} from "../../assets/icons/show.svg";
import {ReactComponent as HideSVG} from "../../assets/icons/hide.svg";
import {useAuthStore} from "../../store/auth.ts";
import {IErrorResponse} from "../../types/Response/ErrorResponse.ts";
import {Navigate} from "react-router-dom";
import {privatePath} from "../../utils/path.ts";
import {ErrorState} from "../../types/Store/Global.ts";

interface formData {
    name: string
    email: string
    password: string
}
interface IInputForm {
    name: object;
    email: object;
    password: object;
}
const Auth:FC = () => {

    const isAuth = useAuthStore(state => state.isAuth)

    const signIn = useAuthStore(state => state.signIn)
    const logIn = useAuthStore(state => state.logIn)

    const newError = useErrorStore((state: ErrorState) => state.newError)
    const rmError = useErrorStore((state: ErrorState) => state.removeError)

    const [auth, setAuth] = useState<string>('SignIn')
    const [isPasswd, setIsPasswd] = useState<boolean>(true)

    const changeAuth = () => {
        auth==='LogIn'? setAuth('SigIn') : setAuth('LogIn')
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<formData>()

    const input:IInputForm = {
        name: {
            ...register('name', {
                required: `It can't be empty`,
            })
        },
        email: {
            ...register('email', {
                required: `It can't be empty`,
                pattern: {
                    value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: 'It is not email'
                }
            })
        },
        password: {
            ...register('password', {
                required: `It can't be empty`,
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    message: 'more than 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 special'
                }
            })
        },
    }

    const sendData = async (data:formData):Promise<void> => {
        const name:string | null = data.name || null
        const email:string | null = data.email || null
        const password:string | null = data.password || null

        if (auth==='SignIn') {
            try {
                const user = await signIn(name, email, password)
                reset()
            } catch (err: any) {
                if (err.response) newError(err.response.status, err.response.data.message)
                else newError(err.code, err.message)
                setTimeout(() => rmError(), 6000)
            }
        }
        if (auth==='LogIn') {
            try {
                const user = await logIn(email, password)
                reset()
            } catch (err: any) {
                if (err.response) newError(err.response.status, err.response.data.message)
                else newError(err.code, err.message)
                setTimeout(() => rmError(), 6000)
            }
        }
    }



    return isAuth?
        <Navigate to={'../'+privatePath.account} replace/>
        :(
        <main className={"auth"+' '+auth}>
            <div className="auth__body">
                <p className="auth__title">{auth}</p>
                <form className="auth__form" onSubmit={handleSubmit(sendData)}>
                    {auth!=='LogIn' && <div className="auth__field">
                        <input type="text" {...input.name} className="auth__input" placeholder='Name'/>
                        <NameSVG className="auth__icon"/>
                    </div>}
                    {auth!=='LogIn' && errors?.name && <p className="auth__error">{errors.name?.message}</p>}
                    <div className="auth__field">
                        <input type="text" {...input.email} className="auth__input" placeholder='Email'/>
                        <EmailSVG className="auth__icon"/>
                    </div>
                    {errors?.email && <p className="auth__error">{errors.email?.message}</p>}
                    <div className="auth__field">
                        <input type={isPasswd? "password":"text"} {...input.password} className="auth__input" placeholder='Password'/>
                        <PsswdSVG className="auth__icon"/>
                        {!isPasswd?
                            <ShowSVG className="auth__show" onClick={() => setIsPasswd(!isPasswd)}/>
                            :
                            <HideSVG className="auth__show" onClick={() => setIsPasswd(!isPasswd)}/>}
                    </div>
                    {errors?.password && <p className="auth__error">{errors.password?.message}</p>}
                    <Submit text={auth==='LogIn'? 'LogIn':'SignIn'}/>
                    <p className="auth__change" onClick={() => changeAuth()}>
                        {
                            auth==='LogIn' ? "Do not have an account?":"Already have an account?"
                        }
                        <span> {auth === 'LogIn' ? "SignIn" : "LogIn"}</span>
                    </p>
                </form>
            </div>
        </main>
    )
}

export default Auth;