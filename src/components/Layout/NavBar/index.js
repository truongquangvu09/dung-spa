import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Footer from '../Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser, faRightFromBracket, faUserGear } from '@fortawesome/free-solid-svg-icons';

import { auth, db } from '../../../FireBase/FireBase';
import { collection, query, where, getDocs } from 'firebase/firestore';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';

import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
// const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

function Navbar() {
    function GetCurrentUser() {
        const [user, setUser] = useState('');
        const usersCollectionRef = collection(db, 'users');

        // const dispatch = useDispatch();

        useEffect(() => {
            auth.onAuthStateChanged((userLogged) => {
                if (userLogged) {
                    const getUSers = async () => {
                        const q = query(collection(db, 'users'), where('uid', '==', userLogged.uid));
                        const data = await getDocs(q);
                        setUser(
                            data.docs.map((doc) => ({
                                ...doc.data(),
                                id: doc.id,
                            })),
                        );
                    };
                    getUSers();
                } else {
                    setUser(null);
                }
            });
        }, []);
        return user;
    }
    const [isLoading, setIsLoading] = useState(false);

    const loggedUser = GetCurrentUser();

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    console.log(totalQuantity);
    console.log(totalAmount);

    const navigate = useNavigate;
    const handleLogout = () => {
        auth.signOut().then(() => {
            toast.success('Đăng xuất thành công');
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                navigate('/Cart');
            }, 2000);
        });
    };
    const headerRef = useRef(null);
    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
                headerRef.current.classList.add('sticky_header');
            } else {
                headerRef.current.classList.remove('sticky_header');
            }
        });
    };
    useEffect(() => {
        stickyHeaderFunc();
        return () => window.removeEventListener('scroll', stickyHeaderFunc);
    });
    const [sticky, setSticky] = useState(false);
    function setFixed() {
        if (window.scrollY >= 120) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    }
    window.addEventListener('scroll', setFixed);
    return (
        <>
            <ToastContainer autoClose={1500} />
            {isLoading && <Loader />}
            <header className={cx('wrapper')}>
                <nav className={cx('inner')}>
                    <div className={cx('wrapper_logo')}>
                        <img
                            className={cx('logo')}
                            src={require('../../../assets/img/LogoDungSpa (1) (4).png')}
                            alt="#"
                        />
                    </div>
                    {!loggedUser ? (
                        <div className={cx('wrapper_menu')}>
                            <ol className={cx('menu')}>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/">
                                        TRANG CHỦ
                                    </NavLink>
                                </li>

                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Introduce">
                                        GIỚI THIỆU
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Shop">
                                        CỬA HÀNG
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Services">
                                        DỊCH VỤ
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Contact">
                                        LIÊN HỆ
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/News">
                                        TIN TỨC
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Booking">
                                        ONLINE BOOKING
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Cart">
                                        <span className={cx('price')}> ₫{totalAmount.toLocaleString()}</span>

                                        <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping} />
                                        <span>({totalQuantity})</span>
                                    </NavLink>
                                </li>
                                <li className={cx('login-register')}>
                                    <FontAwesomeIcon className={cx('icon-user')} icon={faCircleUser} />
                                    <NavLink className={cx('link_item_menu')} to="/Login">
                                        Đăng Nhập
                                    </NavLink>
                                    <span className={cx('divider')}>|</span>

                                    <NavLink className={cx('link_item_menu')} to="/Register">
                                        Đăng Kí
                                    </NavLink>
                                </li>
                            </ol>
                        </div>
                    ) : (
                        <div className={cx('wrapper_menu', 'wrapper_menu_user')}>
                            <ol className={cx('menu')}>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/">
                                        TRANG CHỦ
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Introduce">
                                        GIỚI THIỆU
                                    </NavLink>
                                </li>

                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Shop">
                                        CỬA HÀNG
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Services">
                                        DỊCH VỤ
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Contact">
                                        LIÊN HỆ
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/News">
                                        TIN TỨC
                                    </NavLink>
                                </li>
                                <li className={cx('item_menu')}>
                                    <NavLink className={cx('link_item_menu')} to="/Booking">
                                        ONLINE BOOKING
                                    </NavLink>
                                </li>
                                {loggedUser[0].email === 'truongquangvuu09@gmail.com' ? (
                                    <li className={cx('item_menu')}>
                                        <NavLink className={cx('link_item_menu')} to="/Sales">
                                            {/* <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping} /> */}
                                        </NavLink>
                                    </li>
                                ) : (
                                    <li className={cx('item_menu')}>
                                        <NavLink className={cx('link_item_menu')} to="/Cart">
                                            <span className={cx('price')}> ₫{totalAmount.toLocaleString()}</span>

                                            <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping} />
                                            <span>({totalQuantity})</span>
                                        </NavLink>
                                    </li>
                                )}

                                {loggedUser[0].email === 'truongquangvuu09@gmail.com' ? (
                                    <Tippy content="Quản Lý" theme="light">
                                        <NavLink to="/Admin">
                                            <li className={cx('login-register')}>
                                                <FontAwesomeIcon className={cx('icon-user')} icon={faUserGear} />
                                            </li>
                                        </NavLink>
                                    </Tippy>
                                ) : (
                                    ''
                                )}

                                <Tippy content="Hồ sơ" theme="light">
                                    <NavLink to="/UserProfile">
                                        <li className={cx('login-register')}>
                                            <FontAwesomeIcon className={cx('icon-user')} icon={faCircleUser} />
                                        </li>
                                    </NavLink>
                                </Tippy>

                                <Tippy content="Đăng xuất" theme="light">
                                    <NavLink to="/">
                                        <li className={cx('login-register')}>
                                            <FontAwesomeIcon
                                                onClick={handleLogout}
                                                className={cx('icon-logout')}
                                                icon={faRightFromBracket}
                                            />
                                        </li>
                                    </NavLink>
                                </Tippy>
                            </ol>
                        </div>
                    )}
                </nav>
                <div>
                    <Outlet />
                </div>
                {/* <Footer /> */}
            </header>
        </>
    );
}

export default Navbar;
