import React from 'react';
import HeadProductDetail from './Head';
import BasicTabs from './Tab';
import Related from './Related/index';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import FooterShop from './Footer/index';

const cx = classNames.bind(styles);

function ProductDetail() {
    return (
        <div className={cx('wrappers')}>
            <HeadProductDetail />
            <BasicTabs />

            <FooterShop />
        </div>
    );
}

export default ProductDetail;
