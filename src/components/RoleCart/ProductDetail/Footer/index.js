import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Related from '../Related';
const cx = classNames.bind(styles);

function FooterShop() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Sản phẩm tương tự</h3>
            <Related />
        </div>
    );
}

export default FooterShop;
