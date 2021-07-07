import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="footer">
          <div className={'footer__social-links'}>

          </div>
          <div className={'footer__contacts'}>
            <div className={'util__links'}>
              <h5 className={'text-info'}>Link-uri utile</h5>
              <a href={'/terms'}>Termeni</a>
              <a href={'/about'}>Despre noi</a>
              <a href={'/privacy'}>Confidentialitate</a>
              <a href={'https://anpc.ro'}>Protectia consumatorului</a>
              <a href={'https://ec.europa.eu/consumers/odr/main/?event=main.home.howitworks&lng=RO'}>Solutionarea litigiilor</a>
            </div>
            <div className={'footer__social-media'}>
              <h5 className={'text-info'}>Contactati-ne</h5>
              <div className="social__media--links">
                <a href={'https://www.facebook.com/www.nirmoto.ro/'}><i className="fab fa-facebook-square" /></a>
                <a href={'https://youtube.com/channel/UC12LuMkR2no0EKYESzYpyqg'}><i className="fab fa-youtube"/></a>
              </div>
            </div>
          </div>
        </div>
        <div className={'footer__copyright'}>
            Copyright &copy; Nirmoto - developed by &nbsp; <a href="https://mihailtudos.com/" rel="noreferrer" className={'text-info'} target="_blank"> Mihail Tudos</a>
        </div>
      </Container>
    </footer>
  )
}

export default Footer;