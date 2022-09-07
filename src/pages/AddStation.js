import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link,Switch, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import {StationForm} from '../sections/auth/register';
import AuthSocial from '../sections/auth/AuthSocial';
import {unSetResponse} from "../app/slices/userSlice";
import {useEffect} from "react";
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
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function AddStation() {
    const smUp = useResponsive('up', 'sm');

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


    return (
        <Page title="Register">
            <RootStyle>




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
