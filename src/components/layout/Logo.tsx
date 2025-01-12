import React from "react";

interface LogoProps {
  height?: string | number;
  width?: string | number;
}

const Logo: React.FC<LogoProps> = ({ height = "auto", width = "auto" }) => {
  return (
    <div>
      <div id="logo" className="pull-left">
        <a href="/" className="scrollto">
          <img 
            src="/img/logo.png" 
            alt="Title" 
            style={{ height, width }} 
          />
        </a>
      </div>
    </div>
  );
};

export default Logo;

