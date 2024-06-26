import React, { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import UserAvatar from './userAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreateIcon from '@mui/icons-material/Create';
import MainDashboard from './dashboard';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HouseIcon from '@mui/icons-material/House';
import SavingsIcon from '@mui/icons-material/Savings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PlanDeuda from './planDeuda';
import Razones from './razones';
import Presupuesto from './presupuesto';
import Patrimonio from './patrimonio';
import Hacienda from './hacienda';
import axios from 'axios';
const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = React.useState(false);
    const [mainDashboard, setMainDashboard] = React.useState(true);
    const [planDeuda, setPlanDeuda] = React.useState(false);
    const [patrimonio, setPatrimonio] = React.useState(false);
    const [presupuesto, setPresupuesto] = React.useState(false);
    const [razones, setRazones] = React.useState(false);
    const [hacienda, setHacienda] = React.useState(false);

    const [tipoCambio, setTipoCambio] = React.useState({});
    
    useEffect(() => {
        try {
            axios
                .get(`https://tipodecambio.paginasweb.cr/api`, {
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    console.log(response.data);
                    setTipoCambio(response.data); //
                });
        } catch (err) {
            alert(err);
        }
    }, []);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleClick = value => () => {
        if(value==="Dashboard"){
            setMainDashboard(!mainDashboard);
            setPlanDeuda(false);
            setPatrimonio(false);
            setPresupuesto(false);
            setRazones(false);
            setHacienda(false);
        } else if(value==="planDeuda"){
            setMainDashboard(false);
            setPlanDeuda(true);
            setPatrimonio(false);
            setPresupuesto(false);
            setRazones(false);
            setHacienda(false);
        } else if (value==="patrimonio"){
            setMainDashboard(false);
            setPlanDeuda(false);
            setPatrimonio(true);
            setPresupuesto(false);
            setRazones(false);
            setHacienda(false);
        } else if (value==="presupuesto"){
            setMainDashboard(false);
            setPlanDeuda(false);
            setPatrimonio(false);
            setRazones(false);
            setPresupuesto(true);
            setHacienda(false);
        } else if (value==="razones"){
            setMainDashboard(false);
            setPlanDeuda(false);
            setPatrimonio(false);
            setPresupuesto(false);
            setRazones(true);
            setHacienda(false);
        } else if (value==="hacienda"){
            setMainDashboard(false);
            setPlanDeuda(false);
            setPatrimonio(false);
            setPresupuesto(false);
            setRazones(false);
            setHacienda(true);
        }
        
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            TCU-408 Educacion Financiera
                        </Typography>
                        <Typography>$ Tipo de cambio: Venta ₡{tipoCambio.venta} - Compra ₡{tipoCambio.compra}</Typography>
                        <IconButton color="inherit">
                            <UserAvatar />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <React.Fragment>

                            <ListItemButton onClick={handleClick('Dashboard')}>
                                <ListItemIcon>
                                    <InsertEmoticonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Casilla Feliz" />
                            </ListItemButton>
                            <ListItemButton onClick={handleClick('planDeuda')}>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary="Plan de deuda" />
                            </ListItemButton>
                            <ListItemButton onClick={handleClick('patrimonio')}>
                                <ListItemIcon>
                                    <HouseIcon />
                                </ListItemIcon>
                                <ListItemText primary="Patrimonio" />
                            </ListItemButton>
                            <ListItemButton onClick={handleClick('presupuesto')}>
                                <ListItemIcon>
                                    <SavingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Presupuesto" />
                            </ListItemButton>
                            <ListItemButton onClick={handleClick('razones')}>
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                                <ListItemText primary="Razones" />
                            </ListItemButton>
                            <ListItemButton onClick={handleClick('hacienda')}>
                                <ListItemIcon>
                                    <QuestionMarkIcon />
                                </ListItemIcon>
                                <ListItemText primary="Consultas Hacienda" />
                            </ListItemButton>
                        </React.Fragment>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    {mainDashboard ? (<MainDashboard />) : null}
                    {planDeuda ? (<PlanDeuda />) : null}
                    {patrimonio ? (<Patrimonio />) : null}
                    {presupuesto ? (<Presupuesto />) : null}
                    {razones ? (<Razones />) : null}
                    {hacienda ? (<Hacienda />) : null}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}