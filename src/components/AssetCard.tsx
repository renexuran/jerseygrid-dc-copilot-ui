import React from 'react';

export interface AssetMetric {
  label: string;
  value: string;
  highlight?: boolean;
  status?: 'optimal' | 'warning' | 'critical';
}

interface AssetCardProps {
  title: string;
  metrics: AssetMetric[];
  status?: 'Online' | 'Normal' | 'Warning' | 'Offline';
}

const AssetCard: React.FC<AssetCardProps> = ({ title, metrics, status }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Online':
      case 'Normal':
        return '#00ff88';
      case 'Warning':
        return '#ffd700';
      case 'Offline':
        return '#ff6b6b';
      default:
        return '#888';
    }
  };

  const getMetricStatusColor = (metricStatus?: 'optimal' | 'warning' | 'critical') => {
    switch (metricStatus) {
      case 'optimal':
        return '#00ff88';
      case 'warning':
        return '#ffd700';
      case 'critical':
        return '#ff6b6b';
      default:
        return '#fff';
    }
  };

  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem'
      }}>
        <h3 style={{
          fontSize: '1rem',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          margin: 0,
          fontWeight: '600'
        }}>
          {title}
        </h3>
        {status && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: getStatusColor(status),
              borderRadius: '50%'
            }} />
            <span style={{
              fontSize: '0.75rem',
              color: getStatusColor(status),
              fontWeight: '600'
            }}>
              {status}
            </span>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {metrics.map((metric, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: index < metrics.length - 1 ? '0.75rem' : '0',
            paddingLeft: metric.highlight ? '0.75rem' : '0',
            borderBottom: index < metrics.length - 1 ? '1px solid #2a2a2a' : 'none',
            borderLeft: metric.highlight ? `4px solid ${metric.status ? getMetricStatusColor(metric.status) : '#61dafb'}` : 'none',
            position: 'relative'
          }}>
            <span style={{
              fontSize: '0.75rem',
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {metric.label}
            </span>
            <span style={{
              fontSize: metric.highlight ? '1.25rem' : '0.875rem',
              fontWeight: 'bold',
              color: metric.status ? getMetricStatusColor(metric.status) : (metric.highlight ? '#61dafb' : '#fff'),
              fontFamily: 'monospace'
            }}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetCard;
