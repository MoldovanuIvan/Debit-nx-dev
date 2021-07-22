import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FadeMenu from "./languageChange";
import {Trans, useTranslation} from "react-i18next";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    }
}));

export default function DenseAppBar() {
    const classes = useStyles();
    const {i18n} = useTranslation()
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar} variant="dense">
                    <Typography variant="h6" color="inherit">
                        <Trans i18nKey="description.part1">Transaction</Trans>
                    </Typography>
                    <FadeMenu changeLanguage={changeLanguage}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}