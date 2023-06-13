import React from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageSubheader: {
        padding: theme.spacing(4),
        display: 'flex',
        marginTop: '20px',
        // justifyContent: "center",
    },
    pageIcon: {
        display: 'inline-block',
        padding: theme.spacing(2),
        color: '#3c44b1'
    },
    pageTitle: {
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    }
}))

export default function PageSubheader(props) {

    const classes = useStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageSubheader}>
                {/* <Card className={classes.pageIcon}>
                    {icon}
                </Card> */}
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h4"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}
