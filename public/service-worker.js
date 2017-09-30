let swr;

const insidePolygon = (point, vs) => {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  const x = point[0];
  const y = point[1];

  let inside = false;

  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) { // eslint-disable-line no-plusplus, prettier/prettier
    const xi = vs[i][0];
    const yi = vs[i][1];
    const xj = vs[j][0];
    const yj = vs[j][1];

    const intersect =
      yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
};

const notify = () => {
  if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    swr.showNotification('Security fence alert!', {
      badge: '/icon-128.png',
      body:
        "Your SMART was moved from the security fence. Check the map for it's current location",
      icon: '/icon-256.png',
      requireInteraction: true,
      vibration: [400, 400, 400, 400, 400],
    });
  }
};

const fetchLocation = points => {
  fetch('/api/localize', {
    headers: {
      accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      const inFence = insidePolygon(
        [res.longitude, res.latitude],
        points.map(point => [point.longitude, point.latitude]),
      );

      if (!inFence) {
        notify();
      }
    });
};

const fetchFence = () => {
  fetch('/api/activeFence', {
    headers: {
      accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      if (res.fenceId) {
        fetchLocation(res.points);
      }
    });
};

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  swr = event.currentTarget.registration;

  setInterval(() => {
    fetchFence();
  }, 10000);
});
