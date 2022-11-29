import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './addProducts.module.scss';
import classNames from 'classnames/bind';

import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
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

function DataTableProducts() {
    const [data, setData] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [value, setValue] = useState({
        productName: '',
        productId: '',
        productImg: '',
        productPrice: '',
        productDiscount: '',
        productDescription: '',
        productDescriptionDetail: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            setData(data.filter((item) => item.id !== id));
            toast.success('Xóa thành công sản phẩm');
        } catch (err) {}
    };

    const updateDoc1 = async () => {
        const update = doc(db, 'products', value.id);

        await updateDoc(update, value)
            .then(() => {
                setOpen(false);
                toast.success(`Cập nhật thành công ${productName}`);

                const newData = data.map((item) => {
                    if (item.productId === value.productId) {
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

    const handleChange = (productName) => (e) => {
        setValue({ ...value, [productName]: e.target.value });
    };
    const {
        productName,
        productId,
        productImg,
        productPrice,
        productDiscount,
        productDescription,
        productDescriptionDetail,
    } = value;

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const QuerySnapshot = await getDocs(collection(db, 'products'));
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
        width: 1230,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const columns = [
        { field: 'productId', headerName: 'Mã', width: 100, editable: true },
        { field: 'productName', headerName: 'Tên sản phẩm', width: 200, editable: true },
        {
            field: 'productImg',
            headerName: 'Hình ảnh',
            width: 130,
            renderCell: (params) => (
                <div>
                    <Avatar sx={{ width: 50, height: 50 }} variant="square" src={params.row.productImg} alt="" />
                </div>
            ),
        },
        {
            field: 'productPrice',
            headerName: 'Giá(đ)',
            type: 'number',
            width: 130,
        },
        { field: 'productDiscount', headerName: 'Giảm giá(%)', type: 'number', width: 130, editable: true },
        {
            field: 'productDescription',
            headerName: 'Mô tả',
            width: 200,
            editable: true,
            renderCell: (params) => (
                <Tooltip style={{ fontSize: 20 }} title={params.row.productDescription}>
                    <div>{params.row.productDescription}</div>
                </Tooltip>
            ),
        },
        {
            field: 'productDescriptionDetail',
            headerName: 'Mô tả chi tiết',
            width: 200,
            editable: true,
            renderCell: (params) => (
                <Tooltip title={params.row.productDescriptionDetail}>
                    <div>{params.row.productDescriptionDetail}</div>
                </Tooltip>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            width: 100,

            getActions: (params) => [
                <GridActionsCellItem
                    onClick={() => {
                        setOpen(true);
                        setValue(params.row);
                    }}
                    fontSize="large"
                    icon={<UploadIcon sx={{ fontSize: 20 }} color="success" />}
                    label="Upload"
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
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            textAlign={'center'}
                            fontSize={30}
                        >
                            CẬP NHẬT SẢN PHẨM
                        </Typography>
                        <div className={cx('wrapper')}>
                            <form className={cx('form-add')}>
                                <thead>
                                    <tr>
                                        <th>Tên sản phẩm :</th>
                                        <td>
                                            <input
                                                type="text"
                                                value={productName}
                                                name="productName"
                                                onChange={handleChange('productName')}
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
                                                value={productDescription}
                                                name="productDescription"
                                                onChange={handleChange('productDescription')}
                                                placeholder="Nhập mô tả sản phẩm mới"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Hình ảnh :</th>
                                        <td>
                                            <img className={cx('imgProduct-edit')} src={productImg} alt="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Giá :</th>
                                        <td>
                                            {' '}
                                            <input
                                                type="text"
                                                name="productPrice"
                                                value={productPrice}
                                                onChange={handleChange('productPrice')}
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
                                                name="productDiscount"
                                                value={productDiscount}
                                                onChange={handleChange('productDiscount')}
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
                                                name="productId"
                                                value={productId}
                                                onChange={handleChange('productId')}
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
                                                name="productDescriptionDetail"
                                                value={productDescriptionDetail}
                                                onChange={handleChange('productDescriptionDetail')}
                                                placeholder="Nhập mô tả chi tiết sản phẩm mới"
                                            />
                                        </td>
                                    </tr>{' '}
                                    <div className={cx('btn-add')}>
                                        {/* <button type="submit" onClick={updateDoc}>
                                            Cập nhật
                                        </button> */}
                                        <input type="button" value="Cập nhật" onClick={updateDoc1} />
                                    </div>
                                </tbody>
                            </form>
                        </div>

                        <Typography textAlign={'right'} fontSize={20}>
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
export default DataTableProducts;
