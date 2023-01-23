import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import Button from '@mui/material/Button';

import style from "./style.module.css";

import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';



function Star2({ formDataRating, setFormDataRating, activeStep, setActiveStep, steps }: any) {
    const [hover, setHover] = React.useState(-1);
    const { data2, commentRating2 } = formDataRating
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleSubmit = () => {
        console.log("Submit");

    };

    return (

        <Container
            maxWidth="md"
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className={style.text} sx={{ marginTop: 10 }}>
                            เลขที่แจ้งซ่อม :
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={style.text} sx={{ marginTop: 10 }}>
                            วันที่แจ้งซ่อม :
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={style.text} sx={{ marginTop: 2 }}>
                            ผู้ดำเนินการ :
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={style.text} sx={{ marginTop: 2 }}>
                            วันที่สำเร็จ :
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box
                className={style.boxshadow}
            >
                <Typography className={style.mainToptic} >
                    <h2>
                        การให้บริการของช่างเป็นอย่างไร
                    </h2>
                    <h6>
                        รวมแบ่งปันประสบการณ์ การบริการ
                        โดยให้คะแนนความพึงพอใจ
                    </h6>

                </Typography>

                <Rating
                    className={style.star}
                    size="large"
                    value={formDataRating.data2}
                    sx={{
                        fontSize: "6rem",
                        alignItems: 'center',

                    }}
                    onChange={(event, newValue) => {
                        setFormDataRating({ ...formDataRating, data2: newValue });
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                <br />
                <Container maxWidth="lg" >
                    <Typography className={style.subToptic}>
                        <h4>
                            ช่วยบอกความพึงพอใจกับเรา
                        </h4>

                    </Typography>
                    <TextField
                        id="commentRating1"
                        multiline
                        rows={3}
                        fullWidth
                        variant="filled"
                        helperText="เช่น การให้บริการยอดเยี่ยม"
                        sx={{ marginBottom: 5, input: { color: 'red' } }}
                        inputProps={{ style: { color: "#ffffff" } }}
                        defaultValue=""
                        value={commentRating2}
                        onChange={(event) =>
                            setFormDataRating(({ ...formDataRating, commentRating2: event.target.value }))}

                    />
                </Container>
            </Box>
            <Container
                maxWidth="md"
                sx={{ marginTop: 5 }}
            >
                <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
                    <Grid container >
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                className={style.btBack}
                                fullWidth
                                color="inherit"
                                disabled={activeStep === 1}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                กลับ
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                className={style.btNext}
                                variant="contained"
                                fullWidth
                                onClick={activeStep === steps.length ? handleSubmit : handleNext}
                                color="inherit"
                            >
                                {activeStep === steps.length ? 'บันทึก' : 'ถัดไป'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box sx={{ width: '100%', marginTop: 5 ,marginBottom:5}}>
                <Stepper activeStep={activeStep-1} alternativeLabel>
                    {steps.map((label:any) => (
                        <Step 
                        key={label}
                        sx={{
                            '& .MuiStepLabel-root .Mui-completed': {
                                color: 'secondary.dark', // circle color (COMPLETED)
                            },
                            '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                            {
                                color: 'grey.500', // Just text label (COMPLETED)
                            },
                            '& .MuiStepLabel-root .Mui-active': {
                                color: 'secondary.main', // circle color (ACTIVE)
                            },
                            '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                            {
                                color: 'common.white', // Just text label (ACTIVE)
                            },
                            '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                fill: 'common.white', // circle's number (ACTIVE)
                            },
                        }}
                        >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <br/>
        </Container>
    );

} export default Star2