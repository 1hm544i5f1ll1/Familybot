import React, { useState, useEffect } from 'react';
import { Save, Bot, Globe, Shield, Bell } from 'lucide-react';
import { BotSettings } from '../types';
import { apiService } from '../services/api';
import { PageHeader } from '../components/common/PageHeader';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<BotSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'ai' | 'translation' | 'compliance'>('general');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await apiService.getBotSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      await apiService.updateBotSettings(settings);
      // Show success message
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSettings = (section: keyof BotSettings, updates: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [section]: { ...settings[section], ...updates }
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Bot },
    { id: 'ai', label: 'AI Configuration', icon: Bot },
    { id: 'translation', label: 'Translation', icon: Globe },
    { id: 'compliance', label: 'Compliance', icon: Shield }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">Failed to load settings</div>
        <button onClick={loadSettings} className="text-indigo-600 hover:text-indigo-800">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bot Settings"
        description="Configure your WhatsApp bot behavior and integrations"
      >
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
        >
          {saving ? <LoadingSpinner size="sm" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </PageHeader>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bot Name
              </label>
              <input
                type="text"
                value={settings.general.botName}
                onChange={(e) => updateSettings('general', { botName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Language
              </label>
              <select
                value={settings.general.defaultLanguage}
                onChange={(e) => updateSettings('general', { defaultLanguage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Model
              </label>
              <select
                value={settings.ai.model}
                onChange={(e) => updateSettings('ai', { model: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Temperature: {settings.ai.temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.ai.temperature}
                onChange={(e) => updateSettings('ai', { temperature: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        )}

        {activeTab === 'translation' && (
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.translation.autoDetect}
                onChange={(e) => updateSettings('translation', { autoDetect: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto-detect language
              </label>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.compliance.gdprEnabled}
                onChange={(e) => updateSettings('compliance', { gdprEnabled: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable GDPR compliance
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Retention (days)
              </label>
              <input
                type="number"
                value={settings.compliance.dataRetention}
                onChange={(e) => updateSettings('compliance', { dataRetention: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;