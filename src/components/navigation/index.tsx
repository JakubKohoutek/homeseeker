import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './navigation.css';

const Navigation: React.FC = () => {
  const [visible, setVisibility] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (): void => {
    setIsScrolled(window.pageYOffset !== 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <nav
      className={classNames('navigation', {
        'navigation--dark': isScrolled
      })}>
      <ul
        className={classNames('navigation__list', {
          'navigation__list--hidden': !visible
        })}
        onClick={(): void => setVisibility(false)}>
        <li>
          <Link to="/">Homepage</Link>
        </li>
      </ul>
      <div
        className="navigation__hamburger-icon"
        onClick={(): void => setVisibility(!visible)}>
        {visible ? <span>&#10005;</span> : <span>&#9776;</span>}
      </div>
    </nav>
  );
};

export default Navigation;
