import React from 'react';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './NewsList.module.scss';

import { Link } from 'react-router-dom';

import { db } from '../../../FireBase/FireBase';
import { collection, getDocs } from 'firebase/firestore';

const cx = classNames.bind(styles);

function NewsList(props) {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const getNew = () => {
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
        getNew();
    }, []);
    return (
        <div className={cx('news-wrapper')}>
            {news.map((item, index) => {
                return (
                    <ul className={cx('news-item')}>
                        <li className={cx('post')} key={index}>
                            <div className={cx('post-image')}>
                                <img src={item.newImg} alt="" />
                            </div>
                            <a href={`/News/${item.id}`}>
                                <a className={cx('word-wrap')} href={`/News/${item.id}`}>
                                    {item.newDescription}
                                </a>
                            </a>
                        </li>
                    </ul>
                );
            })}
        </div>
    );
}

export default NewsList;
