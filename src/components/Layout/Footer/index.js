import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={require('../../../assets/img/LogoDungSpa (1) (3).png')} alt="logo" />
            </div>
            <div className={cx('contact')}>
                <p>Dung Spa, K40/44 Nguyễn Huy Tưởng, Da Nang</p>
                <a href="mailto:dungspabeauty1982@gmail.com">dungSpabeauty@gmail.com</a>
                <br />

                <a href="tel: 0783442955">0783442955</a>
            </div>
            <div className={cx('social')}>
                <a href="#">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </div>
            <div className={cx('copyright')}>
                Bản quyền © 2022 All Rights Reserved by <span>C1SE.15 TEAM</span>.{' '}
            </div>
        </div>
    );
}

export default Footer;
