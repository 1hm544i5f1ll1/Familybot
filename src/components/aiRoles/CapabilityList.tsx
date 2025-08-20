import React from 'react';
import { CheckCircle, AlertTriangle, Users, Zap } from 'lucide-react';
import { AICapability } from '../../types/aiRoles';

interface CapabilityListProps {
  capabilities: AICapability[];
  onCapabilityClick?: (capability: AICapability) => void;
}

export const CapabilityList: React.FC<CapabilityListProps> = ({ 
  capabilities, 
  onCapabilityClick 
}) => {
  const getAutonomyIcon = (level: string) => {
    switch (level) {
      case 'full': return <Zap className="w-4 h-4 text-green-500" />;
      case 'assisted': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'professional_required': return <Users className="w-4 h-4 text-red-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAutonomyColor = (level: string) => {
    switch (level) {
      case 'full': return 'bg-green-50 border-green-200';
      case 'assisted': return 'bg-yellow-50 border-yellow-200';
      case 'professional_required': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-3">
      {capabilities.map(capability => (
        <div
          key={capability.id}
          onClick={() => onCapabilityClick?.(capability)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            onCapabilityClick ? 'cursor-pointer hover:shadow-md' : ''
          } ${getAutonomyColor(capability.autonomyLevel)}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              {getAutonomyIcon(capability.autonomyLevel)}
              <div>
                <h4 className="font-medium text-gray-900">{capability.name}</h4>
                <p className="text-sm text-gray-600">{capability.description}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm font-medium ${getConfidenceColor(capability.confidence)}`}>
                {capability.confidence}%
              </span>
              <p className="text-xs text-gray-500 capitalize">
                {capability.autonomyLevel.replace('_', ' ')}
              </p>
            </div>
          </div>

          {capability.examples.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-700 mb-1">Examples:</p>
              <div className="flex flex-wrap gap-1">
                {capability.examples.map((example, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white bg-opacity-60 text-gray-700 text-xs rounded"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};