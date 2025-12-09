import React from 'react';
import KpiCard from '../components/KpiCard';
import SectionCard from '../components/SectionCard';
import ToggleSwitch from '../components/ToggleSwitch';
import ClusterTable from '../components/ClusterTable';

const OptimizationEngine: React.FC = () => {
  // Mock KPI data
  const optimizationKpis = [
    {
      title: 'Expected Energy Cost Today',
      value: '$1,800',
      unit: '',
      subtitle: '↓ $600 vs. baseline'
    },
    {
      title: 'Reduction vs Baseline',
      value: 13.2,
      unit: '%',
      subtitle: 'Cost + carbon optimized'
    },
    {
      title: 'Scheduled Battery Cycling',
      value: 2400,
      unit: 'kWh',
      subtitle: '3 charge/discharge cycles'
    },
    {
      title: 'Shifted GPU Load',
      value: 18,
      unit: '%',
      subtitle: 'Moved to off-peak hours'
    }
  ];

  // Mock cluster data
  const clusterData = [
    {
      name: 'GPU-Cluster-01',
      location: 'Hall A, Row 3',
      flexibility: 'High' as const,
      scheduledWindow: '02:00 - 06:00'
    },
    {
      name: 'GPU-Cluster-02',
      location: 'Hall A, Row 5',
      flexibility: 'High' as const,
      scheduledWindow: '01:00 - 05:00'
    },
    {
      name: 'GPU-Cluster-03',
      location: 'Hall B, Row 1',
      flexibility: 'Medium' as const,
      scheduledWindow: '22:00 - 02:00'
    },
    {
      name: 'GPU-Cluster-04',
      location: 'Hall B, Row 4',
      flexibility: 'Low' as const,
      scheduledWindow: '00:00 - 24:00'
    },
    {
      name: 'GPU-Cluster-05',
      location: 'Hall C, Row 2',
      flexibility: 'Medium' as const,
      scheduledWindow: '03:00 - 07:00'
    }
  ];

  // Mock schedule blocks
  const scheduleBlocks = [
    { time: '00:00', activity: 'Low priority training', color: '#00ff88' },
    { time: '06:00', activity: 'Battery discharge + cooling optimization', color: '#ffd700' },
    { time: '12:00', activity: 'Solar + peak shaving', color: '#61dafb' },
    { time: '18:00', activity: 'Grid peak - battery discharge', color: '#ff6b6b' },
    { time: '22:00', activity: 'Shift workloads to night', color: '#00ff88' }
  ];

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '0.5rem',
          color: '#fff'
        }}>
          Optimization Engine
        </h1>
        <p style={{
          color: '#888',
          fontSize: '0.875rem',
          margin: 0
        }}>
          AI-powered optimization for energy and compute resource allocation. Plan workload scheduling,
          battery cycling, and cooling strategies to minimize costs while respecting SLAs.
        </p>
      </div>

      {/* Optimization Summary KPIs */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{
          fontSize: '1rem',
          color: '#aaa',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '1rem'
        }}>
          Today's Optimization Summary
        </h2>
        <div className="kpi-grid">
          {optimizationKpis.map((kpi, index) => (
            <KpiCard
              key={index}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              subtitle={kpi.subtitle}
            />
          ))}
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div
        className="two-column-layout optimization-bottom-row"
        style={{ marginBottom: '2rem' }}
      >
        {/* Left Column - GPU Schedule */}
        <div
          className="optimization-card gpu-schedule-card"
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: 8,
              border: '1px solid #333',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
          {/* Schedule Overview */}
          <SectionCard title="Schedule Overview">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {scheduleBlocks.map((block, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '6px',
                    border: '1px solid #2a2a2a'
                  }}
                >
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    color: '#61dafb',
                    minWidth: '60px'
                  }}>
                    {block.time}
                  </div>
                  <div style={{
                    width: '4px',
                    height: '30px',
                    backgroundColor: block.color,
                    borderRadius: '2px'
                  }} />
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#ddd',
                    flex: 1
                  }}>
                    {block.activity}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* GPU Clusters Table */}
          <SectionCard title="GPU Cluster Schedule">
            <ClusterTable clusters={clusterData} />
          </SectionCard>
          </div>
        </div>

        {/* Right Column - Control Levers */}
        <div
          className="optimization-card control-levers-card"
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: 8,
              border: '1px solid #333',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h3 style={{
              fontSize: '1rem',
              color: '#fff',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderBottom: '2px solid #333',
              paddingBottom: '0.75rem'
            }}>
              Control Levers
            </h3>
            <div style={{ marginBottom: '2rem' }}>
              <ToggleSwitch
                label="Maximize cost savings"
                defaultChecked={true}
              />
              <ToggleSwitch
                label="Limit CO₂ intensity"
                defaultChecked={true}
              />
              <ToggleSwitch
                label="Respect SLA constraints"
                defaultChecked={true}
              />
              <ToggleSwitch
                label="Enable battery cycling"
                defaultChecked={true}
              />
              <ToggleSwitch
                label="Allow workload shifting"
                defaultChecked={false}
              />
              <ToggleSwitch
                label="Allow diesel dispatch"
                defaultChecked={false}
              />
            </div>

            {/* Cooling Flexibility */}
            <div style={{
              marginBottom: '2rem',
              paddingTop: '1rem',
              borderTop: '2px solid #2a2a2a'
            }}>
              <h4 style={{
                fontSize: '0.75rem',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem'
              }}>
                Cooling Flexibility
              </h4>
              <select
                defaultValue="Medium"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#2a2a2a',
                  color: '#ddd',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div style={{
                fontSize: '0.7rem',
                color: '#666',
                fontStyle: 'italic'
              }}>
                Higher flexibility allows more load reduction from cooling (within comfort/SLA limits).
              </div>
            </div>

            {/* Optimization Parameters */}
            <div style={{
              marginBottom: '2rem',
              paddingTop: '1rem',
              borderTop: '2px solid #2a2a2a'
            }}>
              <h4 style={{
                fontSize: '0.75rem',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}>
                Optimization Horizon
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  backgroundColor: '#1e1e1e',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #2a2a2a'
                }}>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#888',
                    marginBottom: '0.25rem'
                  }}>
                    LOOKAHEAD
                  </div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#fff'
                  }}>
                    24h
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#1e1e1e',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #2a2a2a'
                }}>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#888',
                    marginBottom: '0.25rem'
                  }}>
                    TIMESTEP
                  </div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#fff'
                  }}>
                    15min
                  </div>
                </div>
              </div>
            </div>

            {/* Run Optimization Button */}
            <button
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#61dafb',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4fc3dc';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#61dafb';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onClick={() => console.log('Run optimization clicked')}
            >
              ▶ Run Optimization
            </button>

            {/* Last Run Info */}
            <div style={{
              marginTop: '1rem',
              fontSize: '0.75rem',
              color: '#666',
              textAlign: 'center'
            }}>
              Last run: Today at 14:32 (12 min ago)
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Panel */}
      <SectionCard title="Optimization Status">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#1e1e1e',
          borderRadius: '6px',
          border: '1px solid #2a2a2a'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#00ff88',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '0.875rem',
              color: '#fff',
              marginBottom: '0.25rem',
              fontWeight: '500'
            }}>
              Optimization engine active
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#888'
            }}>
              Monitoring grid prices, weather forecast, and workload queue for real-time adjustments
            </div>
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#61dafb',
            fontFamily: 'monospace'
          }}>
            Next update: 15:00
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default OptimizationEngine;
