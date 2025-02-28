import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/catalog');
  }
  return (
    <div className={styles.wraper}>
      <div className={styles.title}>
        <h1 className={styles.titleText}>Find your perfect rental car</h1>
        <p className={styles.text}>Reliable and budget-friendly rentals for any journey</p>
        <button className={styles.btn} onClick={handleNavigate}>
          Vive catalog
        </button>
      </div>
    </div>
  );
};

export default HomePage;
