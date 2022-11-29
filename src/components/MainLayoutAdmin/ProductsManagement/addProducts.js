import React from 'react';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './addProducts.module.scss';

import { auth, db, storage } from '../../../FireBase/FireBase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AddProducts() {
    const [productName, setProductName] = useState('');
    const [productImg, setProductImg] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDiscount, setProductDiscount] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productId, setProductID] = useState('');
    const [productDescriptionDetail, setProductDescriptionDetail] = useState('');
    const [time, setProductTime] = useState(new Date());

    const [imgError, setImgError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const types = ['image/jpg', 'image/jpeg', 'image/png'];
    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setProductImg(selectedFile);
                setImgError('');
            } else {
                setProductImg(null);
                setImgError('vui lòng chọn đúng loại ảnh');
            }
        } else {
            setImgError('vui lòng chọn file');
        }
    };
    const handleAddProducts = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `product_image-${productName.toLocaleUpperCase()}/${Date.now()}`);
        uploadBytes(storageRef, productImg).then(() => {
            getDownloadURL(storageRef).then((url) => {
                addDoc(collection(db, 'products'), {
                    productName,
                    productImg: url,
                    productPrice,
                    productDiscount,
                    productDescription,
                    productDescriptionDetail,
                    productId,
                    time,
                }).then(() => {
                    toast.success('Thêm thành công sản phẩm mới');
                    setUploadError('');
                });
            });
        });
    };

    function GetCurrentUser() {
        const [user, setUser] = useState('');
        const usersCollectionRef = collection(db, 'users');

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
    const loggedUser = GetCurrentUser();
    return (
        <div className={cx('wrapper')}>
            {loggedUser && loggedUser[0].email === 'truongquangvuu09@gmail.com' ? (
                <form className={cx('form-add')} onSubmit={handleAddProducts}>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm :</th>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setProductName(e.target.value);
                                    }}
                                    placeholder="Nhập tên sản phẩm mới"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Mô tả :</th>
                            <td>
                                {' '}
                                <textarea
                                    type="text"
                                    onChange={(e) => {
                                        setProductDescription(e.target.value);
                                    }}
                                    placeholder="Nhập mô tả sản phẩm mới"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Hình ảnh :</th>
                            <td>
                                <input type="file" onChange={handleProductImg} />
                            </td>
                            {imgError && <div className={cx('errorMsg')}>{imgError}</div>}
                        </tr>
                        <tr>
                            <th>Giá :</th>
                            <td>
                                {' '}
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setProductPrice(e.target.value);
                                    }}
                                    placeholder="Nhập giá sản phẩm mới"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Giảm giá :</th>
                            <td>
                                {' '}
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setProductDiscount(e.target.value);
                                    }}
                                    placeholder="Nhập số phần trăm giảm giá"
                                />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Mã sản phẩm :</th>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setProductID(e.target.value);
                                    }}
                                    placeholder="Nhập mã sản phẩm mới"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Mô tả chi tiết :</th>
                            <td>
                                {' '}
                                <textarea
                                    type="text"
                                    onChange={(e) => {
                                        setProductDescriptionDetail(e.target.value);
                                    }}
                                    placeholder="Nhập mô tả chi tiết sản phẩm mới"
                                />
                            </td>
                        </tr>{' '}
                        {successMsg && (
                            <>
                                <div className={cx('success-MSG')}>
                                    <span>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                    {successMsg}
                                </div>
                            </>
                        )}
                        {uploadError && (
                            <>
                                <div className={cx('errorSuccess-MSG')}>
                                    <span>
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                    </span>
                                    {uploadError}
                                </div>
                            </>
                        )}
                        <div className={cx('btn-add')}>
                            <button type="submit">Thêm</button>
                        </div>
                    </tbody>
                </form>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default AddProducts;
