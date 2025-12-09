import React, { useState } from 'react';
import SectionCard from '../components/SectionCard';
import ScenarioKpiCard from '../components/ScenarioKpiCard';

interface ScenarioInputs {
  name: string;
  priceProfile: string;
  loadProfile: string;
  pvAvailability: string;
  batteryCycling: string;
  coolingFlexibility: string;
  allowGpuShifting: boolean;
  limitCO2: boolean;
}

interface ScenarioResults {
  dailyCost: number;
  costVsBaseline: number;
  avgCO2: number;
  batteryThroughput: number;
  keyChanges: string[];
}

const ScenarioStudio: React.FC = () => {
  const [inputs, setInputs] = useState<ScenarioInputs>({
    name: 'Base Scenario',
    priceProfile: 'Base case',
    loadProfile: 'Normal',
    pvAvailability: 'Sunny',
    batteryCycling: 'Medium',
    coolingFlexibility: 'Balanced',
    allowGpuShifting: false,
    limitCO2: false
  });

  const [results, setResults] = useState<ScenarioResults | null>(null);

  // Mock calculation logic based on inputs
  const calculateScenario = (): ScenarioResults => {
    let baseCost = 8500;
    let baseCO2 = 380;
    let batteryThroughput = 1200;
    const changes: string[] = [];

    // Price profile impact
    if (inputs.priceProfile === 'High peak prices') {
      baseCost *= 1.25;
      changes.push('Increased cost due to high peak prices (+25%)');
    } else if (inputs.priceProfile === 'Low off-peak prices') {
      baseCost *= 0.85;
      changes.push('Reduced cost with favorable off-peak rates (-15%)');
    }

    // Load profile impact
    if (inputs.loadProfile === 'High AI training load') {
      baseCost *= 1.15;
      baseCO2 *= 1.12;
      changes.push('Higher energy consumption from AI training workloads');
    } else if (inputs.loadProfile === 'Weekend profile') {
      baseCost *= 0.7;
      baseCO2 *= 0.75;
      changes.push('Reduced load during weekend operations');
    }

    // PV availability impact
    if (inputs.pvAvailability === 'Sunny') {
      baseCost *= 0.88;
      baseCO2 *= 0.82;
      changes.push('Maximized solar generation reducing grid dependence');
    } else if (inputs.pvAvailability === 'Cloudy') {
      baseCost *= 1.08;
      baseCO2 *= 1.15;
      changes.push('Reduced solar output increasing grid imports');
    } else if (inputs.pvAvailability === 'Low insolation') {
      baseCost *= 1.18;
      baseCO2 *= 1.25;
      changes.push('Minimal solar generation, heavy grid reliance');
    }

    // Battery cycling impact
    if (inputs.batteryCycling === 'High') {
      baseCost *= 0.92;
      batteryThroughput = 2400;
      changes.push('Aggressive battery cycling for peak shaving (2,400 kWh)');
    } else if (inputs.batteryCycling === 'Low') {
      baseCost *= 1.05;
      batteryThroughput = 600;
      changes.push('Conservative battery usage (600 kWh)');
    } else {
      batteryThroughput = 1200;
      changes.push('Moderate battery cycling for cost optimization');
    }

    // GPU shifting impact
    if (inputs.allowGpuShifting) {
      baseCost *= 0.87;
      baseCO2 *= 0.91;
      changes.push('Shifted 20% of GPU load to off-peak hours');
    }

    // Cooling flexibility impact
    if (inputs.coolingFlexibility === 'Aggressive') {
      baseCost *= 0.94;
      changes.push('Cooling load aggressively flexed during peak hours to reduce cost');
    } else if (inputs.coolingFlexibility === 'Conservative') {
      baseCost *= 0.99;
      changes.push('Minimal cooling flexibility used to ensure comfort');
    } else {
      changes.push('Balanced cooling flexibility providing moderate DR capacity');
    }

    // CO2 limit impact
    if (inputs.limitCO2) {
      baseCO2 = Math.min(baseCO2, 320);
      baseCost *= 1.08;
      changes.push('Applied CO₂ constraint (max 320 gCO₂/kWh)');
    }

    const costVsBaseline = ((baseCost - 8500) / 8500) * 100;

    return {
      dailyCost: Math.round(baseCost),
      costVsBaseline: Math.round(costVsBaseline * 10) / 10,
      avgCO2: Math.round(baseCO2),
      batteryThroughput,
      keyChanges: changes.length > 0 ? changes : ['No changes from baseline scenario']
    };
  };

  const handleRunScenario = () => {
    const scenarioResults = calculateScenario();
    setResults(scenarioResults);
  };

  const handleInputChange = (field: keyof ScenarioInputs, value: string | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem',
    backgroundColor: '#2a2a2a',
    color: '#ddd',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '0.875rem',
    outline: 'none'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem'
  };

  // Dropdown options with icons and descriptions
  const priceProfileOptions = [
    { value: 'Base case', icon: '⚡', description: 'Standard utility pricing' },
    { value: 'High peak prices', icon: '📈', description: 'Stress test peak demand costs' },
    { value: 'Low off-peak prices', icon: '📉', description: 'Favorable off-peak rates' }
  ];

  const loadProfileOptions = [
    { value: 'Normal', icon: '💻', description: 'Typical datacenter operations' },
    { value: 'High AI training load', icon: '🚀', description: 'Heavy GPU utilization' },
    { value: 'Weekend profile', icon: '📅', description: 'Reduced weekend activity' }
  ];

  const pvAvailabilityOptions = [
    { value: 'Sunny', icon: '☀️', description: 'Maximum solar generation' },
    { value: 'Cloudy', icon: '⛅', description: 'Partial solar output' },
    { value: 'Low insolation', icon: '☁️', description: 'Minimal solar contribution' }
  ];

  const batteryCyclingOptions = [
    { value: 'Low', icon: '🔋', description: 'Conservative cycling (600 kWh)' },
    { value: 'Medium', icon: '🔋', description: 'Balanced approach (1,200 kWh)' },
    { value: 'High', icon: '🔋', description: 'Aggressive cycling (2,400 kWh)' }
  ];

  const coolingFlexibilityOptions = [
    { value: 'Conservative', icon: '🧊', description: 'Minimal flexibility (50 kW curtailment max)' },
    { value: 'Balanced', icon: '🧊', description: 'Moderate flexibility (150 kW curtailment)' },
    { value: 'Aggressive', icon: '🧊', description: 'Max flexibility (250 kW curtailment)' }
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
          Scenario Studio
        </h1>
        <p style={{
          color: '#888',
          fontSize: '0.875rem',
          margin: 0
        }}>
          Compare what-if scenarios for prices, load, and asset constraints. Model different operating conditions
          to optimize costs and carbon intensity.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="two-column-layout scenario-layout">
        {/* LEFT COLUMN - Scenario Inputs */}
        <SectionCard title="Scenario Inputs">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {/* Scenario Name */}
            <div>
              <label style={labelStyle}>Scenario Name</label>
              <input
                type="text"
                value={inputs.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={inputStyle}
                placeholder="Enter scenario name..."
              />
            </div>

            {/* Price Profile */}
            <div>
              <label style={labelStyle}>Price Profile</label>
              <select
                value={inputs.priceProfile}
                onChange={(e) => handleInputChange('priceProfile', e.target.value)}
                style={{
                  ...inputStyle,
                  padding: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.borderColor = '#61dafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2a2a2a';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                {priceProfileOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.icon} {opt.value}
                  </option>
                ))}
              </select>
              <div style={{
                fontSize: '0.7rem',
                color: '#666',
                marginTop: '0.35rem',
                fontStyle: 'italic'
              }}>
                {priceProfileOptions.find(o => o.value === inputs.priceProfile)?.description}
              </div>
            </div>

            {/* Load Profile */}
            <div>
              <label style={labelStyle}>Load Profile</label>
              <select
                value={inputs.loadProfile}
                onChange={(e) => handleInputChange('loadProfile', e.target.value)}
                style={{
                  ...inputStyle,
                  padding: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.borderColor = '#61dafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2a2a2a';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                {loadProfileOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.icon} {opt.value}
                  </option>
                ))}
              </select>
              <div style={{
                fontSize: '0.7rem',
                color: '#666',
                marginTop: '0.35rem',
                fontStyle: 'italic'
              }}>
                {loadProfileOptions.find(o => o.value === inputs.loadProfile)?.description}
              </div>
            </div>

            {/* PV Availability */}
            <div>
              <label style={labelStyle}>PV Availability</label>
              <select
                value={inputs.pvAvailability}
                onChange={(e) => handleInputChange('pvAvailability', e.target.value)}
                style={{
                  ...inputStyle,
                  padding: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.borderColor = '#61dafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2a2a2a';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                {pvAvailabilityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.icon} {opt.value}
                  </option>
                ))}
              </select>
              <div style={{
                fontSize: '0.7rem',
                color: '#666',
                marginTop: '0.35rem',
                fontStyle: 'italic'
              }}>
                {pvAvailabilityOptions.find(o => o.value === inputs.pvAvailability)?.description}
              </div>
            </div>

            {/* Battery Cycling */}
            <div>
              <label style={labelStyle}>Allowed Battery Cycling</label>
              <select
                value={inputs.batteryCycling}
                onChange={(e) => handleInputChange('batteryCycling', e.target.value)}
                style={{
                  ...inputStyle,
                  padding: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.borderColor = '#61dafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2a2a2a';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                {batteryCyclingOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.icon} {opt.value}
                  </option>
                ))}
              </select>
              <div style={{
                fontSize: '0.7rem',
                color: '#666',
                marginTop: '0.35rem',
                fontStyle: 'italic'
              }}>
                {batteryCyclingOptions.find(o => o.value === inputs.batteryCycling)?.description}
              </div>
            </div>

            {/* Cooling Flexibility Strategy */}
            <div>
              <label style={labelStyle}>Cooling Flexibility Strategy</label>
              <select
                value={inputs.coolingFlexibility}
                onChange={(e) => handleInputChange('coolingFlexibility', e.target.value)}
                style={{
                  ...inputStyle,
                  padding: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.borderColor = '#61dafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2a2a2a';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                {coolingFlexibilityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.icon} {opt.value}
                  </option>
                ))}
              </select>
              <div style={{
                fontSize: '0.7rem',
                color: '#666',
                marginTop: '0.35rem',
                fontStyle: 'italic'
              }}>
                {coolingFlexibilityOptions.find(o => o.value === inputs.coolingFlexibility)?.description}
              </div>
            </div>

            {/* Checkboxes */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid #2a2a2a'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#ddd'
              }}>
                <input
                  type="checkbox"
                  checked={inputs.allowGpuShifting}
                  onChange={(e) => handleInputChange('allowGpuShifting', e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <span>Allow shifting non-critical GPU loads</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#ddd'
              }}>
                <input
                  type="checkbox"
                  checked={inputs.limitCO2}
                  onChange={(e) => handleInputChange('limitCO2', e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <span>Limit CO₂ intensity below 320 gCO₂/kWh</span>
              </label>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunScenario}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.875rem',
                backgroundColor: '#61dafb',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
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
            >
              ▶ Run Scenario
            </button>
          </div>
        </SectionCard>

        {/* RIGHT COLUMN - Scenario Results */}
        <SectionCard title="Scenario Results">
          {results ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* KPI Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <ScenarioKpiCard
                  label="Estimated Daily Cost"
                  value={`$${results.dailyCost.toLocaleString()}`}
                  delta={`${results.costVsBaseline > 0 ? '+' : ''}${results.costVsBaseline}% vs baseline`}
                  deltaColor={results.costVsBaseline < 0 ? 'positive' : 'negative'}
                />
                <ScenarioKpiCard
                  label="Avg. CO₂ Intensity"
                  value={`${results.avgCO2}`}
                  delta="gCO₂/kWh"
                  deltaColor="neutral"
                />
                <ScenarioKpiCard
                  label="Battery Throughput"
                  value={`${results.batteryThroughput.toLocaleString()}`}
                  delta="kWh cycled"
                  deltaColor="neutral"
                />
                <ScenarioKpiCard
                  label="Cost vs Baseline"
                  value={`${results.costVsBaseline > 0 ? '+' : ''}${results.costVsBaseline}%`}
                  delta={results.costVsBaseline < 0 ? 'Savings' : 'Increase'}
                  deltaColor={results.costVsBaseline < 0 ? 'positive' : 'negative'}
                />
              </div>

              {/* Key Changes */}
              <div style={{
                backgroundColor: '#1e1e1e',
                border: '1px solid #2a2a2a',
                borderRadius: '6px',
                padding: '1rem'
              }}>
                <h4 style={{
                  fontSize: '0.75rem',
                  color: '#888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0,
                  marginBottom: '1rem'
                }}>
                  Key Changes vs Baseline
                </h4>
                <ul style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  color: '#ddd',
                  fontSize: '0.875rem',
                  lineHeight: '1.8'
                }}>
                  {results.keyChanges.map((change, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem 1rem',
              gap: '1rem'
            }}>
              <div style={{ fontSize: '3rem', opacity: 0.3 }}>⚙️</div>
              <div style={{
                fontSize: '1rem',
                color: '#666',
                textAlign: 'center'
              }}>
                Configure inputs and click "Run Scenario" to see results
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
};

export default ScenarioStudio;
