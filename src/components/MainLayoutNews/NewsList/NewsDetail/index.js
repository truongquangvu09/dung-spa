import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './NewsDetail.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { db } from '../../../../FireBase/FireBase';
import { doc, getDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);

function NewsDetailContent() {
    const { id } = useParams();
    const [news, setNews] = useState('');
    function GetCurrentNews() {
        useEffect(() => {
            const getNews = async () => {
                const docRef = doc(db, `news`, id);
                const docSnap = await getDoc(docRef);
                setNews(docSnap.data());
            };
            getNews();
        }, []);
        return news;
    }
    console.log(news);
    GetCurrentNews();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('post')}>
                <div className={cx('post-inner')}>
                    <header className={cx('entry-header')}>
                        <div className={cx('entry-header-text')}>
                            <p>TIN TỨC</p>
                            <h1>{news.newName}</h1>
                            <div className={cx('divider')}></div>
                            <p>POSTED ON {String(news.newTime)} BY C1SE.15</p>
                        </div>
                        <div className={cx('entry-img')}>
                            <div className={cx('badge-entry')}>
                                <div className={cx('badge-circle')}>
                                    <div class={cx('badge-inner')}>
                                        <span class="post-date-day">24</span> <br />
                                        <span class="post-date-month is-xsmall">Th12</span>
                                    </div>
                                </div>
                            </div>

                            <img src={news.newImg} alt="" />
                        </div>
                    </header>
                    <div className={cx('entry-content')}>
                        <h3>What is {news.newName}?</h3>
                        <p>{news.newDescription}</p>
                        <h3>Why do we use it?</h3>
                        <p>{news.newDescriptionDetail}</p>
                    </div>
                    <nav className={cx('navigation-post')}>
                        <Link to="/News">
                            <a>
                                <FontAwesomeIcon
                                    style={{ marginRight: '10px', paddingLeft: '10px' }}
                                    icon={faAngleLeft}
                                />
                                Back to list
                            </a>
                        </Link>
                    </nav>
                </div>
            </div>
            <div className={cx('comment')}>
                <div className={cx('comment-respond')}>
                    <h3>Trả Lời</h3>
                    <form className={cx('comment-form')}>
                        <p className={cx('comment-notes')}>
                            <span>
                                Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc được đánh dấu *
                            </span>
                        </p>
                        <p className={cx('comment-form-comment')}>
                            <label>Bình Luận</label>
                            <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                        </p>
                        <p className={cx('comment-form-author')}>
                            <label>Tên *</label>
                            <input type="text" />
                        </p>
                        <p className={cx('comment-form-email')}>
                            <label>Email *</label>
                            <input type="text" />
                        </p>
                        <p className={cx('comment-form-url')}>
                            <label>Trang Web *</label>
                            <input type="text" />
                        </p>
                        <p className={cx('comment-form-consent')}>
                            <input type="checkbox" />
                            <label>
                                Lưu tên của tôi, email, và trang web trong trình duyệt này cho lần bình luận kế tiếp của
                                tôi.
                            </label>
                        </p>
                        <p className={cx('comment-form-submit')}>
                            <input type="submit" value="Phản hồi" />
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewsDetailContent;
