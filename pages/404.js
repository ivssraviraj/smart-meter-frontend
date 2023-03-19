import { Typography } from "antd";
import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Button, Result } from "antd";

const NotFound = () => {
  return (
    <DashboardLayout>
      <Result
        status="404"
        title="Coming Soon..."
        subTitle="We are happy that you are interested in this feature."
        extra={
          <Button type="primary" href="/dashboard">
            Explore Dashboard
          </Button>
        }
      />
    </DashboardLayout>
  );
};

export default NotFound;
