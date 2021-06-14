import React, { useState } from 'react';
import {Button, Form} from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()){
      history.push(`/search/${keyword}`)
      setKeyword('');
    } else {
      history.push('/');
      setKeyword('');
    }
  };

  return (
    <Form onSubmit={submitHandler} className={'d-flex'}>
      <Form.Control
        type={'text'}
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={'Search Product...'}
        className={'mr-sm-2 ml-sm-5 search__input'}>
      </Form.Control>
      <Button
        type={'submit'}
        variant={'outline-dark'}
        className={'p-2'}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
