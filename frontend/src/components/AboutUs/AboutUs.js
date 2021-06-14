import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = ({ mainImage, secondImage, thirdImage, fifthImage}) => {
  return (
    <div className={'about__us'}>
      <img src={secondImage} alt="" className={'about__us--main'}/>
      <img src={thirdImage} alt="" className={'about__us--second'}/>
      <img src={mainImage} alt="" className={'about__us--third'}/>
      <div className={'about__us--forth'}>
        <h2 className={'about__us--title'}>Despre noi  </h2>
        <div className={'about__us--divider'}/>
        <p className={'my-3'}>Nirmoto.ro va ofera o gama larga de utilaje agricole de mici dimensiuni <span>(motosape/motocultoare /masini de tuns iarba/mulgatori si aparate de
          muls/generatoare/motopompe/ accesorii si piese)etc.</span></p>
          <Link className={''} to={'/about'}>afla mai mult...</Link>
      </div>
      <img src={fifthImage} alt="" className={'about__us--fifth'}/>
    </div>
  );
};

export default AboutUs;
