import { DatePicker } from "antd";
import { Select } from "antd";
import { Button, Checkbox, Row, Col, Form, Input } from "antd";
import React, { useState, useEffect, Fragment } from "react";

const ConfForm = ({ values, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const onFinish = (values) => {
    onSubmit(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
  };
  return (
    <Form
      name="conf-form"
      labelCol={{
        span: 12,
      }}
      labelAlign="left"
      form={form}
      wrapperCol={{
        span: 8,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={[10, 10]}>
        <Col span={8}>
          <Form.Item
            label="Select Communication Protocol"
            name="communicationProtocol"
            rules={[
              {
                required: true,
                message: "Please Select a Communication Protocol",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "TCP/IP",
                  label: "TCP/IP",
                },
                {
                  value: "UDP",
                  label: "UDP",
                },
              ]}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Select Data Reporting Interval"
            name="dataReportingInterval"
            rules={[
              {
                required: true,
                message: "Please Select a Data Reporting Interval",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "30s",
                  label: "30 Seconds",
                },
                {
                  value: "1m",
                  label: "1 Minute",
                },
              ]}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Select Electronic Loads"
            name="electronicLoads"
            rules={[
              {
                required: true,
                message: "Please Select an Electronic Load",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "AC",
                  label: "AC",
                },
                {
                  value: "DC",
                  label: "DC",
                },
              ]}
            ></Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        wrapperCol={{
          span: 8,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ConfForm;
