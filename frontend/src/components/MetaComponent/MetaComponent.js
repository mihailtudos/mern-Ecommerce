import React from 'react';
import { Helmet } from 'react-helmet';

const MetaComponent = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

MetaComponent.defaultProps = {
  title: 'Welcome to Nirmoto',
  keywords: 'electronics, buy electronics, cheap electronics',
  description: 'We sell electronics at best prices on the market'
}

export default MetaComponent;
