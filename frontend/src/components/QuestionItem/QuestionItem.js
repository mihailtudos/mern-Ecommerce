import React, {useState} from 'react';

const QuestionItem = ({ info, title }) => {
  const [isInfoShown, setIsInfoShown] = useState(false);

  return (
    <article className='question'>
      <header>
        <h4>{ title }</h4>
        <button
          className="btn"
          onClick={() => setIsInfoShown(!isInfoShown)}>
          { isInfoShown ? '-' : '+' }
        </button>
      </header>
      {isInfoShown && info}
    </article>
  );
};

export default QuestionItem;