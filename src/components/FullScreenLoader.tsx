import React from 'react';

interface FullScreenLoaderProps {
  progress: number;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="text-center">
        <div className="mb-4 text-white text-lg font-bold">Loading...</div>
        <div className="w-64 bg-gray-300 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-white mt-2">{progress}%</div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
