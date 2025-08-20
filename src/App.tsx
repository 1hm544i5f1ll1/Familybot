import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import Conversations from './components/Conversations';
import Users from './components/Users';
import Broadcasting from './components/Broadcasting';
import Analytics from './components/Analytics';
import SchoolWorkflows from './components/SchoolWorkflows';
import FamilyRoles from './components/FamilyRoles';
import Settings from './components/Settings';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'conversations':
        return <Conversations />;
      case 'users':
        return <Users />;
      case 'broadcasting':
        return <Broadcasting />;
      case 'analytics':
        return <Analytics />;
      case 'attendance':
      case 'homework':
      case 'fees':
      case 'events':
        return <SchoolWorkflows />;
      case 'nanny':
      case 'tutor':
      case 'travel':
      case 'nutrition':
      case 'fitness':
      case 'mental':
      case 'design':
      case 'financial':
        return <FamilyRoles />;
      case 'translation':
      case 'transcription':
      case 'compliance':
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          isCollapsed={sidebarCollapsed}
        />
        <div className="flex-1 flex flex-col">
          <Header 
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;