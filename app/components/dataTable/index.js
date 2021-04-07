import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ROLES } from '../../utils/constants';
import { getComparator, stableSort } from '../../utils/helper';
import { CheckBox } from '../index';
import { BodyTextSmall } from '../typography';
import { useStyles } from './styles';
import EnhancedTableHead from './tableHead';
import { useAuthContext } from '../../context/authContext';

export function DataTable({
  data,
  headCells,
  tableRowsPerPage,
  selected,
  setSelected,
  matchUserIdWithIDS,
}) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableRowsPerPage);
  const [rows, setRows] = useState([]);

  const {
    user: {
      data: { role, id: currentUserID },
    },
  } = useAuthContext();

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows
        .filter((row) => (matchUserIdWithIDS ? row.id !== currentUserID : true))
        .map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const mapRows = (row, isItemSelected, labelId, currentUser) => (
    <>
      {role === ROLES.ADMIN && (
        <TableCell padding="checkbox">
          <CheckBox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={(event) => handleClick(event, row.id, currentUser)}
            disabled={currentUser}
          />
        </TableCell>
      )}

      {headCells.map((header) => {
        const Buttons = header.buttons || null;
        return header.type === 'action' ? (
          <TableCell align="right">
            <Buttons
              data={row}
              disabled={currentUser}
              setSelected={setSelected}
            />
          </TableCell>
        ) : (
          <TableCell
            padding="default"
            align={header.numeric ? 'right' : 'left'}
          >
            <BodyTextSmall color="dark">
              {header.type === 'link' ? (
                <a
                  href={
                    row[header.id].includes('http')
                      ? row[header.id]
                      : `http://${row[header.id]}`
                  }
                  target="_blank"
                >
                  {row[header.id]}
                </a>
              ) : (
                row[header.id]
              )}
            </BodyTextSmall>
          </TableCell>
        );
      })}
    </>
  );
  return (
    <Box className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
            role={role}
            currentUserID={currentUserID}
            rows={rows}
            matchUserIdWithIDS={matchUserIdWithIDS}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    disabled={matchUserIdWithIDS && row.id === currentUserID}
                  >
                    {mapRows(
                      row,
                      isItemSelected,
                      labelId,
                      matchUserIdWithIDS && row.id === currentUserID
                    )}
                  </TableRow>
                );
              })}

            {!rows.length && (
              <TableRow>
                <TableCell colSpan={headCells.length + 1}>
                  <Alert severity="error">No data found</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
}
DataTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  tableRowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  matchUserIdWithIDS: PropTypes.bool,
};
DataTable.defaultProps = {
  tableRowsPerPage: 20,
  selected: [],
  matchUserIdWithIDS: false,
};

export default DataTable;
