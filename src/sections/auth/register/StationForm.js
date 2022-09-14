import * as Yup from 'yup';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {
    Stack,
    IconButton,
    InputAdornment,
    Snackbar,
    Slide,
    Switch,
    Typography,
    TextField, List, FormControl, InputLabel, Select, MenuItem,

} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import {FormProvider, RHFTextField} from '../../../components/hook-form';
import {Form, FormikProvider, useFormik} from "formik";
import * as yup from "yup";
import {useMutation} from "@tanstack/react-query";
import {addStation} from "../../../actions";
// ----------------------------------------------------------------------

import Autocomplete, {usePlacesWidget} from "react-google-autocomplete";

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import {setResponse} from "../../../app/slices/userSlice";
import {useDispatch} from "react-redux";




function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
}
const formSchema = yup.object().shape({

    name: yup.string().required('Please provide station name'),
    email: yup.string().required('Please provide station email'),
    address: yup.string().required('Please provide station location'),
    longitude: yup.string().required('Please provide station longitude'),
    latitude: yup.string().required('Please provide station latitude'),
    buyRate: yup.string().required('Please provide station Buy Rate'),
    sellRate: yup.string().required('Please provide station Sell Rate'),
    phone: yup.string().required('Please provide station phone number'),
    capacity: yup.string().required('Please provide port capacity'),
    type: yup.string().required('Please provide port type'),
    label: yup.string().required('Please provide port label'),
    source: yup.string().required('Please provide charging source'),

});


export default function StationForm() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

const dispatch = useDispatch()

    const {isLoading, mutate, error, isError} = useMutation(['add-charging-station'], addStation,{
        onSuccess:(data)=>{
            if(data.success){
                dispatch(setResponse({
                    responseMessage:"Station Added!",
                    responseType:"error",
                    responseState:true
                }))
            }else{
                dispatch(setResponse({
                    responseMessage:data.error.message,
                    responseType:"error",
                    responseState:true
                }))
            }

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
            phone: "",
            capacity:'',
            type:'',
            label:''

        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const {name, longitude, address, latitude,buyRate, sellRate, source, bidirectional, email, phone, capacity,label, type} = values
            const body = JSON.stringify({
                name,
                "ports": [
                    {capacity, type, label},
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

    const { errors, touched, values, handleChange, setFieldValue, handleSubmit, getFieldProps } = formik;


    //console.log(values.address)


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

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

                 {/*   <TextField
                        fullWidth
                        style={{ width: "250px", marginRight: "20px" }}
                        color="secondary"
                        variant="outlined"
                        inputRef={ref}
                        id="Address"
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}


                    />*/}
                    <Autocomplete

                        style={{ width: "250px", borderRadius:10, border:"1px solid #ccc", padding:10, }}
                        defaultValue={values.address}
                        options={{
                            types: ["(regions)"],

                        }}

                        placeholder="Address"
                        onChange={(e)=>handleChange('address')(e.target.value)}
                        apiKey={"AIzaSyCE71u7ryI37ySHtISd10smNBS9KsZU1hs"}
                        onPlaceSelected={(place) => {
                            setFieldValue("address", place.formatted_address)
                          //  console.log(place);
                            setFieldValue('latitude',place.geometry.location.lat())
                            setFieldValue('longitude',place.geometry.location.lng())
                                // console.log('Lat', place.geometry.location.lat())
                            //console.log('Lng', place.geometry.location.lng())

                        }}
                    />
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

             {/*   <TextField
                    fullWidth
                    type="text"
                    label="Source"
                    {...getFieldProps('source')}
                    error={Boolean(touched.source && errors.source)}
                    helperText={touched.source && errors.source}
                />*/}

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Charging source</InputLabel>
                    <Select
                        error={Boolean(touched.source && errors.source)}
                        helperText={touched.source && errors.source}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.source}
                        label="Charge status"
                        {...getFieldProps('source')}

                        required>
                        <MenuItem value="AC">AC</MenuItem>
                        <MenuItem value="DC">DC</MenuItem>

                    </Select>

                </FormControl>

                <TextField
                    fullWidth
                    type="tel"
                    label="Phone number"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                />


                <TextField
                    fullWidth
                    type="text"
                    label="Port label"
                    {...getFieldProps('label')}
                    error={Boolean(touched.label && errors.label)}
                    helperText={touched.label && errors.label}
                />
 <TextField
                    fullWidth
                    type="number"
                    label="Port Capacity"
                    {...getFieldProps('capacity')}
                    error={Boolean(touched.capacity && errors.capacity)}
                    helperText={touched.capacity && errors.capacity}
                />


                <TextField
                    fullWidth
                    type="text"
                    label="Port Type"
                    {...getFieldProps('type')}
                    error={Boolean(touched.type && errors.type)}
                    helperText={touched.type && errors.type}
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
