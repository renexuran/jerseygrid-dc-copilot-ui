import React from 'react';

interface RecommendationCardProps {
  title: string;
  description: string;
  impactSummary: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  impactSummary
}) => {
  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      transition: 'border-color 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#61dafb'}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
    >
      <div style={{
        fontSize: '0.875rem',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '0.5rem'
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: '#aaa',
        marginBottom: '0.75rem',
        lineHeight: '1.4'
      }}>
        {description}
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: '#61dafb',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        <span style={{ fontSize: '1rem' }}>💡</span>
        {impactSummary}
      </div>
    </div>
  );
};

export default RecommendationCard;
