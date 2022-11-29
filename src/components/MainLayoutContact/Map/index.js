import React from 'react';
import classNames from 'classnames/bind';
import styles from './Map.module.scss';
const cx = classNames.bind(styles);

function Map() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>10h sáng đến 8:00h tối | THỨ HAI - THỨ BẢY</p>
                <h2>Xin chào, chúng tôi có thể giúp gì?</h2>
                <p>
                    Rõ ràng chúng ta đã đạt đến một độ cao tuyệt vời trong bầu khí quyển, vì bầu trời là một màu đen
                    chết chóc và những ngôi sao đã ngừng lấp lánh.
                </p>
                <div className={cx('divider')}></div>
            </div>
            <div className={cx('map')}>
                <div className={cx('map-inner')}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.2047221489856!2d108.16570451469438!3d16.054862844087623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142196540e6d49b%3A0x9fa5ce5bb67622e6!2sDung%20Spa!5e0!3m2!1svi!2s!4v1665932281225!5m2!1svi!2s"
                        width={995}
                        height={580}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    );
}

export default Map;
