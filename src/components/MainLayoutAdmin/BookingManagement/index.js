import * as React from 'react';
import { useState, useEffect } from 'react';

import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { red } from '@mui/material/colors';

import { auth, db } from '../../../FireBase/FireBase';
import { collection, doc, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import { createTheme, ThemeProvider, Tooltip } from '@mui/material';
const theme = createTheme({
    typography: {
        fontSize: 25,
    },
});
function DataBooking() {
    // const [checkConfirm, setCheckConfirm] = useEffect({});
    const [data, setData] = useState([]);
    const [values, setValues] = useState([]);
    // const x = ;

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'booking', id));
            setData(data.filter((item) => item.id !== id));
            toast.success('Xóa thành công lịch hẹn');
        } catch (err) {}
    };

    const handleAccect = async (id) => {
        console.log(id);
        const update = doc(db, 'booking', id);
        console.log(update);

        await updateDoc(update, { statu: 'Đã xác nhận' })
            .then(() => {
                toast.success('Cập nhật thành công');
                const newData = data.map((item) => {
                    return item;
                });
                setValues(newData);
            })
            .catch((err) => {
                toast.error('cap nhat that bai');
            });
    };
    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const QuerySnapshot = await getDocs(collection(db, 'booking'));
                QuerySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            } catch (err) {}
        };
        fetchData();
    }, [values]);
    const columns = [
        {
            field: 'statu',
            headerName: 'Trạng thái',
            width: 100,
            renderCell: (params) => (
                <ThemeProvider theme={theme}>
                    <Tooltip title={params.row.statu}>
                        <div>{params.row.statu}</div>
                    </Tooltip>
                </ThemeProvider>
            ),
        },
        { field: 'nameGuest', headerName: 'Tên', width: 170 },
        { field: 'service', headerName: 'Dịch vụ', width: 170 },
        { field: 'email', headerName: 'Email', width: 270 },
        { field: 'phoneN', headerName: 'Số điện thoại', width: 150 },
        { field: 'dateBooking', headerName: 'Ngày', width: 150 },
        { field: 'timeBook', headerName: 'Giờ', width: 80 },
        {
            field: 'message',
            headerName: 'Lời nhắn',
            width: 170,
            renderCell: (params) => (
                <ThemeProvider theme={theme}>
                    <Tooltip title={params.row.message}>
                        <div>{params.row.message}</div>
                    </Tooltip>
                </ThemeProvider>
            ),
        },

        {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    fontSize="large"
                    onClick={() => handleAccect(params.row.id)}
                    icon={<AddTaskIcon sx={{ fontSize: 20 }} color="success" />}
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
            <div style={{ height: 550, width: 1230, fontSize: 20 }}>
                {data.length > 0 ? (
                    <DataGrid
                        style={{ fontSize: 16 }}
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
        </>
    );
}
export default DataBooking;
