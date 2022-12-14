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
                                <a href="#">Trang Ch???</a>
                            </Link>
                            <span className={cx('divider')}>/</span>
                            C???a H??ng
                        </div>
                        <div className={cx('is-right')}>
                            <span>Hi???n th??? {data.length} k???t qu???</span>
                            <select name="oderby" className={cx('order-option')} id="">
                                <option value="menu_order" selected="selected">
                                    Th??? t??? m???c ?????nh
                                </option>
                                <option value="date">M???i nh???t</option>
                                <option value="price">Th??? t??? theo gi??: th???p ?????n cao</option>
                                <option value="price-desc">Th??? t??? theo gi??: cao xu???ng th???p</option>
                            </select>
                        </div>
                    </div>
                    <div className={cx('category')}>
                        <div className={cx('sidebar', 'rol')}>
                            <Tippy
                                placement="bottom-start"
                                interactive="true"
                                visible={showResult && searchResult.length > 0}
                                render={(attrs) => (
                                    <PopperWrapper>
                                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                            <h3>S???n ph???m</h3>
                                            <ProductList />
                                            <h3>Tin t???c</h3>
                                            {/* <NewsList /> */}
                                        </div>
                                    </PopperWrapper>
                                )}
                                onClickOutside={handleHideResult}
                            >
                                <aside className={cx('search', 'widget')}>
                                    <input
                                        type="search"
                                        placeholder="T??m ki???m..."
                                        onFocus={() => SetShowResult(false)}
                                    />

                                    <button type="submit">
                                        <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                                    </button>
                                </aside>
                            </Tippy>
                            <aside className={cx('product-portfolio', 'widget', 'widget-bd')}>
                                <div className={cx('widget-title')}>Danh m???c s???n ph???m</div>
                                <div className={cx('is-divider')}></div>
                                <ul>
                                    <li>Ch??a ph??n lo???i</li>
                                    <li>Demo</li>
                                </ul>
                            </aside>
                            <aside className={cx('product-list', 'widget', 'widget-bd')}>
                                <div className={cx('widget-title')}>S???n ph???m</div>
                                <div className={cx('is-divider')}></div>
                                <ProductList />
                            </aside>
                            <aside className={cx('news-list', 'widget', 'widget-bd')}>
                                <div className={cx('widget-title')}>B??i vi???t m???i</div>
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
