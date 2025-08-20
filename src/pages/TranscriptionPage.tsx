import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Pause, Download, Upload } from 'lucide-react';
import { apiService } from '../services/api';
import { PageHeader } from '../components/common/PageHeader';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const TranscriptionPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async () => {
    if (!audioBlob) return;

    setLoading(true);
    try {
      const audioUrl = URL.createObjectURL(audioBlob);
      const result = await apiService.transcribeAudio(audioUrl);
      setTranscription(result);
    } catch (error) {
      console.error('Transcription failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioBlob(file);
      setTranscription('');
    }
  };

  const downloadTranscription = () => {
    if (transcription) {
      const blob = new Blob([transcription], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transcription.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Voice Transcription"
        description="Convert voice messages and audio files to text"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recording Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Record Audio</h3>
          
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 ${
              isRecording 
                ? 'bg-red-100 dark:bg-red-900 animate-pulse' 
                : 'bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800'
            }`}>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isRecording ? (
                  <Square className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </button>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Audio File</span>
              </button>
            </div>
          </div>
        </div>

        {/* Audio Playback & Transcription */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Audio & Transcription</h3>
          
          {audioBlob && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={playAudio}
                  className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-1" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>

              <audio
                ref={audioRef}
                src={audioBlob ? URL.createObjectURL(audioBlob) : undefined}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />

              <button
                onClick={transcribeAudio}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>Transcribe Audio</span>
                  </>
                )}
              </button>
            </div>
          )}

          {transcription && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Transcription</h4>
                <button
                  onClick={downloadTranscription}
                  className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{transcription}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transcriptions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transcriptions</h3>
        <div className="space-y-3">
          {[
            { 
              text: "Hello, this is a test voice message for the transcription service. The quality seems to be working well.",
              timestamp: "2 minutes ago",
              duration: "0:15"
            },
            { 
              text: "مرحبا، هذه رسالة صوتية باللغة العربية لاختبار خدمة التفريغ الصوتي.",
              timestamp: "5 minutes ago",
              duration: "0:12"
            },
            { 
              text: "Please remind all parents about the upcoming parent-teacher conference next week.",
              timestamp: "1 hour ago",
              duration: "0:08"
            }
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.duration}</span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};