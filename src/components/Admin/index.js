import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

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
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  margin: theme.spacing(2),
}));


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

const createData = ( id, option, appointmentdate, phone, firstname, lastname, birthday, personid, email, city, street, housenum, code, gamestatus, paystatus) => {
  return {
    id,
    option,
    appointmentdate,
    phone,
    firstname,
    lastname,
    birthday,
    personid,
    email,
    city,
    street,
    housenum,
    code,
    gamestatus,
    paystatus
  };
}

const rows = [
  createData(1, 1, '2024-09-15', '13393686969', 'John', 'Doe', '2000-09-15', '51802227575', 'greenboy0705@proton.me', 'Krakow', 'Zundertseweg', '25', '30-318', '0.0.0.0.0.0.0.0.0.0', '0')
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
    id: 'option',
    numeric: true,
    disablePadding: false,
    label: 'Option',
  },
  {    
    id: 'appointmentdate',
    numeric: true,
    disablePadding: false,
    label: 'appointmentdate',
  },
  {    
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'phone',
  },
  {    
    id: 'firstname',
    numeric: true,
    disablePadding: false,
    label: 'firstname',
  },
  {    
    id: 'lastname',
    numeric: true,
    disablePadding: false,
    label: 'lastname',
  },
  {    
    id: 'birthday',
    numeric: true,
    disablePadding: false,
    label: 'birthday',
  },
  {    
    id: 'personid',
    numeric: true,
    disablePadding: false,
    label: 'personid',
  },
  {    
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'email',
  },
  {    
    id: 'city',
    numeric: true,
    disablePadding: false,
    label: 'city',
  },
  {    
    id: 'street',
    numeric: true,
    disablePadding: false,
    label: 'street',
  },
  {    
    id: 'housenum',
    numeric: true,
    disablePadding: false,
    label: 'housenum',
  },
  {    
    id: 'code',
    numeric: true,
    disablePadding: false,
    label: 'code',
  },
  {    
    id: 'gamestatus',
    numeric: true,
    disablePadding: false,
    label: 'gamestatus',
  },
  {    
    id: 'paystatus',
    numeric: true,
    disablePadding: false,
    label: 'paystatus',
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
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            > */}
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
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
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [adminData, setAdminData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [adminDate, setAdminDate] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('');


  useEffect(() => {
    const fetchData = async() => {
      try {
        const user_info = await axios.get('http://localhost:3000/user/get_user_info');
        if(user_info.status === 200){
          setUserData(user_info.data.data);
        }else{
          alert("Error!");
        }
        const admin_info = await axios.get('http://localhost:3000/admin/get_admin_info');
        if(admin_info.status === 200){
          setAdminData(admin_info.data.data[0]);
        }else{
          alert("Error!");
        }
      } catch (err) {
        console.log(err);
      }  
    }
    fetchData();
  }, []);
  
  const changeDate = async() => {
    try {
      const response = await axios.post('http://localhost:3000/admin/change_date', {  
        adminDate
      });
      if(response.status === 200){
        alert("Your Appointment Date has been successfully changed.!");
      }else{
        alert("Error!");
      }
    } catch (err) {
      alert(err);
    }
  };

  const changePhone = async() => {
    try {
      const response = await axios.post('http://localhost:3000/admin/change_phone', {  
        adminPhone
      });
      if(response.status === 200){
        alert("Your Phone Number has been successfully changed.!");
      }else{
        alert("Error!");
      }
    } catch (err) {
      alert(err);
    }    
  }

  const changePassword = async() => {
    try {
      const response = await axios.post('http://localhost:3000/admin/change_password', {  
        adminPassword
      });
      if(response.status === 200){
        alert("Your password has been successfully changed.!");
      }else{
        alert("Error!");
      }
    } catch (err) {
      alert(err);
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = userData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {


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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(userData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, userData],
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1, margin: '30px 15px 15px 15px'}}>
      <Paper sx={{padding: '15px 15px 15px 15px'}}>
        <Typography component="h1" variant="h5" align='left' marginBottom={'5px'}>
          Set Up Admin Information
        </Typography>
        <Divider sx={{marginBottom: '25px'}}></Divider>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={4}>
            <Item>
              <TextField
                variant="outlined"
                margin="normal"
                label={adminData.date?adminData.date.slice(0,10):''}
                fullWidth
                name="date"
                defaultValue={adminData.date?adminData.date.slice(0,10):''}
                id="date"
                autoComplete="date"
                onChange={(e) => {setAdminDate(e.target.value);}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {changeDate();}}
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
                fullWidth
                name="phone"
                label={adminData.phone}
                defaultValue={adminData.phone}
                type="number"
                id="phone"
                autoComplete="phone"
                onChange={(e) => {setAdminPhone(e.target.value);}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {changePhone();}}
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
                onChange={(e) => {setAdminPassword(e.target.value);}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {changePassword();}}
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
                rowCount={userData.length}
              />
              <TableBody>
                { 
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.user_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.user_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.user_id}
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
                        {row.option}
                      </StyledTableCell>

                      <StyledTableCell align="left">{row.appointmentdate}</StyledTableCell>
                      <StyledTableCell align="center">{row.phone}</StyledTableCell>
                      <StyledTableCell align="left">{row.firstname}</StyledTableCell>
                      <StyledTableCell align="left">{row.lastname}</StyledTableCell>
                      <StyledTableCell align="center">{row.birthday}</StyledTableCell>
                      <StyledTableCell align="center">{row.personid}</StyledTableCell>
                      <StyledTableCell align="center">{row.email}</StyledTableCell>
                      <StyledTableCell align="center">{row.city}</StyledTableCell>
                      <StyledTableCell align="center">{row.street}</StyledTableCell>
                      <StyledTableCell align="center">{row.housenum}</StyledTableCell>
                      <StyledTableCell align="center">{row.code}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Box display="flex" justifyContent="center">
                        
                            <StyledBadge badgeContent={row.gamestatus.split('.')[1]} color="primary">
                              <LooksOneIcon color={row.gamestatus.split('.')[0][0] === '0'? 'fail':'success'} />
                            </StyledBadge>
                            <StyledBadge badgeContent={row.gamestatus.split('.')[2]} color="primary">
                              <LooksTwoIcon color={row.gamestatus.split('.')[0][1] === '0'? 'fail':'success'} />
                            </StyledBadge>
                            <StyledBadge badgeContent={row.gamestatus.split('.')[3]} color="primary">
                              <Looks3Icon color={row.gamestatus.split('.')[0][2] === '0'? 'fail':'success'} />
                            </StyledBadge>
                            <StyledBadge badgeContent={row.gamestatus.split('.')[4]} color="primary">
                              <Looks4Icon color={row.gamestatus.split('.')[0][3] === '0'? 'fail':'success'} />
                            </StyledBadge>
                            <StyledBadge badgeContent={row.gamestatus.split('.')[5]} color="primary">
                              <Looks5Icon color={row.gamestatus.split('.')[0][4] === '0'? 'fail':'success'} />
                            </StyledBadge>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.paystatus === '1'? 'Paid': 'Not Paid'}</StyledTableCell>

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
            count={userData.length}
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