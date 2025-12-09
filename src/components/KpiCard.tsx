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
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: `1px solid ${highlight ? 'var(--accent-electric)' : 'var(--border-primary)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '1.5rem',
      flex: 1,
      minWidth: '200px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: highlight ? 'var(--shadow-glow-electric)' : 'var(--shadow-sm)',
      transition: 'all 0.3s ease'
    }}>
      {/* Title at top */}
      <div style={{
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
        marginBottom: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: '600'
      }}>
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
          <span style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: highlight ? 'var(--accent-electric)' : 'var(--text-primary)',
            fontFamily: 'monospace',
            lineHeight: 1
          }}>
            {value}
          </span>
          {unit && (
            <span style={{
              fontSize: '1.125rem',
              color: 'var(--accent-electric)',
              fontWeight: '600'
            }}>
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Subtitle at bottom */}
      {subtitle && (
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          marginTop: '1rem',
          textAlign: 'center'
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
