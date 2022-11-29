import React from 'react';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1>LIÊN HỆ VỚI CHÚNG TÔI</h1>
                <div className={cx('contact-detail')}>
                    <div className={cx('is-left')}>
                        <div className={cx('featured-box')}>
                            <div className={cx('icon-box')}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className={cx('text-box')}>
                                <p>Dung Spa, K40/44 Nguyễn Huy Tưởng, Da Nang</p>
                            </div>
                        </div>
                        <div className={cx('featured-box')}>
                            <div className={cx('icon-box')}>
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className={cx('text-box')}>
                                <a href="tel:0783442955">0783442955</a>
                            </div>
                        </div>
                        <div className={cx('featured-box')}>
                            <div className={cx('icon-box')}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className={cx('text-box')}>
                                <a href="mailto:dungspabeauty1982@gmail.com" type="email">
                                    dungspabeauty1982@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className={cx('featured-box')}>
                            <div className={cx('icon-box')}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </div>
                            <div className={cx('text-box')}>
                                <a href="https://www.facebook.com/profile.php?id=100071958960171">S Pa Dung</a>
                            </div>
                        </div>
                    </div>
                    <div className={cx('is-right')}>
                        <div className={cx('form-inner')}>
                            <div className={cx('form-row')}>
                                <input type="text" placeholder="Họ và tên" />
                            </div>
                            <div className={cx('form-row')}>
                                <input type="text" placeholder="Email" />
                            </div>
                        </div>
                        <div className={cx('form-inner')}>
                            <div className={cx('form-row')}>
                                <input type="text" placeholder="Số điện thoại" />
                            </div>
                            <div className={cx('form-row')}>
                                <input type="text" placeholder="Địa chỉ" />
                            </div>
                        </div>
                        <div className={cx('message')}>
                            <textarea name="content" id="content" cols="30" rows="10" placeholder="Lời nhắn"></textarea>
                        </div>
                        <div className={cx('form-button')}>
                            <button type="submit">Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
