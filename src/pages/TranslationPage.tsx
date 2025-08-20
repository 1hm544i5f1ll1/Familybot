import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Volume2, Copy } from 'lucide-react';
import { apiService } from '../services/api';
import { PageHeader } from '../components/common/PageHeader';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const TranslationPage: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('auto');
  const [toLanguage, setToLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: 'auto', name: 'Auto Detect' },
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setLoading(true);
    try {
      const result = await apiService.translateText(sourceText, fromLanguage, toLanguage);
      setTranslatedText(result);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    if (fromLanguage !== 'auto') {
      setFromLanguage(toLanguage);
      setToLanguage(fromLanguage);
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const speakText = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Translation Service"
        description="Translate text between multiple languages with AI assistance"
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Language */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <select
                value={fromLanguage}
                onChange={(e) => setFromLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <button
                onClick={swapLanguages}
                disabled={fromLanguage === 'auto'}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
              <div className="absolute bottom-3 right-3 flex space-x-2">
                {sourceText && (
                  <>
                    <button
                      onClick={() => speakText(sourceText, fromLanguage)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(sourceText)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleTranslate}
              disabled={!sourceText.trim() || loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Languages className="w-4 h-4" />
                  <span>Translate</span>
                </>
              )}
            </button>
          </div>

          {/* Target Language */}
          <div className="space-y-4">
            <select
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {languages.filter(lang => lang.code !== 'auto').map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>

            <div className="relative">
              <textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 resize-none"
              />
              <div className="absolute bottom-3 right-3 flex space-x-2">
                {translatedText && (
                  <>
                    <button
                      onClick={() => speakText(translatedText, toLanguage)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translatedText)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Translation History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Translations</h3>
        <div className="space-y-3">
          {[
            { from: 'Hello, how are you?', to: 'مرحبا، كيف حالك؟', fromLang: 'en', toLang: 'ar' },
            { from: 'أحتاج مساعدة في الواجب المنزلي', to: 'I need help with homework', fromLang: 'ar', toLang: 'en' },
            { from: 'The meeting is at 3 PM', to: 'الاجتماع في الساعة 3 مساءً', fromLang: 'en', toLang: 'ar' }
          ].map((translation, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      {languages.find(l => l.code === translation.fromLang)?.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{translation.from}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      {languages.find(l => l.code === translation.toLang)?.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{translation.to}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};