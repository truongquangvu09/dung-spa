import React from 'react';
import Contact from './Contact';
import Map from './Map';
import classNames from 'classnames/bind';
import styles from './MainLayoutContact.module.scss';
const cx = classNames.bind(styles);

function MainLayoutContact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <section>
                    <Map />
                </section>
                <section>
                    <Contact />
                </section>
            </div>
        </div>
    );
}

export default MainLayoutContact;
