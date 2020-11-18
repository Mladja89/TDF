import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
import { User } from '../api/types'
import { useAPI } from '../api/useAPI'
import * as routes from '../router/routes'
import { withStyles, Theme, useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
}),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) => createStyles({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    }
  },
}),
)(TableRow);

const useStyles = makeStyles({
  tableRoot: {
    borderRadius: '15px',
  },
  table: {
    minWidth: 700,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  footer: {
    position: 'absolute',
    '& > tr > td': {
      borderBottom: 'none',
    }
  },
});
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

export function UsersTablePage() {
  const { listUsers } = useAPI()
  const history = useHistory()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { data, isLoading, error } = useQuery('listUsers', listUsers)

  console.log('data ❤', data)

  const classes = useStyles();

  const handleUserClick = (user: User) => {
    history.push(routes.profile(user.id))
  }

  const capitalizeFirstOnly = (string: string) => {
    return string[0].toUpperCase() + string.substr(1).toLowerCase()
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  if (isLoading || data === undefined) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error!</div>
  }

  return (
    <React.Fragment>
      <Typography component="h3" variant="h3" className={classes.title}>Users</Typography>
      <TableContainer className={classes.tableRoot} elevation={0} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Full name</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data).map((row) => (
                  <StyledTableRow onClick={() => handleUserClick(row)} key={row.email}>
                    <StyledTableCell component="th" scope="row">
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell>{`${row.first_name} ${row.last_name}`}</StyledTableCell>
                    <StyledTableCell>{capitalizeFirstOnly(row.role)}</StyledTableCell>
                    <StyledTableCell>{row.phone}</StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
          <TableFooter className={classes.footer}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
