import React from 'react';
import styles from './contacts.module.css';

const Contacts = () => {

  return (
    <div className={`${styles.contacts} container`}>
      <p>
        <a href="tel:+40 757 561 477">+40 (0)757 561 477</a>
      </p>
      <p>
        <a href="mailto:nirmoto@yahoo.ro">nirmoto@yahoo.ro</a>
      </p>
    </div>
  );
};

export default Contacts;
