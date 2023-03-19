import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DeviceList from "../components/DeviceList";

import { Button, Drawer, Popconfirm, Space } from "antd";
import DeviceForm from "../components/DeviceForm";
import MeterSelector from "../components/MeterSelector";
import { DEVICE_METER_TYPES, DRAWER_MODES } from "../constants";
import { useDevices } from "../hooks/useDevices";

const DeviceManagement = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useState(
    DEVICE_METER_TYPES.ELECTRIC
  );
  const [drawerMode, setDrawerMode] = useState(DRAWER_MODES.VIEW);

  const {
    electricDevices,
    waterDevices,
    addDevice,
    updateDevice,
    deleteDevice,
  } = useDevices();
  const [selectedDeviceInfo, setSelectedDeviceInfo] = useState(null);

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
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (deviceData) => {
        return (
          <Space key={deviceData.id}>
            <Button
              onClick={() => {
                setDrawerMode(DRAWER_MODES.VIEW);
                setSelectedDeviceInfo(deviceData);
              }}
            >
              View
            </Button>
            <Button
              onClick={() => {
                setDrawerMode(DRAWER_MODES.UPDATE);
                setSelectedDeviceInfo(deviceData);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              okText="Yes"
              okButtonProps={{
                danger: true,
              }}
              title={
                <div>
                  Do you want to delete <b>{deviceData.name}</b>?
                </div>
              }
              onConfirm={() => deleteDevice(deviceData.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <Space
        style={{
          marginBottom: 32,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MeterSelector
          value={selectedDeviceType}
          onChange={setSelectedDeviceType}
        />
        <Button
          type="primary"
          onClick={() => {
            setDrawerMode(DRAWER_MODES.CREATE);
            setSelectedDeviceInfo({ type: selectedDeviceType });
          }}
        >
          Add New Device
        </Button>
      </Space>
      {selectedDeviceType === DEVICE_METER_TYPES.ELECTRIC && (
        <DeviceList list={electricDevices} columns={columns} />
      )}

      {selectedDeviceType === DEVICE_METER_TYPES.WATER && (
        <DeviceList list={waterDevices} columns={columns} />
      )}
      {selectedDeviceInfo && (
        <Drawer
          placement="bottom"
          open={!!selectedDeviceInfo}
          title={selectedDeviceInfo?.name || "New Device"}
          onClose={() => {
            setDrawerMode(DRAWER_MODES.VIEW);
            setSelectedDeviceInfo(null);
          }}
        >
          <DeviceForm
            type={selectedDeviceType}
            readOnly={drawerMode === DRAWER_MODES.VIEW}
            values={selectedDeviceInfo}
            onSubmit={(data) => {
              if (drawerMode === DRAWER_MODES.CREATE) {
                addDevice(data);
              } else if (drawerMode === DRAWER_MODES.UPDATE) {
                updateDevice(data.id, data);
              }
            }}
          />
        </Drawer>
      )}
    </DashboardLayout>
  );
};

export default DeviceManagement;
