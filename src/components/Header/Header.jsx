import React from 'react';
import sprite from '../../image/sprite.svg';
import styles from './Header.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const buildStylesClass = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoIcon}>
        <svg aria-hidden="true">
          <use href={`${sprite}#icon-Logo`} />
        </svg>
      </div>

      <ul className={styles.btnList}>
        <li>
          <NavLink to="/home" className={buildStylesClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalog" className={buildStylesClass}>
           Catalog
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
