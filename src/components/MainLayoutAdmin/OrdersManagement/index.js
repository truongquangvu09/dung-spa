import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './orderManage.module.scss';
import classNames from 'classnames/bind';

import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import { red } from '@mui/material/colors';
import { Avatar } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { auth, db } from '../../../FireBase/FireBase';
import { collection, getDocs, deleteDoc, update, doc, updateDoc } from 'firebase/firestore';

import { Tooltip } from '@mui/material';

import { toast, ToastContainer } from 'react-toastify';

import Loader from './../../Layout/Loader/Loader';
const cx = classNames.bind(styles);

function DataTableOrders() {
    const [data, setData] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [value, setValue] = useState({
        UserName: '',
        address: '',
        cartItems: [],
        email: '',
        phone: '',
        status: '',
        time: '',
        totalAmount: '',
    });
    console.log(value);
    const timestamp = { nanoseconds: value.time.nanoseconds, seconds: value.time.seconds };
    const Time = new Date(timestamp.seconds * 1000);
    const dateFormat = Time.getHours() + ':' + Time.getMinutes() + ', ' + Time.toDateString();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'orders', id));
            setData(data.filter((item) => item.id !== id));
            toast.success('Xóa thành công đơn hàng');
        } catch (err) {}
    };

    const updateDoc1 = async () => {
        const update = doc(db, 'orders', value.id);

        await updateDoc(update, value)
            .then(() => {
                setOpen(false);
                toast.success(`Cập nhật thành công `);

                const newData = data.map((item) => {
                    if (item.time === value.time) {
                        item = value;
                    }
                    return item;
                });

                setData(newData);
            })
            .catch((err) => {
                toast.error('cap nhat that bai');
            });
    };

    const onStatusChange = (event) => {
        const newStatus = event.target.value;
        setValue((prev) => ({
            ...prev,
            status: newStatus,
        }));
    };

    const { UserName, address, cartItems, email, phone, status, time, totalAmount } = value;
    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const QuerySnapshot = await getDocs(collection(db, 'orders'));
                QuerySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            } catch (err) {}
        };
        fetchData();
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        overflow: 'scroll',

        p: 4,
        '@media(max-height: 890px)': {
            top: '0',
            transform: 'translate(-50%, 0%)',
        },
    };

    const columns = [
        {
            field: 'time',
            headerName: 'Ngày mua',
            width: 250,
            editable: true,
            renderCell: (params) => <div>{String(new Date(params.row.time.seconds * 1000))}</div>,
        },

        { field: 'UserName', headerName: 'Khách hàng', width: 250, editable: true },
        {
            field: 'address',
            headerName: 'Địa chỉ',

            width: 430,
            renderCell: (params) => (
                <Tooltip title={params.row.address}>
                    <div>{params.row.address}</div>
                </Tooltip>
            ),
        },
        { field: 'note', headerName: 'Ghi chú', width: 230, editable: true, type: 'number' },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 250,
            editable: true,
        },
        {
            field: 'etc',
            headerName: 'Thanh toán',
            width: 150,
            editable: true,
        },
        {
            field: 'totalAmount',
            headerName: 'Tổng tiền(₫)',
            width: 150,
            editable: true,
            renderCell: (params) => <div>{params.row.totalAmount.toLocaleString()}</div>,
        },
        {
            field: 'actions',
            headerName: 'đơn hàng',
            type: 'actions',
            width: 150,

            getActions: (params) => [
                <GridActionsCellItem
                    onClick={() => {
                        setOpen(true);
                        setValue(params.row);
                    }}
                    fontSize="large"
                    icon={<DescriptionIcon sx={{ fontSize: 20 }} color="success" />}
                    label="Save"
                />,
                <GridActionsCellItem
                    onClick={() => handleDelete(params.row.id)}
                    icon={<DeleteIcon sx={{ color: red[500], fontSize: 20 }} />}
                    label="Delete"
                />,
            ],
        },
    ];

    return (
        <>
            {isLoader && <Loader />}
            <div style={{ height: 550, width: 1200, fontSize: 20 }}>
                {data.length > 0 ? (
                    <DataGrid
                        style={{ fontSize: 20 }}
                        rows={data}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                    />
                ) : null}
            </div>
            <div className={cx('modalOrder')}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflowY: 'scroll' }}
                    disableScrollLock={false}
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            textAlign={'center'}
                            fontSize={30}
                        >
                            CHI TIẾT ĐƠN HÀNG
                        </Typography>
                        <div className={cx('wrapper')}>
                            <div className={cx('info', 'selects')}>
                                <div className={cx('info-left')}>
                                    <h1>Order</h1>
                                    <form>
                                        <tr>
                                            <th>Thời gian</th>
                                            <td>{String(dateFormat)}</td>
                                        </tr>
                                        <tr>
                                            <th>Trạng thái</th>
                                            <td>
                                                <select
                                                    onChange={onStatusChange}
                                                    name="oderby"
                                                    className={cx('order-option')}
                                                    id=""
                                                >
                                                    <option value="Đang xác nhận đơn hàng">
                                                        Đang xác nhận đơn hàng
                                                    </option>
                                                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                                                    <option value="Thành công">Thành công</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </form>
                                </div>
                                <div className={cx('info-center')}>
                                    <h1>Khách hàng</h1>
                                    <form>
                                        <tr>
                                            <td>{UserName}</td>
                                        </tr>
                                        <tr>
                                            <td>{email}</td>
                                        </tr>
                                        <tr>
                                            <td>{phone}</td>
                                        </tr>
                                    </form>
                                </div>
                                <div className={cx('info-right')}>
                                    <h1>Địa chỉ</h1>
                                    <form>
                                        <tr>
                                            <td>{address}</td>
                                        </tr>
                                    </form>
                                </div>
                            </div>

                            <div className={cx('item', 'selects')}>
                                <h1>Sản phẩm</h1>
                                <form>
                                    <tr>
                                        <th>tên sản phẩm</th>
                                        <th>hình ảnh sản phẩm </th>
                                        <th>giá</th>
                                        <th>số lượng</th>
                                        <th>tổng</th>
                                    </tr>
                                    {cartItems.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.productName}</td>
                                                <td>
                                                    <img src={item.productImg} />
                                                </td>
                                                <td>{item.productPrice.toLocaleString()}</td>
                                                <td>{item.quantity}</td>
                                                <td>{(item.quantity * item.productPrice).toLocaleString()}</td>
                                            </tr>
                                        );
                                    })}
                                </form>
                            </div>
                            <div className={cx('sum', 'selects')}>
                                <h1>Tổng</h1>
                                <form>
                                    <tr>
                                        <th>tổng đơn hàng</th>
                                        <td>{totalAmount.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>phí vận chuyển</th>
                                        <td>7</td>
                                    </tr>

                                    <tr>
                                        <th>tổng</th>
                                        <td>{totalAmount.toLocaleString()}</td>
                                    </tr>
                                </form>
                            </div>
                        </div>

                        <Typography textAlign={'right'} fontSize={20}>
                            <Button
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    marginTop: 10,
                                    fontSize: 13,
                                    marginRight: 800,
                                }}
                                onClick={updateDoc1}
                            >
                                Lưu
                            </Button>
                            <Button
                                style={{ backgroundColor: 'black', color: 'white', marginTop: 10, fontSize: 13 }}
                                onClick={handleClose}
                            >
                                Đóng
                            </Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
export default DataTableOrders;
