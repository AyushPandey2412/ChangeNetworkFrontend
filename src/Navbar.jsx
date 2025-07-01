// // src/components/Navbar.js
// import React from 'react';

// const Navbar = ({ searchText, setSearchText }) => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
//       <span className="navbar-brand">Task Manager</span>
//       <div className="ms-auto">
//         <input
//           type="text"
//           className="form-control"
//           style={{ minWidth: '250px' }}
//           placeholder="Search by title or assignee"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.js
// import React from 'react';
// import { LayoutDashboard, Search } from 'lucide-react';

// const Navbar = ({ searchText, setSearchText }) => {
//   return (
//     <nav className="bg-[#EFFEF8] shadow-sm px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
//       {/* Left: Logo & Name */}
//       <div className="flex items-center gap-2">
//         <LayoutDashboard className="text-green-600" />
//         <h1 className="text-xl font-semibold text-gray-800">TeamBoard</h1>
//       </div>

//       {/* Center: Search Input with Icon */}
//       <div className="relative w-full sm:w-96">
//         <input
//           type="text"
//           placeholder="Search tasks..."
//           className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { LayoutDashboard, Search } from 'lucide-react';

const Navbar = ({ searchText, setSearchText }) => {
  return (
    <nav className="bg-gradient-to-r from-[#EFFEF8] to-[#F0FFF4] shadow-lg border-b border-green-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Left: Logo & Name */}
      <div className="flex items-center gap-3 group">
        <div className="p-2 bg-green-50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:bg-green-100">
          <LayoutDashboard className="text-green-600 group-hover:text-green-700 transition-colors duration-300" size={24} />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent tracking-tight">
          TaskFlow
        </h1>
      </div>
      
      {/* Center: Search Input with Icon */}
      <div className="relative w-full sm:w-96 group">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-5 pr-12 py-3 rounded-xl border-2 border-green-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-green-400 focus:bg-white focus:shadow-lg transition-all duration-300 placeholder-gray-500 text-gray-700"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md group-focus-within:bg-green-50 transition-colors duration-300">
          <Search className="text-green-500 group-focus-within:text-green-600 transition-colors duration-300" size={20} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;