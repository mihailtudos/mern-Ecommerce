import React from 'react';
import styles from './Filter.module.css';


const Filter = () => {
  return (
    <div className={styles.filter}>
      <i className="fas fa-search"  />
      <input type="text" placeholder={'cauta...'}/>

    </div>
  );
};

export default Filter;
