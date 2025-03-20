import React from 'react';

interface ManagementFooterProps {
  isDarkMode?: boolean;
}

const ManagementFooter: React.FC<ManagementFooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`bg-gray-900 text-white py-2 `}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center block with logo and text */}
        <div className="flex items-center justify-center space-x-4">
            <img src="/logo.png" alt="Logo" className="w-20 h-20" />
            <div>
                <p className="text-gray-400">Your official World Cup identification system.</p>
            </div>
        </div>

        {/* Center block with copyright text */}
        <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-400">
            <p>&copy; 2025 FanID. All rights reserved.</p>
        </div>
    </div>
</footer>
  );
};

export default ManagementFooter;