import React from 'react'
import { makeStyles, withStyles } from "@material-ui/core";
import zIndex from '@material-ui/core/styles/zIndex';

// withStyles & makeStyles

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#253053'
    }
}

const SideMenu = (props) => {
    const { classes } = props;
    return (
        <div className={classes.sideMenu}>
            <h2>Sulman</h2>
        </div>
    )
}

export default withStyles(style)(SideMenu);
