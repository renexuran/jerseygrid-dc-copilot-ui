import React from 'react';

interface ChartPlaceholderProps {
  xLabel?: string;
  yLabel?: string;
  line1Color?: string;
  line2Color?: string;
  line1Label?: string;
  line2Label?: string;
  height?: number;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  xLabel = 'Hours (0-24)',
  yLabel = 'kW',
  line1Color = '#61dafb',
  line2Color = '#00ff88',
  line1Label = 'Series 1',
  line2Label = 'Series 2',
  height = 300
}) => {
  // Generate dummy data points for two lines
  const generateLine1 = () => {
    const points: Array<{ x: number; y: number }> = [];
    for (let i = 0; i <= 24; i++) {
      // Sine wave with some offset
      const y = 50 + 30 * Math.sin(i * 0.3) + 20 * Math.cos(i * 0.5);
      points.push({ x: i, y });
    }
    return points;
  };

  const generateLine2 = () => {
    const points: Array<{ x: number; y: number }> = [];
    for (let i = 0; i <= 24; i++) {
      // Different sine wave pattern
      const y = 40 + 25 * Math.sin(i * 0.25 + 1) + 15 * Math.cos(i * 0.4 + 0.5);
      points.push({ x: i, y });
    }
    return points;
  };

  const line1Data = generateLine1();
  const line2Data = generateLine2();

  // Convert data points to SVG path
  const dataToPath = (data: Array<{ x: number; y: number }>) => {
    const xScale = 100 / 24; // 24 hours
    const yScale = (height - 60) / 100; // 100% scale

    return data
      .map((point, i) => {
        const x = 40 + point.x * xScale * 5; // Start at x=40 for y-axis space
        const y = height - 30 - point.y * yScale; // Invert y, leave space for x-axis
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const svgWidth = 600;
  const svgHeight = height;

  // Grid lines
  const gridLines = [];
  for (let i = 0; i <= 10; i++) {
    const y = 20 + (i * (svgHeight - 50)) / 10;
    gridLines.push(
      <line
        key={`grid-h-${i}`}
        x1={40}
        y1={y}
        x2={svgWidth - 20}
        y2={y}
        stroke="#333"
        strokeWidth="1"
        strokeDasharray="3,3"
        opacity="0.3"
      />
    );
  }

  // Vertical grid lines (for hours)
  for (let i = 0; i <= 6; i++) {
    const x = 40 + (i * (svgWidth - 60)) / 6;
    gridLines.push(
      <line
        key={`grid-v-${i}`}
        x1={x}
        y1={20}
        x2={x}
        y2={svgHeight - 30}
        stroke="#333"
        strokeWidth="1"
        strokeDasharray="3,3"
        opacity="0.3"
      />
    );
  }

  return (
    <div
      className="chart-container"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #333',
        borderRadius: '4px',
        padding: '1rem',
        backgroundColor: '#0a0a0a'
      }}
    >
      {/* SVG Chart */}
      <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ maxWidth: '100%' }}>
        {/* Grid lines */}
        {gridLines}

        {/* Axes */}
        <line x1={40} y1={20} x2={40} y2={svgHeight - 30} stroke="#555" strokeWidth="2" />
        <line x1={40} y1={svgHeight - 30} x2={svgWidth - 20} y2={svgHeight - 30} stroke="#555" strokeWidth="2" />

        {/* Y-axis label */}
        <text x={15} y={svgHeight / 2} fill="#888" fontSize="12" textAnchor="middle" transform={`rotate(-90, 15, ${svgHeight / 2})`}>
          {yLabel}
        </text>

        {/* X-axis label */}
        <text x={svgWidth / 2} y={svgHeight - 5} fill="#888" fontSize="12" textAnchor="middle">
          {xLabel}
        </text>

        {/* X-axis tick labels */}
        {[0, 6, 12, 18, 24].map((hour, i) => (
          <text
            key={`x-tick-${i}`}
            x={40 + (hour / 24) * (svgWidth - 60)}
            y={svgHeight - 15}
            fill="#666"
            fontSize="10"
            textAnchor="middle"
          >
            {hour}
          </text>
        ))}

        {/* Y-axis tick labels */}
        {[0, 25, 50, 75, 100].map((value, i) => (
          <text
            key={`y-tick-${i}`}
            x={35}
            y={svgHeight - 30 - (value / 100) * (svgHeight - 50)}
            fill="#666"
            fontSize="10"
            textAnchor="end"
          >
            {value}
          </text>
        ))}

        {/* Data lines */}
        <path d={dataToPath(line1Data)} fill="none" stroke={line1Color} strokeWidth="2" opacity="0.5" />
        <path d={dataToPath(line2Data)} fill="none" stroke={line2Color} strokeWidth="2" opacity="0.5" />
      </svg>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          fontSize: '0.75rem',
          marginTop: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: line1Color, opacity: 0.5 }}></div>
          <span style={{ color: '#aaa' }}>{line1Label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: line2Color, opacity: 0.5 }}></div>
          <span style={{ color: '#aaa' }}>{line2Label}</span>
        </div>
      </div>

      {/* Placeholder notice */}
      <div
        style={{
          marginTop: '1rem',
          fontSize: '0.7rem',
          color: '#666',
          textAlign: 'center',
          fontStyle: 'italic'
        }}
      >
        Sample placeholder — real data to be added
      </div>
    </div>
  );
};

export default ChartPlaceholder;
