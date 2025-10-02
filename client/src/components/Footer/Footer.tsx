import React from 'react';

import './FooterDark.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer-dark mt-auto">
            <div className="container py-4">
                <div className="row">
                    <div className="col text-center">
                        <h5 className="text-gradient fw-bold">Keyboards Shop</h5>
                        <p className="text-light-50 small mb-0">&copy; {new Date().getFullYear()} Keyboards Shop. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;