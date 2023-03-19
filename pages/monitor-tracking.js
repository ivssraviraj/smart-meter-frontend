import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import MeterSelector from "../components/MeterSelector";
import MonitorTable from "../components/MonitorTable";
import { DEVICE_METER_TYPES } from "../constants";
import { useDevices } from "../hooks/useDevices";

const MonitorAndTracking = () => {
  const { electricDevices, waterDevices } = useDevices();
  const [selectedMeterType, setSelectedMeterType] = useState(
    DEVICE_METER_TYPES.ELECTRIC
  );

  return (
    <DashboardLayout>
      <div style={{ display: "grid", placeItems: "center", marginBottom: 32 }}>
        <MeterSelector
          value={selectedMeterType}
          onChange={setSelectedMeterType}
        />
      </div>
      <MonitorTable
        meterType={selectedMeterType}
        list={
          selectedMeterType === DEVICE_METER_TYPES.ELECTRIC
            ? electricDevices
            : waterDevices
        }
      />
    </DashboardLayout>
  );
};

export default MonitorAndTracking;
