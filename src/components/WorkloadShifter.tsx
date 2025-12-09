import React, { useState } from 'react';

const WorkloadShifter: React.FC = () => {
  // Initial workload pattern (24 hours, values 0-1.2)
  // Higher values during business hours, lower at night
  const initialWorkload = [
    0.3, 0.2, 0.2, 0.1, 0.1, 0.2, // 00:00-05:00
    0.4, 0.6, 0.8, 0.9, 1.0, 1.1, // 06:00-11:00
    1.2, 1.1, 1.0, 0.9, 0.8, 0.7, // 12:00-17:00
    0.6, 0.5, 0.4, 0.4, 0.3, 0.3  // 18:00-23:00
  ];

  const [workload, setWorkload] = useState<number[]>(initialWorkload);

  // Shift Left: Move workload earlier (rotate array left)
  const shiftLeft = () => {
    setWorkload(prev => {
      const shifted = [...prev];
      const first = shifted.shift()!;
      shifted.push(first);
      return shifted;
    });
  };

  // Shift Right: Move workload later (rotate array right)
  const shiftRight = () => {
    setWorkload(prev => {
      const shifted = [...prev];
      const last = shifted.pop()!;
      shifted.unshift(last);
      return shifted;
    });
  };

  // Flatten Peaks: Reduce variance by averaging
  const flattenPeaks = () => {
    setWorkload(prev => {
      const avg = prev.reduce((sum, val) => sum + val, 0) / prev.length;
      return prev.map(val => {
        // Move each value 30% closer to average
        return val + (avg - val) * 0.3;
      });
    });
  };

  // Night Mode: Shift workload to 20:00-06:00
  const nightMode = () => {
    setWorkload(prev => {
      const totalLoad = prev.reduce((sum, val) => sum + val, 0);
      const newWorkload = new Array(24).fill(0.1);

      // Distribute load across night hours (20:00-06:00)
      const nightHours = [20, 21, 22, 23, 0, 1, 2, 3, 4, 5];
      const loadPerHour = (totalLoad - 24 * 0.1) / nightHours.length;

      nightHours.forEach(hour => {
        newWorkload[hour] = 0.1 + loadPerHour;
      });

      return newWorkload;
    });
  };

  // Reset to initial
  const reset = () => {
    setWorkload(initialWorkload);
  };

  // Calculate max for scaling
  const maxWorkload = Math.max(...workload, 1.2);

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      marginBottom: '2rem',
      boxShadow: 'var(--shadow-md)'
    }}>
      {/* Header */}
      <h3 style={{
        fontSize: '1rem',
        color: 'var(--text-primary)',
        marginBottom: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '2px solid var(--border-secondary)',
        paddingBottom: '0.75rem'
      }}>
        ⚡ Temporal Flexibility (Workload Shifting)
      </h3>

      {/* Timeline Visual */}
      <div style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#0a0a0a',
        borderRadius: '8px',
        border: '1px solid #2a2a2a'
      }}>
        {/* Hour labels */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.65rem',
          color: '#666'
        }}>
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>

        {/* Workload bars */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '2px',
          height: '120px',
          backgroundColor: '#000',
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #1a1a1a'
        }}>
          {workload.map((value, index) => {
            const height = (value / maxWorkload) * 100;
            const isNight = index >= 20 || index < 6;
            const isPeak = value > 0.9;

            return (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: `${height}%`,
                  backgroundColor: isPeak
                    ? 'var(--error)'
                    : isNight
                      ? 'var(--accent-neon-green)'
                      : 'var(--accent-electric)',
                  borderRadius: '2px 2px 0 0',
                  transition: 'height 0.4s ease, background-color 0.4s ease',
                  minHeight: '2px',
                  position: 'relative',
                  opacity: 0.85
                }}
                title={`Hour ${index}: ${value.toFixed(2)}`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginTop: '0.75rem',
          fontSize: '0.7rem',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: 'var(--accent-electric)',
              borderRadius: '2px'
            }} />
            <span style={{ color: '#aaa' }}>Day Hours</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: 'var(--accent-neon-green)',
              borderRadius: '2px'
            }} />
            <span style={{ color: '#aaa' }}>Night Hours</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: 'var(--error)',
              borderRadius: '2px'
            }} />
            <span style={{ color: '#aaa' }}>Peak Load</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={shiftLeft}
          style={{
            padding: '0.75rem',
            backgroundColor: '#2a2a2a',
            color: '#ddd',
            border: '1px solid #333',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333';
            e.currentTarget.style.borderColor = 'var(--accent-electric)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2a2a';
            e.currentTarget.style.borderColor = '#333';
          }}
        >
          ← Shift Left
        </button>

        <button
          onClick={shiftRight}
          style={{
            padding: '0.75rem',
            backgroundColor: '#2a2a2a',
            color: '#ddd',
            border: '1px solid #333',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333';
            e.currentTarget.style.borderColor = 'var(--accent-electric)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2a2a';
            e.currentTarget.style.borderColor = '#333';
          }}
        >
          Shift Right →
        </button>

        <button
          onClick={flattenPeaks}
          style={{
            padding: '0.75rem',
            backgroundColor: '#2a2a2a',
            color: '#ddd',
            border: '1px solid #333',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333';
            e.currentTarget.style.borderColor = 'var(--warning)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2a2a';
            e.currentTarget.style.borderColor = '#333';
          }}
        >
          ⬌ Flatten Peaks
        </button>

        <button
          onClick={nightMode}
          style={{
            padding: '0.75rem',
            backgroundColor: '#2a2a2a',
            color: '#ddd',
            border: '1px solid #333',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333';
            e.currentTarget.style.borderColor = 'var(--accent-neon-green)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2a2a';
            e.currentTarget.style.borderColor = '#333';
          }}
        >
          🌙 Night Mode
        </button>

        <button
          onClick={reset}
          style={{
            padding: '0.75rem',
            backgroundColor: '#1e1e1e',
            color: '#888',
            border: '1px solid #2a2a2a',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2a2a';
            e.currentTarget.style.color = '#ddd';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1e1e1e';
            e.currentTarget.style.color = '#888';
          }}
        >
          ↺ Reset
        </button>
      </div>

      {/* Info text */}
      <div style={{
        fontSize: '0.7rem',
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
        padding: '0.5rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '4px',
        border: '1px solid #2a2a2a'
      }}>
        Interactive demo: Shift GPU training workloads to optimize for cost, carbon, or grid constraints
      </div>
    </div>
  );
};

export default WorkloadShifter;
