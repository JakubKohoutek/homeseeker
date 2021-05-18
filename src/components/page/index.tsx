import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './page.css';

type Props = {
  children: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const className = location.pathname === '/' ? 'homepage' : '';

  return <div className={classNames('page', className)}>{children}</div>;
};

export default Page;
