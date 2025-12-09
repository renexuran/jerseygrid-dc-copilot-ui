import React from 'react';

const PowerFlowDiagram: React.FC = () => {
  // Consistent energy balance: Sources = Sinks
  // Solar (620) + Diesel (0) + Grid (1800) = Cooling (700) + GPU (1620) + BESS Charging (100)
  // Total: 2,420 kW in = 2,420 kW out
  // Note: Cooling is now flexible (can reduce up to 250 kW)

  const createNodeStyle = (isFlexible: boolean = false): React.CSSProperties => ({
    backgroundColor: 'var(--bg-card)',
    border: isFlexible
      ? '2px solid var(--accent-electric)'
      : '2px solid var(--border-primary)',
    borderRadius: 'var(--radius-md)',
    padding: '1rem 1.5rem',
    minWidth: '140px',
    textAlign: 'center',
    position: 'relative',
    boxShadow: isFlexible ? 'var(--shadow-glow-electric)' : 'var(--shadow-sm)',
    transition: 'all 0.3s ease'
  });

  const arrowStyle: React.CSSProperties = {
    color: 'var(--accent-electric)',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0 0.5rem',
    fontWeight: 'bold'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
    fontWeight: '600'
  };

  const valueStyle = (isFlexible: boolean = false): React.CSSProperties => ({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: isFlexible ? 'var(--accent-electric)' : 'var(--text-primary)',
    fontFamily: 'monospace'
  });

  const sublabelStyle: React.CSSProperties = {
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
    marginTop: '0.35rem'
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: '2rem',
      marginTop: '2rem',
      boxShadow: 'var(--shadow-md)'
    }}>
      <h3 style={{
        fontSize: '1rem',
        color: 'var(--text-primary)',
        marginBottom: '2rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '2px solid var(--border-secondary)',
        paddingBottom: '0.75rem'
      }}>
        ⚡ Real-Time Power Flow
      </h3>

      {/* Top Row - Sources */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Solar PV - Source */}
        <div style={createNodeStyle(false)}>
          <div style={labelStyle}>☀️ Solar PV</div>
          <div style={valueStyle(false)}>620 kW</div>
          <div style={sublabelStyle}>(Generation)</div>
        </div>

        <div style={arrowStyle}>+</div>

        {/* Diesel Generators - Backup Source */}
        <div style={createNodeStyle(false)}>
          <div style={labelStyle}>⚙️ Diesel Generators</div>
          <div style={valueStyle(false)}>0 kW</div>
          <div style={sublabelStyle}>(Backup - Not Running)</div>
        </div>

        <div style={arrowStyle}>+</div>

        {/* Grid - Source */}
        <div style={createNodeStyle(false)}>
          <div style={labelStyle}>🔌 Grid</div>
          <div style={valueStyle(false)}>1,800 kW</div>
          <div style={sublabelStyle}>(Import)</div>
        </div>
      </div>

      {/* Center - Total Flow */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px dashed var(--accent-electric)'
      }}>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem'
        }}>
          Total Available
        </div>
        <div style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'var(--accent-electric)',
          fontFamily: 'monospace'
        }}>
          2,420 kW
        </div>
      </div>

      {/* Arrows down */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        fontSize: '2rem',
        color: 'var(--accent-electric)',
        marginBottom: '2rem'
      }}>
        ↓ ↓ ↓
      </div>

      {/* Bottom Row - Sinks */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        {/* Cooling - Flexible */}
        <div style={createNodeStyle(true)}>
          <div style={labelStyle}>
            ❄️ Cooling
            <span style={{
              marginLeft: '0.5rem',
              padding: '0.15rem 0.4rem',
              backgroundColor: 'rgba(97, 218, 251, 0.2)',
              border: '1px solid var(--accent-electric)',
              borderRadius: '4px',
              fontSize: '0.6rem',
              color: 'var(--accent-electric)',
              fontWeight: 'bold'
            }}>
              FLEXIBLE
            </span>
          </div>
          <div style={valueStyle(true)}>700 kW</div>
          <div style={{ ...sublabelStyle, color: 'var(--accent-neon-green)' }}>
            (450 kW load / 250 kW flexible)
          </div>
        </div>

        {/* GPU Clusters - Flexible */}
        <div style={createNodeStyle(true)}>
          <div style={labelStyle}>🖥️ GPU Clusters</div>
          <div style={valueStyle(true)}>1,620 kW</div>
          <div style={{ ...sublabelStyle, color: 'var(--accent-neon-green)' }}>
            (Flexible)
          </div>
        </div>

        {/* BESS - Flexible */}
        <div style={createNodeStyle(true)}>
          <div style={labelStyle}>🔋 BESS</div>
          <div style={valueStyle(true)}>+100 kW</div>
          <div style={{ ...sublabelStyle, color: 'var(--accent-neon-green)' }}>
            (Charging - Flexible)
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border-secondary)',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        fontSize: '0.75rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '12px',
            height: '12px',
            border: '2px solid var(--accent-electric)',
            borderRadius: '3px'
          }} />
          <span>Flexible / Optimizable</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '12px',
            height: '12px',
            border: '2px solid var(--border-primary)',
            borderRadius: '3px'
          }} />
          <span>Fixed Load</span>
        </div>
      </div>
    </div>
  );
};

export default PowerFlowDiagram;
