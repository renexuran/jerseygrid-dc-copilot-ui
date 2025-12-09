import React, { useState } from 'react';

interface ToggleSwitchProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  defaultChecked = false,
  onChange
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 0',
      borderBottom: '1px solid #2a2a2a'
    }}>
      <label style={{
        fontSize: '0.875rem',
        color: '#ddd',
        cursor: 'pointer',
        flex: 1
      }}>
        {label}
      </label>
      <div
        onClick={handleToggle}
        style={{
          width: '48px',
          height: '24px',
          backgroundColor: checked ? '#61dafb' : '#444',
          borderRadius: '12px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        <div style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: checked ? '26px' : '2px',
          transition: 'left 0.2s'
        }} />
      </div>
    </div>
  );
};

export default ToggleSwitch;
