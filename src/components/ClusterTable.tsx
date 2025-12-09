import React from 'react';

interface ClusterData {
  name: string;
  location: string;
  flexibility: 'High' | 'Medium' | 'Low';
  scheduledWindow: string;
}

interface ClusterTableProps {
  clusters: ClusterData[];
}

const ClusterTable: React.FC<ClusterTableProps> = ({ clusters }) => {
  const getFlexibilityColor = (flexibility: string) => {
    switch (flexibility) {
      case 'High': return '#00ff88';
      case 'Medium': return '#ffd700';
      case 'Low': return '#ff6b6b';
      default: return '#888';
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.875rem'
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{
              textAlign: 'left',
              padding: '0.75rem 0.5rem',
              color: '#888',
              fontWeight: '600',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Cluster
            </th>
            <th style={{
              textAlign: 'left',
              padding: '0.75rem 0.5rem',
              color: '#888',
              fontWeight: '600',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Location
            </th>
            <th style={{
              textAlign: 'left',
              padding: '0.75rem 0.5rem',
              color: '#888',
              fontWeight: '600',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Flexibility
            </th>
            <th style={{
              textAlign: 'left',
              padding: '0.75rem 0.5rem',
              color: '#888',
              fontWeight: '600',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Scheduled Window
            </th>
          </tr>
        </thead>
        <tbody>
          {clusters.map((cluster, index) => (
            <tr
              key={index}
              style={{
                borderBottom: '1px solid #2a2a2a',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#222'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <td style={{
                padding: '0.75rem 0.5rem',
                color: '#fff',
                fontWeight: '500'
              }}>
                {cluster.name}
              </td>
              <td style={{
                padding: '0.75rem 0.5rem',
                color: '#aaa'
              }}>
                {cluster.location}
              </td>
              <td style={{
                padding: '0.75rem 0.5rem'
              }}>
                <span style={{
                  color: getFlexibilityColor(cluster.flexibility),
                  fontWeight: '500'
                }}>
                  {cluster.flexibility}
                </span>
              </td>
              <td style={{
                padding: '0.75rem 0.5rem',
                color: '#aaa',
                fontFamily: 'monospace'
              }}>
                {cluster.scheduledWindow}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClusterTable;
