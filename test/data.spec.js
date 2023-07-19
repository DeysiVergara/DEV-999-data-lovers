import { sortPokemon, filterPokemon, estadistic } from '../src/data.js';

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
describe('sortPokemon', () => {
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

  it('returns acs ordered data', () => {
    expect(sortPokemon(fakeData, 'name', 'asc')).toEqual(orderedData);
  });

  it('returns desc ordered data', () => {
    expect(sortPokemon(fakeData, 'name', 'desc')).toEqual(orderedData.reverse());
  });
});

describe('filterPokemon', () => {
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
    expect(filterPokemon(fakeData, 'name', 'charizar')).toEqual(filteredDataName);
  });

  it('returns filtered by type', () => {
    expect(filterPokemon(fakeData, 'type', 'grass')).toEqual(filteredDataType);
  });
});

describe('estadistic', () => {
  it('returns a estadistic by base attack', () => {
    expect(estadistic(fakeData)).toEqual(150.75);
  });

});
