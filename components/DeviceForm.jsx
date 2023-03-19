import { DatePicker } from "antd";
import { Button, Checkbox, Row, Col, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { DEVICE_METER_TYPES } from "../constants";

const DeviceForm = ({ type, values, onSubmit, readOnly }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
    return () => {};
  }, [form, values]);

  const onFinish = (values) => {
    console.log("Success:", values);
    onSubmit(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      disabled={readOnly}
      requiredMark={!readOnly}
      name="basic"
      labelCol={{
        span: 10,
      }}
      labelAlign="left"
      form={form}
      wrapperCol={{
        span: 14,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={[10, 10]}>
        <Col span={8}>
          <Form.Item
            label="Device Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please Provide Device Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Model" name="model" rules={[]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Installation Date"
            name="installationDate"
            rules={[]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={8}>
          <Form.Item label="Device ID" name="id" rules={[]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {type === DEVICE_METER_TYPES.ELECTRIC && (
            <Form.Item
              label="Amperage Capacity"
              name="amperageCapacity"
              rules={[]}
            >
              <Input />
            </Form.Item>
          )}
          {type === DEVICE_METER_TYPES.WATER && (
            <Form.Item label="Power" name="power" rules={[]}>
              <Input />
            </Form.Item>
          )}
        </Col>
        <Col span={8}>
          <Form.Item label="Dimensions" name="dimensions" rules={[]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={8}>
          <Form.Item label="Location" name="location" rules={[]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {type === DEVICE_METER_TYPES.ELECTRIC && (
            <Form.Item
              label="Installation Method"
              name="installationMethod"
              rules={[]}
            >
              <Input />
            </Form.Item>
          )}
          {type === DEVICE_METER_TYPES.WATER && (
            <Form.Item
              label="Batteries Included?"
              name="batteriesIncluded"
              rules={[]}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          )}
        </Col>
        <Col span={8}>
          <Form.Item label="Deployment Date" name="deploymentDate" rules={[]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={8}>
          <Form.Item label="Manufacturer" name="manufacturer" rules={[]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {type === DEVICE_METER_TYPES.ELECTRIC && (
            <Form.Item
              label="Measurement Accuracy"
              name="measurementAccuracy"
              rules={[]}
            >
              <Input />
            </Form.Item>
          )}
          {type === DEVICE_METER_TYPES.WATER && (
            <Form.Item
              label="Battery Cell Type"
              name="batteryCellType"
              rules={[]}
            >
              <Input />
            </Form.Item>
          )}
        </Col>
        <Col span={8}>
          {type === DEVICE_METER_TYPES.ELECTRIC && (
            <Form.Item label="Power" name="power" rules={[]}>
              <Input />
            </Form.Item>
          )}
          {type === DEVICE_METER_TYPES.WATER && (
            <Form.Item label="Item Weight" name="weight" rules={[]}>
              <Input />
            </Form.Item>
          )}
        </Col>
      </Row>

      {!readOnly && (
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
      )}
    </Form>
  );
};

export default DeviceForm;
