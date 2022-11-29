import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ViewCartRight.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faTag } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';
import { cartActions } from '../../../redux/Slice/cartSlice';

const cx = classNames.bind(styles);
function ViewCartRight() {
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const [discount, setDiscount] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('cart-title')}>
                    <table cellSpacing={0}>
                        <thead>
                            <tr>
                                <th class="product-name" colspan="2">
                                    Cộng giỏ hàng
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <table cellSpacing={0}>
                        <tbody>
                            <tr className={cx('cart-subtotal')}>
                                <th>Tạm tính</th>
                                <td>
                                    <span class={cx('woocommerce-Price-amount', ' amount')}>
                                        <span class={cx('woocommerce-Price-currencySymbol')}>₫</span>
                                        {totalAmount.toLocaleString()}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>Tổng</th>
                                <td data-title="Tổng">
                                    <strong>
                                        <span class={cx('woocommerce-Price-amount', ' amount')}>
                                            <span class={cx('woocommerce-Price-currencySymbol')}>₫</span>
                                            {totalAmount.toLocaleString()}
                                        </span>
                                    </strong>{' '}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/ViewPayCart">
                        <div className={cx('checkout')}>
                            <a href="" className={cx('checkout-button')}>
                                Tiến hành thanh toán
                            </a>
                        </div>
                    </Link>
                </div>
                <form action="" className={cx('check-discount')}>
                    <div className={cx('discount')}>
                        <h3 className={cx('widget-title')}>
                            <FontAwesomeIcon className={cx('icon-discount')} icon={faTag} />
                            Phiếu giảm giá
                        </h3>
                        <input type="text" placeholder="Mã ưu đãi" />
                        <Link to="/ViewPayCart">
                            <button type="submit">Áp dụng</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ViewCartRight;
