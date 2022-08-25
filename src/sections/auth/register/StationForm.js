import * as Yup from 'yup';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Stack, IconButton, InputAdornment, Snackbar, Slide,Switch, Typography , TextField} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import {FormProvider, RHFTextField} from '../../../components/hook-form';
import {Form, FormikProvider, useFormik} from "formik";
import * as yup from "yup";
import {useMutation} from "@tanstack/react-query";
import {addStation} from "../../../actions";
// ----------------------------------------------------------------------

function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
}
const formSchema = yup.object().shape({

    name: yup.string().required('Please provide station name'),
    address: yup.string().required('Please provide station location'),
    longitude: yup.string().required('Please provide station longitude'),
    latitude: yup.string().required('Please provide station latitude'),
    buyRate: yup.string().required('Please provide station Buy Rate'),
    sellRate: yup.string().required('Please provide station Sell Rate'),
    phone: yup.string().required('Please provide station phone number'),

});


export default function StationForm() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);





    const {isLoading, mutate, error, isError} = useMutation(['add-station'], addStation,{
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
        }
    })




    const formik = useFormik({
        initialValues: {
            name: "",
            longitude: 0,
            latitude: 0,
            address: "",
            buyRate: 0,
            sellRate: 0,
            source: "",
            bidirectional: false,
            email: "",
            phone: ""

        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const {name, longitude, address, latitude, buyRate, sellRate, source, bidirectional, email, phone} = values
            const body = JSON.stringify({
                name,
                "ports": [
                    {"capacity": 2000, "type": "DC"},
                    {"capacity": 2001, "type": "DC"}
                ],
                longitude,
                latitude,
                address,
                buyRate,
                sellRate,
                source,
                bidirectional,
                email,
                phone
            })


            mutate(body)
        },
    });

    const { errors, touched, values, handleChange, handleSubmit, getFieldProps } = formik;





    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Snackbar open={isError} TransitionComponent={TransitionRight} anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                      autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} variant={"standard"} severity={"info"} sx={{ width: '100%' }}>
                    {isError  &&error.message}
                </Alert>
            </Snackbar>
            <Stack spacing={3}>
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                    <TextField
                        fullWidth
                        type="text"
                        label="Name"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                    />
                    <TextField
                        fullWidth
                        type="text"
                        label="Location (Address)"
                        {...getFieldProps('address')}
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                    />

                 {/*   <RHFTextField name="address" label="Location (Address)" value={values.address}
                                  onChange={(e) => handleChange('address')(e)}/>*/}
                </Stack>

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
                    type="number"
                    label="Longitude"
                    {...getFieldProps('longitude')}
                    error={Boolean(touched.longitude && errors.longitude)}
                    helperText={touched.longitude && errors.longitude}
                />


                <TextField
                    fullWidth
                    type="number"
                    label="Latitude"
                    {...getFieldProps('latitude')}
                    error={Boolean(touched.latitude && errors.latitude)}
                    helperText={touched.latitude && errors.latitude}
                />

                <TextField
                    fullWidth
                    type="number"
                    label="Buy Rate"
                    {...getFieldProps('buyRate')}
                    error={Boolean(touched.buyRate && errors.buyRate)}
                    helperText={touched.buyRate && errors.buyRate}
                />

                <TextField
                    fullWidth
                    type="number"
                    label="Sell Rate"
                    {...getFieldProps('sellRate')}
                    error={Boolean(touched.sellRate && errors.sellRate)}
                    helperText={touched.sellRate && errors.sellRate}
                />

                <TextField
                    fullWidth
                    type="text"
                    label="Source"
                    {...getFieldProps('source')}
                    error={Boolean(touched.source && errors.source)}
                    helperText={touched.source && errors.source}
                />

                <TextField
                    fullWidth
                    type="tel"
                    label="Phone number"
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
    );
}
