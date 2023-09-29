import React, {useState} from 'react';
import './account.scss';
import Submit from "../../UI/Submit/Submit.tsx";
import {useAuthStore} from "../../store/auth.ts";
import {useForm} from "react-hook-form";
import {ReactComponent as NameSVG} from "../../assets/icons/account.svg";
import {ReactComponent as EmailSVG} from "../../assets/icons/email.svg";
import {ReactComponent as PsswdSVG} from "../../assets/icons/lock.svg";
import {ReactComponent as ShowSVG} from "../../assets/icons/show.svg";
import {ReactComponent as HideSVG} from "../../assets/icons/hide.svg";
import {IErrorResponse} from "../../types/Response/ErrorResponse.ts";
import {useErrorStore} from "../../store/global.ts";
import {IUser} from "../../types/IUser.ts";

type formData = {
    newName: object;
    newEmail: object;
    oldPassword: object;
    newPassword: object;
}
interface IInputs {
    newName: string;
    newEmail: string;
    oldPassword: string;
    newPassword: string;
}
const Account:FC = () => {

    const signOut = useAuthStore(state => state.signOut)
    const updateUser = useAuthStore(state => state.updateUser)

    const newErr = useErrorStore(state => state.newError)
    const rmErr = useErrorStore(state => state.removeError)

    const [isPsswdOld, setIsPsswdOld] = useState<boolean>(true)
    const [isPsswdNew, setIsPsswdNew] = useState<boolean>(true)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<formData>()

    const inputs:formData = {
        newName: {
            ...register('newName')
        },
        newEmail: {
            ...register('newEmail', {
                pattern: {
                    value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: 'It is not email'
                }
            })
        },
        oldPassword: {
            ...register('oldPassword', {
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    message: 'Can not be old password'
                }
            })
        },
        newPassword: {
            ...register('newPassword', {
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    message: 'more than 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 special'
                }
            })
        }
    }

    const sendData = async (data:IInputs):Promise<void> => {

        const newName:string | null = data?.newName || null
        const newEmail:string | null = data?.newEmail || null
        const oldPassword:string | null = data?.oldPassword || null
        const newPassword:string | null = data?.newPassword || null


        try {
            const newUser:IUser = await updateUser(newName, newEmail, oldPassword, newPassword)
            reset()
        } catch (err: IErrorResponse | any) {
            newErr(err.response.status, err.response.data.message)
            setTimeout(() => rmErr(), 6000)
        }
    }

    return (
        <main className="account">
            <div className="account__body">
                <img className="account__avatar" src={'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg'} alt="avatar-acount"/>
                <form className="account__form" onSubmit={handleSubmit(sendData)}>
                    <div className="account__field">
                        <input type="text" {...inputs.newName} className="account__input" placeholder="New Name"/>
                        <NameSVG className="account__icon"/>
                    </div>
                    {errors?.newName && <p>{errors.newName?.message}</p>}
                    <div className="account__field">
                        <input type="text" {...inputs.newEmail} className="account__input" placeholder="New Email"/>
                        <EmailSVG className="account__icon"/>
                    </div>
                    {errors?.newEmail && <p className="account__error">{errors.newEmail?.message}</p>}
                    <div className="account__field">
                        <input type={isPsswdOld? 'password':'text'} {...inputs.oldPassword} className="account__input" placeholder="Old Password"/>
                        <PsswdSVG className="account__icon"/>
                        <span onClick={() => setIsPsswdOld(!isPsswdOld)}>{isPsswdOld? <ShowSVG className="account__show"/>:<HideSVG className="account__show"/>}</span>
                    </div>
                    {errors?.oldPassword && <p className="account__error">{errors.oldPassword?.message}</p>}
                    <div className="account__field">
                        <input type={isPsswdNew? 'password':'text'} {...inputs.newPassword} className="account__input" placeholder="New Password"/>
                        <PsswdSVG className="account__icon"/>
                        <span onClick={() => setIsPsswdNew(!isPsswdNew)}>{isPsswdNew? <ShowSVG className="account__show"/>:<HideSVG className="account__show"/>}</span>
                    </div>
                    {errors.newPassword && <p className="account__error">{errors.newPassword?.message}</p>}
                    <span className="account__save"><Submit text="Save"/></span>
                </form>
                <span onClick={() => signOut()} className="account__logout"><Submit text={'LogOut'} /></span>
            </div>
        </main>
    )
}

export default Account;