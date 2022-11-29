import React from 'react';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './ProductListDetail.module.scss';
import { Link } from 'react-router-dom';

import { db } from '../../../FireBase/FireBase';
import { collection, getDocs } from 'firebase/firestore';

import Loader from '../../Layout/Loader/Loader';

const cx = classNames.bind(styles);

function ProductListDetail(props) {
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    const handleClick = (e) => {
        setIsLoader(true);
        setTimeout(() => {}, 5000);
    };

    useEffect(() => {
        const getProduct = () => {
            const productList = [];
            const path = 'products';
            getDocs(collection(db, path))
                .then((QuerySnapshot) => {
                    QuerySnapshot.forEach((doc) => {
                        productList.push({ ...doc.data(), id: doc.id });
                        console.log(doc.id, '=>', doc.data());
                    });
                    setProducts(productList);
                })
                .catch((error) => {});
        };
        getProduct();
    }, []);
    return (
        <>
            {isLoader && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('products', 'row')}>
                    <div className={cx('product-small')}>
                        {products.map((item) => {
                            let CircleDiscount = () => {
                                if (item.productDiscount !== '') {
                                    return (
                                        <div className={cx('badge')}>
                                            <div className={cx('badge-circle')}>
                                                <div className={cx('badge-inner')}>
                                                    <span class={cx('onsale')}>-{item.productDiscount}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return '';
                                }
                            };
                            let Discount = () => {
                                if (item.productDiscount !== '') {
                                    return (
                                        <div className={cx('price-wrapper')}>
                                            <span className={cx('price')}>
                                                <del>
                                                    <span className={cx('amount')}>
                                                        ₫{Number(item.productPrice).toLocaleString()}
                                                    </span>
                                                </del>
                                                <ins>
                                                    <span className={cx('amount')}>
                                                        ₫
                                                        {(
                                                            item.productPrice *
                                                            (1 - item.productDiscount / 100)
                                                        ).toLocaleString()}
                                                    </span>
                                                </ins>
                                            </span>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className={cx('price-wrapper')}>
                                            <span className={cx('price')}>
                                                <ins>
                                                    <span className={cx('amount')}>
                                                        ₫{Number(item.productPrice).toLocaleString()}
                                                    </span>
                                                </ins>
                                            </span>
                                        </div>
                                    );
                                }
                            };
                            return (
                                <a style={{ textDecoration: 'none' }} href={`/Shop/${item.id}`} onClick={handleClick}>
                                    <div className={cx('inner')} key={item.id} item={item}>
                                        {CircleDiscount()}

                                        <div className={cx('product-smalls', 'box')}>
                                            <div className={cx('box-image')}>
                                                <a href={`/Shop/${item.id}`}>
                                                    <img src={item.productImg} alt="" />
                                                </a>
                                            </div>
                                            <div className={cx('box-text-product')}>
                                                <div className={cx('title-wrapper')}>
                                                    <a href={`/Shop/${item.id}`}>{item.productName}</a>
                                                </div>
                                                {Discount()}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductListDetail;
