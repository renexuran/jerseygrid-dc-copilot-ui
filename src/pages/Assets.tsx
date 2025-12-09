import React from 'react';
import AssetCard, { type AssetMetric } from '../components/AssetCard';
import SectionCard from '../components/SectionCard';

const Assets: React.FC = () => {
  // Mock asset data for cards
  const pvAsset: AssetMetric[] = [
    { label: 'Nameplate Capacity', value: '5.87 MW', highlight: true, status: 'optimal' },
    { label: 'Current Output', value: '1.8 MW', status: 'optimal' },
    { label: 'Inverters Online', value: '6 / 6', status: 'optimal' },
    { label: 'Today\'s Generation', value: '18.4 MWh' }
  ];

  const batteryAsset: AssetMetric[] = [
    { label: 'Energy Capacity', value: '3.9 MWh', highlight: true, status: 'optimal' },
    { label: 'Max Charge/Discharge', value: '1.6 MW' },
    { label: 'Current SoC', value: '78%', status: 'optimal' },
    { label: 'Charging at', value: '120 kW' }
  ];

  const coolingAsset: AssetMetric[] = [
    { label: 'Cooling Capacity', value: '1.2 MW', highlight: true, status: 'optimal' },
    { label: 'Current Load', value: '800 kW', status: 'optimal' },
    { label: 'Flexibility', value: 'Medium', status: 'optimal' },
    { label: 'Max Curtailment', value: 'Up to 250 kW', status: 'optimal' }
  ];

  const gpuAsset: AssetMetric[] = [
    { label: 'Total GPUs', value: '2,048', highlight: true, status: 'optimal' },
    { label: 'Active Clusters', value: '4 / 5', status: 'optimal' },
    { label: 'Power Draw', value: '3.8 MW', status: 'warning' },
    { label: 'Avg. Utilization', value: '84%', status: 'optimal' }
  ];

  const dieselAsset: AssetMetric[] = [
    { label: 'Installed Capacity', value: '1.2 MW', highlight: true, status: 'optimal' },
    { label: 'Available Capacity', value: '1.0 MW', status: 'optimal' },
    { label: 'Fuel Cost', value: '$0.25/kWh', status: 'warning' },
    { label: 'CO₂ Intensity', value: '0.7 tCO₂/MWh', status: 'warning' }
  ];

  // Mock GPU Clusters table data
  const gpuClusters = [
    { name: 'GPU-Cluster-01', role: 'Training', power: 980, flexibility: 'High' },
    { name: 'GPU-Cluster-02', role: 'Training', power: 950, flexibility: 'High' },
    { name: 'GPU-Cluster-03', role: 'Inference', power: 720, flexibility: 'Medium' },
    { name: 'GPU-Cluster-04', role: 'Mixed', power: 890, flexibility: 'Low' },
    { name: 'GPU-Cluster-05', role: 'Standby', power: 0, flexibility: 'High' }
  ];

  // Mock Battery Racks table data
  const batteryRacks = [
    { id: 'BESS-Rack-01', capacity: 975, soc: 78, status: 'Charging' },
    { id: 'BESS-Rack-02', capacity: 975, soc: 78, status: 'Charging' },
    { id: 'BESS-Rack-03', capacity: 975, soc: 79, status: 'Charging' },
    { id: 'BESS-Rack-04', capacity: 975, soc: 77, status: 'Charging' }
  ];

  const getFlexibilityColor = (flexibility: string) => {
    switch (flexibility) {
      case 'High': return '#00ff88';
      case 'Medium': return '#ffd700';
      case 'Low': return '#ff6b6b';
      default: return '#888';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Charging': return '#00ff88';
      case 'Discharging': return '#61dafb';
      case 'Idle': return '#888';
      default: return '#888';
    }
  };

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '0.5rem',
          color: '#fff'
        }}>
          Assets
        </h1>
        <p style={{
          color: '#888',
          fontSize: '0.875rem',
          margin: 0
        }}>
          Overview of energy, cooling and compute assets at the JerseyGrid site.
        </p>
      </div>

      {/* Asset Summary Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <AssetCard title="PV Array" metrics={pvAsset} status="Online" />
        <AssetCard title="Battery Energy Storage" metrics={batteryAsset} status="Normal" />
        <AssetCard title="Cooling System" metrics={coolingAsset} status="Normal" />
        <AssetCard title="GPU Clusters" metrics={gpuAsset} status="Online" />
        <AssetCard title="Diesel Generators" metrics={dieselAsset} status="Normal" />

        {/* Upgrade Considerations Tile */}
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '2px solid var(--warning)',
          borderRadius: '8px',
          padding: '1rem',
          boxShadow: '0 0 15px rgba(255, 184, 0, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #333'
          }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <h3 style={{
              fontSize: '1rem',
              color: 'var(--warning)',
              margin: 0,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Upgrade Considerations
            </h3>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {/* Upgrade Item 1 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#1e1e1e',
              borderRadius: '4px',
              border: '1px solid #2a2a2a'
            }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: 'var(--warning)',
                padding: '0.15rem 0.4rem',
                borderRadius: '3px',
                minWidth: '45px',
                textAlign: 'center'
              }}>
                BESS
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: '#ddd',
                lineHeight: '1.4'
              }}>
                Rack B3 efficiency degraded 12%
              </span>
            </div>

            {/* Upgrade Item 2 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#1e1e1e',
              borderRadius: '4px',
              border: '1px solid #2a2a2a'
            }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: 'var(--warning)',
                padding: '0.15rem 0.4rem',
                borderRadius: '3px',
                minWidth: '45px',
                textAlign: 'center'
              }}>
                GPU
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: '#ddd',
                lineHeight: '1.4'
              }}>
                Cluster C: 2-gen old hardware
              </span>
            </div>

            {/* Upgrade Item 3 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#1e1e1e',
              borderRadius: '4px',
              border: '1px solid #2a2a2a'
            }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: 'var(--warning)',
                padding: '0.15rem 0.4rem',
                borderRadius: '3px',
                minWidth: '45px',
                textAlign: 'center'
              }}>
                COOL
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: '#ddd',
                lineHeight: '1.4'
              }}>
                Chiller-2: High energy use
              </span>
            </div>

            {/* Upgrade Item 4 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#1e1e1e',
              borderRadius: '4px',
              border: '1px solid #2a2a2a'
            }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: 'var(--warning)',
                padding: '0.15rem 0.4rem',
                borderRadius: '3px',
                minWidth: '45px',
                textAlign: 'center'
              }}>
                PV
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: '#ddd',
                lineHeight: '1.4'
              }}>
                Inverter SI-3: Recurring faults
              </span>
            </div>

            {/* Upgrade Item 5 - Diesel */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#1e1e1e',
              borderRadius: '4px',
              border: '1px solid #2a2a2a'
            }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: 'var(--warning)',
                padding: '0.15rem 0.4rem',
                borderRadius: '3px',
                minWidth: '45px',
                textAlign: 'center'
              }}>
                DIESEL
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: '#ddd',
                lineHeight: '1.4'
              }}>
                Hybridization or partial replacement to reduce emissions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* GPU Clusters Table */}
        <SectionCard title="GPU Clusters Detail">
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #333' }}>
                  <th style={{
                    textAlign: 'left',
                    padding: '0.75rem 0.5rem',
                    color: '#888',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Cluster
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '0.75rem 0.5rem',
                    color: '#888',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Role
                  </th>
                  <th style={{
                    textAlign: 'right',
                    padding: '0.75rem 0.5rem',
                    color: '#888',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Power (kW)
                  </th>
                  <th style={{
                    textAlign: 'center',
                    padding: '0.75rem 0.5rem',
                    color: '#888',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Flexibility
                  </th>
                </tr>
              </thead>
              <tbody>
                {gpuClusters.map((cluster, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: '1px solid #2a2a2a',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#222'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{
                      padding: '0.75rem 0.5rem',
                      color: '#fff',
                      fontWeight: '500'
                    }}>
                      {cluster.name}
                    </td>
                    <td style={{
                      padding: '0.75rem 0.5rem',
                      color: '#aaa'
                    }}>
                      {cluster.role}
                    </td>
                    <td style={{
                      padding: '0.75rem 0.5rem',
                      color: '#fff',
                      textAlign: 'right',
                      fontFamily: 'monospace'
                    }}>
                      {cluster.power.toLocaleString()}
                    </td>
                    <td style={{
                      padding: '0.75rem 0.5rem',
                      textAlign: 'center'
                    }}>
                      <span style={{
                        color: getFlexibilityColor(cluster.flexibility),
                        fontWeight: '600',
                        fontSize: '0.75rem'
                      }}>
                        {cluster.flexibility}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Battery Racks Table */}
        <SectionCard title="Battery Racks">
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #333' }}>
                  <th style={{
                    textAlign: 'left',
                    padding: '0.75rem 0.5rem',
                    color: '#888',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Rack ID
                  </th>
                  <th style={{
                    textAlign: 'right',
                    padding: '0.75rem 0.5rem',
                    color: '#888',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Capacity (kWh)
                  </th>
                  <th style={{
                    textAlign: 'right',
                    padding: '0.75rem 0.5rem',
                    color: '#888',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    SoC (%)
                  </th>
                  <th style={{
                    textAlign: 'center',
                    padding: '0.75rem 0.5rem',
                    color: '#888',
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {batteryRacks.map((rack, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: '1px solid #2a2a2a',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#222'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{
                      padding: '0.75rem 0.5rem',
                      color: '#fff',
                      fontWeight: '500'
                    }}>
                      {rack.id}
                    </td>
                    <td style={{
                      padding: '0.75rem 0.5rem',
                      color: '#fff',
                      textAlign: 'right',
                      fontFamily: 'monospace'
                    }}>
                      {rack.capacity.toLocaleString()}
                    </td>
                    <td style={{
                      padding: '0.75rem 0.5rem',
                      color: '#61dafb',
                      textAlign: 'right',
                      fontFamily: 'monospace',
                      fontWeight: '600'
                    }}>
                      {rack.soc}%
                    </td>
                    <td style={{
                      padding: '0.75rem 0.5rem',
                      textAlign: 'center'
                    }}>
                      <span style={{
                        color: getStatusColor(rack.status),
                        fontWeight: '600',
                        fontSize: '0.75rem'
                      }}>
                        {rack.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default Assets;
