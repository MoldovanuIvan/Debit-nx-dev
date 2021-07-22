import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useFormik} from "formik";
import {Trans, useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePickers({datePick}) {
    const classes = useStyles();
    const {handleSubmit,handleChange,values}=useFormik({
        initialValues:{
            dateFrom:'2020-06-30',
            dateTo:'2021-06-28'
        },
        onSubmit:({dateFrom,dateTo})=>{
            datePick(dateFrom,dateTo)
        }
    })
    const {i18n} = useTranslation()

    return (
        <form onSubmit={handleSubmit} className={classes.container} noValidate>
            <TextField
                value={values.dateFrom}
                onChange={handleChange}
                id="dateFrom"
                name="dateFrom"
                label="From"
                type="date"
                defaultValue="2020-06-30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                value={values.dateTo}
                onChange={handleChange}
                id="dateTo"
                name="dateTo"
                label="To"
                type="date"
                defaultValue="2021-06-28"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <button type="submit"><Trans i18nKey='description.part13'>Send</Trans></button>
        </form>
    );
}