# Remaining UI Refinements - Implementation Guide

## Summary of Completed Work

✅ **Global Theme Applied:**
- Created `/src/styles/theme.css` with dark blue theme (#050816, electric blue #00D4FF, neon green #7CFF6B)
- Updated `App.tsx` with themed navigation and active link highlighting
- Updated `KpiCard.tsx` to center numbers and use theme colors
- Updated `PowerFlowDiagram.tsx` with consistent energy balance and flexible node highlighting
- Updated `LiveOperations.tsx` to move recommendations to top as news feed

## Remaining Tasks with Complete Code

### 1. Optimization Page - Peak Shaving Timeline

**File:** `src/pages/OptimizationEngine.tsx`

Find the `scheduleBlocks` array (around line 71-77) and replace with:

```typescript
const scheduleBlocks = [
  { time: '00:00-06:00', activity: 'Off-peak GPU training workloads', color: 'var(--accent-neon-green)' },
  { time: '06:00-17:00', activity: 'Normal daytime operations', color: 'var(--text-secondary)' },
  { time: '17:00-21:00', activity: '⚡ PEAK SHAVING - Battery discharge (500 kW) + GPU throttling', color: 'var(--accent-electric)' },
  { time: '21:00-24:00', activity: 'Evening operations + workload shifting', color: 'var(--text-secondary)' }
];
```

Also update the rendering section (around line 148-184) to use theme colors:

```typescript
{scheduleBlocks.map((block, index) => (
  <div
    key={index}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius-md)',
      border: block.time === '17:00-21:00'
        ? '2px solid var(--accent-electric)'
        : '1px solid var(--border-primary)',
      boxShadow: block.time === '17:00-21:00'
        ? 'var(--shadow-glow-electric)'
        : 'var(--shadow-sm)'
    }}
  >
    <div style={{
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      color: 'var(--accent-electric)',
      minWidth: '100px'
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
      color: block.time === '17:00-21:00' ? 'var(--accent-electric)' : 'var(--text-primary)',
      flex: 1,
      fontWeight: block.time === '17:00-21:00' ? '600' : '400'
    }}>
      {block.activity}
    </div>
  </div>
))}
```

---

### 2. Event Center - Add Economics

**File:** `src/components/EventCard.tsx`

Update the Event interface to include economics fields:

```typescript
export interface Event {
  id: string;
  type: string;
  category: 'Grid DR' | 'Internal' | 'Maintenance';
  status: 'Upcoming' | 'Active' | 'Resolved';
  timeWindow: string;
  impact: string;
  description: string;
  recommendations: string[];
  affectedAssets: { asset: string; action: string; }[];
  // New economics fields
  pricePerKWh: number;
  requestedReductionKW: number;
  durationHours: number;
  estimatedComputeLossCostPerKWh: number;
}
```

**File:** `src/pages/EventCenter.tsx`

Update the mock events to include economics. For event id '1' (around line 9-27), add:

```typescript
{
  id: '1',
  type: 'Grid DR – ISO NE Peak Event',
  category: 'Grid DR',
  status: 'Active',
  timeWindow: 'Today 14:00 - 18:00',
  impact: 'Target reduction: 800 kW',
  pricePerKWh: 0.45,  // $0.45 per kWh DR payment
  requestedReductionKW: 800,
  durationHours: 4,
  estimatedComputeLossCostPerKWh: 0.28,  // Lost revenue from throttling compute
  description: 'ISO New England has issued a demand response call...',
  // ... rest of the event
}
```

Do similar for all Grid DR events. For Internal/Maintenance events, set economics to 0.

Add a helper function before the component:

```typescript
const calculateEventEconomics = (event: Event) => {
  const potentialGridRevenue = event.pricePerKWh * event.requestedReductionKW * event.durationHours;
  const lostComputeRevenue = event.estimatedComputeLossCostPerKWh * event.requestedReductionKW * event.durationHours;
  const netImpact = potentialGridRevenue - lostComputeRevenue;

  return {
    potentialGridRevenue,
    lostComputeRevenue,
    netImpact,
    isPositive: netImpact > 0
  };
};
```

**File:** `src/components/EventDetails.tsx`

In the EventDetails component, add economics display after the description section (around line 111):

```typescript
{/* Economic Impact - Only for Grid DR events */}
{event.category === 'Grid DR' && (
  <div style={{ marginBottom: '1.5rem' }}>
    <h3 style={{
      fontSize: '0.875rem',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '0.75rem'
    }}>
      Economic Impact
    </h3>
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-md)',
      padding: '1rem'
    }}>
      {(() => {
        const economics = calculateEventEconomics(event);
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.875rem'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Potential DR Revenue:</span>
              <span style={{
                color: 'var(--accent-neon-green)',
                fontWeight: '600',
                fontFamily: 'monospace'
              }}>
                +${economics.potentialGridRevenue.toLocaleString()}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.875rem'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Lost Compute Revenue:</span>
              <span style={{
                color: 'var(--error)',
                fontWeight: '600',
                fontFamily: 'monospace'
              }}>
                -${economics.lostComputeRevenue.toLocaleString()}
              </span>
            </div>
            <div style={{
              borderTop: '2px solid var(--border-secondary)',
              paddingTop: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.95rem'
            }}>
              <span style={{
                color: 'var(--text-primary)',
                fontWeight: '600'
              }}>
                Net Economic Impact:
              </span>
              <span style={{
                color: economics.isPositive ? 'var(--accent-neon-green)' : 'var(--error)',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                fontFamily: 'monospace'
              }}>
                {economics.isPositive ? '+' : ''}${economics.netImpact.toLocaleString()}
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  </div>
)}
```

Don't forget to import the helper at the top of EventDetails.tsx:

```typescript
// Add this helper function at the top of the file, before the component
const calculateEventEconomics = (event: Event) => {
  const potentialGridRevenue = event.pricePerKWh * event.requestedReductionKW * event.durationHours;
  const lostComputeRevenue = event.estimatedComputeLossCostPerKWh * event.requestedReductionKW * event.durationHours;
  const netImpact = potentialGridRevenue - lostComputeRevenue;

  return {
    potentialGridRevenue,
    lostComputeRevenue,
    netImpact,
    isPositive: netImpact > 0
  };
};
```

---

### 3. Assets Page - CapEx Upgrade Opportunities

**File:** `src/pages/Assets.tsx`

First, add these interfaces at the top of the file (after imports):

```typescript
interface UpgradeOpportunity {
  id: string;
  assetName: string;
  description: string;
  capex: number;
  annualSavings: number;
  additionalBenefit?: string;
}
```

Add mock upgrade data after your existing mock data:

```typescript
const upgradeOpportunities: UpgradeOpportunity[] = [
  {
    id: '1',
    assetName: 'Battery Rack B3',
    description: 'Replace with next-gen high-efficiency lithium module',
    capex: 250000,
    annualSavings: 80000,
    additionalBenefit: '+15% capacity, +20% cycle life'
  },
  {
    id: '2',
    assetName: 'GPU Cluster C',
    description: 'Upgrade to H100 generation hardware',
    capex: 450000,
    annualSavings: 120000,
    additionalBenefit: '+25% compute efficiency, -18% power draw'
  },
  {
    id: '3',
    assetName: 'Chiller System 2',
    description: 'Install variable-speed drive and smart controls',
    capex: 85000,
    annualSavings: 35000,
    additionalBenefit: '-12% cooling energy consumption'
  },
  {
    id: '4',
    assetName: 'Solar Array',
    description: 'Add 500 kW capacity with bifacial panels',
    capex: 380000,
    annualSavings: 95000,
    additionalBenefit: '+58% solar generation'
  }
];
```

Update GPU cluster mock data to include underperforming flags. Find your GPU clusters data and update it:

```typescript
const gpuClusters = [
  {
    name: 'GPU-Cluster-01',
    location: 'Hall A, Row 3',
    capacity: '1,200 kW',
    utilization: '87%',
    flexibility: 'High' as const,
    status: 'Online' as const
  },
  {
    name: 'GPU-Cluster-02',
    location: 'Hall A, Row 5',
    capacity: '1,150 kW',
    utilization: '92%',
    flexibility: 'High' as const,
    status: 'Online' as const
  },
  {
    name: 'GPU-Cluster-03 (C)',
    location: 'Hall B, Row 1',
    capacity: '1,280 kW',
    utilization: '78%',
    flexibility: 'Medium' as const,
    status: 'Warning' as const,  // Mark as needing attention
    badge: '⚠️ Upgrade Candidate'  // Add badge
  },
  // ... rest of clusters
];
```

Similar for battery racks:

```typescript
const batteryRacks = [
  {
    rack: 'BESS-A1',
    capacity: '500 kWh',
    soc: '78%',
    health: '96%',
    cycles: '1,240'
  },
  {
    rack: 'BESS-A2',
    capacity: '500 kWh',
    soc: '82%',
    health: '94%',
    cycles: '1,380'
  },
  {
    rack: 'BESS-B3',
    capacity: '500 kWh',
    soc: '65%',
    health: '84%',  // Lower health
    cycles: '2,150',
    badge: '⚠️ Efficiency Degraded'  // Add badge
  },
  // ... rest
];
```

Add the Upgrade Opportunities section at the bottom of the component (before the closing div):

```typescript
{/* Upgrade Opportunities Section */}
<div style={{ marginTop: '2rem' }}>
  <h2 style={{
    fontSize: '1.25rem',
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
    borderBottom: '2px solid var(--border-secondary)',
    paddingBottom: '0.75rem'
  }}>
    💡 CapEx Upgrade Opportunities
  </h2>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1rem'
  }}>
    {upgradeOpportunities.map((upgrade) => {
      const paybackYears = (upgrade.capex / upgrade.annualSavings).toFixed(1);

      return (
        <div
          key={upgrade.id}
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--accent-neon-green)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-glow-green)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(124, 255, 107, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-glow-green)';
          }}
        >
          {/* Asset Name */}
          <div style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--accent-neon-green)',
            marginBottom: '0.75rem'
          }}>
            {upgrade.assetName}
          </div>

          {/* Description */}
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            lineHeight: '1.5'
          }}>
            {upgrade.description}
          </div>

          {/* Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            marginBottom: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-secondary)'
          }}>
            <div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '0.25rem'
              }}>
                CapEx Required
              </div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                fontFamily: 'monospace'
              }}>
                ${(upgrade.capex / 1000).toFixed(0)}K
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '0.25rem'
              }}>
                Annual Savings
              </div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: 'var(--accent-neon-green)',
                fontFamily: 'monospace'
              }}>
                ${(upgrade.annualSavings / 1000).toFixed(0)}K/yr
              </div>
            </div>
          </div>

          {/* Payback Period */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: upgrade.additionalBenefit ? '0.75rem' : 0
          }}>
            <div style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              marginBottom: '0.25rem'
            }}>
              Payback Period
            </div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'var(--accent-electric)'
            }}>
              {paybackYears} years
            </div>
          </div>

          {/* Additional Benefit */}
          {upgrade.additionalBenefit && (
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              backgroundColor: 'rgba(124, 255, 107, 0.1)',
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '3px solid var(--accent-neon-green)'
            }}>
              ✨ {upgrade.additionalBenefit}
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
```

Update table rendering to show badges. In the GPU clusters table:

```typescript
<td style={{
  padding: '0.75rem 1rem',
  color: row.status === 'Warning' ? 'var(--warning)' : 'var(--success)',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
}}>
  <div style={{
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: row.status === 'Warning' ? 'var(--warning)' : 'var(--success)'
  }} />
  {row.status}
  {row.badge && (
    <span style={{
      fontSize: '0.7rem',
      backgroundColor: 'rgba(255, 184, 0, 0.2)',
      color: 'var(--warning)',
      padding: '0.25rem 0.5rem',
      borderRadius: 'var(--radius-sm)',
      marginLeft: '0.5rem'
    }}>
      {row.badge}
    </span>
  )}
</td>
```

---

## Testing Checklist

After implementing all changes:

1. **Theme:**
   - [ ] Dark blue background visible
   - [ ] Electric blue accents on active links
   - [ ] Neon green on positive metrics

2. **KPI Cards:**
   - [ ] Numbers centered vertically and horizontally
   - [ ] Highlight prop creates electric glow

3. **PowerFlow:**
   - [ ] Numbers balance (5000 in = 5000 out)
   - [ ] Flexible nodes highlighted
   - [ ] Legend shows distinction

4. **LiveOperations:**
   - [ ] Recommendations at top in news feed
   - [ ] Electric blue border and glow
   - [ ] KPIs below recommendations

5. **Optimization:**
   - [ ] Peak shaving at 17:00-21:00
   - [ ] Highlighted with electric blue
   - [ ] Clear labels

6. **Events:**
   - [ ] Economics calculations correct
   - [ ] Net impact color-coded (green/red)
   - [ ] Only shows for Grid DR events

7. **Assets:**
   - [ ] Upgrade opportunities visible
   - [ ] Badges on underperforming assets
   - [ ] Payback period calculated
   - [ ] Hover effects work

Run `npm run dev` to test all changes!
