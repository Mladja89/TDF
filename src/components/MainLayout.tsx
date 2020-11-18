import React from 'react'
import clsx from 'clsx';
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import * as routes from '../router/routes'
import { useAuthContext } from '../api/auth'
import {
  Typography,
  Container,
  makeStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Menu as MenuIcon, ChevronLeft, Person, Dashboard } from '@material-ui/icons';

type Props = {
  children: React.ReactNode
}

export function MainLayout({ children }: Props) {
  const { currentUser } = useAuthContext()
  const history = useHistory()
  async function logout() {
    await Auth.signOut()
    history.push(routes.login)
  }
  console.log(currentUser)

  const drawerWidth = 240;
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, 
      background: '#0b2333',
    },
    logo: {
      background: "#173244",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
      ...theme.mixins.toolbar

    },
    toolbarIcon: {
      position: 'absolute',
      zIndex: 99,
      bottom: "-70px",
      left: "-32px",
      display: open ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      boxShadow: 'none',
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
      width: `calc(${drawerWidth + 1}px)`,
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
    sidebarDesc: {
      fontSize: '14px',
      fontFamily: 'monospace',
      letterSpacing: '1px',
      paddingLeft: '15px',
      margin: '20px 0px',
      visibility: open ? 'inherit' : 'hidden',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      background: '#f1f4f6',
      height: 'calc(100% - 64px)',
      width: '100%',
      maxWidth: 'inherit'
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));
  const classes = useStyles();


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          ></Typography>
          <IconButton onClick={handleClick} color="inherit">
            <Person />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>placeholder 1</MenuItem>
            <MenuItem>placeholder 2</MenuItem>
            <MenuItem>placeholder 3</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.logo}>😸CatCMS</div>
        {currentUser?.attributes['custom:roles'] === 'COACH' ? (
          <List>{
            <div>
              <Typography noWrap className={classes.sidebarDesc}>USER MANAGEMENT</Typography>
              <ListItem button>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </div>
          }</List>
        ) : (
            <List>{
              <div>
                <Typography noWrap className={classes.sidebarDesc}>MY MANAGEMENT</Typography>
                <ListItem button>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </div>
            }</List>
          )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          {children}
          { }
        </Container>
      </main>
    </div>
  );
}
