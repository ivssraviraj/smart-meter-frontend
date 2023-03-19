export const getMockDevices = (deviceIDPrefix, deviceNamePrefix, unit) =>
  new Array(14).fill(1).map((item, index) => {
    return {
      id: `${deviceIDPrefix}-${("" + index).padStart(3, "0")}`,
      name: `${deviceNamePrefix} Meter - ${index}`,
      isRunning: Math.random() < 0.5, // start/stop
      isConnectedToCloud: Math.random() < 0.5, // connected to cloud
      isActive: Math.random() < 0.5,
      status: Math.random() < 0.5 ? "Working" : "Failed",
      electricityCapacity: "123 " + unit,
      voltage: "12 V",
      current: "10 A",
      todayUsage: "60 " + unit,
      last24hrUsage: "24 " + unit,
      thisWeekUsage: "7 " + unit,
      thisMonthUsage: "31 " + unit,
      thisYearUsage: "365 " + unit,
    };
  });
