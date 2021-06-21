import React from 'react';
import QuestionItem from "../QuestionItem/QuestionItem";
import Widget from "../Widget/Widget";
import data from './data';

const Accordion = () => {

  return (
    <section className={'accordion'}>
        <h1 className={'text-right'}>Informatii Utile</h1>
      <main>
        <div className="outer-container">
          <div className="container">
            <div className={'text-center'}>
              <h5>
                Venim in intampinarea dvs. cu un mic ghid de informatii inainte de a
                comanda!
              </h5>
            </div>
            <div className="info">
              {
                data.map((question) => <QuestionItem key={question.id} {...question} />)
              }
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Accordion;
