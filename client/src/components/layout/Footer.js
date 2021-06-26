import React from "react";

const Footer = () => {
    return (
        <footer className="position-fixed bottom-0 right-0 w-100 footer mt-auto bg-dark text-white py-2 text-center">
            Copyright &copy; {new Date().getFullYear()} Dev Connector
        </footer>
    );
};

export default Footer;
