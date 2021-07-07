import React from 'react';

const TopSection = ({mainImage, secondImage, thirdImage}) => {
  return (
    <div className={'top__section'}>
      <img src={secondImage} alt="" className={'top__section--main'}/>
      <div className={'top__section--second'}>
        <h2>Nirmoto <i className="fas fa-tractor" /></h2>
        <p>Produse pentru oamenii harnici</p>
      </div>
      <img src={thirdImage} alt="" className={'top__section--third'}/>
      <img src={mainImage} alt="" className={'top__section--forth'}/>
    </div>
  );
};

export default TopSection;
