import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import classNames from 'classnames/bind';
import styles from './Tab.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStrava } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { db } from '../../../../FireBase/FireBase';
import { doc, getDoc } from 'firebase/firestore';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../../../redux/Slice/cartSlice';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function TabContent(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabContent.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const [rating, setRating] = useState(null);

    const [save, setSave] = useState(false);
    const reviewUser = useRef('');
    const reviewUSerEmail = useRef('');
    const reviewMsg = useRef('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewUserName = reviewUser.current.value;
        const reviewUserEmail = reviewUSerEmail.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        const reviewObj = {
            userName: reviewUserName,
            userEmail: reviewUserEmail,
            text: reviewUserMsg,
            rating,
            save,
        };
        toast.success('Đánh giá thành công');
        navigate('/Shop');
    };

    const addToCart = (e) => {
        dispatch(cartActions.addItem)({});
    };

    const { id } = useParams();
    const [product, setProduct] = useState([]);
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

    GetCurrentProducts();
    const Description = () => {
        return <p>{product.productDescriptionDetail}</p>;
    };
    const Review = () => {
        return (
            <div className={cx('review-wrapper')}>
                <div className={cx('comment')}>
                    <h3 className={cx('review-title')}>Đánh giá</h3>
                    <p className={cx('no-review')}>Chưa có đánh giá nào</p>
                </div>
                <div className={cx('review-form-wrapper')}>
                    <div className={cx('review-form')}>
                        <div className={cx('review-form-inner')}>
                            <h3 className={cx('reply-title')}>
                                Hãy là người đầu tiên đánh giá " {product.productName} "
                            </h3>

                            <form action="" onSubmit={handleSubmit} className={cx('comment-form')}>
                                <div className={cx('comment-rating')}>
                                    <label htmlFor="">Đánh giá của bạn</label>

                                    <p>
                                        <span className={cx('stars')}>
                                            <span className={cx('star-1')} onClick={() => setRating(1)}>
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className={cx('star-1')} onClick={() => setRating(2)}>
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className={cx('star-1')} onClick={() => setRating(3)}>
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className={cx('star-1')} onClick={() => setRating(4)}>
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <span className={cx('star-1')} onClick={() => setRating(5)}>
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                        </span>
                                    </p>
                                </div>

                                <p className={cx('comment-form-comment')}>
                                    <label htmlFor="" className={cx('comment')}>
                                        Nhận xét của bạn *
                                    </label>
                                    <textarea name="comment" id="comment" cols="45" rows="8" ref={reviewMsg}></textarea>
                                </p>
                                <div className={cx('info')}>
                                    <p className={cx('comment-form-author', 'author')}>
                                        <label htmlFor="" className={cx('comment')}>
                                            Tên *
                                        </label>
                                        <input type="text" ref={reviewUser} />
                                    </p>
                                    <p className={cx('comment-form-author')}>
                                        <label htmlFor="" className={cx('comment')}>
                                            Email *
                                        </label>
                                        <input type="email" ref={reviewUSerEmail} />
                                    </p>
                                </div>
                                <p className={cx('comment-form-cookies')}>
                                    <input id="consent" type="checkbox" value="yes" onClick={() => setSave(true)} />
                                    <label htmlFor="consent">
                                        Lưu tên của tôi, email, và trang web trong trình duyệt này cho lần bình luận kế
                                        tiếp của tôi.
                                    </label>
                                </p>
                                <p className={cx('form-submit')}>
                                    <input
                                        name="submit"
                                        type="submit"
                                        id="submit"
                                        class="submit"
                                        value="Gửi đi"
                                    ></input>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab className={cx('shared')} label="Mô tả" {...a11yProps(0)} />
                        <Tab className={cx('shared')} label="Đánh giá" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabContent value={value} index={0}>
                    <div className={cx('description')}>{Description()}</div>
                </TabContent>
                <TabContent className={cx('review')} value={value} index={1}>
                    {Review()}
                </TabContent>
            </Box>
        </div>
    );
}
export default BasicTabs;
