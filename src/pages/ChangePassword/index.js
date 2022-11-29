import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../Register/Register.module.scss';

import { auth, db } from '../../FireBase/FireBase';
import { updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Loader from '../../components/Layout/Loader/Loader';

const cx = classNames.bind(styles);

function ChangePassword() {
    const user = auth.currentUser;
    const navigate = useNavigate();
    const [isLoader, setIsLoader] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Vui lòng nhập email   !')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Địa chỉ email không hợp lệ',
                ),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu cũ!')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,}$/,
                    'Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt',
                ),
            // .oneOf([Yup.ref('password'), null], 'mật khẩu không khớp'),
            newPassword: Yup.string()
                .required('Vui lòng nhập mật khẩu mới!')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,}$/,
                    'Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt',
                )
                .notOneOf([Yup.ref('password'), null], 'mật khẩu mới phải khác mật khẩu cũ'),
            confirmNewPassword: Yup.string()
                .required('Nhập lại mật khẩu mới')
                .oneOf([Yup.ref('newPassword'), null], 'mật khẩu không khớp'),
        }),
        onSubmit: (values) => {
            const newPassword = values.newPassword;

            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    updatePassword(user, newPassword)
                        .then(() => {
                            toast.success('Thay đổi mật khẩu thành công ');
                            setIsLoader(true);
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        })
                        .catch((error) => {
                            toast.success('Kiểm tra lại thông tin');
                        });
                })

                .catch((error) => {
                    toast.error('Email hoặc Mật khẩu không đúng');
                });
        },
    });
    return (
        <>
            <ToastContainer autoClose={1000} />
            {isLoader && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <h3 className={cx('title')}>Change the Password</h3>
                    <section>
                        <form className={cx('info-form')} onSubmit={formik.handleSubmit}>
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="Nhập vào email của bạn"
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <p className={cx('errorMsg')}>{formik.errors.email}</p>
                            ) : null}
                            <label> Mật khẩu cũ </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Nhập mật khẩu cũ của bạn"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password && formik.touched.password ? (
                                <p className={cx('errorMsg')}>{formik.errors.password}</p>
                            ) : null}
                            <label> Mật khẩu mới </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder="Nhập mật khẩu cũ của bạn"
                                value={formik.values.newPassword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.newPassword && formik.touched.newPassword ? (
                                <p className={cx('errorMsg')}>{formik.errors.newPassword}</p>
                            ) : null}
                            <label>Xác nhận mật khẩu mới</label>
                            <input
                                type="password"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                placeholder="Nhập lại mật khẩu"
                                value={formik.values.confirmNewPassword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.confirmNewPassword && formik.touched.confirmNewPassword ? (
                                <p className={cx('errorMsg')}>{formik.errors.confirmNewPassword}</p>
                            ) : null}
                            <button>Xác nhận</button>
                            <div className={cx('footer')}>
                                <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</p>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
