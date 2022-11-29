import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ViewPayCartRight.module.scss';

import { useSelector } from 'react-redux';
import { cartActions } from '../../../../redux/Slice/cartSlice';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';

import { auth, db, storage } from '../../../../FireBase/FireBase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);

function ViewPayCartRight() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log(cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [etc, setEtc] = useState(null);

    const handleBuy = () => {
        addDoc(collection(db, 'orders'), {}).then(() => {
            navigate('/Shop');
            toast.success('Đặt hàng thành công !');
            dispatch(cartActions.clearCart());
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('checkout-sidebar')}>
                    <h3>Đơn hàng của bạn</h3>
                    <div className={cx('order-review')}>
                        <table>
                            <thead>
                                <tr>
                                    <th class={cx('product-name')}>Sản phẩm</th>
                                    <th class={cx('product-total')}>Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => {
                                    return (
                                        <tr class={cx('cart_item')} key={index}>
                                            <td class={cx('product-name')}>
                                                {item.productName}&nbsp;{' '}
                                                <strong class={cx('product-quantity')}>×&nbsp;{item.quantity}</strong>{' '}
                                            </td>
                                            <td class={cx('product-total')}>
                                                <span class={cx('Price-amount')}>
                                                    <span class={cx('Price-currencySymbol')}>₫</span>
                                                    {Number(item.productPrice * item.quantity).toLocaleString()}
                                                </span>{' '}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr class={cx('cart-subtotal')}>
                                    <th>Tạm Tính</th>
                                    <td>
                                        <span class={cx('Price-amount')}>
                                            <span class={cx('Price-currencySymbol')}>₫</span>
                                            {totalAmount.toLocaleString()}
                                        </span>
                                    </td>
                                </tr>
                                <tr class={cx('cart-subtotal')}>
                                    <th>Giảm giá</th>
                                    <td>
                                        <span class={cx('Price-amount')}>
                                            <span class={cx('Price-currencySymbol')}>₫</span>
                                            {/* {totalAmount.toLocaleString()} */}0
                                        </span>
                                    </td>
                                </tr>
                                <tr class={cx('order-total')}>
                                    <th>Tổng</th>
                                    <td>
                                        <strong>
                                            <span class={cx('Price-amount', 'price-sum')}>
                                                <span class={cx('Price-currencySymbol')}>₫</span>
                                                {totalAmount.toLocaleString()}
                                            </span>
                                        </strong>{' '}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className={cx('checkout-payment')}>
                            <ul>
                                <li>
                                    <input
                                        type="radio"
                                        id="bank"
                                        name="checkout"
                                        value="bank"
                                        checked
                                        onClick={() => setEtc('bank')}
                                    />

                                    <label>Chuyển khoản ngân hàng</label>
                                    <p>
                                        {' '}
                                        Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử
                                        dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ đươc giao
                                        sau khi tiền đã chuyển.
                                    </p>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="check"
                                        name="checkout"
                                        value="check"
                                        checked
                                        onClick={() => setEtc('check')}
                                    />

                                    <label>Kiểm tra thanh toán</label>
                                    <p>
                                        {' '}
                                        Vui lòng gửi chi phiếu của bạn đến DUNG SPA, k40/44 Nguyễn Huy Tưởng Đà Nẵng
                                        hoặc qua mã bưu điện của cửa hàng là 50609.
                                    </p>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="off"
                                        name="checkout"
                                        value="off"
                                        checked
                                        onClick={() => setEtc('off')}
                                    />

                                    <label>Trả tiền mặt khi nhận hàng</label>
                                    <p> Trả tiền mặt khi giao hàng</p>
                                </li>
                            </ul>
                            <div className="form-row">
                                <button onClick={handleBuy} type="submit">
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                        <div className={cx('privacy-text')}>
                            <p>
                                Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng
                                website, và cho các mục đích cụ thể khác đã được mô tả trong{' '}
                                <a href="">chính sách riêng tư</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPayCartRight;
