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
            <div>
              <h6>Link-uri utile</h6>
              <Link to={'/termeni'}>Termeni</Link>
            </div>
          </div>
        </div>
        <div className={'footer__copyright'}>
            Copyright &copy; Nirmotor - developed by &nbsp; <a href="https://mihailtudos.com/" target="_blank"> Mihail Tudos</a>
        </div>
      </Container>
    </footer>
  )
}

export default Footer;