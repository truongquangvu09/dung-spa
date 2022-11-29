import React from 'react';
import classNames from 'classnames/bind';
import styles from './Head.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { db } from '../../../../FireBase/FireBase';
import { doc, getDoc } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../../../redux/Slice/cartSlice';

import {
    faFacebook,
    faLinkedin,
    faPinterest,
    faSquareTumblr,
    faSquareTwitter,
} from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function HeadProductDetail() {
    const { id } = useParams();
    console.log(id);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const handleAdd = (e) => {
        setQuantity(quantity + 1);
    };

    const handleRemove = (e) => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    };

    function GetCurrentProducts() {
        useEffect(() => {
            const getProducts = async () => {
                const docRef = doc(db, `products`, id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
            };
            getProducts();
        }, []);
        return product;
    }
    const bfPrice = Number(product.productPrice);
    const atPrice = Number(product.productPrice * (1 - product.productDiscount / 100));

    const dispatch = useDispatch();
    const addToCart = () => {
        toast.success('Thêm vào giỏ hàng thành công');

        dispatch(
            cartActions.addItem({
                id: product.productId,
                productName: product.productName,
                productImg: product.productImg,
                productPrice: product.productDiscount !== '' ? atPrice : bfPrice,
                quantity: quantity,
                totalPrice: product.productDiscount !== '' ? atPrice : bfPrice,
            }),
        );
    };

    GetCurrentProducts();

    return (
        <>
            {/* <ToastContainer autoClose={1000} limit={1} /> */}
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('is-left', 'col')}>
                        <div className={cx('product-image')}>
                            {product.productDiscount ? (
                                <div className={cx('badge')}>
                                    <div className={cx('badge-circle')}>
                                        <div className={cx('badge-inner')}>
                                            <span class={cx('onsale')}>-{product.productDiscount}%</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}

                            <figure>
                                <img id="myImg" src={product.productImg} alt={product.name} />
                            </figure>
                        </div>
                    </div>
                    <div className={cx('is-right', 'col')}>
                        <nav className={cx('breadcrumb')}>
                            <Link style={{ textDecoration: 'none' }} to="/">
                                {' '}
                                <a href="#">Trang chủ</a>
                            </Link>
                            <span className={cx('divider')}>/</span>
                            <Link style={{ textDecoration: 'none' }} to="/Shop">
                                {' '}
                                <a href="#">Đặc trưng</a>
                            </Link>
                        </nav>
                        <h1 className={cx('product-title')}>{product.productName}</h1>
                        <div className={cx('is-divider')}></div>
                        <div className={cx('price-wrapper')}>{}</div>
                        {product.productDiscount ? (
                            <div className={cx('price-wrapper')}>
                                <span className={cx('price')}>
                                    <del>
                                        <span className={cx('amount')}>
                                            ₫{Number(product.productPrice).toLocaleString()}
                                        </span>
                                    </del>
                                    <ins>
                                        <span className={cx('amount')}>
                                            ₫
                                            {Number(
                                                product.productPrice * (1 - product.productDiscount / 100),
                                            ).toLocaleString()}
                                        </span>
                                    </ins>
                                </span>
                            </div>
                        ) : (
                            <div className={cx('price-wrapper')}>
                                <span className={cx('price')}>
                                    <ins>
                                        <span className={cx('amount')}>
                                            ₫{Number(product.productPrice).toLocaleString()}
                                        </span>
                                    </ins>
                                </span>
                            </div>
                        )}
                        <div className={cx('description')}>
                            <p>{product.productDescription}</p>
                        </div>
                        <form className={cx('cart')} action="">
                            <div className={cx('cart-inner')}>
                                <input
                                    type="button"
                                    value="-"
                                    onClick={handleRemove}
                                    className={cx('minus', 'button', 'is-form')}
                                />
                                <input
                                    type="number"
                                    className={cx('input-text')}
                                    inputMode="numeric"
                                    value={quantity}
                                />
                                <input
                                    type="button"
                                    onClick={handleAdd}
                                    value="+"
                                    className={cx('plus', 'button', 'is-form')}
                                />
                            </div>
                            <input type="button" onClick={addToCart} className={cx('button-buy')} value="Mua hàng" />
                        </form>
                        <div className={cx('product-meta')}>
                            <span class="sku_wrapper">
                                Mã: <span class="sku">{product.productId}</span>
                            </span>
                            <span class="posted_in">
                                Danh mục:{' '}
                                <Link to="/Shop">
                                    <a href="#">ĐẶC TRƯNG</a>
                                </Link>
                                ,{' '}
                                <Link to="/Services">
                                    <a href="#">DỊCH VỤ SPA</a>
                                </Link>
                            </span>
                        </div>
                        <div className={cx('social')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faFacebook} />
                            <FontAwesomeIcon className={cx('icon')} icon={faSquareTwitter} />
                            <FontAwesomeIcon className={cx('icon')} icon={faPinterest} />
                            <FontAwesomeIcon className={cx('icon')} icon={faLinkedin} />
                            <FontAwesomeIcon className={cx('icon')} icon={faSquareTumblr} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeadProductDetail;
