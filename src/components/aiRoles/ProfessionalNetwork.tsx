import React from 'react';
import { Star, Phone, Mail, MapPin, Clock, DollarSign } from 'lucide-react';
import { ProfessionalContact } from '../../types/aiRoles';

interface ProfessionalNetworkProps {
  professionals: ProfessionalContact[];
  onContactProfessional: (professional: ProfessionalContact) => void;
  onViewReviews: (professional: ProfessionalContact) => void;
}

export const ProfessionalNetwork: React.FC<ProfessionalNetworkProps> = ({
  professionals,
  onContactProfessional,
  onViewReviews
}) => {
  const formatPrice = (professional: ProfessionalContact) => {
    if (professional.pricing.hourlyRate) {
      return `$${professional.pricing.hourlyRate}/hr`;
    }
    if (professional.pricing.sessionRate) {
      return `$${professional.pricing.sessionRate}/session`;
    }
    return 'Contact for pricing';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (professionals.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">No professionals in network</div>
        <p className="text-gray-600">AI will handle tasks autonomously or find professionals when needed</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {professionals.map(professional => (
        <div
          key={professional.id}
          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-medium text-gray-900">{professional.name}</h4>
              <p className="text-sm text-gray-600">{professional.profession}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Star className={`w-4 h-4 ${getRatingColor(professional.rating)}`} />
              <span className={`text-sm font-medium ${getRatingColor(professional.rating)}`}>
                {professional.rating}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{professional.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{professional.availability}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{formatPrice(professional)}</span>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">Specializations:</p>
            <div className="flex flex-wrap gap-1">
              {professional.specialization.slice(0, 3).map(spec => (
                <span
                  key={spec}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              onClick={() => onViewReviews(professional)}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              {professional.reviews.length} Reviews
            </button>
            <div className="flex space-x-2">
              {professional.contactInfo.phone && (
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Phone className="w-4 h-4" />
                </button>
              )}
              {professional.contactInfo.email && (
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Mail className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onContactProfessional(professional)}
                className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};