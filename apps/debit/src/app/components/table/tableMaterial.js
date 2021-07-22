import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import state from "../../api/mockturtle"
import moment from "moment";
import DatePickers from "./table-range";
import {Trans, useTranslation} from "react-i18next";

const rows = state

const DATE_FORMAT = 'YYYYMMDD'

const createSorter = (fieldName, isDesc) => (firstElement, secondElement) => {
    switch (fieldName) {
        case "Debit amount":
        case "Credit amount":
            return isDesc ?
                -parseFloat(firstElement[fieldName]) + parseFloat(secondElement[fieldName])
                :
                parseFloat(firstElement[fieldName]) - parseFloat(secondElement[fieldName])

        case 'date':
            return isDesc ?
                -moment(firstElement[fieldName].replaceAll('-', ''), DATE_FORMAT).unix() + moment(secondElement[fieldName].replaceAll('-', ''), DATE_FORMAT).unix()
                :
                moment(firstElement[fieldName].replaceAll('-', ''), DATE_FORMAT).unix() - moment(secondElement[fieldName].replaceAll('-', ''), DATE_FORMAT).unix()

        case "transaction ID":
            return isDesc ?
                -parseInt(firstElement[fieldName].replaceAll('-', ''), 16) + parseInt(secondElement[fieldName].replaceAll('-', ''), 16)
                :
                parseInt(firstElement[fieldName].replaceAll('-', ''), 16) - parseInt(secondElement[fieldName].replaceAll('-', ''), 16)

        case "Sender ID":
        case "Receiver ID":
            return isDesc ?
                -parseFloat(firstElement[fieldName].replaceAll('-', '').replaceAll('.', '')) + parseFloat(secondElement[fieldName].replaceAll('.', '').replaceAll('-', ''))
                :
                parseFloat(firstElement[fieldName].replaceAll('.', '').replaceAll('-', '')) - parseFloat(secondElement[fieldName].replaceAll('.', '').replaceAll('-', ''))

        default:
            return isDesc ? -1 : 1
    }
}

const api = {
    get: ({
              page = 0,
              pageSize = 10,
              sortBy = 'transaction ID',
              isDesc = true,
              dateStart = '2020-06-30',
              dateEnd = '2021-06-28',
          }) => {
        const response = [...rows]
            .sort(createSorter(sortBy, isDesc))
            .filter(({date}) => {
                return (
                    moment(date, DATE_FORMAT).isBefore(moment(dateEnd, DATE_FORMAT))
                    &&
                    moment(date, DATE_FORMAT).isAfter(moment(dateStart, DATE_FORMAT))
                )
            }).slice(page * pageSize, (page + 1) * pageSize)

        return new Promise(resolve => {
            setTimeout(() => {
                resolve(response)
            }, 1000)
        })
    }
}

const headCells = [
    {id: "transaction ID", label: 'Transaction ID'},
    {id: "date", label: 'Date', minWidth: 170},
    {id: "Debit amount", label: 'Debit, $'},
    {id: "Credit amount", label: 'Credit, $'},
    {id: "Sender ID", label: 'Sender ID'},
    {id: "Receiver ID", label: 'Receiver ID'},
];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const {i18n} = useTranslation()

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => {
                    let number
                    switch (headCell.id) {
                        case "transaction ID":
                            number = 7
                            break
                        case "date":
                            number = 8
                            break
                        case "Debit amount":
                            number = 9
                            break
                        case "Credit amount":
                            number = 10
                            break
                        case "Sender ID":
                            number = 11
                            break
                        case "Receiver ID":
                            number = 12
                            break
                    }
                    return (
                        <TableCell
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                <Trans i18nKey={`description.part${number}`}>
                                    {headCell.label}
                                </Trans>
                            </TableSortLabel>
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },

}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('transaction ID');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = React.useState([])
    const [dateStart, setDateStart] = useState('2020-06-30')
    const [dateEnd, setDateEnd] = useState('2021-07-01')

    async function getData() {
        const response = await api.get({ page,
            pageSize: rowsPerPage,
            sortBy: orderBy,
            isDesc: ascDESC(order),
            dateStart,
            dateEnd})
        setData(response)
    }

    React.useEffect(() => {
        getData()
    }, [order,orderBy,page,rowsPerPage,dateStart,dateEnd])

    const ascDESC = (order) => {
        if (order === 'asc')
            return false
        else return true
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const datePick = (from, to) => {
        setDateStart(from)
        setDateEnd(to)
    }

    return (
        <div className={classes.root}>
            <DatePickers datePick={datePick}/>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {data.map(row => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell>{row["transaction ID"]}</TableCell>
                                            <TableCell>{row["date"]}</TableCell>
                                            <TableCell>{row["Debit amount"]}</TableCell>
                                            <TableCell>{row["Credit amount"]}</TableCell>
                                            <TableCell>{row["Sender ID"]}</TableCell>
                                            <TableCell>{row["Receiver ID"]}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
