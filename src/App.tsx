import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import Conversations from './components/Conversations';
import Analytics from './components/Analytics';

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
      case 'users':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Users & Role Management</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage user permissions, roles, and access controls for your WhatsApp bot system.</p>
          </div>
        );
      case 'broadcasting':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Broadcasting System</h2>
            <p className="text-gray-600 dark:text-gray-400">Send announcements and alerts to selected contacts and groups with delivery tracking.</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Attendance Tracking</h2>
            <p className="text-gray-600 dark:text-gray-400">Monitor student attendance with QR code and location-based check-in systems.</p>
          </div>
        );
      case 'homework':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Homework Management</h2>
            <p className="text-gray-600 dark:text-gray-400">Create, assign, and track homework assignments across different classes and subjects.</p>
          </div>
        );
      case 'fees':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fee Management</h2>
            <p className="text-gray-600 dark:text-gray-400">Send fee reminders and track payment status for students and classes.</p>
          </div>
        );
      case 'events':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Events & RSVP</h2>
            <p className="text-gray-600 dark:text-gray-400">Create and manage school events with RSVP functionality and attendance tracking.</p>
          </div>
        );
      case 'nanny':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nanny/Governess Services</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage children's schedules, activities, and provide developmental support through AI assistance.</p>
          </div>
        );
      case 'tutor':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Private Tutoring</h2>
            <p className="text-gray-600 dark:text-gray-400">Provide personalized tutoring support and educational guidance through AI-powered assistance.</p>
          </div>
        );
      case 'travel':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Travel Planning</h2>
            <p className="text-gray-600 dark:text-gray-400">AI-powered travel planning with itinerary suggestions, bookings, and real-time updates.</p>
          </div>
        );
      case 'nutrition':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nutritionist Services</h2>
            <p className="text-gray-600 dark:text-gray-400">Provide dietary advice, meal planning, and nutritional guidance through AI consultation.</p>
          </div>
        );
      case 'fitness':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Personal Training</h2>
            <p className="text-gray-600 dark:text-gray-400">AI-powered fitness coaching with personalized workout plans and progress tracking.</p>
          </div>
        );
      case 'mental':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mental Health Support</h2>
            <p className="text-gray-600 dark:text-gray-400">Provide psychological support and mental wellness guidance through AI assistance.</p>
          </div>
        );
      case 'design':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Interior Design</h2>
            <p className="text-gray-600 dark:text-gray-400">AI-powered interior design consultation and home decoration advice.</p>
          </div>
        );
      case 'financial':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Financial Advisory</h2>
            <p className="text-gray-600 dark:text-gray-400">Provide financial planning, investment advice, and budgeting assistance through AI.</p>
          </div>
        );
      case 'translation':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Translation Services</h2>
            <p className="text-gray-600 dark:text-gray-400">Arabic-English bidirectional translation with educational terminology support.</p>
          </div>
        );
      case 'transcription':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Voice Transcription</h2>
            <p className="text-gray-600 dark:text-gray-400">Convert voice messages to text with multilingual support and context understanding.</p>
          </div>
        );
      case 'compliance':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Compliance & Privacy</h2>
            <p className="text-gray-600 dark:text-gray-400">GDPR compliance tools, audit logs, and privacy management for your WhatsApp bot.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Bot Configuration</h2>
            <p className="text-gray-600 dark:text-gray-400">Configure bot settings, API keys, webhooks, and system preferences.</p>
          </div>
        );
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
    </div>
  );
}

export default App;