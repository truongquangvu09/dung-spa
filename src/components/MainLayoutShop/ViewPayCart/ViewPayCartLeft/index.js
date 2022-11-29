import React from 'react';
import classNames from 'classnames/bind';
import styles from './ViewPayCartLeft.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ViewPayCartRight from '../ViewPayCartRight';
const cx = classNames.bind(styles);

function ViewPayCartLeft() {
    const formik = useFormik({
        initialValues: {
            name: '',
            surName: '',
            province: '',
            district: '',
            ward: '',
            homeNumber: '',
            email: '',
            phone: '',
            note: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên của bạn !').min(1, 'Must be 1 characters or more'),
            surName: Yup.string().required('Vui lòng nhập họ của bạn !').min(1, 'Must be 1 characters or more'),
            province: Yup.string().required('Vui lòng nhập Tỉnh / Thành phố !').min(1, 'Must be 1 characters or more'),
            district: Yup.string().required('Vui lòng nhập Huyện / Quận !').min(1, 'Must be 1 characters or more'),
            ward: Yup.string().required('Vui lòng nhập Xã / Phường !').min(1, 'Must be 1 characters or more'),
            homeNumber: Yup.string().required('Vui lòng nhập số nhà của bạn !').min(1, 'Must be 1 characters or more'),
            email: Yup.string()
                .required('Vui lòng nhập email !')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Địa chỉ email không hợp lệ',
                ),
            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại!')
                .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại gồm 10 chữ số'),
        }),

        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left', 'col')}>
                    <div className={cx('clear')}>
                        <div className={cx('woocommerce')}>
                            <h3>Thông tin thanh toán</h3>
                            <form className={cx('woocommerce-filling')} onSubmit={formik.handleSubmit}>
                                <p className={cx('form-row', 'form-row-first')}>
                                    <label>Tên *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.name && formik.touched.name ? (
                                        <p className={cx('errorMsg')}>{formik.errors.name}</p>
                                    ) : null}
                                </p>
                                <p className={cx('form-row', 'form-row-last')}>
                                    <label>Họ *</label>
                                    <input
                                        type="text"
                                        name="surName"
                                        id="surName"
                                        value={formik.values.surName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.surName && formik.touched.surName ? (
                                        <p className={cx('errorMsg')}>{formik.errors.surName}</p>
                                    ) : null}
                                </p>
                                <p className={cx('form-row')}>
                                    <label>Quốc gia *</label>
                                    <select name="" id="">
                                        <option value="">Việt Nam</option>
                                    </select>
                                </p>
                                <p className={cx('form-row')}>
                                    <label>Tỉnh / Thành phố *</label>
                                    <input
                                        type="text"
                                        name="province"
                                        id="province"
                                        value={formik.values.province}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.province && formik.touched.province ? (
                                        <p className={cx('errorMsg')}>{formik.errors.province}</p>
                                    ) : null}
                                </p>
                                <p className={cx('form-row')}>
                                    <label>Huyện / Quận *</label>
                                    <input
                                        type="text"
                                        name="district"
                                        id="district"
                                        value={formik.values.district}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.district && formik.touched.district ? (
                                        <p className={cx('errorMsg')}>{formik.errors.district}</p>
                                    ) : null}
                                </p>
                                <p className={cx('form-row')}>
                                    <label>Xã / Phường *</label>
                                    <input
                                        type="text"
                                        name="ward"
                                        id="ward"
                                        value={formik.values.ward}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.ward && formik.touched.ward ? (
                                        <p className={cx('errorMsg')}>{formik.errors.ward}</p>
                                    ) : null}
                                </p>
                                <p className={cx('form-row')}>
                                    <label>Số nhà *</label>
                                    <input
                                        type="text"
                                        name="homeNumber"
                                        id="homeNumber"
                                        value={formik.values.homeNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.homeNumber && formik.touched.homeNumber ? (
                                        <p className={cx('errorMsg')}>{formik.errors.homeNumber}</p>
                                    ) : null}
                                </p>
                                <p className={cx('form-row')}>
                                    <label>email *</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.email && formik.touched.email ? (
                                        <p className={cx('errorMsg')}>{formik.errors.email}</p>
                                    ) : null}
                                </p>
                                <p className={cx('form-row')}>
                                    <label>Số điện thoại *</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.phone && formik.touched.phone ? (
                                        <p className={cx('errorMsg')}>{formik.errors.phone}</p>
                                    ) : null}
                                </p>
                                <button type="submit">gui</button>
                            </form>
                        </div>

                        <div className={cx('woocommercee')}>
                            <h3>Thông tin bổ sung</h3>
                            <form className={cx('woocommerce-filling')}>
                                <p className={cx('form-row')}>
                                    <label>Ghi chú đơn hàng (Tùy chọn) *</label>
                                    <textarea
                                        type="text"
                                        name="note"
                                        id="note"
                                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                    />
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={cx('right', 'col')}>
                    <ViewPayCartRight />
                </div>
            </div>
        </div>
    );
}

export default ViewPayCartLeft;
