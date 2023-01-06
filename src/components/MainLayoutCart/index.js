import React from 'react';
import styles from './MainLayoutCart.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '../Layout/Popper';
import Tippy from '@tippyjs/react/headless';
// import 'tippy.js/dist/tippy.css';
import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import NewsList from './NewsList';
import { Link, Outlet } from 'react-router-dom';

import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../FireBase/FireBase';

import Loader from '../Layout/Loader/Loader';

const cx = classNames.bind(styles);

function MainLayoutCart() {
    const [searchResult, SetSearchResult] = useState([]);
    const [showResult, SetShowResult] = useState([true]);
    const [data, setData] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        // setIsLoader(true);
        const fetchData = async () => {
            let list = [];
            try {
                const QuerySnapshot = await getDocs(collection(db, 'products'));
                QuerySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            } catch (err) {}
        };
        fetchData();
        setTimeout(() => {
            SetSearchResult([1, 2, 3]);
        }, 0);
    }, []);

    // const handleSearch = (e) => {
    //     const searchTerm = e.target.value;

    // };

    const handleHideResult = () => {
        SetShowResult(false);
    };
    return (
        <>
            {isLoader && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('shop-title')}>
                        <div className={cx('is-left')}>
                            <Link to="/">
                                <a href="#">Trang Chủ</a>
                            </Link>
                            <span className={cx('divider')}>/</span>
                            Cửa Hàng
                        </div>
                        <div className={cx('is-right')}>
                            <span>Hiển thị {data.length} kết quả</span>
                            <select name="oderby" className={cx('order-option')} id="">
                                <option value="menu_order" selected="selected">
                                    Thứ tự mặc định
                                </option>
                                <option value="date">Mới nhất</option>
                                <option value="price">Thứ tự theo giá: thấp đến cao</option>
                                <option value="price-desc">Thứ tự theo giá: cao xuống thấp</option>
                            </select>
                        </div>
                    </div>
                    <div className={cx('category')}>
                        <div className={cx('sidebar', 'rol')}>
                            <Tippy
                                placement="bottom-start"
                                interactive="true"
                                visible={showResult && searchResult.length > 4}
                                render={(attrs) => (
                                    <PopperWrapper>
                                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                            <h3>Sản phẩm</h3>
                                            <ProductList />
                                            <h3>Tin tức</h3>
                                            {/* <NewsList /> */}
                                        </div>
                                    </PopperWrapper>
                                )}
                                onClickOutside={handleHideResult}
                            >
                                <aside className={cx('search', 'widget')}>
                                    <input
                                        type="search"
                                        placeholder="Tìm kiếm..."
                                        onFocus={() => SetShowResult(false)}
                                    />

                                    <button type="submit">
                                        <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                                    </button>
                                </aside>
                            </Tippy>
                            <aside className={cx('product-portfolio', 'widget', 'widget-bd')}>
                                <div className={cx('widget-title')}>Danh mục sản phẩm</div>
                                <div className={cx('is-divider')}></div>
                                <ul>
                                    <li>Chưa phân loại</li>
                                    <li>Demo</li>
                                </ul>
                            </aside>
                            <aside className={cx('product-list', 'widget', 'widget-bd')}>
                                <div className={cx('widget-title')}>Sản phẩm</div>
                                <div className={cx('is-divider')}></div>
                                <ProductList />
                            </aside>
                            <aside className={cx('news-list', 'widget', 'widget-bd')}>
                                <div className={cx('widget-title')}>Bài viết mới</div>
                                <div className={cx('is-divider')}></div>
                                <NewsList />
                            </aside>
                        </div>

                        <div className={cx('content', 'rol')}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainLayoutCart;
