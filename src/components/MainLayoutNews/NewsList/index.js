import React from 'react';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './NewsList.module.scss';
import { Link } from 'react-router-dom';

import { newListContent } from '../../../data/data';

import { db } from '../../../FireBase/FireBase';
import { collection, getDocs } from 'firebase/firestore';

const cx = classNames.bind(styles);

function NewsListContent(props) {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const getProduct = () => {
            const newList = [];
            const path = 'news';
            getDocs(collection(db, path))
                .then((QuerySnapshot) => {
                    QuerySnapshot.forEach((doc) => {
                        newList.push({ ...doc.data(), id: doc.id });
                        console.log(doc.id, '=>', doc.data());
                    });
                    setNews(newList);
                })
                .catch((error) => {});
        };
        getProduct();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('products', 'row')}>
                <div className={cx('product-small')}>
                    {news.map((item) => {
                        let CircleDiscount = () => {
                            return (
                                <div className={cx('badge-news')}>
                                    <div className={cx('badge-circle')}>
                                        <div class={cx('badge-inner')}>
                                            <span class="post-date-day">{Number(item.newTime)}</span> <br />
                                            <span class="post-date-month is-xsmall">Th{item.month}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        };

                        return (
                            <a style={{ textDecoration: 'none' }} href={`/News/${item.id}`}>
                                <div className={cx('inner')} key={item.newName} item={item}>
                                    {CircleDiscount()}

                                    <div className={cx('product-smalls', 'box')}>
                                        <div className={cx('box-image')}>
                                            <a href={`/News/${item.id}`}>
                                                <img src={item.newImg} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('box-text-product')}>
                                            <div className={cx('title-wrapper')}>
                                                <a href={`/News/${item.id}`}>{item.newName}</a>
                                            </div>
                                            <div className={cx('divider')}></div>
                                            <div className={cx('blog')}>{item.newDescription}</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default NewsListContent;
