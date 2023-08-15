import { sortData, filterData, computeStats } from '../src/data-funciones.js';

const fakeData = [
  {
    name: "venusaur",
    type: [
      "fire",
      "flying"
    ],
    stats: {
      "base-attack": "223"
    }
  },
  {
    name: "sludge bomb",
    type: [
      "grass",
    ],
    stats: {
      "base-attack": "200"
    }
  },
  {
    name: "charmeleon",
    type: [
      "fire"
    ],
    stats: {
      "base-attack": "100"
    }
  },
  {
    name: "charizard",
    type: [
      "fire",
      "grass"
    ],
    stats: {
      "base-attack": "80"
    }
  }
]
describe('sortData', () => {
  const orderedData = [
    {
      name: "charizard",
      type: [
        "fire",
        "grass"
      ],
      stats: {
        "base-attack": "80"
      }
    },
    {
      name: "charmeleon",
      type: [
        "fire"
      ],
      stats: {
        "base-attack": "100"
      }
    },
    {
      name: "sludge bomb",
      type: [
        "grass",
      ],
      stats: {
        "base-attack": "200"
      }
    },
    {
      name: "venusaur",
      type: [
        "fire",
        "flying"
      ],
      stats: {
        "base-attack": "223"
      }
    }, 
  ]

  it('returns asc ordered data', () => {
    expect(sortData(fakeData, 'name', 'asc')).toEqual(orderedData);
  });

  it('returns desc ordered data', () => {
    expect(sortData(fakeData, 'name', 'desc')).toEqual(orderedData.reverse());
  });
});

describe('filterData', () => {
  const filteredDataName = [
    {
      name: "charizard",
      type: [
        "fire",
        "grass"
      ],
      stats: {
        "base-attack": "80"
      }
    },
  ]

  const filteredDataType = [
    {
      name: "sludge bomb",
      type: [
        "grass",
      ],
      stats: {
        "base-attack": "200"
      }
    },
    {
      name: "charizard",
      type: [
        "fire",
        "grass"
      ],
      stats: {
        "base-attack": "80"
      }
    }

  ]

  it('returns filtered data by name', () => {
    expect(filterData(fakeData, 'name', 'charizar')).toEqual(filteredDataName);
  });

  it('returns filtered by type', () => {
    expect(filterData(fakeData, 'type', 'grass')).toEqual(filteredDataType);
  });
});

describe('estadistic', () => {
  it('returns a estadistic by base attack', () => {
    expect(computeStats(fakeData, 'base-attack')).toEqual(150.75);
  });

});
