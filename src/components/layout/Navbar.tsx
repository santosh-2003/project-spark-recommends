import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    logout
  } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navigation = user ? [{
    name: 'Dashboard',
    href: '/dashboard'
  }, {
    name: 'All Projects',
    href: '/projects'
  }, {
    name: 'Profile',
    href: '/profile'
  }, ...(user.isAdmin ? [{
    name: 'Admin Panel',
    href: '/admin'
  }] : [])] : [{
    name: 'Home',
    href: '/'
  }, {
    name: 'Projects',
    href: '/projects'
  }];
  return <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></div>
              <span className="text-xl font-bold text-gray-900">BuildBuddy </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}>
                {item.name}
              </Link>)}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                <Button variant="outline" size="sm" onClick={logout} className="flex items-center space-x-1">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div> : <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map(item => <Link key={item.name} to={item.href} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.href) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>)}
              {user ? <button onClick={() => {
            logout();
            setIsOpen(false);
          }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                  Logout
                </button> : <div className="space-y-2">
                  <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                    Register
                  </Link>
                </div>}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;