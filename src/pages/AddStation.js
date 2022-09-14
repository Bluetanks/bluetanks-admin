import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {Card, Link, Switch, Container, Typography, Snackbar, Alert, Slide} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import {StationForm} from '../sections/auth/register';
import AuthSocial from '../sections/auth/AuthSocial';
import {unSetResponse} from "../app/slices/userSlice";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

// ----------------------------------------------------------------------

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


const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------



function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
}
export default function AddStation() {
    const smUp = useResponsive('up', 'sm');
    const [open, setOpen] = useState(false);
    const mdUp = useResponsive('up', 'md');
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const {
        responseMessage,
        responseState,
        responseType,
        isAuthenticated
    } = user
    useEffect(() =>{
        // console.log(user)
        if (responseState || responseMessage) {


            const time = setTimeout(() => {
                dispatch(unSetResponse({
                    responseState:false,
                    responseMessage:''
                }))
            }, 3000)
            return () => {
                clearTimeout(time)
            };
        }

    },[responseState,responseMessage])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Page title="Register">
            <RootStyle>

                <Snackbar open={responseState} TransitionComponent={TransitionRight} anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                          autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} variant={"standard"} severity={responseType} sx={{ width: '100%' }}>
                        {responseMessage}
                    </Alert>
                </Snackbar>


                <Container>
                    <ContentStyle>
                        <Typography variant="h4" gutterBottom>
                            Add new stations here
                        </Typography>

                        <StationForm />

                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>
    );
}
