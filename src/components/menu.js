import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import Navmenu from './navitens';
//import { getNomeUsuario, getTipoUsuario } from '../services/auth';
import ExitToApp from '@material-ui/icons/ExitToApp';
import api from "../services/api";
import { getToken, logout } from "../services/auth";
import Notify from '../alerts/toast';
import Button from '@material-ui/core/Button';



const notify = new Notify()
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
   
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    fixedHeight: {
      height: 240,
    }
}));

async function confirmSair(){
  if(window.confirm("Deseja realmente sair do sistema?")){
    logout();
    window.location.href = '/'
  }else{
    return notify.error("Não foi possível fazer o logout!");
  }
 }



export default function MenuAdmin({title}){
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return(
        <>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                {title}
            </Typography>
            
            <Button size="small" color="default">
            <ExitToApp button onClick={confirmSair} />
            </Button>
            </Toolbar>
          </AppBar>
        <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        >
        <div className={classes.toolbarIcon}>
          <img style={{textAlign: 'center', width:100,height:'auto'}} src='https://d8vlg9z1oftyc.cloudfront.net/altenburghomolog/image/media/5ff3144d1bdce-logo.png' alt='Logo' />
            <Toolbar>
              </Toolbar>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>         
              </div>
            <Divider />
            <Navmenu></Navmenu>
            <Divider />
          </Drawer>
        </>
    )
}