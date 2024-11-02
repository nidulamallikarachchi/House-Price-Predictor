import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>MyWebsite</div>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link to="/predictor" className={styles.navLink}>Predictor</Link></li>
        <li className={styles.navItem}><Link to="/visualizer" className={styles.navLink}>Visualizer</Link></li>
        <li className={styles.navItem}><Link to="/our-data" className={styles.navLink}>Our Data</Link></li>
        <li className={styles.navItem}><Link to="/about-us" className={styles.navLink}>About Us</Link></li>
        <li className={styles.navItem}><Link to="/news" className={styles.navLink}>News</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
