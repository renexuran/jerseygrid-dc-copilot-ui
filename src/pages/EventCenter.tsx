import React, { useState } from 'react';
import EventCard, { type Event } from '../components/EventCard';
import EventDetails from '../components/EventDetails';
import FilterBar from '../components/FilterBar';

const EventCenter: React.FC = () => {
  // Mock event data
  const allEvents: Event[] = [
    {
      id: '1',
      type: 'Grid DR – ISO NE Peak Event',
      category: 'Grid DR',
      status: 'Active',
      timeWindow: 'Today 14:00 - 18:00',
      impact: 'Target reduction: 800 kW',
      description: 'ISO New England has issued a demand response call for this afternoon peak period due to high regional load and limited generation capacity. The grid operator is requesting voluntary load curtailment to maintain system reliability. This is a 4-hour event with economic incentives for participation. Cooling flexibility provides part of the requested reduction without impacting critical compute.',
      recommendations: [
        'Shift non-critical GPU training workloads to after 18:00',
        'Increase battery discharge to 500 kW during peak hours',
        'Enable free cooling mode if outdoor conditions permit',
        'Reduce HVAC setpoints by 1°C in non-critical zones'
      ],
      affectedAssets: [
        { asset: 'BESS Unit 1', action: 'Discharge at 500 kW' },
        { asset: 'GPU Cluster A', action: 'Defer training jobs' },
        { asset: 'Cooling System', action: 'Reduce 200 kW during event window' }
      ],
      pricePerKWh: 0.45,
      requestedReductionKW: 800,
      durationHours: 4,
      estimatedComputeLossCostPerKWh: 0.30
    },
    {
      id: '2',
      type: 'Internal – Cooling Constraint Hall B',
      category: 'Internal',
      status: 'Active',
      timeWindow: 'Today 12:30 - 16:00 (est)',
      impact: 'Affected capacity: 1.2 MW',
      description: 'Chiller-3 is operating at reduced capacity (70%) due to a refrigerant pressure anomaly detected by the building management system. Maintenance team is investigating. Redundant cooling systems have been activated automatically. Hall B temperature rising slowly but remains within acceptable operating range.',
      recommendations: [
        'Throttle GPU Cluster-03 to 70% capacity to reduce heat load',
        'Activate backup chiller-4 to full capacity',
        'Monitor inlet temperatures closely for all racks in Hall B',
        'Schedule maintenance window for chiller-3 repair tonight'
      ],
      affectedAssets: [
        { asset: 'Chiller-3', action: 'Operating at 70%' },
        { asset: 'GPU Cluster-03', action: 'Throttle to 70%' },
        { asset: 'Chiller-4', action: 'Activate to 100%' }
      ]
    },
    {
      id: '3',
      type: 'Grid DR – Wholesale Price Spike',
      category: 'Grid DR',
      status: 'Upcoming',
      timeWindow: 'Tomorrow 06:00 - 10:00',
      impact: 'Potential savings: $1,200',
      description: 'Day-ahead wholesale electricity prices are forecasted to spike tomorrow morning due to scheduled generator maintenance and high heating demand. Prices are expected to reach $180/MWh, significantly above baseline. This presents an opportunity for behind-the-meter optimization and potential export to grid if permitted.',
      recommendations: [
        'Pre-charge battery to 100% tonight using off-peak power',
        'Discharge battery during price spike window',
        'Defer any planned maintenance requiring backup generators',
        'Consider exporting excess solar generation if regulation permits'
      ],
      affectedAssets: [
        { asset: 'BESS Unit 1', action: 'Pre-charge to 100%' },
        { asset: 'BESS Unit 2', action: 'Pre-charge to 100%' },
        { asset: 'Solar Array', action: 'Maximize export' },
        { asset: 'Cooling System', action: 'Flex up to 150 kW if needed' }
      ],
      pricePerKWh: 0.50,
      requestedReductionKW: 600,
      durationHours: 4,
      estimatedComputeLossCostPerKWh: 0.35
    },
    {
      id: '4',
      type: 'Maintenance – UPS Battery Replacement',
      category: 'Maintenance',
      status: 'Upcoming',
      timeWindow: 'Saturday 02:00 - 06:00',
      impact: 'Redundancy reduced: Hall A',
      description: 'Scheduled preventive maintenance for UPS-A battery bank replacement. The UPS will be placed in bypass mode during the maintenance window, reducing power redundancy for Hall A. All critical systems will remain powered but N+1 redundancy will temporarily become N. Weather forecast is clear with no grid alerts expected.',
      recommendations: [
        'Defer non-critical GPU workloads in Hall A during window',
        'Verify diesel generator fuel levels and readiness',
        'Brief operations team on bypass procedures',
        'Coordinate with facilities for after-hours access'
      ],
      affectedAssets: [
        { asset: 'UPS-A', action: 'Bypass mode 02:00-06:00' },
        { asset: 'Hall A Critical Loads', action: 'N redundancy only' },
        { asset: 'Generator-1', action: 'Hot standby' }
      ]
    },
    {
      id: '5',
      type: 'Internal – Solar Inverter Fault',
      category: 'Internal',
      status: 'Resolved',
      timeWindow: 'Yesterday 10:15 - 11:45',
      impact: 'Lost generation: 250 kW for 90 min',
      description: 'String inverter SI-3 tripped offline due to DC overvoltage condition. Root cause identified as shade pattern from passing clouds causing voltage imbalance across parallel strings. Inverter automatically reset after conditions stabilized. No equipment damage. Firmware update scheduled to improve voltage tolerance.',
      recommendations: [
        'Monitor SI-3 for recurring issues over next 48 hours',
        'Schedule firmware update for all string inverters',
        'Review string configuration for better voltage matching',
        'No immediate action required - event resolved'
      ],
      affectedAssets: [
        { asset: 'Solar Inverter SI-3', action: 'Auto-reset complete' },
        { asset: 'Solar Array Zone C', action: 'Restored to normal' }
      ]
    },
    {
      id: '6',
      type: 'Grid DR – Carbon Intensity Alert',
      category: 'Grid DR',
      status: 'Upcoming',
      timeWindow: 'Today 18:00 - 22:00',
      impact: 'Grid carbon: >450 gCO₂/kWh',
      description: 'Regional grid carbon intensity is forecasted to exceed 450 gCO₂/kWh during evening hours as coal and gas generation ramps up to meet demand while solar generation drops. This is an optimal window for carbon-aware workload shifting and battery utilization to minimize scope 2 emissions.',
      recommendations: [
        'Shift flexible GPU training jobs to overnight hours',
        'Maximize battery discharge to offset grid consumption',
        'Prioritize on-site solar consumption over export',
        'Log carbon avoidance metrics for sustainability reporting'
      ],
      affectedAssets: [
        { asset: 'GPU Cluster-01', action: 'Defer to post-22:00' },
        { asset: 'GPU Cluster-02', action: 'Defer to post-22:00' },
        { asset: 'BESS Units', action: 'Discharge priority' },
        { asset: 'Cooling System', action: 'Reduce 180 kW during peak hours' }
      ],
      pricePerKWh: 0.40,
      requestedReductionKW: 700,
      durationHours: 4,
      estimatedComputeLossCostPerKWh: 0.28
    }
  ];

  // State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedEventId, setSelectedEventId] = useState<string>(allEvents[0]?.id || '');

  // Filter events based on selections
  const filteredEvents = allEvents.filter(event => {
    const categoryMatch = selectedCategory === 'All' || event.category === selectedCategory;
    const statusMatch = selectedStatus === 'All' || event.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  // Get selected event
  const selectedEvent = allEvents.find(event => event.id === selectedEventId) || null;

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '0.5rem',
          color: '#fff'
        }}>
          Event Center
        </h1>
        <p style={{
          color: '#888',
          fontSize: '0.875rem',
          margin: 0
        }}>
          Monitor demand response events, grid constraints, and internal alerts impacting data center operations.
          Track active incidents and coordinate responses across energy systems.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="two-column-layout events-layout">
        {/* Left Column - Event List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          {/* Filter Bar */}
          <FilterBar
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />

          {/* Event Count */}
          <div style={{
            fontSize: '0.75rem',
            color: '#666',
            marginBottom: '0.75rem',
            paddingLeft: '0.25rem'
          }}>
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
          </div>

          {/* Event List */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: '0.5rem'
          }}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  isSelected={event.id === selectedEventId}
                  onClick={() => setSelectedEventId(event.id)}
                />
              ))
            ) : (
              <div style={{
                backgroundColor: '#1e1e1e',
                border: '1px solid #333',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                color: '#666'
              }}>
                No events match the selected filters
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Event Details */}
        <div className="event-details-card">
          <EventDetails event={selectedEvent} />
        </div>
      </div>
    </div>
  );
};

export default EventCenter;
