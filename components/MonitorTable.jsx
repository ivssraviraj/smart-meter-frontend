import { Table } from "antd";
import React from "react";
import { DEVICE_METER_TYPES } from "../constants";

const rows = [
  {
    label: "Device Name",
    key: "name",
  },
  { label: "", key: "image" },
  {
    label: "Work Status",
    key: "status",
  },
  {
    label: "Electricity Capacity",
    key: "electricityCapacity",
  },
  {
    label: "Voltage",
    key: "voltage",
  },
  {
    label: "Current",
    key: "current",
  },
  {
    label: "Today Usage",
    key: "todayUsage",
  },
  {
    label: "Last 24hr Usage",
    key: "last24hrUsage",
  },
  {
    label: "This Week's Usage",
    key: "thisWeekUsage",
  },
  {
    label: "This Month's Usage",
    key: "thisMonthUsage",
  },
  {
    label: "This Year's Usage",
    key: "thisYearUsage",
  },
];

const MonitorTable = ({ list = [], meterType }) => {
  const columns = list.map((device, index) => {
    return {
      label: <b>dsf{device.name}</b>,
      key: device.id,
      width: 400,
      render: (_, rowData) => {
        const value = list[index][rowData.key];
        if (rowData.key === "name") {
          return <b>{value}</b>;
        }
        if (rowData.key === "image") {
          const src =
            meterType === DEVICE_METER_TYPES.ELECTRIC
              ? "/electric.png"
              : "/water.png";
          return (
            <img
              src={src}
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
            />
          );
        }

        if (rowData.key === "status") {
          return (
            <span
              style={{
                fontWeight: 700,
                color: value === "Working" ? "green" : "red",
              }}
            >
              {value}
            </span>
          );
        }
        return value;
      },
    };
  });

  columns.unshift({
    label: "",
    dataKey: "",
    width: 300,
    fixed: true,
    render: (_, rowData, index) => {
      return <b>{rowData.label}</b>;
    },
  });

  return (
    <div>
      <Table
        dataSource={rows}
        columns={columns}
        showHeader={false}
        pagination={false}
        scroll={{ x: "101%" }}
      />
    </div>
  );
};

export default MonitorTable;
