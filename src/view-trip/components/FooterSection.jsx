import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function FooterSection() {
  return (
    <footer className="bg-gray-100 text-black py-4 mt-8">
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        <h2 className="text-lg font-medium mb-4 text-center">
          Creado por Nicolás Martín - Planifica tu viaje!
        </h2>
        <div className="flex space-x-4">
          <a href="https://github.com/nicolasmartin89" target="_blank" rel="noopener noreferrer" className="text-black hover:text-orange-500 transition duration-300">
            <FaGithub className="text-2xl" />
          </a>
          <a href="https://www.linkedin.com/in/nicolas-demis-martin/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-orange-500 transition duration-300">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
