import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Clock, CheckCircle, X } from 'lucide-react';
import { SchoolEvent } from '../types/school';
import { schoolService } from '../services/schoolService';
import { PageHeader } from '../components/common/PageHeader';
import { SearchInput } from '../components/common/SearchInput';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { StatusBadge } from '../components/common/StatusBadge';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await schoolService.getSchoolEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async () => {
    try {
      await schoolService.createEvent({
        title: 'New School Event',
        description: 'Event description',
        type: 'academic',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        location: 'School Campus',
        requiresRsvp: true,
        targetAudience: ['parents', 'students'],
        organizer: 'School Administration',
        status: 'draft'
      });
      await loadEvents();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'ongoing': return 'warning';
      case 'completed': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return '📚';
      case 'sports': return '⚽';
      case 'cultural': return '🎭';
      case 'meeting': return '👥';
      case 'trip': return '🚌';
      default: return '📅';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const eventTypes = [...new Set(events.map(event => event.type))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Events & RSVP"
        description="Manage school events and track attendance"
        actionLabel="Create Event"
        onAction={createEvent}
      />

      <div className="flex items-center space-x-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search events..."
          className="flex-1"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Types</option>
          {eventTypes.map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => {
          const confirmedCount = event.participants.filter(p => p.status === 'confirmed').length;
          const declinedCount = event.participants.filter(p => p.status === 'declined').length;
          const pendingCount = event.participants.filter(p => p.status === 'invited').length;

          return (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(event.type)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{event.type}</p>
                  </div>
                </div>
                <StatusBadge 
                  status={event.status} 
                  variant={getStatusVariant(event.status)}
                  size="sm"
                />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {event.requiresRsvp && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">RSVP Status</span>
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{confirmedCount} Yes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <X className="w-3 h-3 text-red-500" />
                      <span>{declinedCount} No</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-yellow-500" />
                      <span>{pendingCount} Pending</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  By {event.organizer}
                </span>
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No events found</div>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};