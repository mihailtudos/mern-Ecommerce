import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = ({ mainImage, secondImage, thirdImage, fifthImage}) => {
  return (
    <div className={'about__us'}>
      <img src={secondImage} alt="" className={'about__us--main'}/>
      <img src={thirdImage} alt="" className={'about__us--second'}/>
      <img src={mainImage} alt="" className={'about__us--third'}/>
      <div className={'about__us--forth'}>
        <h2 className={'about__us--title'}>About us  </h2>
        <p className={'my-3'}>Nirmoto.ro va ofera o gama larga de utilaje agricole de mici dimensiuni
          (motosape/motocultoare /masini de tuns iarba/mulgatori si aparate de
          muls/generatoare/motopompe/ accesorii si piese)etc.</p>
        <div className={'d-flex justify-content-end'}>
          <Link className={'btn'} to={'/about'}>read more...</Link>
        </div>
      </div>
      <img src={fifthImage} alt="" className={'about__us--fifth'}/>
    </div>
  );
};

export default AboutUs;
