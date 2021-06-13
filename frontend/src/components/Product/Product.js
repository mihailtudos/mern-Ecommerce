import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import Rating from '../Rating/Rating';

const Product = ({ product }) => {
  const { _id, image, name, rating, numReviews, price } = product;

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${_id}`} > 
        <Card.Img src={image} variant='top'/>
      </Link>
      <Card.Body>
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
        <Card.Text as='h3'>
          {price}$
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
