import React, { useState, useEffect } from 'react';
import { Camera, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const AVSMonitor: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentCamera, setCurrentCamera] = useState(1);

  // Simulated camera feeds
  const cameraFeeds = [
    '',
    'https://images.unsplash.com/photo-1566288623394-377af472d81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80', 
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCamera((prev) => (prev % cameraFeeds.length) + 1);
    }, 10000); // Switch camera every 10 seconds

    return () => clearInterval(timer);
  }, []);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Audio-Video Surveillance</h3>
          <div className="flex space-x-2">
            <button onClick={toggleMute} className="text-gray-400 hover:text-gray-500">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button onClick={toggleFullscreen} className="text-gray-400 hover:text-gray-500">
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={cameraFeeds[currentCamera - 1]}
            alt={`Camera feed ${currentCamera}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            <Camera className="h-4 w-4 inline-block mr-1" />
            Camera {currentCamera}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <span className="font-medium text-gray-500">Status:</span>
          <span className="ml-1 text-green-600">Live</span>
        </div>
      </div>
    </div>
  );
};

export default AVSMonitor;