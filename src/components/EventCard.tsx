import React from 'react';

export interface Event {
  id: string;
  type: string;
  category: 'Grid DR' | 'Internal' | 'Maintenance';
  status: 'Upcoming' | 'Active' | 'Resolved';
  timeWindow: string;
  impact: string;
  description: string;
  recommendations: string[];
  affectedAssets: {
    asset: string;
    action: string;
  }[];
  // Economics fields (for Grid DR events)
  pricePerKWh?: number;
  requestedReductionKW?: number;
  durationHours?: number;
  estimatedComputeLossCostPerKWh?: number;
}

interface EventCardProps {
  event: Event;
  isSelected: boolean;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isSelected, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#ff6b6b';
      case 'Upcoming': return '#ffd700';
      case 'Resolved': return '#888';
      default: return '#888';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Grid DR': return '#61dafb';
      case 'Internal': return '#ff6b6b';
      case 'Maintenance': return '#ffd700';
      default: return '#888';
    }
  };

  // Calculate economics for Grid DR events
  const calculateEconomics = () => {
    if (!event.pricePerKWh || !event.requestedReductionKW || !event.durationHours) {
      return null;
    }
    const potentialRevenue = event.pricePerKWh * event.requestedReductionKW * event.durationHours;
    return potentialRevenue;
  };

  const potentialRevenue = calculateEconomics();

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? '#2a2a2a' : '#1e1e1e',
        border: `1px solid ${isSelected ? '#61dafb' : '#333'}`,
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#555';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#333';
        }
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.5rem'
      }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 'bold',
          color: '#fff',
          flex: 1
        }}>
          {event.type}
        </div>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: '600',
          color: getStatusColor(event.status),
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '0.25rem 0.5rem',
          backgroundColor: `${getStatusColor(event.status)}20`,
          borderRadius: '4px'
        }}>
          {event.status}
        </div>
      </div>

      {/* Category Badge */}
      <div style={{
        display: 'inline-block',
        fontSize: '0.65rem',
        fontWeight: '600',
        color: getCategoryColor(event.category),
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '0.15rem 0.4rem',
        backgroundColor: `${getCategoryColor(event.category)}20`,
        borderRadius: '3px',
        marginBottom: '0.5rem'
      }}>
        {event.category}
      </div>

      {/* Time Window */}
      <div style={{
        fontSize: '0.75rem',
        color: '#aaa',
        marginBottom: '0.5rem',
        fontFamily: 'monospace'
      }}>
        ⏰ {event.timeWindow}
      </div>

      {/* Impact */}
      <div style={{
        fontSize: '0.75rem',
        color: '#ddd',
        fontWeight: '500'
      }}>
        {event.impact}
      </div>

      {/* Potential Revenue (Grid DR events only) */}
      {potentialRevenue !== null && (
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--accent-neon-green)',
          fontWeight: 'bold',
          marginTop: '0.5rem',
          padding: '0.35rem 0.5rem',
          backgroundColor: 'rgba(124, 255, 107, 0.1)',
          borderRadius: '4px',
          border: '1px solid rgba(124, 255, 107, 0.3)'
        }}>
          💰 Potential DR revenue: ${potentialRevenue.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default EventCard;
