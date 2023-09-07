export default function NavBar() {
  return (
    <nav
      className="nav-bar"
      style={{ backgroundColor: 'white', height: '10vh', width: '100vw' }}
    >
      <div
        className="nav-bar__logo"
        style={{ height: '100%', padding: '1% 1% 1% 1%' }}
      >
        <img
          src="/job-scanner-logo.png"
          alt="logo"
          style={{ height: '100%' }}
        />
      </div>
    </nav>
  );
}
