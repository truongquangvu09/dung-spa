import React, { useState, useEffect } from 'react';
import style from './ViewCartLeft.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import ViewCartRight from '../ViewCartRight';

import { cartActions } from '../../../redux/Slice/cartSlice';

import { useSelector, useDispatch } from 'react-redux';

import { db } from '../../../FireBase/FireBase';
import { doc, getDoc } from 'firebase/firestore';

const cx = classNames.bind(style);

function ViewCartLeft() {
    const cartItems = useSelector((state) => state.cart.cartItems);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('message')}></div>
                {cartItems.length === 0 ? (
                    <div className={cx('cart-empty')}>
                        <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                        <Link to="/Shop">
                            <p>
                                <a className={cx('btn-back')}>Quay trở lại cửa hàng</a>
                            </p>
                        </Link>
                    </div>
                ) : (
                    <div className={cx('content')}>
                        <div className={cx('is-left', 'rol')}>
                            <form action="" className={cx('cart-form')}>
                                <table className={cx('table-left')}>
                                    <thead>
                                        <tr>
                                            <th class="product-name" colspan="3">
                                                Sản phẩm
                                            </th>
                                            <th class="product-price">Giá</th>
                                            <th class="product-quantity">Số lượng</th>
                                            <th class="product-subtotal">Tạm tính</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <Tr item={item} key={item.id} />
                                        ))}
                                        <tr>
                                            <td colspan="6" className={cx('action', 'clear')}>
                                                <div className={cx('continue-shopping')}>
                                                    <Link to="/Shop">
                                                        <a href="#" className={cx('return', 'button')}>
                                                            ← Tiếp tục xem sản phẩm{' '}
                                                        </a>
                                                    </Link>

                                                    {/* <button type="submit" className={cx('update', 'button')}>
                                                        Cập nhật giỏ hàng
                                                    </button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        <div className={cx('is-right', 'rol')}>
                            <ViewCartRight />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
const Tr = ({ item }) => {
    const dispatch = useDispatch();

    const deleteProduct = () => {
        dispatch(cartActions.deleteItem(item.id));
    };

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id: item.id,

                quantity: quantity,
            }),
        );
    };
    const decreaseCart = () => {
        dispatch(
            cartActions.decreaseCart({
                id: item.id,

                quantity: quantity,
            }),
        );
    };
    return (
        <tr className={cx('cart-item')}>
            <td className={cx('product-remove')}>
                <FontAwesomeIcon onClick={deleteProduct} className={cx('remove-icon')} icon={faXmark} />
            </td>
            <td className={cx('product-thumbnail')}>
                <img src={item.productImg} alt="anh" />
            </td>
            <td className={cx('product-name')}>{item.productName}</td>
            <td className={cx('product-price')}>₫{Number(item.productPrice).toLocaleString()}</td>
            <td className={cx('product-quantity')}>
                <div className={cx('quantity')}>
                    <button type="button" onClick={decreaseCart} class={cx('minus', ' button', ' is-form')}>
                        -
                    </button>
                    <button>{item.quantity}</button>
                    <button type="button" onClick={addToCart} class={cx('minus', ' button', ' is-form')}>
                        +
                    </button>
                </div>
            </td>
            <td className={cx('product-subtotal')}>₫{(item.productPrice * item.quantity).toLocaleString()}</td>
        </tr>
    );
};

export default ViewCartLeft;
