import React from 'react';

interface KpiCardProps {
  title: string;
  value: number | string;
  unit: string;
  subtitle?: string;
  highlight?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, unit, subtitle, highlight = false }) => {
  return (
    <div
      className="card kpi-card"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: `1px solid ${highlight ? 'var(--accent-electric)' : 'var(--border-primary)'}`,
        borderRadius: 'var(--radius-md)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: highlight ? 'var(--shadow-glow-electric)' : 'var(--shadow-sm)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Title at top */}
      <div
        className="kpi-title"
        style={{
          marginBottom: '1rem'
        }}
      >
        {title}
      </div>

      {/* Value block - centered */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          <span
            className="kpi-value"
            style={{
              color: highlight ? 'var(--accent-electric)' : 'var(--text-primary)'
            }}
          >
            {value}
          </span>
          {unit && (
            <span className="kpi-unit">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Subtitle at bottom */}
      {subtitle && (
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginTop: '1rem',
            textAlign: 'center'
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
