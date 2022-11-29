import React from 'react';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';

import { Link } from 'react-router-dom';

import { db } from '../../../FireBase/FireBase';
import { collection, getDocs } from 'firebase/firestore';

const cx = classNames.bind(styles);

function ProductList(props) {
    const [products, setProducts] = useState([]);
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
        <div className={cx('product-list')}>
            {products.map((product, index) => {
                let Discount = () => {
                    if (product.productDiscount !== '') {
                        return (
                            <div className={cx('price-box')}>
                                <del className={cx('price-discount')}>
                                    <span className={cx('price')}>₫</span>
                                    {Number(product.productPrice).toLocaleString()}
                                </del>
                                <span className={cx('price-amount')}>
                                    <span className={cx('price')}>₫</span>
                                    {Number(
                                        product.productPrice * (1 - product.productDiscount / 100),
                                    ).toLocaleString()}
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div className={cx('price-box')}>
                                <span className={cx('price-amount')}>
                                    <span className={cx('price')}>₫</span>
                                    {Number(product.productPrice).toLocaleString()}
                                </span>
                            </div>
                        );
                    }
                };
                return (
                    <div className="product-item" key={index}>
                        <ul>
                            <li>
                                <a href={`/Shop/${product.id}`}>
                                    <a href={`/Shop/${product.id}`}>
                                        <img src={product.productImg} alt="truyenthong" />
                                        <span className={cx('product-title')}>{product.productName}</span>
                                    </a>

                                    {Discount()}
                                </a>
                            </li>
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

export default ProductList;
