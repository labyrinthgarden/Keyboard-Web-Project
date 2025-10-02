import React from 'react';

import './HeaderDark.css';

const Header: React.FC = () => {
  return (
    <header className="bg-dark text-light shadow-sm border-bottom border-secondary header-dark">
      <div className="container py-4 d-flex align-items-center justify-content-between">
        <h1 className="h2 fw-bold m-0 text-gradient">Keyboards Shop</h1>
      </div>
    </header>
  );
};

export default Header;