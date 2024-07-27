// pages/index.tsx
import { useEffect } from 'react';

const HomePage = () => {
//   useEffect(() => {
//     alertfun();
//   }, []);

  return (
    <div>
      <div id="preloader" style={{ marginTop: '40px' }}>
        <div className="loader-cubes">
          <div className="loader-cube1 loader-cube"></div>
          <div className="loader-cube2 loader-cube"></div>
          <div className="loader-cube4 loader-cube"></div>
          <div className="loader-cube3 loader-cube"></div>
        </div>
      </div>
      <h1>Welcome to Serverless Registry</h1>
      <p>This is a section.</p>
    </div>
  );
};

export default HomePage;
