import React from 'react';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Profiles.module.scss';

import { useNavigate, Link } from 'react-router-dom';

import { auth, db } from '../../FireBase/FireBase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const cx = classNames.bind(styles);

function Profiles() {
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
    const navigate = useNavigate;

    return (
        <div className={cx('wrapper')}>
            {loggedUser && (
                <div className={cx('inner-profile')}>
                    <h3>Hồ Sơ</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Họ và tên :</th>
                                <th>Điện thoại :</th>
                                <th>Nhận xét :</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{loggedUser[0].name}</td>
                                <td>{loggedUser[0].phone}</td>
                                <td>...</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Email :</th>
                            </tr>

                            <tr>
                                <td>{loggedUser[0].email}</td>
                            </tr>
                            <tr>
                                <th>
                                    {' '}
                                    <Link to="/ChangePassword">
                                        <button className={cx('button')}>Thay đổi mật khẩu</button>
                                    </Link>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Profiles;
