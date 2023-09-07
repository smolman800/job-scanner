import styles from './styles/NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles['nav-bar']}>
      <div className={styles['nav-bar__logo']}>
        <img src="/job-scanner-logo.png" alt="logo" />
      </div>
    </nav>
  );
}
