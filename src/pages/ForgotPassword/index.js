import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Register/Register.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';

import { auth } from '../../FireBase/FireBase';
import { sendPasswordResetEmail } from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/Layout/Loader/Loader';

import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';

const cx = classNames.bind(styles);

function ForgotPassword() {
    const [isLoader, setIsLoader] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Vui lòng nhập email   !')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Địa chỉ email không hợp lệ',
                ),
        }),
        // onChange: (values) => setEmail(values.target.value),
        onSubmit: (values) => {
            console.log(values);
            sendPasswordResetEmail(auth, values.email)
                .then(() => {
                    toast.success('Vui lòng check email của bạn');
                    setIsLoader(true);
                    setTimeout(() => {
                        navigate('/Login');
                    }, 2000);
                })
                .catch((error) => {
                    toast.error('Email này chưa được đăng kí');
                });
        },
    });

    return (
        <>
            <ToastContainer autoClose={1000} />
            {isLoader && <Loader />}
            <div className={cx('wrapper')}>
                <div className={cx('form')}>
                    <h3 className={cx('title')}>Forgot Password</h3>
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
                        <button type="submit">Kiểm tra</button>
                        <div className={cx('footer')}>
                            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
