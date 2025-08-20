import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import Conversations from './components/Conversations';
import Analytics from './components/Analytics';
import { UsersPage } from './pages/UsersPage';
import { BroadcastingPage } from './pages/BroadcastingPage';
import { AttendancePage } from './pages/AttendancePage';
import { HomeworkPage } from './pages/HomeworkPage';
import { FeesPage } from './pages/FeesPage';
import { EventsPage } from './pages/EventsPage';
import { TranslationPage } from './pages/TranslationPage';
import { TranscriptionPage } from './pages/TranscriptionPage';
import { CompliancePage } from './pages/CompliancePage';
import { FamilyMembersPage } from './pages/FamilyMembersPage';
import { FamilyMemberDetailPage } from './pages/FamilyMemberDetailPage';
import { SchoolPage } from './pages/SchoolPage';
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
        return <UsersPage />;
      case 'broadcasting':
        return <BroadcastingPage />;
      case 'analytics':
        return <Analytics />;
      case 'attendance':
        return <AttendancePage />;
      case 'homework':
        return <HomeworkPage />;
      case 'fees':
        return <FeesPage />;
      case 'events':
        return <EventsPage />;
      case 'translation':
        return <TranslationPage />;
      case 'transcription':
        return <TranscriptionPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'settings':
        return <Settings />;
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
                <Route path="/users" element={<UsersPage />} />
                <Route path="/broadcasting" element={<BroadcastingPage />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/attendance" element={<AttendancePage />} />
                <Route path="/homework" element={<HomeworkPage />} />
                <Route path="/fees" element={<FeesPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/translation" element={<TranslationPage />} />
                <Route path="/transcription" element={<TranscriptionPage />} />
                <Route path="/compliance" element={<CompliancePage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/family" element={<FamilyMembersPage />} />
                <Route path="/family/:id" element={<FamilyMemberDetailPage />} />
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