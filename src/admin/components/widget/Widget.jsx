import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { useEffect, useState } from 'react';

import { db } from '../../../FireBase/FireBase';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { Link } from 'react-router-dom';

const Widget = ({ type }) => {
    const [amount, setAmount] = useState(11000);
    const [diff, setDiff] = useState(10);
    let data;

    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                link: <Link to="/User">see all users</Link>,
                query: 'users',
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: 'crimson',
                            backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        }}
                    />
                ),
            };
            break;
        case 'product':
            data = {
                title: 'PRODUCTS',
                isMoney: false,
                link: <Link to="/Products">see details</Link>,
                query: 'products',
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: 'rgba(128, 0, 128, 0.2)',
                            color: 'purple',
                        }}
                    />
                ),
            };
            break;
        case 'order':
            data = {
                title: 'ORDERS',
                isMoney: false,
                link: <Link to="/Order">View all orders</Link>,
                query: 'orders',
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: 'rgba(218, 165, 32, 0.2)',
                            color: 'goldenrod',
                        }}
                    />
                ),
            };
            break;
        case 'earning':
            data = {
                title: 'EARNINGS',
                isMoney: true,
                link: 'View net earnings',
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon"
                        style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
                    />
                ),
            };
            break;

        default:
            break;
    }

    useEffect(() => {
        const fetchData = async () => {
            const today = new Date();
            const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
            const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

            const lastMonthQuery = query(
                collection(db, data.query),
                where('time', '<=', today),
                where('time', '>', lastMonth),
            );

            const prevMonthQuery = query(
                collection(db, data.query),
                where('time', '<=', lastMonth),
                where('time', '>', prevMonth),
            );

            const lastMonthData = await getDocs(lastMonthQuery);
            const prevMonthData = await getDocs(prevMonthQuery);

            setAmount(lastMonthData.docs.length);

            const xxx = Number(
                ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) * 100,
            );
            const diff = xxx.toFixed(2);
            setDiff(diff);
        };
        fetchData();
    }, []);

    return (
        <div className="widgetAdmin">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && '$'} {amount}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className={`percentage ${diff < 0 ? 'negative' : 'positive'}`}>
                    {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
