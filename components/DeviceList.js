import { Space, Button } from "antd";
import { Table } from "antd";
import React from "react";

const DeviceList = ({ list, onClickEdit, onDelete, columns }) => {
  return (
    <Table
      pagination={{
        pageSize: 5,
      }}
      rowKey="id"
      columns={columns}
      dataSource={list}
    />
  );
};

export default DeviceList;
