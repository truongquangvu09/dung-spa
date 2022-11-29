import './datatable.scss';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { red } from '@mui/material/colors';
import { userColumns, userRows } from '../../datatablesource';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { auth, db } from '../../../FireBase/FireBase';
import { collection, doc, query, where, getDocs, deleteDoc } from 'firebase/firestore';

const Datatable = () => {
    const [data, setData] = useState([]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', id));
            setData(data.filter((item) => item.id !== id));
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
    console.log(data);
    const columns = [
        { field: 'id', headerName: 'ID', width: 380 },
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
                <GridActionsCellItem
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
        <div className="datatable" style={{ width: 1230 }}>
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
            />
        </div>
    );
};

export default Datatable;
