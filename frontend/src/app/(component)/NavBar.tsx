import styles from './styles/NavBar.module.css';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function NavBar() {
  return (
    <AppBar position="static" className={styles['nav-bar']}>
      <Container maxWidth="xl">
        <Box
          component="img"
          sx={{
            height: 60,
            width: 180,
            paddingTop: 0.5,
            paddingBottom: 0.5,
            margin: 1,
          }}
          alt="logo"
          src="/job-scanner-logo.png"
        />
      </Container>
    </AppBar>
  );
}
