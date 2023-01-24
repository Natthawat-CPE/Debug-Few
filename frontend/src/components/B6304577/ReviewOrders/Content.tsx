import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ReviewInterface } from '../../../interfaces/ReviewUI';
import { DataGrid, GridEditRowsModel, GridValueGetterParams } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { Rating } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import style from "./style.module.css";

const successAlert = () => {
    Swal.fire({
        title: 'ลบข้อมูลสำเร็จ',
        text: 'You clicked the button.',
        icon: 'success'
    });
}
const errorAlert = () => {
    Swal.fire({
        title: 'ลบข้อมูลไม่สำเร็จ',
        text: 'You clicked the button.',
        icon: 'error'
    });
}

function renderRating(params: GridRenderCellParams<number>) {
    return <Rating readOnly value={params.value} />;
}


function Content({ setActiveStep, activeStep, setReviewsID }: any) {
    const [reviews, setReviews] = useState<any[]>([]);
    const handleStart = () => {
        setActiveStep(activeStep + 1);
    };

    //function fethch data จาก backend

    const getReview = async () => {
        const apiUrl = "http://localhost:8080/GetListReviews";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setReviews(res.data)
                }
            });
    };

    useEffect(() => {
        getReview();

    }, []);
    const columns: GridColDef[] = [
        {
            field: 'action1',
            headerName: 'แก้ไข',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    setActiveStep(4);
                    setReviewsID(params.id);
                    // console.log(params.id);


                };
                return <Button variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222' }} >{<Edit />}แก้ไข</Button>;
            }
        },
        {
            field: 'action2',
            headerName: 'ลบ',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'delete');
                    let data = {
                        ID: params.id
                    };
                    console.log(data);
                    const apiUrl = "http://localhost:8080/DeleteReview";
                    const requestOptions = {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    };
                    fetch(apiUrl, requestOptions)
                        .then((response) => response.json())
                        .then((res) => {
                            if (res.data) {
                                successAlert();
                                getReview();
                                console.log("Success");
                            } else {
                                errorAlert();
                                console.log("Error");
                            }
                        });

                    // console.log(params.row.Statetus);

                };
                return <Button variant="contained" color="error" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Delete />} ลบ </Button>;
                // return <Button variant="contained" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Delete />}ลบ</Button>;
            }
        },
        {
            field: 'Product_ID',
            headerName: 'Product_ID',
            width: 100
        },
        {
            field: 'Satisfaction_System_ID',
            headerName: 'ระดับความพึงพอใจต่อระบบ',
            width: 200,
            renderCell: renderRating,

        },
        {
            field: 'Review_Comment_System',
            headerName: 'ความคิดเห็นต่อระบบซ่อมคอมพิวเตอร์',
            width: 200
        },
        {
            field: 'Satisfaction_Technician_ID',
            headerName: 'ระดับความพึงพอใจต่อช่างที่ซ่อม',
            width: 200,
            renderCell: renderRating,
        },
        {
            field: 'Review_Comment_Technician',
            headerName: 'ความคิดเห็นต่อช่างซ่อม',
            width: 200
        },
        {
            field: 'Timestamp',
            headerName: 'Timestamp',
            width: 200,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
        },
        {
            field: 'Statetus',
            headerName: 'สถานะ',
            width: 70,
            renderCell: params => {

                if (params.row.Statetus === true) {
                    return <div>รีวิวสำเร็จ</div>;
                }
                return <div>รอการรีวิว</div>;
            }
        },
        {
            field: 'Customer_ID',
            headerName: 'ลูกค้า',
            width: 70
        },


    ];


    return (
        <Container maxWidth="lg" >
            <br />
            <br />
            <br />
            <Box>
                <Button
                    onClick={handleStart}>
                    test
                </Button>
            </Box>
            <Typography className={style.text}>
                <h2>
                    รีวิวสำเร็จ
                </h2>
            </Typography>

            <div style={{ height: 400, width: '100%' }} >
                <DataGrid
                    sx={{ marGinTop: 10, background: '#ffffff', color: 'ff0000' }}
                    rows={reviews}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row: ReviewInterface) => row.ID}

                // checkboxSelection
                />
            </div>

        </Container>



    );

} export default Content