import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { TextField, Box, Badge, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

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


const EnhancedTableHead = (props) => {
  const { t } = useTranslation();

  const headCells = [
    {    
      id: 'option',
      numeric: true,
      disablePadding: false,
      label: t('admin-option'),
    },
    {    
      id: 'appointmentdate',
      numeric: true,
      disablePadding: false,
      label: t('admin-date'),
    },
    {    
      id: 'phone',
      numeric: true,
      disablePadding: false,
      label: t('admin-phone'),
    },
    {    
      id: 'firstname',
      numeric: true,
      disablePadding: false,
      label: t('admin-firstname'),
    },
    {    
      id: 'lastname',
      numeric: true,
      disablePadding: false,
      label: t('admin-lastname'),
    },
    {    
      id: 'birthday',
      numeric: true,
      disablePadding: false,
      label: t('admin-birth'),
    },
    {    
      id: 'personid',
      numeric: true,
      disablePadding: false,
      label: t('admin-person'),
    },
    {    
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: t('admin-email'),
    },
    {    
      id: 'city',
      numeric: true,
      disablePadding: false,
      label: t('admin-city'),
    },
    {    
      id: 'street',
      numeric: true,
      disablePadding: false,
      label: t('admin-street'),
    },
    {    
      id: 'housenum',
      numeric: true,
      disablePadding: false,
      label: t('admin-housenum'),
    },
    {    
      id: 'code',
      numeric: true,
      disablePadding: false,
      label: t('admin-zip'),
    },
    {    
      id: 'gamestatus',
      numeric: true,
      disablePadding: false,
      label: t('admin-gamestatus'),
    },
    {    
      id: 'paystatus',
      numeric: true,
      disablePadding: false,
      label: 'admin-paystatus',
    },
    {    
      id: 'action',
      numeric: true,
      disablePadding: false,
      label: 'admin-action',
    },
  ];
  
  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTable = () => {
  const { t } = useTranslation();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [adminData, setAdminData] = useState([]);
  const [filterKey, setFiliterKey] = useState('');
  const [userData, setUserData] = useState([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPrice_1, setAdminPrice_1] = useState(0);
  const [adminPrice_2, setAdminPrice_2] = useState(0);
  const [removeId, setRemoveId] = useState(0);
  const [openDlg, setOpenDlg] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const user_info = await axios.post(`${process.env.REACT_APP_API_URL}/user/get_user_info`, {
          filterKey
        });
        if(user_info.status === 200){
          setPage(0);
          setUserData(user_info.data.data);
        }else{
          alert("Error!");
        }
        const admin_info = await axios.post(`${process.env.REACT_APP_API_URL}/admin/get_admin_info`);
        if(admin_info.status === 200){
          setAdminData(admin_info.data.data[0]);
        }else{
          alert(t('admin-error'));
        }
      } catch (err) {
        console.log(err);
      }  
    }
    fetchData();
  }, [filterKey]);
  const serachUser = async(event) => {
    if (event.key === 'Enter') {
      setFiliterKey(event.target.value);
    }
  }

  const removeRow = async(row) => {
    try {
      const user_info = await axios.post(`${process.env.REACT_APP_API_URL}/user/remove_user`, {  
        row
      });
      if(user_info.status === 200){
        setOpenDlg(false);
        setUserData(user_info.data.data);
      }else{
        alert(t('admin-error'));
      }
    } catch (err) {
      alert(err);
    }    
  }

  const changePassword = async() => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/change_password`, {  
        adminPassword
      });
      if(response.status === 200){
        alert(t('admin-passchanged'));
      }else{
        alert(t('admin-error'));
      }
    } catch (err) {
      alert(err);
    }
  }
  const changePrice_1 = async() => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/change_price_1`, {  
        adminPrice_1
      });
      if(response.status === 200){
        alert(t('admin-pricechagned1'));
      }else{
        alert(t('admin-error'));
      }
    } catch (err) {
      alert(err);
    }
  }

  const changePrice_2 = async() => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/change_price_2`, {  
        adminPrice_2
      });
      if(response.status === 200){
        alert(t('admin-pricechagned2'));
      }else{
        alert(t('admin-error'));
      }
    } catch (err) {
      alert(err);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

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
          {t('admin-header')}
        </Typography>
        <Divider sx={{marginBottom: '25px'}}></Divider>
        <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={4}>
            <Item>          
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('admin-password')}
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
                {t('admin-set')}
              </Button>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>          
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="price_1"
                label={t('admin-price1') + adminData.price_1}
                defaultValue={adminData.price_1}
                type="number"
                id="price_1"
                autoComplete="Price of Option 1"
                onChange={(e) => {setAdminPrice_1(e.target.value);}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {changePrice_1();}}
              >
                {t('admin-set')}
              </Button>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>          
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="price_2"
                label={t('admin-price2') + adminData.price_2}
                defaultValue={adminData.price_2}
                type="number"
                id="price_2"
                autoComplete="Price of Option 2"
                onChange={(e) => {setAdminPrice_2(e.target.value);}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {changePrice_2();}}
              >
                {t('admin-set')}
              </Button>
            </Item>
          </Grid>
        </Grid>
        </Paper>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ margin: '15px 15px 15px 15px' }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
            <Typography
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {t('admin-list')}
            </Typography>
            <StyledTextField
              variant="outlined"
              placeholder={t('admin-search')}
              onKeyDown={(e) => serachUser(e)}
            />      
          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                rowCount={userData.length}
              />
              <TableBody>
                { 
                visibleRows.map((row, index) => {
                  return (
                    <StyledTableRow
                      hover
                      tabIndex={-1}
                      key={row.user_id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <StyledTableCell align='center'>{row.role_option}</StyledTableCell>
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
                      <StyledTableCell align="center">
                        <MonetizationOnIcon  sx={row.paystatus === '1'?{color: 'gold'}:{color: 'black'}} ></MonetizationOnIcon>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <DeleteOutlineIcon 
                        onClick={
                          () => {
                            setRemoveId(row.user_id);
                            setOpenDlg(true);
                          }
                        } 
                        sx={{ color: 'red'}}></DeleteOutlineIcon>
                      </StyledTableCell>

                    </StyledTableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
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
      <Dialog
        open={openDlg}
        onClose={() => setOpenDlg(false)}
      >
        <DialogTitle id="remove-dlg">
          {t('admin-remove')}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDlg(false)}>{t('admin-no')}</Button>
          <Button onClick={() => removeRow(removeId)}>{t('admin-yes')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EnhancedTable;