import express from 'express';
import request from 'request';

import pemFile from './certs/pixelcamp.pem';

const router = express.Router();
const vin = 'MOCKPIXEL008';
// const vin = 'WME4534441K237532';
const apiEndpoint = 'https://api.prod.smartservices.car2go.com/vega/';

const options = {
  headers: { 'Content-Type': 'application/json' },
  key: pemFile,
  cert: pemFile,
  agentOptions: { ca: pemFile },
  rejectUnauthorized: false,
};

router.get('/', (req, res) => {
  res.send("I'm alive!");
});

router.get('/status', (req, res) => {
  const fields = [
    'batteryLevel',
    'connection.connected',
    'connection.since',
    'doors.allClosed',
    'doors.leftOpen',
    'doors.locked',
    'doors.rearLeftOpen',
    'doors.rearRightOpen',
    'doors.rightOpen',
    'doors.trunkOpen',
    'engineOn',
    'fuelLevel',
    'geo.latitude',
    'geo.longitude',
    'immobilizerEngaged',
    'mileage',
    'powerState',
  ];

  request(
    {
      ...options,
      uri: `${apiEndpoint}vehicles/${vin}?fields=${fields.join(',')}`,
    },
    (err, resp, body) => {
      res.json(JSON.parse(body));
    },
  );
});

router.get('/localize', (req, res) => {
  request(
    {
      ...options,
      uri: `${apiEndpoint}vehicles/${vin}?fields=geo.latitude,geo.longitude`,
    },
    (err, resp, body) => {
      const ret = JSON.parse(body);
      res.json({ ...ret.geo });
    },
  );
});

router.get('/lock', (req, res) => {
  request(
    {
      ...options,
      method: 'PUT',
      uri: `${apiEndpoint}vehicles/${vin}/doors/lock`,
    },
    () => {
      res.json({ status: true });
    },
  );
});

router.get('/blink', (req, res) => {
  request(
    {
      ...options,
      method: 'PUT',
      uri: `${apiEndpoint}vehicles/${vin}/blink`,
    },
    () => {
      res.json({ status: true });
    },
  );
});

router.get('/unlock', (req, res) => {
  request(
    {
      ...options,
      method: 'PUT',
      uri: `${apiEndpoint}vehicles/${vin}/doors/unlock`,
    },
    () => {
      res.json({ status: true });
    },
  );
});

router.get('/antitheftOn', (req, res) => {
  request(
    {
      ...options,
      method: 'PUT',
      uri: `${apiEndpoint}vehicles/${vin}/immobilizer/engage`,
    },
    () => {
      // it's okay - we don't need to check that
    },
  );

  request(
    {
      ...options,
      uri: `${apiEndpoint}vehicles/${vin}?fields=geo.latitude,geo.longitude`,
    },
    (err, resp, body) => {
      const ret = JSON.parse(body);
      const fenceTolerance = 0.00045;
      const fence = {
        polygons: [{ points: [] }],
      };

      for (let i = 0; i < 360; i += 45) {
        const angle = i * Math.PI / 180;
        fence.polygons[0].points.push({
          latitude: (fenceTolerance * Math.sin(angle) +
            ret.geo.latitude).toFixed(5),
          longitude: (fenceTolerance * Math.cos(angle) +
            ret.geo.longitude).toFixed(5),
        });
      }

      request(
        {
          ...options,
          method: 'POST',
          uri: `${apiEndpoint}vehicles/${vin}/geofences`,
          json: fence,
        },
        (inErr, inResp, inBody) => {
          res.json({ fenceId: inBody.id });
        },
      );
    },
  );
});

router.get('/antitheftOff', (req, res) => {
  const fenceId = req.query.fenceId;

  request(
    {
      ...options,
      method: 'PUT',
      uri: `${apiEndpoint}vehicles/${vin}/immobilizer/disengage`,
    },
    () => {
      // it's okay - we don't need to check that
    },
  );

  request(
    {
      ...options,
      method: 'DELETE',
      uri: `${apiEndpoint}vehicles/${vin}/geofences/${fenceId}`,
    },
    () => {
      res.json({ fenceId: '' });
    },
  );
});

router.get('/activeFence', (req, res) => {
  request(
    {
      ...options,
      method: 'GET',
      uri: `${apiEndpoint}vehicles/${vin}/geofences`,
    },
    (err, resp, body) => {
      const ret = JSON.parse(body);
      if (ret.length > 0) {
        res.json({ fenceId: ret[0].id, points: ret[0].polygons[0].points });
      } else {
        res.json({ fenceId: '' });
      }
    },
  );
});

export default router;
