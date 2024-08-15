import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import { TextField, Box, Badge, Divider } from '@mui/material';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  margin: theme.spacing(2),
}));
const icons = [
  <LooksOneIcon color='success' />,
  <LooksTwoIcon sx={{ color: red[500] }} />,
  <Looks3Icon color='success' />,
  <Looks4Icon sx={{ color: red[500] }} />,
  <Looks5Icon color='success' />,
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  textAlign: 'left',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: '150px',
  margin: 'auto',
  position: 'absolute',
  right: 5,
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    paddingRight: theme.spacing(2),
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1.5, 4),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const createData = (id, name, phone, email, address, gameStat, date) => {
  return {
    id,
    name,
    phone,
    email,
    address,
    gameStat,
    date
  };
}

const rows = [
  createData(1, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(2, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(3, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(4, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(5, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(6, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(7, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(8, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(9, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(10, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(11, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(12, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(13, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(14, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(15, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(16, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(17, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(18, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(19, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(20, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(21, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(22, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(23, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(24, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(25, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(26, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(27, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(28, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(29, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),
  createData(30, 'wolf', '888888888', 'abc@gmail.com', 'Berlin', 12345, '1993.07.07'),

];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {    
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  { 
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'gameStat',
    numeric: true,
    disablePadding: false,
    label: 'Game Status',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Appointment Date',
  },

];

const EnhancedTableHead = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List of Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" 
        sx={{ position: 'absolute', right: 5 }}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <StyledTextField
          variant="outlined"
          placeholder="Search..."
          // onChange={handleSearchChange}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <Search />
          //     </InputAdornment>
          //   ),
          // }}
        />      
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EnhancedTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {

    const numbers = [1, 2, 3, 4, 5];

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1, margin: '30px 15px 15px 15px'}}>
      <Paper sx={{padding: '15px 15px 15px 15px'}}>
        <Typography component="h1" variant="h5" align='left' marginBottom={'5px'}>
          Set Admin Information
        </Typography>
        <Divider sx={{marginBottom: '25px'}}></Divider>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={4}>
            <Item>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="date"
                type="date"
                id="date"
                autoComplete="date"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>          
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="number"
                id="phone"
                autoComplete="phone"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Set
              </Button>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>          
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Set
              </Button>
            </Item>
          </Grid>
        </Grid>
        </Paper>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ margin: '15px 15px 15px 15px' }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </StyledTableCell>

                      <StyledTableCell align="center">{row.phone}</StyledTableCell>
                      <StyledTableCell align="center">{row.email}</StyledTableCell>
                      <StyledTableCell align="center">{row.address}</StyledTableCell>

                      <StyledTableCell align="center">
                        <Box display="flex" justifyContent="center">
                          {icons.map((icon, index) => (
                            <StyledBadge key={index} badgeContent={index + 1} color="primary">
                              {icon}
                            </StyledBadge>
                          ))}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.date}</StyledTableCell>

                    </StyledTableRow>

);
                })}
                {emptyRows > 0 && (
                  <StyledTableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}

export default EnhancedTable;