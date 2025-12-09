import React from 'react';
import KpiCard from '../components/KpiCard';
import RecommendationCard from '../components/RecommendationCard';
import PowerFlowDiagram from '../components/PowerFlowDiagram';
import ChartPlaceholder from '../components/ChartPlaceholder';
import WorkloadShifter from '../components/WorkloadShifter';

const LiveOperations: React.FC = () => {
  // Mock data
  const kpiData = [
    {
      title: 'Current Total Load',
      value: 2420,
      unit: 'kW',
      subtitle: '↑ 3% vs. last hour'
    },
    {
      title: 'Net Grid Import',
      value: 1800,
      unit: 'kW',
      subtitle: '74% of total load'
    },
    {
      title: 'Battery State of Charge',
      value: 78,
      unit: '%',
      subtitle: 'Charging at 120 kW'
    },
    {
      title: 'CO₂ Intensity',
      value: 342,
      unit: 'gCO₂/kWh',
      subtitle: 'Grid average today'
    },
    {
      title: 'Cooling Flex Capacity',
      value: 250,
      unit: 'kW',
      subtitle: 'Available flexible load from cooling'
    }
  ];

  const recommendations = [
    {
      title: 'Shift GPU Training Job',
      description: 'Move cluster-3 training workload to 2:00-6:00 AM when grid carbon intensity drops below 250 gCO₂/kWh.',
      impactSummary: 'Save $180, reduce 420 kg CO₂'
    },
    {
      title: 'Pre-cool Data Hall 2',
      description: 'Lower setpoint by 1°C now while solar generation is high. Reduce cooling during evening peak hours.',
      impactSummary: 'Save $95 on demand charges'
    },
    {
      title: 'Discharge Battery at 6 PM',
      description: 'Grid peak pricing window starts at 6 PM. Schedule battery discharge to offset 300 kW for 2 hours.',
      impactSummary: 'Save $210 on peak demand'
    },
    {
      title: 'Optimize Chiller Sequencing',
      description: 'Switch to chiller-2 (higher efficiency) as outdoor temp drops below 22°C in next hour.',
      impactSummary: 'Save 45 kW continuous'
    },
    {
      title: 'Enable Free Cooling Mode',
      description: 'Outdoor conditions suitable for economizer mode starting 8 PM. Reduce mechanical cooling load by 30%.',
      impactSummary: 'Save 360 kW for 6 hours'
    }
  ];

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '0.5rem',
          color: 'var(--text-primary)'
        }}>
          Live Operations
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          margin: 0
        }}>
          Real-time monitoring and control of data center operations. View current power consumption,
          cooling efficiency, and actively manage workload distribution across the facility.
        </p>
      </div>

      {/* Today's Recommendations - News Feed at Top */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '2px solid var(--accent-electric)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-glow-electric)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          borderBottom: '2px solid var(--border-secondary)',
          paddingBottom: '1rem'
        }}>
          <div style={{
            fontSize: '1.5rem'
          }}>
            📢
          </div>
          <h3 style={{
            fontSize: '1.1rem',
            color: 'var(--accent-electric)',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 'bold'
          }}>
            Today's Optimization Recommendations
          </h3>
          <div style={{
            marginLeft: 'auto',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-secondary)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            {recommendations.length} active recommendations
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={index}
              title={rec.title}
              description={rec.description}
              impactSummary={rec.impactSummary}
            />
          ))}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            unit={kpi.unit}
            subtitle={kpi.subtitle}
          />
        ))}
      </div>

      {/* 24-Hour Load Profile Chart */}
      <div
        className="card chart-panel chart-container"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-md)',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <h3 style={{
          fontSize: '1rem',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderBottom: '2px solid var(--border-secondary)',
          paddingBottom: '0.75rem'
        }}>
          📊 24-Hour Load Profile
        </h3>

        <ChartPlaceholder
          xLabel="Hours (0-24)"
          yLabel="Load (kW)"
          line1Color="#61dafb"
          line2Color="#ffd700"
          line1Label="Total Load"
          line2Label="Solar PV"
          height={300}
        />
      </div>

      {/* Workload Shifter - Temporal Flexibility */}
      <WorkloadShifter />

      {/* Power Flow Diagram */}
      <PowerFlowDiagram />
    </div>
  );
};

export default LiveOperations;
