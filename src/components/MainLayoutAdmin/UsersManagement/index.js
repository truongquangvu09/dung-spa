import * as React from 'react';
import { useState, useEffect } from 'react';

import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { red } from '@mui/material/colors';

import { db } from '../../../FireBase/FireBase';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';

function DataTableUsers() {
    const [data, setData] = useState([]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', id));
            setData(data.filter((item) => item.id !== id));
            toast.success('Xóa thành công người dùng');
        } catch (err) {}
    };

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const QuerySnapshot = await getDocs(collection(db, 'users'));
                QuerySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            } catch (err) {}
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 300 },
        { field: 'name', headerName: 'Tên người dùng', width: 200 },
        { field: 'email', headerName: 'Email', width: 350 },

        {
            field: 'phone',
            headerName: 'Điện thoại',
            type: 'number',
            width: 200,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                //    <GridActionsCellItem
                //         fontSize="large"
                //         icon={<UploadIcon sx={{ fontSize: 20 }} color="success" />}
                //         label="Upload"
                //     />,
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
        </>
    );
}
export default DataTableUsers;
