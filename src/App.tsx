import React, { useEffect, useState } from 'react';
import { BookOpen, MessageCircle, Calendar, Bookmark, Menu, LogOut, User } from 'lucide-react';
import { auth } from './config/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import Marketplace from './components/Marketplace';
import Confessions from './components/Confessions';
import Events from './components/Events';
import Resources from './components/Resources';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setActiveTab('marketplace')}
                className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                SherLife2.0
              </button>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'marketplace' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Marketplace</span>
              </button>
              
              <button
                onClick={() => setActiveTab('confessions')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'confessions' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confessions</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'events' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'resources' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>Resources</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'profile' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={() => auth.signOut()}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'confessions' && <Confessions />}
        {activeTab === 'events' && <Events />}
        {activeTab === 'resources' && <Resources />}
        {activeTab === 'profile' && <Profile />}
      </main>
    </div>
  );
}

export default App;