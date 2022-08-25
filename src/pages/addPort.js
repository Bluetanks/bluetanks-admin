import {Link as RouterLink, useParams} from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {Card, Link, Switch, Container, Typography,Snackbar,Alert, Stack, TextField, Slide} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import {StationForm} from '../sections/auth/register';
import AuthSocial from '../sections/auth/AuthSocial';
import {Form, FormikProvider, useFormik} from "formik";
import { LoadingButton} from "@mui/lab";
import {useMutation} from "@tanstack/react-query";
import {addStation, editStation} from "../actions";
import {useState} from "react";
import * as yup from "yup";

// ----------------------------------------------------------------------
function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
}
const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------


const formSchema = yup.object().shape({

    type: yup.string().required('Please provide port type'),
    capacity: yup.string().required('Please provide port capacity'),


});


export default function AddPort() {
    const params = useParams()

    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const {isLoading, mutate,data:editData, error, isError, isSuccess,} = useMutation(['add-station-ports'], editStation,{
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
//console.log(editData)



    const formik = useFormik({
        initialValues: {
            capacity: '',
            type: "",


        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const { type, capacity} = values
            const body = JSON.stringify({

                type,
                capacity,

            })


            mutate({id:params.id, body})
        },
    });

    const { errors, touched, values, handleChange, handleSubmit, getFieldProps } = formik;



    return (
        <Page title="Register">
            <RootStyle>

                {
                    editData &&  isSuccess && !editData.success &&
                    <Snackbar open={!editData.success} TransitionComponent={TransitionRight}
                              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                              autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} variant={"standard"} severity={"error"} sx={{width: '100%'}}>
                            {editData?.error?.message}
                        </Alert>
                    </Snackbar>
                }

                {
                    editData && isSuccess && editData.success &&
                    <Snackbar open={editData.success} TransitionComponent={TransitionRight} anchorOrigin={{vertical:'top', horizontal:'right'}}
                              autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} variant={"standard"} severity={"success"} sx={{ width: '100%' }}>
                            {editData?.message}
                        </Alert>
                    </Snackbar>
                }


                <Container>
                    <ContentStyle>
                        <Typography variant="h4" gutterBottom>
                            Add charging port for stations
                        </Typography>


                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>


                                <Stack spacing={3}>


                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Capacity"
                                        {...getFieldProps('capacity')}
                                        error={Boolean(touched.capacity && errors.capacity)}
                                        helperText={touched.capacity && errors.capacity}
                                    />


                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Type"
                                        {...getFieldProps('type')}
                                        error={Boolean(touched.type && errors.type)}
                                        helperText={touched.type && errors.type}
                                    />





                                    <LoadingButton onClick={() => handleSubmit()} fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
                                        Submit
                                    </LoadingButton>
                                </Stack>
                            </Form>
                        </FormikProvider>



                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>
    );
}
