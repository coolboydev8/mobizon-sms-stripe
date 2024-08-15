import { makeStyles } from '@mui/system';

const usePageStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  paper: {
    padding: '2rem',
    maxWidth: '400px',
    width: '100%',
  },
  avatar: {
    margin: '1rem auto',
    backgroundColor: '#3f51b5',
  },
  form: {
    width: '100%',
    marginTop: '1rem',
  },
  submit: {
    marginTop: '1.5rem',
  },
});

export default usePageStyles;