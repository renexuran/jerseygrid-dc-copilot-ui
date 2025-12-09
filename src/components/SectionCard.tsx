import React from 'react';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  maxHeight?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children, maxHeight }) => {
  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1.5rem',
      ...(maxHeight && { maxHeight, overflowY: 'auto' })
    }}>
      <h3 style={{
        fontSize: '1rem',
        color: '#fff',
        marginBottom: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginTop: 0
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
};

export default SectionCard;
