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

export default function EditStation() {
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

    const {isLoading, mutate,data:editData, error, isError, isSuccess,} = useMutation(['add-station'], editStation,{
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
        }
    })




    const formik = useFormik({
        initialValues: {
            website: '',
            email: "",
            phone: ""

        },
        validationSchema: null,
        onSubmit: (values) => {
            const { website, email, phone} = values
            const body = JSON.stringify({

                website,
                email,
                phone
            })


            mutate({id:params.id, body})
        },
    });

    const { errors, touched, values, handleChange, handleSubmit, getFieldProps } = formik;

const deleteStation = () => {

}

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
                        <Stack width={"50%"}>

                            <LoadingButton onClick={deleteStation} fullWidth size="medium" type="submit" color={"error"} variant="contained"
                                           loading={isLoading}>
                                Delete Stations
                            </LoadingButton>
                        </Stack>
                        <Typography variant="h4" gutterBottom>
                            Edit stations here
                        </Typography>


                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>


                                <Stack spacing={3}>


                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Email"
                                        {...getFieldProps('email')}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />


                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Website"
                                        {...getFieldProps('website')}
                                        error={Boolean(touched.website && errors.website)}
                                        helperText={touched.website && errors.website}
                                    />


                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Phone"
                                        {...getFieldProps('phone')}
                                        error={Boolean(touched.phone && errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />







                                    <Stack spacing={1} alignItems="center" flexDirection={"row"}>

                                        <Typography variant="overline" sx={{color: 'text.secondary'}}>
                                            Bi Directional
                                        </Typography>
                                        <Switch value={values.bidirectional} onChange={(e) => handleChange('bidirectional')(e)}
                                                checked={values.bidirectional}/>
                                    </Stack>


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
