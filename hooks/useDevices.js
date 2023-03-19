import React, { useState, useCallback, useEffect } from "react";
import { DEVICE_METER_TYPES } from "../constants";
import { getMockDevices } from "../mockData";

export async function fetchDevices(
  deviceType = DEVICE_METER_TYPES.ELECTRIC /* Any Other Args */
) {
  switch (deviceType) {
    case DEVICE_METER_TYPES.ELECTRIC:
      return Promise.resolve(getMockDevices("EMT", "Electric Device", "KWh"));
    case DEVICE_METER_TYPES.WATER:
      return Promise.resolve(getMockDevices("WATER", "Water Device", "gal"));
    default:
      return Promise.resolve();
  }
}

export async function createDevice(deviceData) {
  /* MAKE CREATE DEVICE CALL */
  return Promise.resolve(deviceData);
}

export function useDevices() {
  const [electricDevices, setElectricDevices] = useState([]);
  const [waterDevices, setWaterDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      fetchDevices(DEVICE_METER_TYPES.ELECTRIC),
      fetchDevices(DEVICE_METER_TYPES.WATER),
    ])
      .then(([electricDevicesResponse, waterDevicesResponse]) => {
        if (electricDevicesResponse.status === "fulfilled") {
          setElectricDevices(electricDevicesResponse.value);
        }
        if (waterDevicesResponse.status === "fulfilled") {
          setWaterDevices(waterDevicesResponse.value);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const addDevice = useCallback((newDeviceData) => {
    console.log("CREATING DEVICE");
    createDevice(newDeviceData).then((newDevice) => {
      // Add to list
    });
  }, []);

  const updateDevice = useCallback((deviceID, deviceInfoToBeUpdated) => {
    console.log("UPDATING DEVICE", deviceID, deviceInfoToBeUpdated);
    // Implement Your API calls to UPDATE Electric/Water Devices
  }, []);

  const deleteDevice = useCallback((deviceID) => {
    console.log("DELETING DEVICE", deviceID);
    // Implement Your API calls to DELETE Electric/Water Devices
  }, []);

  return {
    waterDevices,
    electricDevices,
    addDevice,
    updateDevice,
    deleteDevice,
  };
}
