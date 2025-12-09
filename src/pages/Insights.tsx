import React, { useState } from 'react';
import KpiCard from '../components/KpiCard';
import SectionCard from '../components/SectionCard';
import ToggleSwitch from '../components/ToggleSwitch';
import ChartPlaceholder from '../components/ChartPlaceholder';

// Type definitions
type TimeRange = '7d' | '30d' | '90d' | 'ytd' | '1y';

interface PerformanceMetrics {
  totalEnergyCost: number;
  costSavings: number;
  costSavingsPercent: number;
  totalEnergyConsumed: number; // MWh
  avgPUE: number;
  avgCarbonIntensity: number; // gCO2/kWh
  carbonReduction: number; // kg CO2 avoided
  solarContribution: number; // %
  batteryThroughput: number; // MWh
  peakDemandReduction: number; // kW
}

interface TrendDataPoint {
  date: string;
  energyCost: number;
  energyConsumed: number;
  carbonIntensity: number;
  pue: number;
  solarGeneration: number;
  batteryUsage: number;
  savingsAmount?: number;
  savingsPercent?: number;
}

interface PeriodPerformance {
  period: string;
  energyCost: number;
  energyConsumed: number;
  avgPUE: number;
  carbonIntensity: number;
  costVsBaseline: number;
  topOptimization: string;
}

const Insights: React.FC = () => {
  // State management
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('30d');
  const [showCostTrend, setShowCostTrend] = useState(true);
  const [showCarbonTrend, setShowCarbonTrend] = useState(true);
  const [showPUETrend, setShowPUETrend] = useState(true);
  const [showSolarTrend, setShowSolarTrend] = useState(true);

  // Mock data generation functions
  const generateMetrics = (timeRange: TimeRange): PerformanceMetrics => {
    const baseMetrics: Record<TimeRange, PerformanceMetrics> = {
      '7d': {
        totalEnergyCost: 13500,
        costSavings: 24000,
        costSavingsPercent: 64.0,
        totalEnergyConsumed: 860,
        avgPUE: 1.22,
        avgCarbonIntensity: 305,
        carbonReduction: 3200,
        solarContribution: 22.5,
        batteryThroughput: 96,
        peakDemandReduction: 720
      },
      '30d': {
        totalEnergyCost: 54000,
        costSavings: 96000,
        costSavingsPercent: 64.0,
        totalEnergyConsumed: 3600,
        avgPUE: 1.21,
        avgCarbonIntensity: 298,
        carbonReduction: 32000,
        solarContribution: 23.5,
        batteryThroughput: 360,
        peakDemandReduction: 780
      },
      '90d': {
        totalEnergyCost: 162000,
        costSavings: 288000,
        costSavingsPercent: 64.0,
        totalEnergyConsumed: 10800,
        avgPUE: 1.23,
        avgCarbonIntensity: 302,
        carbonReduction: 95000,
        solarContribution: 22.0,
        batteryThroughput: 1080,
        peakDemandReduction: 760
      },
      'ytd': {
        totalEnergyCost: 648000,
        costSavings: 1152000,
        costSavingsPercent: 64.0,
        totalEnergyConsumed: 36500,
        avgPUE: 1.24,
        avgCarbonIntensity: 308,
        carbonReduction: 360000,
        solarContribution: 21.0,
        batteryThroughput: 3200,
        peakDemandReduction: 745
      },
      '1y': {
        totalEnergyCost: 720000,
        costSavings: 1280000,
        costSavingsPercent: 64.0,
        totalEnergyConsumed: 43800,
        avgPUE: 1.24,
        avgCarbonIntensity: 310,
        carbonReduction: 410000,
        solarContribution: 20.5,
        batteryThroughput: 3840,
        peakDemandReduction: 740
      }
    };

    return baseMetrics[timeRange];
  };

  const generateTrendData = (timeRange: TimeRange): TrendDataPoint[] => {
    if (timeRange === '7d') {
      return [
        { date: 'Mon', energyCost: 1920, energyConsumed: 122, carbonIntensity: 304, pue: 1.23, solarGeneration: 28, batteryUsage: 15, savingsPercent: 64.5 },
        { date: 'Tue', energyCost: 1950, energyConsumed: 124, carbonIntensity: 300, pue: 1.22, solarGeneration: 29, batteryUsage: 15, savingsPercent: 64.0 },
        { date: 'Wed', energyCost: 1880, energyConsumed: 121, carbonIntensity: 298, pue: 1.21, solarGeneration: 27, batteryUsage: 14, savingsPercent: 65.0 },
        { date: 'Thu', energyCost: 1940, energyConsumed: 123, carbonIntensity: 296, pue: 1.22, solarGeneration: 30, batteryUsage: 15, savingsPercent: 63.5 },
        { date: 'Fri', energyCost: 1980, energyConsumed: 125, carbonIntensity: 302, pue: 1.23, solarGeneration: 26, batteryUsage: 16, savingsPercent: 63.0 },
        { date: 'Sat', energyCost: 1890, energyConsumed: 118, carbonIntensity: 294, pue: 1.21, solarGeneration: 25, batteryUsage: 13, savingsPercent: 64.2 },
        { date: 'Sun', energyCost: 1950, energyConsumed: 119, carbonIntensity: 292, pue: 1.22, solarGeneration: 27, batteryUsage: 14, savingsPercent: 63.8 }
      ];
    } else if (timeRange === '30d') {
      return [
        { date: 'Week 1', energyCost: 13200, energyConsumed: 880, carbonIntensity: 310, pue: 1.23, solarGeneration: 190, batteryUsage: 90, savingsAmount: 24000, savingsPercent: 64.5 },
        { date: 'Week 2', energyCost: 13400, energyConsumed: 900, carbonIntensity: 304, pue: 1.22, solarGeneration: 205, batteryUsage: 92, savingsAmount: 23800, savingsPercent: 64.0 },
        { date: 'Week 3', energyCost: 13600, energyConsumed: 910, carbonIntensity: 298, pue: 1.20, solarGeneration: 215, batteryUsage: 90, savingsAmount: 24200, savingsPercent: 63.0 },
        { date: 'Week 4', energyCost: 13800, energyConsumed: 910, carbonIntensity: 292, pue: 1.19, solarGeneration: 225, batteryUsage: 88, savingsAmount: 24000, savingsPercent: 63.5 }
      ];
    } else if (timeRange === '90d') {
      return [
        { date: 'Month 1', energyCost: 54000, energyConsumed: 3600, carbonIntensity: 305, pue: 1.23, solarGeneration: 760, batteryUsage: 360, savingsAmount: 96000, savingsPercent: 64.0 },
        { date: 'Month 2', energyCost: 53000, energyConsumed: 3600, carbonIntensity: 302, pue: 1.22, solarGeneration: 780, batteryUsage: 360, savingsAmount: 94000, savingsPercent: 64.0 },
        { date: 'Month 3', energyCost: 55000, energyConsumed: 3600, carbonIntensity: 298, pue: 1.21, solarGeneration: 800, batteryUsage: 360, savingsAmount: 98000, savingsPercent: 64.0 }
      ];
    } else if (timeRange === 'ytd') {
      return [
        { date: 'Jan-Feb', energyCost: 128000, energyConsumed: 7300, carbonIntensity: 315, pue: 1.25, solarGeneration: 1480, batteryUsage: 640, savingsPercent: 64.0 },
        { date: 'Mar-Apr', energyCost: 129000, energyConsumed: 7300, carbonIntensity: 310, pue: 1.24, solarGeneration: 1590, batteryUsage: 640, savingsPercent: 64.2 },
        { date: 'May-Jun', energyCost: 130000, energyConsumed: 7300, carbonIntensity: 305, pue: 1.24, solarGeneration: 1720, batteryUsage: 640, savingsPercent: 64.0 },
        { date: 'Jul-Aug', energyCost: 131000, energyConsumed: 7300, carbonIntensity: 302, pue: 1.23, solarGeneration: 1810, batteryUsage: 640, savingsPercent: 64.5 },
        { date: 'Sep-Oct', energyCost: 130000, energyConsumed: 7300, carbonIntensity: 308, pue: 1.24, solarGeneration: 1600, batteryUsage: 640, savingsPercent: 63.8 }
      ];
    } else {
      return [
        { date: 'Q1', energyCost: 176000, energyConsumed: 10950, carbonIntensity: 315, pue: 1.25, solarGeneration: 2200, batteryUsage: 960, savingsPercent: 64.0 },
        { date: 'Q2', energyCost: 180000, energyConsumed: 10950, carbonIntensity: 308, pue: 1.24, solarGeneration: 2520, batteryUsage: 960, savingsPercent: 64.0 },
        { date: 'Q3', energyCost: 182000, energyConsumed: 10950, carbonIntensity: 305, pue: 1.23, solarGeneration: 2680, batteryUsage: 960, savingsPercent: 64.5 },
        { date: 'Q4', energyCost: 182000, energyConsumed: 10950, carbonIntensity: 312, pue: 1.24, solarGeneration: 2280, batteryUsage: 960, savingsPercent: 63.5 }
      ];
    }
  };

  const generatePerformanceBreakdown = (timeRange: TimeRange): PeriodPerformance[] => {
    if (timeRange === '7d') {
      return [
        { period: 'Monday (Nov 25)', energyCost: 1920, energyConsumed: 122, avgPUE: 1.23, carbonIntensity: 304, costVsBaseline: -64.5, topOptimization: 'Peak shaving via battery discharge' },
        { period: 'Tuesday (Nov 26)', energyCost: 1950, energyConsumed: 124, avgPUE: 1.22, carbonIntensity: 300, costVsBaseline: -64.0, topOptimization: 'Solar generation maximized' },
        { period: 'Wednesday (Nov 27)', energyCost: 1880, energyConsumed: 121, avgPUE: 1.21, carbonIntensity: 298, costVsBaseline: -65.0, topOptimization: 'GPU workload shifting to off-peak' },
        { period: 'Thursday (Nov 28)', energyCost: 1940, energyConsumed: 123, avgPUE: 1.22, carbonIntensity: 296, costVsBaseline: -63.5, topOptimization: 'Free cooling enabled during low temps' },
        { period: 'Friday (Nov 29)', energyCost: 1980, energyConsumed: 125, avgPUE: 1.23, carbonIntensity: 302, costVsBaseline: -63.0, topOptimization: 'Battery pre-charging during low prices' },
        { period: 'Saturday (Nov 30)', energyCost: 1890, energyConsumed: 118, avgPUE: 1.21, carbonIntensity: 294, costVsBaseline: -64.2, topOptimization: 'Reduced weekend load profile' },
        { period: 'Sunday (Dec 1)', energyCost: 1950, energyConsumed: 119, avgPUE: 1.22, carbonIntensity: 292, costVsBaseline: -63.8, topOptimization: 'Weekend maintenance window optimization' }
      ];
    } else if (timeRange === '30d') {
      return [
        { period: 'Week 1 (Nov 1-7)', energyCost: 13200, energyConsumed: 880, avgPUE: 1.23, carbonIntensity: 310, costVsBaseline: -64.5, topOptimization: 'Peak shaving via battery discharge' },
        { period: 'Week 2 (Nov 8-14)', energyCost: 13400, energyConsumed: 900, avgPUE: 1.22, carbonIntensity: 304, costVsBaseline: -64.0, topOptimization: 'GPU load shifting + solar optimization' },
        { period: 'Week 3 (Nov 15-21)', energyCost: 13600, energyConsumed: 910, avgPUE: 1.20, carbonIntensity: 298, costVsBaseline: -63.0, topOptimization: 'Enhanced cooling efficiency strategies' },
        { period: 'Week 4 (Nov 22-28)', energyCost: 13800, energyConsumed: 910, avgPUE: 1.19, carbonIntensity: 292, costVsBaseline: -63.5, topOptimization: 'Aggressive battery cycling + workload optimization' }
      ];
    } else if (timeRange === '90d') {
      return [
        { period: 'September 2024', energyCost: 54000, energyConsumed: 3600, avgPUE: 1.24, carbonIntensity: 305, costVsBaseline: -64.0, topOptimization: 'Seasonal cooling transition optimization' },
        { period: 'October 2024', energyCost: 53000, energyConsumed: 3600, avgPUE: 1.23, carbonIntensity: 302, costVsBaseline: -64.2, topOptimization: 'Free cooling mode enabled' },
        { period: 'November 2024', energyCost: 55000, energyConsumed: 3600, avgPUE: 1.22, carbonIntensity: 298, costVsBaseline: -63.5, topOptimization: 'Battery + workload coordination' }
      ];
    } else {
      return [
        { period: 'Q1 2024', energyCost: 176000, energyConsumed: 10950, avgPUE: 1.25, carbonIntensity: 315, costVsBaseline: -64.0, topOptimization: 'Winter heating recovery systems' },
        { period: 'Q2 2024', energyCost: 180000, energyConsumed: 10950, avgPUE: 1.24, carbonIntensity: 308, costVsBaseline: -64.0, topOptimization: 'Spring solar generation ramp-up' },
        { period: 'Q3 2024', energyCost: 182000, energyConsumed: 10950, avgPUE: 1.23, carbonIntensity: 305, costVsBaseline: -64.5, topOptimization: 'Peak summer solar + battery coordination' },
        { period: 'Q4 2024 (partial)', energyCost: 182000, energyConsumed: 10950, avgPUE: 1.24, carbonIntensity: 312, costVsBaseline: -63.5, topOptimization: 'Fall cooling transition + load management' }
      ];
    }
  };

  // Get current data based on selected time range
  const metrics = generateMetrics(selectedTimeRange);
  const trendData = generateTrendData(selectedTimeRange);
  const performanceBreakdown = generatePerformanceBreakdown(selectedTimeRange);

  // Time range options
  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: 'ytd', label: 'YTD' },
    { value: '1y', label: '1 Year' }
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
          Insights
        </h1>
        <p style={{
          color: '#888',
          fontSize: '0.875rem',
          margin: 0
        }}>
          Analytics and reporting dashboard for long-term trends and performance analysis.
          Track energy efficiency gains, cost savings, sustainability metrics, and operational KPIs
          with customizable time ranges.
        </p>
      </div>

      {/* Executive Summary KPIs - 3+2 Centered Layout */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1rem',
          color: '#aaa',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '1rem'
        }}>
          Executive Summary
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Top Row - 3 Cards */}
          <div className="kpi-grid" style={{ marginBottom: '1rem' }}>
            <KpiCard
              title="Total Energy Cost"
              value={`$${(metrics.totalEnergyCost / 1000).toFixed(1)}K`}
              unit=""
              subtitle={`Last ${timeRanges.find(tr => tr.value === selectedTimeRange)?.label || '30 days'}`}
            />
            <KpiCard
              title="Cost Savings"
              value={`$${(metrics.costSavings / 1000).toFixed(1)}K`}
              unit="saved"
              subtitle={`${metrics.costSavingsPercent}% vs baseline`}
            />
            <KpiCard
              title="Average PUE"
              value={metrics.avgPUE.toFixed(2)}
              unit=""
              subtitle="↓ 0.08 vs last period"
            />
          </div>

          {/* Bottom Row - 2 Cards */}
          <div className="kpi-grid">
            <KpiCard
              title="Carbon Reduction"
              value={`${(metrics.carbonReduction / 1000).toFixed(1)}`}
              unit="tons CO₂"
              subtitle={`Equivalent to ${Math.round(metrics.carbonReduction * 0.23)} miles`}
            />
            <KpiCard
              title="Solar Contribution"
              value={metrics.solarContribution.toFixed(1)}
              unit="%"
              subtitle={`${Math.round(metrics.totalEnergyConsumed * metrics.solarContribution / 100)} MWh generated`}
            />
            <KpiCard
              title="Cooling-Related Savings"
              value="$4.2K"
              unit=""
              subtitle={`Last ${timeRanges.find(tr => tr.value === selectedTimeRange)?.label || '30 days'}`}
            />
          </div>
        </div>
      </div>

      {/* Analytics Section: Two Columns */}
      <div className="charts-row">
        {/* Left Chart - Cost & Savings Over Time */}
        <SectionCard title="Cost & Savings Over Time">
          <div style={{ padding: '1rem 0' }}>
            {/* Chart Legend */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              fontSize: '0.75rem',
              marginBottom: '1.5rem',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '16px', height: '3px', backgroundColor: '#61dafb' }}></div>
                <span style={{ color: '#aaa' }}>Actual Cost</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '16px', height: '3px', backgroundColor: '#00ff88' }}></div>
                <span style={{ color: '#aaa' }}>Savings</span>
              </div>
            </div>

            {/* Horizontal Bar Chart */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {trendData.slice(0, selectedTimeRange === '7d' ? 7 : 4).map((dataPoint, index) => {
                const maxCost = Math.max(...trendData.map(d => d.energyCost));
                const costWidth = (dataPoint.energyCost / maxCost) * 100;
                const savingsPercent = dataPoint.savingsPercent
                  ?? (dataPoint.savingsAmount ? (dataPoint.savingsAmount / (dataPoint.energyCost + dataPoint.savingsAmount)) * 100 : 0);

                return (
                  <div key={index} style={{ marginBottom: '0.5rem' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#888',
                      marginBottom: '0.35rem',
                      fontFamily: 'monospace'
                    }}>
                      {dataPoint.date}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      {/* Cost Bar */}
                      <div style={{
                        flex: 1,
                        height: '28px',
                        backgroundColor: '#1e1e1e',
                        borderRadius: '4px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${costWidth}%`,
                          height: '100%',
                          backgroundColor: '#61dafb',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '0.5rem',
                          transition: 'width 0.3s ease'
                        }}>
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#000',
                            fontWeight: '600',
                            fontFamily: 'monospace'
                          }}>
                            ${dataPoint.energyCost.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {/* Savings Badge */}
                      <div style={{
                        fontSize: '0.7rem',
                        color: '#00ff88',
                        fontWeight: '600',
                        minWidth: '50px',
                        textAlign: 'right',
                        fontFamily: 'monospace'
                      }}>
                        -{savingsPercent.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>

        {/* Right Chart - CO₂ Emissions Over Time */}
        <SectionCard title="CO₂ Emissions Over Time">
          <div style={{ padding: '1rem 0' }}>
            {/* Chart Legend */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              fontSize: '0.75rem',
              marginBottom: '1.5rem',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '16px', height: '3px', backgroundColor: '#ff6b6b' }}></div>
                <span style={{ color: '#aaa' }}>Grid Carbon</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '16px', height: '3px', backgroundColor: '#ffd700' }}></div>
                <span style={{ color: '#aaa' }}>Target (320)</span>
              </div>
            </div>

            {/* Horizontal Bar Chart */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {trendData.slice(0, selectedTimeRange === '7d' ? 7 : 4).map((dataPoint, index) => {
                const maxCarbon = 400; // Fixed scale for better visualization
                const carbonWidth = (dataPoint.carbonIntensity / maxCarbon) * 100;
                const targetWidth = (320 / maxCarbon) * 100;
                const isAboveTarget = dataPoint.carbonIntensity > 320;

                return (
                  <div key={index} style={{ marginBottom: '0.5rem' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#888',
                      marginBottom: '0.35rem',
                      fontFamily: 'monospace'
                    }}>
                      {dataPoint.date}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      {/* Carbon Bar */}
                      <div style={{
                        flex: 1,
                        height: '28px',
                        backgroundColor: '#1e1e1e',
                        borderRadius: '4px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        {/* Target Line */}
                        <div style={{
                          position: 'absolute',
                          left: `${targetWidth}%`,
                          top: 0,
                          bottom: 0,
                          width: '2px',
                          backgroundColor: '#ffd700',
                          zIndex: 2
                        }} />
                        {/* Actual Bar */}
                        <div style={{
                          width: `${carbonWidth}%`,
                          height: '100%',
                          backgroundColor: isAboveTarget ? '#ff6b6b' : '#00ff88',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '0.5rem',
                          transition: 'width 0.3s ease',
                          position: 'relative',
                          zIndex: 1
                        }}>
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#000',
                            fontWeight: '600',
                            fontFamily: 'monospace'
                          }}>
                            {dataPoint.carbonIntensity}
                          </span>
                        </div>
                      </div>
                      {/* Status Indicator */}
                      <div style={{
                        fontSize: '0.7rem',
                        color: isAboveTarget ? '#ff6b6b' : '#00ff88',
                        fontWeight: '600',
                        minWidth: '70px',
                        textAlign: 'right'
                      }}>
                        {isAboveTarget ? '⚠ Above' : '✓ Below'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Additional Charts Section */}
      {(showPUETrend || showSolarTrend) && (
        <div
          className="two-column-layout insights-bottom-row"
          style={{ marginBottom: '2rem' }}
        >
          {/* PUE Performance card */}
          <div
            className="card insights-card pue-performance-card chart-panel"
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
                flex: 1,
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
                ⚡ PUE Performance
              </h3>
              {showPUETrend && (
                <ChartPlaceholder
                  xLabel={selectedTimeRange === '7d' ? 'Days' : 'Periods'}
                  yLabel="PUE"
                  line1Color="#61dafb"
                  line2Color="#00ff88"
                  line1Label="Actual PUE"
                  line2Label="Industry Average (1.58)"
                  height={400}
                />
              )}
            </div>
          </div>

          {/* View Controls card */}
          <div
            className="card insights-card view-controls-card chart-panel"
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
                flex: 1,
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
                View Controls
              </h3>
            {/* Time Range Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem'
              }}>
                Time Range
              </label>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {timeRanges.map((tr) => (
                  <button
                    key={tr.value}
                    onClick={() => setSelectedTimeRange(tr.value)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: selectedTimeRange === tr.value ? '#61dafb' : '#2a2a2a',
                      color: selectedTimeRange === tr.value ? '#000' : '#ddd',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: selectedTimeRange === tr.value ? 'bold' : '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTimeRange !== tr.value) {
                        e.currentTarget.style.backgroundColor = '#333';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTimeRange !== tr.value) {
                        e.currentTarget.style.backgroundColor = '#2a2a2a';
                      }
                    }}
                  >
                    {tr.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Toggles */}
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
                Display Metrics
              </h4>
              <div>
                <ToggleSwitch
                  label="Show Energy Cost Trends"
                  defaultChecked={showCostTrend}
                  onChange={setShowCostTrend}
                />
                <ToggleSwitch
                  label="Show Carbon Intensity"
                  defaultChecked={showCarbonTrend}
                  onChange={setShowCarbonTrend}
                />
                <ToggleSwitch
                  label="Show PUE Performance"
                  defaultChecked={showPUETrend}
                  onChange={setShowPUETrend}
                />
                <ToggleSwitch
                  label="Show Solar Generation"
                  defaultChecked={showSolarTrend}
                  onChange={setShowSolarTrend}
                />
              </div>
            </div>

            {/* Export Button */}
            <button
              style={{
                width: '100%',
                padding: '1rem',
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
              onClick={() => console.log('Export report clicked - Time range:', selectedTimeRange)}
            >
              ⬇ Download Report
            </button>

            {/* Export Info */}
            <div style={{
              marginTop: '1rem',
              fontSize: '0.7rem',
              color: '#666',
              textAlign: 'center'
            }}>
              Export data as CSV or PDF
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Operational Insights Section */}
      <SectionCard title="Operational Insights">
        <div style={{
          backgroundColor: '#1e1e1e',
          border: '1px solid #2a2a2a',
          borderRadius: '6px',
          padding: '1.5rem'
        }}>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#ddd',
            fontSize: '0.875rem',
            lineHeight: '2'
          }}>
            {selectedTimeRange === '7d' ? (
              <>
                <li>Most savings came from shifting GPU workloads to off-peak hours (22:00–04:00), reducing peak demand charges by 14%.</li>
                <li>Battery systems provided 68% of peak shaving capacity during the 3 DR events this week.</li>
                <li>Cooling flexibility provided ~30% of DR capacity over the last period.</li>
                <li>CO₂ intensity was highest on Tuesday and Thursday due to low PV availability (cloudy conditions).</li>
                <li>GPU Cluster B demonstrated the largest flexibility potential, averaging 320 kW of shiftable load.</li>
                <li>Weekend operations showed 15% lower energy costs due to reduced AI training workloads.</li>
                <li>Free cooling mode was enabled on 4 out of 7 days, contributing to improved PUE performance.</li>
              </>
            ) : selectedTimeRange === '30d' ? (
              <>
                <li>Most savings came from battery cycling optimization during peak pricing windows, contributing 42% of total cost reductions.</li>
                <li>GPU workload shifting to off-peak hours (22:00–06:00) avoided $34,000 in demand charges this month.</li>
                <li>Week 3 showed the best performance with 65% savings vs baseline, driven by optimal solar generation and aggressive battery utilization.</li>
                <li>CO₂ intensity decreased 9.5% compared to previous month due to enhanced solar contribution and strategic grid import timing.</li>
                <li>Battery systems successfully participated in 12 DR events, providing average reduction of 450 kW per event.</li>
                <li>Cooling system efficiency improved with PUE dropping from 1.24 to 1.19 by end of month through free cooling strategies.</li>
                <li>Diesel generators were only used as a last resort; total runtime: 2.4 hours in last 30 days.</li>
              </>
            ) : selectedTimeRange === '90d' ? (
              <>
                <li>Seasonal cooling transition in October enabled significant PUE improvements, reducing cooling load by 22% compared to September.</li>
                <li>Battery and workload coordination strategies matured over the quarter, with November showing 64% cost savings vs baseline.</li>
                <li>Solar generation peaked in September with 820 MWh, gradually declining through fall months as expected.</li>
                <li>DR participation increased from 8 events in September to 15 events in November as grid conditions became more volatile.</li>
                <li>GPU cluster flexibility increased by 18% quarter-over-quarter as ML training workloads became more time-tolerant.</li>
                <li>Free cooling mode utilization increased from 45% of hours in September to 72% in November, reducing HVAC energy consumption.</li>
              </>
            ) : (
              <>
                <li>Year-to-date cost savings of $1.15M represent a 64% reduction vs baseline, primarily from battery optimization (48%) and workload shifting (32%).</li>
                <li>Seasonal patterns show Q2 and Q3 delivering strongest performance due to high solar generation and optimal cooling conditions.</li>
                <li>Battery systems cycled 3,200 MWh over 10 months, providing both economic value and grid support during 78 DR events.</li>
                <li>Carbon intensity showed 8% improvement year-over-year, driven by 20.8% solar contribution and strategic grid import timing.</li>
                <li>PUE performance remained consistently below industry average (1.58), averaging 1.24 across all operating conditions.</li>
                <li>GPU workload flexibility increased steadily throughout the year, enabling participation in 65% of available DR opportunities.</li>
              </>
            )}
          </ul>
        </div>
      </SectionCard>

      {/* Performance Breakdown Table */}
      <SectionCard title="Performance Breakdown">
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
                  padding: '0.75rem 1rem',
                  color: '#888',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Period
                </th>
                <th style={{
                  textAlign: 'right',
                  padding: '0.75rem 1rem',
                  color: '#888',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Energy Cost
                </th>
                <th style={{
                  textAlign: 'right',
                  padding: '0.75rem 1rem',
                  color: '#888',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Energy (MWh)
                </th>
                <th style={{
                  textAlign: 'right',
                  padding: '0.75rem 1rem',
                  color: '#888',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Avg PUE
                </th>
                <th style={{
                  textAlign: 'right',
                  padding: '0.75rem 1rem',
                  color: '#888',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Carbon (gCO₂/kWh)
                </th>
                <th style={{
                  textAlign: 'right',
                  padding: '0.75rem 1rem',
                  color: '#888',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  vs Baseline
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  color: '#888',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Top Optimization
                </th>
              </tr>
            </thead>
            <tbody>
              {performanceBreakdown.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index < performanceBreakdown.length - 1 ? '1px solid #2a2a2a' : 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#222';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={{
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontWeight: '500'
                  }}>
                    {row.period}
                  </td>
                  <td style={{
                    padding: '0.75rem 1rem',
                    color: '#ddd',
                    textAlign: 'right',
                    fontFamily: 'monospace'
                  }}>
                    ${row.energyCost.toLocaleString()}
                  </td>
                  <td style={{
                    padding: '0.75rem 1rem',
                    color: '#ddd',
                    textAlign: 'right',
                    fontFamily: 'monospace'
                  }}>
                    {row.energyConsumed.toLocaleString()}
                  </td>
                  <td style={{
                    padding: '0.75rem 1rem',
                    color: '#ddd',
                    textAlign: 'right',
                    fontFamily: 'monospace'
                  }}>
                    {row.avgPUE.toFixed(2)}
                  </td>
                  <td style={{
                    padding: '0.75rem 1rem',
                    color: '#ddd',
                    textAlign: 'right',
                    fontFamily: 'monospace'
                  }}>
                    {row.carbonIntensity}
                  </td>
                  <td style={{
                    padding: '0.75rem 1rem',
                    color: row.costVsBaseline < 0 ? '#00ff88' : '#ff6b6b',
                    textAlign: 'right',
                    fontWeight: '600',
                    fontFamily: 'monospace'
                  }}>
                    {row.costVsBaseline > 0 ? '+' : ''}{row.costVsBaseline.toFixed(1)}%
                  </td>
                  <td style={{
                    padding: '0.75rem 1rem',
                    color: '#aaa',
                    fontSize: '0.8rem'
                  }}>
                    {row.topOptimization}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

export default Insights;
