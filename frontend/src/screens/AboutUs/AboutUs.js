import React, {useEffect} from 'react';

const AboutUs = () => {
  useEffect(() => {
    window.scroll(0,0)
  }, []);

  return (
    <div className={'about-us__container'}>
      <div>
        <h1>Despre noi</h1>
        <p>Bine ati venit pe site-ul nostru!</p>
        <p>Nirmoto.ro va ofera o gama larga de utilaje agricole de mici dimensiuni
          (motosape/motocultoare /masini de tuns iarba/mulgatori si aparate de
          muls/generatoare/motopompe/ accesorii si piese)etc.
          Garantie 24 de luni si post garantie pentru toate produsele din gama
          noastra.
        </p>
        <p>
          Procesarea unei comenzi reprezinta o prioritate pentru noi, din acest
          motiv 95% dintre comenzi ajung la destinatie in maxim 48 ore
          Dezvoltarea face parte din obiectivele noastre, prin urmare venim in
          intampinarea clientului cu o gama variata de produse.
          De asemenea ne puteti gasi si in magazinul nostrum fizic din Bacau Strada
          Narciselor nr 21
        </p>
        <p>Pentru alte informatii va stam la dispozitie,</p>
        <p><strong>Echipa Nirmoto.</strong></p>
      </div>
      <div className={'about-us__contacts'}>
        <h1>Contacte</h1>
        <p>
          Telefon: <a href="tel:0757 561 477"> 0757 561 477</a>
        </p>
        <p>
          Email: <a href="mailto:nirmoto@yahoo.ro"> nirmoto@yahoo.ro</a>
        </p>
        <p>
          <iframe
            title={'google map of the bussines location'}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.455640528326!2d26.908697415593753!3d46.53867277912831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b571b89d1e6c11%3A0xbacfe95af1f57282!2sStrada%20Narciselor%2021%2C%20Bac%C4%83u%2C%20Romania!5e0!3m2!1sen!2suk!4v1623713137647!5m2!1sen!2suk"
            width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" />
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
