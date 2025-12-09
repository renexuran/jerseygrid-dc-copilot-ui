import React from 'react';

interface ScenarioKpiCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaColor?: 'positive' | 'negative' | 'neutral';
}

const ScenarioKpiCard: React.FC<ScenarioKpiCardProps> = ({
  label,
  value,
  delta,
  deltaColor = 'neutral'
}) => {
  const getDeltaColor = () => {
    switch (deltaColor) {
      case 'positive': return '#00ff88';
      case 'negative': return '#ff6b6b';
      case 'neutral': return '#888';
      default: return '#888';
    }
  };

  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      border: '1px solid #2a2a2a',
      borderRadius: '6px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{
        fontSize: '0.7rem',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'monospace'
      }}>
        {value}
      </div>
      {delta && (
        <div style={{
          fontSize: '0.75rem',
          color: getDeltaColor(),
          fontWeight: '600'
        }}>
          {delta}
        </div>
      )}
    </div>
  );
};

export default ScenarioKpiCard;
