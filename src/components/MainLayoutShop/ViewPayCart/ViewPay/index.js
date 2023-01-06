import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ViewPay.module.scss';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { cartActions } from '../../../../redux/Slice/cartSlice';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';

import { auth, db, storage } from '../../../../FireBase/FireBase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);

function ViewPay() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log(cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const [time, setTime] = useState(new Date());

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [etc, setEtc] = useState('Thanh toán khi nhận hàng');

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
            name: Yup.string().required('Vui lòng nhập tên của bạn !').min(2, 'Must be 2 characters or more'),
            surName: Yup.string().required('Vui lòng nhập họ của bạn !').min(2, 'Must be 2 characters or more'),
            province: Yup.string().required('Vui lòng nhập Tỉnh / Thành phố !').min(2, 'Must be 2 characters or more'),
            district: Yup.string().required('Vui lòng nhập Huyện / Quận !').min(2, 'Must be 2 characters or more'),
            ward: Yup.string().required('Vui lòng nhập Xã / Phường !').min(2, 'Must be 2 characters or more'),
            homeNumber: Yup.string().required('Vui lòng nhập số nhà của bạn !').min(2, 'Must be 2 characters or more'),
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
            console.log(cartItems);
            console.log(etc);
            const userName = values.surName + '  ' + values.name;
            const address = values.homeNumber + '-' + values.ward + '-' + values.district + '-' + values.province;
            console.log(address);
            addDoc(collection(db, 'orders'), {
                UserName: userName,
                cartItems: cartItems,
                address: address,
                etc: etc,
                totalAmount: totalAmount,
                status: 'Đang chờ xác nhận',
                email: values.email,
                phone: values.phone,
                note: values.note,
                time: time,
            }).then(() => {
                navigate('/Shop');
                toast.success('Đặt hàng thành công !');
                dispatch(cartActions.clearCart());
            });
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
                                <p className={cx('form-row')}>
                                    <label>Ghi chú đơn hàng (Tùy chọn) </label>
                                    <textarea
                                        value={formik.values.note}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type="text"
                                        name="note"
                                        id="note"
                                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                    />
                                </p>
                                <button type="submit">XÁC NHẬN</button>
                            </form>
                        </div>
                        {/* <div className={cx('woocommercee')}>
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
                        </div> */}
                    </div>
                </div>
                <div className={cx('right', 'col')}>
                    <div className={cx('wrapper-right')}>
                        <div className={cx('inner-right')}>
                            <div className={cx('checkout-sidebar')}>
                                <h3>Đơn hàng của bạn</h3>
                                <div className={cx('order-review')}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class={cx('product-name')}>Sản phẩm</th>
                                                <th class={cx('product-total')}>Tạm tính</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item, index) => {
                                                return (
                                                    <tr class={cx('cart_item')} key={index}>
                                                        <td class={cx('product-name')}>
                                                            {item.productName}&nbsp;{' '}
                                                            <strong class={cx('product-quantity')}>
                                                                ×&nbsp;{item.quantity}
                                                            </strong>{' '}
                                                        </td>
                                                        <td class={cx('product-total')}>
                                                            <span class={cx('Price-amount')}>
                                                                <span class={cx('Price-currencySymbol')}>₫</span>
                                                                {Number(
                                                                    item.productPrice * item.quantity,
                                                                ).toLocaleString()}
                                                            </span>{' '}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr class={cx('cart-subtotal')}>
                                                <th>Tạm Tính</th>
                                                <td>
                                                    <span class={cx('Price-amount')}>
                                                        <span class={cx('Price-currencySymbol')}>₫</span>
                                                        {totalAmount.toLocaleString()}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr class={cx('cart-subtotal')}>
                                                <th>Giảm giá</th>
                                                <td>
                                                    <span class={cx('Price-amount')}>
                                                        <span class={cx('Price-currencySymbol')}>₫</span>
                                                        {/* {totalAmount.toLocaleString()} */}0
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr class={cx('order-total')}>
                                                <th>Tổng</th>
                                                <td>
                                                    <strong>
                                                        <span class={cx('Price-amount', 'price-sum')}>
                                                            <span class={cx('Price-currencySymbol')}>₫</span>
                                                            {totalAmount.toLocaleString()}
                                                        </span>
                                                    </strong>{' '}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div className={cx('checkout-payment')}>
                                        <ul>
                                            <li>
                                                <input
                                                    type="radio"
                                                    id="bank"
                                                    name="checkout"
                                                    value="bank"
                                                    checked
                                                    onClick={() => setEtc('Chuyển khoản ngân hàng')}
                                                />

                                                <label>Chuyển khoản ngân hàng</label>
                                                <p>
                                                    {' '}
                                                    Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui
                                                    lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn
                                                    hàng sẽ đươc giao sau khi tiền đã chuyển.
                                                </p>
                                            </li>
                                            <li>
                                                <input
                                                    type="radio"
                                                    id="check"
                                                    name="checkout"
                                                    value="check"
                                                    checked
                                                    onClick={() => setEtc('chi phiếu')}
                                                />

                                                <label>Kiểm tra thanh toán</label>
                                                <p>
                                                    {' '}
                                                    Vui lòng gửi chi phiếu của bạn đến DUNG SPA, k40/44 Nguyễn Huy Tưởng
                                                    Đà Nẵng hoặc qua mã bưu điện của cửa hàng là 50609.
                                                </p>
                                            </li>
                                            <li>
                                                <input
                                                    type="radio"
                                                    id="off"
                                                    name="checkout"
                                                    value="off"
                                                    checked
                                                    onClick={() => setEtc('off')}
                                                />

                                                <label>Trả tiền mặt khi nhận hàng</label>
                                                <p> Trả tiền mặt khi giao hàng</p>
                                            </li>
                                        </ul>
                                        <div className="form-row">
                                            {/* <button  type="submit">
                                                Đặt hàng
                                            </button> */}
                                        </div>
                                    </div>
                                    <div className={cx('privacy-text')}>
                                        <p>
                                            Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải
                                            nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả trong{' '}
                                            <a href="">chính sách riêng tư</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPay;
