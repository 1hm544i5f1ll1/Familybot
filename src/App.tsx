import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import Conversations from './components/Conversations';
import Analytics from './components/Analytics';
import { FamilyMembersPage } from './pages/FamilyMembersPage';
import { FamilyMemberDetailPage } from './pages/FamilyMemberDetailPage';
import { SchoolPage } from './pages/SchoolPage';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'conversations':
        return <Conversations />;
      case 'analytics':
        return <Analytics />;
      case 'family':
        return <FamilyMembersPage />;
      case 'attendance':
      case 'homework':
      case 'fees':
      case 'events':
        return <SchoolPage />;
      default:
        return <Overview />;
    }
  };

  return (
    <Router>
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
              <Routes>
                <Route path="/" element={<Navigate to="/overview" replace />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/conversations" element={<Conversations />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/family" element={<FamilyMembersPage />} />
                <Route path="/family/:id" element={<FamilyMemberDetailPage />} />
                <Route path="/school" element={<SchoolPage />} />
                <Route path="*" element={renderContent()} />
              </Routes>
            </main>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;