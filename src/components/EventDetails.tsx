import React from 'react';
import { type Event } from './EventCard';

interface EventDetailsProps {
  event: Event | null;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  if (!event) {
    return (
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '3rem 2rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '3rem', opacity: 0.3 }}>📋</div>
        <div style={{
          fontSize: '1rem',
          color: '#666',
          textAlign: 'center'
        }}>
          Select an event to view details
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#ff6b6b';
      case 'Upcoming': return '#ffd700';
      case 'Resolved': return '#888';
      default: return '#888';
    }
  };

  // Calculate economics for Grid DR events
  const calculateEconomics = () => {
    if (!event.pricePerKWh || !event.requestedReductionKW || !event.durationHours || !event.estimatedComputeLossCostPerKWh) {
      return null;
    }
    const potentialRevenue = event.pricePerKWh * event.requestedReductionKW * event.durationHours;
    const lostComputeRevenue = event.estimatedComputeLossCostPerKWh * event.requestedReductionKW * event.durationHours;
    const netImpact = potentialRevenue - lostComputeRevenue;
    return { potentialRevenue, lostComputeRevenue, netImpact };
  };

  const economics = calculateEconomics();

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1.5rem',
      height: '100%',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '0.5rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#fff',
            margin: 0
          }}>
            {event.type}
          </h2>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: getStatusColor(event.status),
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0.35rem 0.75rem',
            backgroundColor: `${getStatusColor(event.status)}20`,
            borderRadius: '4px'
          }}>
            {event.status}
          </div>
        </div>

        <div style={{
          fontSize: '0.875rem',
          color: '#aaa',
          fontFamily: 'monospace',
          marginTop: '0.5rem'
        }}>
          ⏰ {event.timeWindow}
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{
          fontSize: '0.875rem',
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.75rem'
        }}>
          Description
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#ddd',
          lineHeight: '1.6',
          margin: 0
        }}>
          {event.description}
        </p>
      </div>

      {/* Recommended Response */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{
          fontSize: '0.875rem',
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.75rem'
        }}>
          Recommended Response
        </h3>
        <div style={{
          backgroundColor: '#1e1e1e',
          border: '1px solid #2a2a2a',
          borderRadius: '6px',
          padding: '1rem'
        }}>
          <ul style={{
            margin: 0,
            paddingLeft: '1.25rem',
            color: '#ddd',
            fontSize: '0.875rem',
            lineHeight: '1.8'
          }}>
            {event.recommendations.map((rec, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Economics Breakdown (Grid DR events only) */}
      {economics && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{
            fontSize: '0.875rem',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            Economic Impact
          </h3>
          <div style={{
            backgroundColor: '#1e1e1e',
            border: '1px solid #2a2a2a',
            borderRadius: '6px',
            padding: '1rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {/* Potential DR Revenue */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                backgroundColor: 'rgba(124, 255, 107, 0.1)',
                borderRadius: '4px',
                border: '1px solid rgba(124, 255, 107, 0.3)'
              }}>
                <span style={{ fontSize: '0.875rem', color: '#ddd' }}>
                  Potential DR revenue
                </span>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: 'var(--accent-neon-green)',
                  fontFamily: 'monospace'
                }}>
                  +${economics.potentialRevenue.toLocaleString()}
                </span>
              </div>

              {/* Lost Compute Revenue */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                backgroundColor: 'rgba(255, 71, 87, 0.1)',
                borderRadius: '4px',
                border: '1px solid rgba(255, 71, 87, 0.3)'
              }}>
                <span style={{ fontSize: '0.875rem', color: '#ddd' }}>
                  Estimated lost compute revenue
                </span>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: 'var(--error)',
                  fontFamily: 'monospace'
                }}>
                  -${economics.lostComputeRevenue.toLocaleString()}
                </span>
              </div>

              {/* Net Impact */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: economics.netImpact > 0
                  ? 'rgba(124, 255, 107, 0.15)'
                  : 'rgba(255, 71, 87, 0.15)',
                borderRadius: '4px',
                border: economics.netImpact > 0
                  ? '2px solid var(--accent-neon-green)'
                  : '2px solid var(--error)',
                marginTop: '0.25rem'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Net Economic Impact
                </span>
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: economics.netImpact > 0 ? 'var(--accent-neon-green)' : 'var(--error)',
                  fontFamily: 'monospace'
                }}>
                  {economics.netImpact > 0 ? '+' : ''}${economics.netImpact.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Affected Assets */}
      <div>
        <h3 style={{
          fontSize: '0.875rem',
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.75rem'
        }}>
          Affected Assets
        </h3>
        <div style={{
          backgroundColor: '#1e1e1e',
          border: '1px solid #2a2a2a',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #333' }}>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  color: '#888',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Asset
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  color: '#888',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {event.affectedAssets.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index < event.affectedAssets.length - 1 ? '1px solid #2a2a2a' : 'none'
                  }}
                >
                  <td style={{
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontWeight: '500'
                  }}>
                    {item.asset}
                  </td>
                  <td style={{
                    padding: '0.75rem 1rem',
                    color: '#61dafb',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem'
                  }}>
                    {item.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
