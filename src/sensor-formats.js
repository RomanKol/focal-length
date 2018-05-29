const sensors = [
  {
    name: '1/3.0″',
    width: 4.80,
    height: 3.60,
  },
  {
    name: '1/2.5″',
    width: 5.76,
    height: 4.29,
  },
  {
    name: '1/2.3″',
    width: 6.17,
    height: 4.56,
  },
  {
    name: '1/2″',
    width: 6.4,
    height: 4.8,
  },
  {
    name: '1/1.7″',
    width: 7.60,
    height: 5.70,
  },
  {
    name: '2/3″',
    width: 8.80,
    height: 6.60,
  },
  {
    name: '16mm film frame',
    width: 10.26,
    height: 7.49,
  },
  {
    name: '1”',
    width: 13.20,
    height: 8.80,
  },
  {
    name: 'Micro Four Thirds, 4/3',
    width: 17.30,
    height: 13,
  },
  {
    name: 'Canon APS-C',
    width: 22.20,
    height: 14.80,
  },
  {
    name: 'APS-C',
    width: 23.6,
    height: 15.60,
  },
  {
    name: '35mm full frame',
    width: 36,
    height: 24,
  },
  {
    name: 'Medium format',
    width: 43.8,
    height: 32.8,
  },
  {
    name: 'Hasselblad medium format',
    width: 53.7,
    height: 40.2,
  },
  {
    name: 'IMAX film frame',
    width: 70.41,
    height: 52.63,
  },
];

const FULLFRAMEDIAGONAL = Math.sqrt((36 ** 2) + (24 ** 2));

/**
 * Rounds a number with the given precision
 * @description Does not round correctly: round(1.005, 2) => 1.0, expecpted 1.01!
 * @param {number} number - the number to round
 * @param {number} precision - the presision
 * @return {number}
 */
const round = (number, precision = 2) => {
  const factor = (10 ** precision);
  return Math.round(number * factor) / factor;
};

export default sensors
  .map((sensor) => {
    const diagonal = round(Math.sqrt((sensor.width ** 2) + (sensor.height ** 2)), 2);
    const area = round(sensor.width * sensor.height, 2);
    const crop = round(FULLFRAMEDIAGONAL / diagonal, 2);
    return {
      ...sensor,
      diagonal,
      area,
      crop,
    };
  })
  .sort((a, b) => {
    if (a.crop > b.crop) return -1;
    if (a.crop < b.crop) return 1;
    return 0;
  });
