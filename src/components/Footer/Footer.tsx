import React from 'react';
import './footer.scss'
import {ReactComponent as TGSVG} from "../../assets/icons/telegram-logo.svg";
import {ReactComponent as GMSVG} from "../../assets/icons/gmail-logo.svg";
import {ReactComponent as GHSVG} from "../../assets/icons/github-logo.svg";

const Footer:React.FC = () => {

    const width: number = window.innerWidth


    return (
        <footer className="footer">
            <div className="footer__container _container">
                <div className="footer__body">
                    <p className="footer__title">Created by{width<356 && <br/>} Anton Dymov</p>
                    <ul className="footer__contacts">
                        <li className="footer__contact">
                            <a href="https://t.me/slipchiD_D" target='_blank'>
                                <TGSVG className="footer__contact-svg"/>
                                <p className="footer__contact-name">Telegram</p>
                            </a>
                        </li>
                        <li className="footer__contact">
                            <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=theslipocon@email.com&subject=MISSED%20CALL%20EZTRADER&body=" target='_blank'>
                                <GMSVG className="footer__contact-svg"/>
                                <p className="footer__contact-name">Gmail</p>
                            </a>
                        </li>
                        <li className="footer__contact">
                            <a href="https://github.com/AnthonySlip" target='_blank'>
                                <GHSVG className="footer__contact-svg"/>
                                <p className="footer__contact-name">GitHub</p>
                            </a>
                        </li>
                    </ul>
                    <a href={import.meta.env.VITE_GIT_ABOUT} target='_blank' className="footer__about">About</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;