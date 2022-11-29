import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../FireBase/FireBase';
import { collection, addDoc } from 'firebase/firestore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../../components/Layout/Loader/Loader';

const cx = classNames.bind(styles);
function Register() {
    const [errorSuccess, setErrorSuccess] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên của bạn').min(4, 'Must be 4 characters or more'),
            email: Yup.string()
                .required('Vui lòng nhập email   !')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Địa chỉ email không hợp lệ',
                ),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu!')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,}$/,
                    'Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt',
                ),
            confirmPassword: Yup.string()
                .required('Nhập lại mật khẩu')
                .oneOf([Yup.ref('password'), null], 'mật khẩu không khớp'),
            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại!')
                .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại gồm 10 chữ số'),
        }),

        onSubmit: (values) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const initialcartvalue = 0;
                    const td = new Date();
                    console.log(user);

                    addDoc(collection(db, 'users'), {
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        password: values.password,
                        cart: initialcartvalue,
                        uid: user.uid,
                        time: td,
                    })
                        .then(() => {
                            // setSuccess('Tạo tài khoản mới thành công');
                            toast.success('Tạo tài khoản mới thành công');
                            setIsLoading(true);
                            setErrorSuccess('');

                            setTimeout(() => {
                                setSuccess('');
                                navigate('/Login');
                            }, 2000);
                        })
                        .catch((error) => {
                            setErrorSuccess(error.message);
                        });
                })
                .catch((error) => {
                    // setErrorSuccess('tài khoản này đã tồn tại');
                    toast.error('Tài khoản này đã tồn tại');
                });
        },
    });

    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <div className={cx('title')}>
                        <h3>Dung Spa Sign Up</h3>
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
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="Nhập họ và tên đầy đủ "
                            />

                            {formik.errors.name && formik.touched.name ? (
                                <p className={cx('errorMsg')}>{formik.errors.name}</p>
                            ) : null}

                            <label> Email </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Địa chỉ email"
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <p className={cx('errorMsg')}>{formik.errors.email}</p>
                            ) : null}
                            <label> Mật khẩu </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Nhập mật khẩu"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password && formik.touched.password ? (
                                <p className={cx('errorMsg')}>{formik.errors.password}</p>
                            ) : null}
                            <label>Xác nhận mật khẩu </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Nhập lại mật khẩu"
                                value={formik.values.confirmPassword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                <p className={cx('errorMsg')}>{formik.errors.confirmPassword}</p>
                            ) : null}
                            <label> Số điện thoại</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Nhập số điện thoại của bạn"
                                value={formik.values.phone}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.phone && formik.touched.phone ? (
                                <p className={cx('errorMsg')}>{formik.errors.phone}</p>
                            ) : null}
                            <button type="submit">Đăng kí</button>
                            <div className={cx('footer')}>
                                <p>bạn đã có tài khoản ?</p>
                                <Link to="/Login">
                                    {' '}
                                    <a href="">Đăng nhập</a>
                                </Link>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Register;
