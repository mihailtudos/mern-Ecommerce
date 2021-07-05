import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import Rating from '../Rating/Rating';

const Product = ({ product }) => {
  const { _id, image, name, rating, numReviews, price } = product;

  return (
    <Card  className='my-3 p-3 rounded card-body h-100 product__item'>
      <Link to={`/product/${_id}`} >
        <Card.Img className={'product__image'} src={image[0]} variant='top'/>
      </Link>
      <Card.Body className={'d-flex justify-content-between flex-column'}>
        <Link to={`/product/${_id}`} > 
          <Card.Title as='div'> 
            <strong>{ name }</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>   
            <Rating value={rating} text={ numReviews } color={''}/>
          </div>
        </Card.Text>
        <Card.Text as='p' className={'product__price'}>
          {price && price.toLocaleString()}RON <sub>(TVA inclus)</sub>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
