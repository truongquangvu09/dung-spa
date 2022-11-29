import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Register/Register.module.scss';

import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { auth, db } from '../../FireBase/FireBase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../../components/Layout/Loader/Loader';

const cx = classNames.bind(styles);

function Login() {
    const [errorSuccess, setErrorSuccess] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Vui lòng nhập email !')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Địa chỉ email không hợp lệ',
                ),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu!')
                .oneOf([Yup.ref('password'), null], 'mật khẩu không đúng'),
        }),
        onSubmit: (values) => {
            console.log(values);
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    // setSuccess('Đăng nhập thành công');
                    toast.success('Đăng nhập thành công');
                    setIsLoading(true);
                    setErrorSuccess('');

                    setTimeout(() => {
                        setSuccess('');
                        navigate('/');
                    }, 2000);
                })

                .catch((error) => {
                    toast.error('Email hoặc Mật khẩu không đúng');
                });
        },
    });
    return (
        <>
            <ToastContainer autoClose={1500} />
            {isLoading && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <div className={cx('title')}>
                        <h3>Dung Spa Log in</h3>
                        {success && (
                            <>
                                <div className={cx('success-MSG')}>
                                    <span>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                    {success}
                                </div>
                            </>
                        )}
                        {errorSuccess && (
                            <>
                                <div className={cx('errorSuccess-MSG')}>
                                    <span>
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                    </span>
                                    {errorSuccess}
                                </div>
                            </>
                        )}
                    </div>
                    <section>
                        <form className={cx('info-form')} onSubmit={formik.handleSubmit}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="Nhập email của bạn"
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <p className={cx('errorMsg')}>{formik.errors.email}</p>
                            ) : null}
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Nhập mật khẩu của bạn"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password && formik.touched.password ? (
                                <p className={cx('errorMsg')}> {formik.errors.password}</p>
                            ) : null}
                            <button>Đăng Nhập</button>
                            <div className={cx('footer')}>
                                <p>bạn chưa có tài khoản ?</p>
                                <Link to="/Register">
                                    {' '}
                                    <a href="">Đăng kí</a>
                                </Link>
                            </div>
                            <div className={cx('fogot')}>
                                <Link to="/ForgotPassword">
                                    {' '}
                                    <a href="">Quên mật khẩu ?</a>
                                </Link>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Login;
