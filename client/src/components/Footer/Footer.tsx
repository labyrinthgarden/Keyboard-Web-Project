import React from 'react';

import './FooterDark.css';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-center py-3 mt-auto border-top border-secondary footer-dark">
            <div className="container">
                <span className="text-light-50 small">&copy; {new Date().getFullYear()} Keyboards Shop. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;