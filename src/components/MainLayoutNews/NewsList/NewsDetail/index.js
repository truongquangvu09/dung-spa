import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './NewsDetail.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { db } from '../../../../FireBase/FireBase';
import { doc, getDoc, Timestamp, addDoc, collection } from 'firebase/firestore';

import { toast } from 'react-toastify';

import useFetchCollection from '../../../../CustomHooks/userFetchCollections';

import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

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

    const [save, setSave] = useState(false);
    const reviewUser = useRef('');
    const reviewUSerEmail = useRef('');
    const reviewMsg = useRef('');
    const navigate = useNavigate();

    const reviewUserName = reviewUser.current.value;
    const reviewUserEmail = reviewUSerEmail.current.value;
    const reviewUserMsg = reviewMsg.current.value;
    console.log(reviewUserName);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const today = new Date();
        const date = today.toDateString();
        const reviewObj = {
            userName: reviewUserName,
            userEmail: reviewUserEmail,
            text: reviewUserMsg,
            save,
            newName: news.newName,
            commentDate: date,
            createdAt: Timestamp.now().toDate(),
        };
        console.log(reviewObj);

        try {
            addDoc(collection(db, 'comments'), reviewObj);
            toast.success('????nh gi?? th??nh c??ng');

            navigate('/News');
        } catch (error) {
            toast.error(error.message);
        }
    };
    const { data } = useFetchCollection('comments');
    const filteredReviews = data.filter((comments) => comments.newName === news.newName);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('post')}>
                    <div className={cx('post-inner')}>
                        <header className={cx('entry-header')}>
                            <div className={cx('entry-header-text')}>
                                <p>TIN T???C</p>
                                <h1>{news.newName}</h1>
                                <div className={cx('divider')}></div>
                                <p>POSTED ON 24-12 BY C1SE.15</p>
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
                        <h3>Tr??? L???i</h3>
                        {filteredReviews.map((item, index) => {
                            return (
                                <div className={cx('comments-info')} key={index}>
                                    <span className={cx('avt')}>
                                        <FontAwesomeIcon icon={faCircleUser} />
                                    </span>
                                    <span className={cx('userName')}>{item.userName}</span>
                                    <span className={cx('commentDate')}> {item.commentDate}</span>
                                    <div className={cx('commentText')}>{item.text}</div>
                                </div>
                            );
                        })}
                        <form className={cx('comment-form')} onSubmit={handleSubmit}>
                            <p className={cx('comment-notes')}>
                                {/* <span>
                                    Email c???a b???n s??? kh??ng ???????c hi???n th??? c??ng khai. C??c tr?????ng b???t bu???c ???????c ????nh d???u *
                                </span> */}
                            </p>
                            <p className={cx('comment-form-comment')}>
                                <label>B??nh Lu???n</label>
                                <textarea name="comment" id="comment" cols="30" rows="10" ref={reviewMsg}></textarea>
                            </p>
                            <p className={cx('comment-form-author')}>
                                <label>T??n *</label>
                                <input type="text" ref={reviewUser} />
                            </p>
                            <p className={cx('comment-form-email')}>
                                <label>Email *</label>
                                <input type="text" ref={reviewUSerEmail} />
                            </p>
                            <p className={cx('comment-form-consent')}>
                                <input type="checkbox" onClick={() => setSave(true)} />
                                <label>
                                    L??u t??n c???a t??i, email trong tr??nh duy???t n??y cho l???n b??nh lu???n k??? ti???p c???a t??i.
                                </label>
                            </p>
                            <p className={cx('comment-form-submit')}>
                                <input type="submit" value="Ph???n h???i" name="submit" />
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsDetailContent;
