// MorePage.jsx (Create this new component in your src/components directory)
import React from 'react';


const MorePage = ({ user }) => {
  return (
    <div>
    
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">More Information</h2>
        <p className="mb-2">Click the link below to visit the official KTU website:</p>
        <a
          href="https://ktu.edu.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Official KTU Website
        </a>
      </div>
    </div>
  );
};

export default MorePage;