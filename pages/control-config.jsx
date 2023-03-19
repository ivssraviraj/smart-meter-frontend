import { SettingOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { Drawer } from "antd";
import { Switch } from "antd";
import { Button } from "antd";
import React, { useState } from "react";
import ConfForm from "../components/ConfForm";
import DashboardLayout from "../components/DashboardLayout";
import DeviceList from "../components/DeviceList";
import MeterSelector from "../components/MeterSelector";
import { DEVICE_METER_TYPES } from "../constants";
import { useDevices } from "../hooks/useDevices";

const ControlAndConfig = () => {
  const { electricDevices, waterDevices, updateDevice } = useDevices();
  const [selectedDevice, setSelectedDevice] = useState({});
  const [showConf, setShowConf] = useState(false);
  const [selectedMeterType, setSelectedMeterType] = useState(
    DEVICE_METER_TYPES.ELECTRIC
  );

  const columns = [
    {
      title: "Device ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Device Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Active/ Deactivate",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, device) => {
        console.log(device);
        return (
          <Switch
            checked={isActive}
            onChange={(isChecked) => {
              updateDevice(device.id, { isActive: isChecked });
            }}
          />
        );
      },
    },
    {
      title: "Start/Stop",
      dataIndex: "isRunning",
      key: "isRunning",
      render: (isRunning, device) => (
        <Switch
          checked={isRunning}
          onChange={(isChecked) => {
            updateDevice(device.id, { isRunning: isChecked });
          }}
        />
      ),
    },
    {
      title: "Connected to Cloud",
      dataIndex: "isConnectedToCloud",
      key: "isConnectedToCloud",
      render: (isConnectedToCloud, device) => (
        <Switch
          checked={isConnectedToCloud}
          onChange={(isChecked) => {
            updateDevice(device.id, {
              isConnectedToCloud: isChecked,
            });
          }}
        />
      ),
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, device) => {
        return (
          <Button
            onClick={() => {
              setShowConf(true);
              setSelectedDevice(device);
            }}
            icon={<SettingOutlined />}
          ></Button>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ display: "grid", placeItems: "center", marginBottom: 32 }}>
        <MeterSelector
          value={selectedMeterType}
          onChange={setSelectedMeterType}
        />
      </div>

      <DeviceList
        list={
          selectedMeterType === DEVICE_METER_TYPES.ELECTRIC
            ? electricDevices
            : waterDevices
        }
        columns={columns}
      />
      <Drawer
        destroyOnClose
        open={showConf}
        placement="bottom"
        onClose={() => {
          setShowConf(false);
          setSelectedDevice({});
        }}
      >
        <ConfForm
          values={selectedDevice}
          onSubmit={(dataToUpdate) => {
            console.log(
              "Updating CONFIGURATION",
              selectedDevice.id,
              dataToUpdate
            );
            setShowConf(false);
            updateDevice(selectedDevice.id, dataToUpdate);
            setSelectedDevice(null);
          }}
        />
      </Drawer>
    </DashboardLayout>
  );
};

export default ControlAndConfig;
