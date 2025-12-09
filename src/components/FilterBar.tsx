import React from 'react';

interface FilterBarProps {
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange
}) => {
  const categories = ['All', 'Grid DR', 'Internal', 'Maintenance'];
  const statuses = ['All', 'Upcoming', 'Active', 'Resolved'];

  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem'
    }}>
      {/* Category Pills */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          display: 'block',
          fontSize: '0.7rem',
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem'
        }}>
          Category
        </label>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedCategory === category ? '#61dafb' : '#2a2a2a',
                color: selectedCategory === category ? '#000' : '#ddd',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = '#2a2a2a';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Status Dropdown */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.7rem',
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem'
        }}>
          Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#2a2a2a',
            color: '#ddd',
            border: '1px solid #333',
            borderRadius: '6px',
            fontSize: '0.875rem',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
