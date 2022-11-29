import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './addNews.module.scss';
import classNames from 'classnames/bind';

import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { red } from '@mui/material/colors';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { db } from '../../../FireBase/FireBase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';

import { Tooltip } from '@mui/material';

const cx = classNames.bind(styles);

function DataTableNews() {
    const [data, setData] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = useState({
        newName: '',
        newImg: '',
        newDescription: '',
        newDescriptionDetail: '',
        time: '',
    });
    const { newName, newImg, newDescription, newDescriptionDetail, time } = value;

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'news', id));
            setData(data.filter((item) => item.id !== id));
            toast.success('Xóa thành công bài viết');
        } catch (err) {}
    };

    const handleChange = (newName) => (e) => {
        setValue({ ...value, [newName]: e.target.value });
        console.log(newName);
    };
    const updateDoc1 = async () => {
        const update = doc(db, 'news', value.id);

        await updateDoc(update, value)
            .then(() => {
                setOpen(false);
                toast.success(`Cập nhật thành công ${newName}`);
                const newData = data.map((item) => {
                    if (item.id === value.id) {
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

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const QuerySnapshot = await getDocs(collection(db, 'news'));
                QuerySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            } catch (err) {}
        };
        fetchData();
    }, []);
    console.log(data);

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
        { field: 'newName', headerName: 'Tên bài viết', width: 200 },
        {
            field: 'newImg',
            headerName: 'Hình ảnh',
            width: 130,
            renderCell: (params) => (
                <div>
                    <Avatar sx={{ width: 50, height: 50 }} variant="square" src={params.row.newImg} alt="" />
                </div>
            ),
        },
        {
            field: 'time',
            headerName: 'Ngày đăng',
            type: 'number',
            width: 200,
        },
        {
            field: 'newDescription',
            headerName: 'Mô tả',
            width: 250,
            renderCell: (params) => (
                <Tooltip title={params.row.newDescription}>
                    <div>{params.row.newDescription}</div>
                </Tooltip>
            ),
        },

        {
            field: 'newDescriptionDetail',
            headerName: 'Mô tả chi tiết',
            width: 250,
            renderCell: (params) => (
                <Tooltip title={params.row.newDescriptionDetail}>
                    <div>{params.row.newDescriptionDetail}</div>
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
            <div style={{ height: 550, width: 1200, fontSize: 20 }}>
                {data.length > 0 ? (
                    <DataGrid
                        style={{ fontSize: 20 }}
                        rows={data}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        components={{ Toolbar: GridToolbar }}
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
                            CẬP NHẬT TIN TỨC
                        </Typography>
                        <div className={cx('wrapper')}>
                            <form className={cx('form-add')}>
                                <thead>
                                    <tr>
                                        <th>Tên sản phẩm :</th>
                                        <td>
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={handleChange('newName')}
                                                placeholder="Nhập tên bài viết mới"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Mô tả :</th>
                                        <td>
                                            {' '}
                                            <textarea
                                                type="text"
                                                value={newDescription}
                                                onChange={handleChange('newDescription')}
                                                placeholder="Nhập mô tả bài viết mới"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Mô tả chi tiết :</th>
                                        <td>
                                            {' '}
                                            <textarea
                                                type="text"
                                                value={newDescriptionDetail}
                                                onChange={handleChange('newDescriptionDetail')}
                                                placeholder="Nhập mô tả chi tiết bài viết mới"
                                            />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Hình ảnh :</th>
                                        <td>
                                            <img className={cx('imgNew-edit')} src={newImg} alt="" />
                                        </td>
                                    </tr>{' '}
                                    <tr>
                                        <th>Thời gian Đăng :</th>
                                        <td>
                                            {' '}
                                            <input
                                                type="text"
                                                value={time}
                                                onChange={handleChange('time')}
                                                placeholder="Thời gian"
                                            />
                                        </td>
                                    </tr>
                                    <div className={cx('btn-add')}>
                                        {/* <button type="submit" onClick={updateDoc1}>
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
export default DataTableNews;
