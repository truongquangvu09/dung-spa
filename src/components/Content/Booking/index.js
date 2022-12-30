import classNames from 'classnames/bind';
import styles from './BookingContent.module.scss';
import React from 'react';
import { listItemMenuHomePage } from '../../../data/data';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../FireBase/FireBase';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const theme = createTheme({
    typography: {
        fontSize: 20,
    },
});

function BookingContent() {
    const [nameGuest, setNameGuest] = useState('');
    const [email, setEmail] = useState('');
    const [phoneN, setPhongN] = useState('');
    const [dateB, setDateB] = React.useState(dayjs(new Date()));
    const [timeBooking, setTimeBooking] = React.useState(dayjs(new Date()));
    const [service, setService] = React.useState('');
    const [message, setMessage] = useState('');
    const [statu, setStatu] = useState('Chưa xác nhận');

    const [success, setSuccess] = useState('');
    const [errorSuccess, setErrorSuccess] = useState('');

    const handleChange = (event) => {
        setService(event.target.value);
    };

    const clickBooking = (name, email, phone) => {
        try {
            addDoc(collection(db, 'booking'), {
                nameGuest: name,
                email: email,
                phoneN: phone,
                dateBooking: dayjs(dateB).format('DD/MM/YYYY'),
                timeBook: dayjs(timeBooking).format('HH:mm'),
                service,
                message,
                statu,
            })
                .then(() => {
                    console.log('Thêm thành công');
                    alert('Tạo lịch thành công');
                    // toast.success('Tạo lịch thành công');
                    // setTimeout(() => {
                    //     setSuccess('');
                    // }, 1500);
                })
                .catch((e) => {
                    console.log('Thêm KO thành công');
                    console.log(e);
                    alert('Vui lòng nhập đúng thông tin');
                });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên').min(2, 'Vui lòng nhập tên đầy đủ'),
            email: Yup.string()
                .required('Vui lòng nhập email   !')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Địa chỉ email không hợp lệ',
                ),
            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại!')
                .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại gồm 10 chữ số'),
        }),
        onSubmit: (value) => {
            clickBooking(value.name, value.email, value.phone);
        },
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('list_itemService')}>
                    <div className={cx('list_menu')}>
                        {listItemMenuHomePage.map((e, index) => (
                            <div className={cx('item_menu')}>
                                <div className={cx('w_img')}>
                                    <img className={cx('imgTT')} src={e.img} />
                                </div>
                                <div className={cx('title_of_imgitemmenu')}>
                                    <p className={cx('txt_imgitemmenu')}>{e.nameItem}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('wrap_info_cus')}>
                    <div className={cx('txt_title')}>
                        <h3 className={cx('txt_intro')}>CHÀO MỪNG ĐẾN DUNG SPA</h3>
                        <h2 className={cx('txt_Buy')}>ĐẶT NGAY</h2>
                    </div>
                    <form className={cx('is-right')} onSubmit={formik.handleSubmit}>
                        <div className={cx('form-inner')}>
                            <div className={cx('form-row')}>
                                <input
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange('name')}
                                    type="text"
                                    placeholder="Họ và tên"
                                />
                                {formik.errors.name && formik.touched.name ? (
                                    <p className={cx('errorMsg')}>{formik.errors.name}</p>
                                ) : null}
                            </div>
                            <div className={cx('form-row')}>
                                <input
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange('email')}
                                    type="text"
                                    placeholder="Email"
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <p className={cx('errorMsg')}>{formik.errors.email}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className={cx('form-inner')}>
                            <div className={cx('form-row')}>
                                <input
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange('phone')}
                                    type="text"
                                    placeholder="Số điện thoại"
                                />
                                {formik.errors.phone && formik.touched.phone ? (
                                    <p className={cx('errorMsg')}>{formik.errors.phone}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className={cx('form-inner')}>
                            <div className={cx('form-row2')}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <ThemeProvider theme={theme}>
                                        <DesktopDatePicker
                                            label="Chọn ngày"
                                            value={dateB}
                                            inputFormat="DD/MM/YYYY"
                                            onChange={(newValue) => {
                                                setDateB(newValue);
                                            }}
                                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                                        />
                                    </ThemeProvider>
                                </LocalizationProvider>
                            </div>
                            <div className={cx('form-row2')}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <ThemeProvider theme={theme}>
                                        <DesktopTimePicker
                                            label="Chọn giờ"
                                            value={timeBooking}
                                            inputFormat="HH:mm"
                                            onChange={(newValue) => {
                                                setTimeBooking(newValue);
                                            }}
                                            renderInput={(params) => <TextField sx={{ width: '95%' }} {...params} />}
                                        />
                                    </ThemeProvider>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className={cx('form-inner')}>
                            <div className={cx('form-row1')}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            sx={{
                                                fontSize: 14,
                                            }}
                                            id="demo-simple-select-label"
                                        >
                                            Chọn dịch vụ
                                        </InputLabel>
                                        <ThemeProvider theme={theme}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={service}
                                                label="Age"
                                                // onBlur={formik.handleBlur}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={1}>Massage</MenuItem>
                                                <MenuItem value={2}>Trị mụn</MenuItem>
                                                <MenuItem value={3}>Trị Thâm</MenuItem>
                                            </Select>
                                        </ThemeProvider>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        <div className={cx('message')}>
                            <textarea
                                onChange={(x) => setMessage(x.target.value)}
                                className={cx('xxx')}
                                cols="30"
                                rows="10"
                                placeholder="Lời nhắn"
                            ></textarea>
                        </div>
                        <div className={cx('form-button')}>
                            <button className={cx('smtBooking')} type="submit" id="summit">
                                ĐẶT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
//onClick={formik.handleSubmit}

export default BookingContent;
