import type { Province, Country } from '../types/game.types';

// Static adjacency graph for pathfinding and AE spread
export const ADJACENCY_GRAPH: Record<string, string[]> = {
  "vienna": [
    "prague",
    "pest",
    "venice",
    "mantua",
    "milan",
    "north_italy_austuria"
  ],
  "prague": [
    "silesia",
    "vienna"
  ],
  "silesia": [
    "prague"
  ],
  "pest": [
    "vienna",
    "belgrade",
    "transylvania",
    "croatia"
  ],
  "transylvania": [
    "pest",
    "targoviste",
    "bulgaria"
  ],
  "croatia": [
    "pest",
    "belgrade",
    "bosna",
    "venice",
    "istria"
  ],
  "targoviste": [
    "transylvania",
    "bulgaria"
  ],
  "belgrade": [
    "pest",
    "croatia",
    "bosna"
  ],
  "bosna": [
    "croatia",
    "belgrade"
  ],
  "constantinople": [
    "macedonia",
    "bulgaria",
    "ankara"
  ],
  "morea": [
    "albania"
  ],
  "macedonia": [
    "bulgaria",
    "albania",
    "constantinople"
  ],
  "ankara": [
    "constantinople",
    "kastamonu",
    "karaman"
  ],
  "smyrna": [
    "karaman"
  ],
  "karaman": [
    "ankara",
    "sinope",
    "smyrna",
    "adana",
    "kadirli"
  ],
  "sinope": [
    "kastamonu",
    "karaman"
  ],
  "adana": [
    "karaman",
    "kadirli"
  ],
  "kadirli": [
    "adana",
    "karaman"
  ],
  "kastamonu": [
    "ankara",
    "sinope"
  ],
  "albania": [
    "macedonia",
    "morea"
  ],
  "bulgaria": [
    "targoviste",
    "transylvania",
    "macedonia",
    "constantinople"
  ],
  "venice": ["ferrara", "mantua", "croatia", "vienna", "istria"],
  "milan": ["mantua", "vienna", "genoa", "switzerland", "savoy", "north_italy_austuria"],
  "mantua": ["venice", "milan", "ferrara", "vienna", "north_italy_austuria"],
  "ferrara": ["venice", "mantua", "florence", "genoa", "rome"],
  "florence": ["ferrara", "siena", "rome", "genoa"],
  "siena": ["florence", "rome", "genoa_sardinia"],
  "genoa_sardinia": ["siena", "naples_sardinia", "rome", "genoa"],
  "genoa": ["milan", "ferrara", "florence", "savoy", "switzerland", "genoa_sardinia"],
  "rome": ["florence", "ferrara", "siena", "genoa_sardinia", "naples"],
  "naples": ["rome", "naples_sardinia"],
  "naples_sardinia": ["naples", "genoa_sardinia"],
  "savoy": ["milan", "genoa", "switzerland"],
  "switzerland": ["milan", "genoa", "savoy"],
  "north_italy_austuria": ["istria", "mantua", "milan", "vienna"],
  "istria": ["croatia", "venice", "north_italy_austuria"]
};

// Static physical capitals coordinates on our SVG map viewport
export const PROVINCE_COORDINATES: Record<string, { x: number; y: number }> = {
  "vienna": {
    "x": 341,
    "y": 203
  },
  "prague": {
    "x": 351,
    "y": 134
  },
  "silesia": {
    "x": 364,
    "y": 105
  },
  "pest": {
    "x": 414,
    "y": 203
  },
  "transylvania": {
    "x": 470,
    "y": 191
  },
  "croatia": {
    "x": 360,
    "y": 265
  },
  "targoviste": {
    "x": 503,
    "y": 253
  },
  "belgrade": {
    "x": 432,
    "y": 296
  },
  "bosna": {
    "x": 389,
    "y": 289
  },
  "constantinople": {
    "x": 560,
    "y": 322
  },
  "morea": {
    "x": 473,
    "y": 449
  },
  "macedonia": {
    "x": 486,
    "y": 378
  },
  "ankara": {
    "x": 625,
    "y": 351
  },
  "smyrna": {
    "x": 593,
    "y": 412
  },
  "karaman": {
    "x": 660,
    "y": 407
  },
  "sinope": {
    "x": 707,
    "y": 330
  },
  "adana": {
    "x": 705,
    "y": 415
  },
  "kadirli": {
    "x": 728,
    "y": 372
  },
  "kastamonu": {
    "x": 654,
    "y": 305
  },
  "albania": {
    "x": 426,
    "y": 351
  },
  "bulgaria": {
    "x": 501,
    "y": 294
  },
"venice": { "x": 284, "y": 242 },
  "milan": { "x": 255, "y": 239 },
  "mantua": { "x": 275, "y": 251 },
  "ferrara": { "x": 281, "y": 275 },
  "florence": { "x": 280, "y": 288 },
  "siena": { "x": 278, "y": 310 },
  "genoa_sardinia": { "x": 241, "y": 322 },
  "genoa": { "x": 241, "y": 270 },
  "rome": { "x": 300, "y": 344 },
  "naples": { "x": 325, "y": 375 },
  "naples_sardinia": { "x": 234, "y": 378 },
  "savoy": { "x": 213, "y": 233 },
"switzerland": { "x": 244, "y": 203 }
,
  "north_italy_austuria": { "x": 288, "y": 206 },
  "istria": { "x": 220, "y": 270 }};

export const INITIAL_PROVINCES: Record<string, Province> = {
  "vienna": {
    "id": "vienna",
    "name": "Vienna",
    "owner": "HAB",
    "controller": "HAB",
    "isHreProvince": true,
    "isCapital": true,
    "culture": "Austrian",
    "religion": "Catholic",
    "terrain": "Plains",
    "adjacentProvinces": [
      "prague",
      "pest",
      "venice",
      "mantua",
      "milan",
      "north_italy_austuria"
    ],
    "development": {
      "adm": 6,
      "dip": 5,
      "mil": 5
    },
    "cores": [
      "HAB"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": true,
      "barracks": false,
      "fort": true
    }
  },
  "prague": {
    "id": "prague",
    "name": "Prague",
    "owner": "BOH",
    "controller": "BOH",
    "isHreProvince": true,
    "isCapital": true,
    "culture": "Czech",
    "religion": "Catholic",
    "terrain": "Plains",
    "adjacentProvinces": [
      "silesia",
      "vienna"
    ],
    "development": {
      "adm": 6,
      "dip": 5,
      "mil": 5
    },
    "cores": [
      "BOH"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 2,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": true,
      "barracks": false,
      "fort": true
    }
  },
  "silesia": {
    "id": "silesia",
    "name": "Silesia",
    "owner": "BOH",
    "controller": "BOH",
    "isHreProvince": true,
    "isCapital": false,
    "culture": "Silesian",
    "religion": "Catholic",
    "terrain": "Plains",
    "adjacentProvinces": [
      "prague"
    ],
    "development": {
      "adm": 3,
      "dip": 2,
      "mil": 3
    },
    "cores": [
      "BOH"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 10,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": false
    }
  },
  "pest": {
    "id": "pest",
    "name": "Pest",
    "owner": "HUN",
    "controller": "HUN",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Hungarian",
    "religion": "Catholic",
    "terrain": "Plains",
    "adjacentProvinces": [
      "vienna",
      "belgrade",
      "transylvania",
      "croatia"
    ],
    "development": {
      "adm": 5,
      "dip": 4,
      "mil": 5
    },
    "cores": [
      "HUN"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": true,
      "barracks": false,
      "fort": true
    }
  },
  "transylvania": {
    "id": "transylvania",
    "name": "Transylvania",
    "owner": "HUN",
    "controller": "HUN",
    "isHreProvince": false,
    "isCapital": false,
    "culture": "Hungarian",
    "religion": "Catholic",
    "terrain": "Mountains",
    "adjacentProvinces": [
      "pest",
      "targoviste",
      "bulgaria"
    ],
    "development": {
      "adm": 3,
      "dip": 2,
      "mil": 3
    },
    "cores": [
      "HUN"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 20,
    "minimumAutonomy": 0,
    "unrest": 1,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": true
    }
  },
  "croatia": {
    "id": "croatia",
    "name": "Croatia",
    "owner": "HUN",
    "controller": "HUN",
    "isHreProvince": false,
    "isCapital": false,
    "culture": "Croatian",
    "religion": "Catholic",
    "terrain": "Hills",
    "adjacentProvinces": [
      "pest",
      "belgrade",
      "bosna",
      "venice",
      "istria"
    ],
    "development": {
      "adm": 2,
      "dip": 2,
      "mil": 2
    },
    "cores": [
      "HUN"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 25,
    "minimumAutonomy": 0,
    "unrest": 2,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": false
    }
  },
  "targoviste": {
    "id": "targoviste",
    "name": "Targoviste",
    "owner": "WAL",
    "controller": "WAL",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Romanian",
    "religion": "Orthodox",
    "terrain": "Hills",
    "adjacentProvinces": [
      "transylvania",
      "bulgaria"
    ],
    "development": {
      "adm": 3,
      "dip": 3,
      "mil": 4
    },
    "cores": [
      "WAL"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": true
    }
  },
  "belgrade": {
    "id": "belgrade",
    "name": "Belgrade",
    "owner": "SER",
    "controller": "SER",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Serbian",
    "religion": "Orthodox",
    "terrain": "Plains",
    "adjacentProvinces": [
      "pest",
      "croatia",
      "bosna"
    ],
    "development": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "cores": [
      "SER",
      "HUN"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": true
    }
  },
  "bosna": {
    "id": "bosna",
    "name": "Bosnia",
    "owner": "BOS",
    "controller": "BOS",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Bosnian",
    "religion": "Catholic",
    "terrain": "Mountains",
    "adjacentProvinces": [
      "croatia",
      "belgrade"
    ],
    "development": {
      "adm": 3,
      "dip": 3,
      "mil": 2
    },
    "cores": [
      "BOS"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": true
    }
  },
  "constantinople": {
    "id": "constantinople",
    "name": "Constantinople",
    "owner": "BYZ",
    "controller": "BYZ",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Greek",
    "religion": "Orthodox",
    "terrain": "Plains",
    "adjacentProvinces": [
      "macedonia",
      "bulgaria",
      "ankara"
    ],
    "development": {
      "adm": 8,
      "dip": 8,
      "mil": 4
    },
    "cores": [
      "BYZ",
      "TUR"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": true,
      "barracks": false,
      "fort": true
    }
  },
  "morea": {
    "id": "morea",
    "name": "Morea",
    "owner": "BYZ",
    "controller": "BYZ",
    "isHreProvince": false,
    "isCapital": false,
    "culture": "Greek",
    "religion": "Orthodox",
    "terrain": "Hills",
    "adjacentProvinces": [
      "albania"
    ],
    "development": {
      "adm": 2,
      "dip": 2,
      "mil": 2
    },
    "cores": [
      "BYZ"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 10,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": false
    }
  },
  "macedonia": {
    "id": "macedonia",
    "name": "Macedonia",
    "owner": "TUR",
    "controller": "TUR",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Greek",
    "religion": "Orthodox",
    "terrain": "Hills",
    "adjacentProvinces": [
      "bulgaria",
      "albania",
      "constantinople"
    ],
    "development": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "cores": [
      "TUR",
      "BYZ"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 15,
    "minimumAutonomy": 0,
    "unrest": 2,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": false
    }
  },
  "bulgaria": {
    "id": "bulgaria",
    "name": "Balkan",
    "owner": "TUR",
    "controller": "TUR",
    "isHreProvince": false,
    "isCapital": false,
    "culture": "Bulgarian",
    "religion": "Orthodox",
    "terrain": "Hills",
    "adjacentProvinces": [
      "targoviste",
      "transylvania",
      "macedonia",
      "constantinople"
    ],
    "development": {
      "adm": 3,
      "dip": 2,
      "mil": 3
    },
    "cores": [
      "TUR"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 15,
    "minimumAutonomy": 0,
    "unrest": 2,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": true
    }
  },
  "smyrna": {
    "id": "smyrna",
    "name": "İzmir",
    "owner": "TUR",
    "controller": "TUR",
    "isHreProvince": false,
    "isCapital": false,
    "culture": "Turkish",
    "religion": "Sunni",
    "terrain": "Plains",
    "adjacentProvinces": [
      "karaman"
    ],
    "development": {
      "adm": 3,
      "dip": 4,
      "mil": 3
    },
    "cores": [
      "TUR"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": false
    }
  },
  "ankara": {
    "id": "ankara",
    "name": "Ankara",
    "owner": "TUR",
    "controller": "TUR",
    "isHreProvince": false,
    "isCapital": false,
    "culture": "Turkish",
    "religion": "Sunni",
    "terrain": "Hills",
    "adjacentProvinces": [
      "constantinople",
      "kastamonu",
      "karaman"
    ],
    "development": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "cores": [
      "TUR"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": false
    }
  },
  "kastamonu": {
    "id": "kastamonu",
    "name": "Kastamonu",
    "owner": "CAN",
    "controller": "CAN",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Turkish",
    "religion": "Sunni",
    "terrain": "Mountains",
    "adjacentProvinces": [
      "ankara",
      "sinope"
    ],
    "development": {
      "adm": 2,
      "dip": 2,
      "mil": 2
    },
    "cores": [
      "CAN"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": false
    }
  },
  "sinope": {
    "id": "sinope",
    "name": "Çorum",
    "owner": "TUR",
    "controller": "TUR",
    "isHreProvince": false,
    "isCapital": false,
    "culture": "Turkish",
    "religion": "Sunni",
    "terrain": "Plains",
    "adjacentProvinces": [
      "kastamonu",
      "karaman"
    ],
    "development": {
      "adm": 3,
      "dip": 2,
      "mil": 2
    },
    "cores": [
      "TUR"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": true
    }
  },
  "karaman": {
    "id": "karaman",
    "name": "Karaman",
    "owner": "KRM",
    "controller": "KRM",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Turkish",
    "religion": "Sunni",
    "terrain": "Mountains",
    "adjacentProvinces": [
      "ankara",
      "sinope",
      "smyrna",
      "adana",
      "kadirli"
    ],
    "development": {
      "adm": 4,
      "dip": 3,
      "mil": 3
    },
    "cores": [
      "KRM"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": true
    }
  },
  "kadirli": {
    "id": "kadirli",
    "name": "Kadirli",
    "owner": "DUL",
    "controller": "DUL",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Turkish",
    "religion": "Sunni",
    "terrain": "Hills",
    "adjacentProvinces": [
      "adana",
      "karaman"
    ],
    "development": {
      "adm": 2,
      "dip": 2,
      "mil": 2
    },
    "cores": [
      "DUL"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": false
    }
  },
  "adana": {
    "id": "adana",
    "name": "Adana",
    "owner": "RAM",
    "controller": "RAM",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Turkish",
    "religion": "Sunni",
    "terrain": "Hills",
    "adjacentProvinces": [
      "karaman",
      "kadirli"
    ],
    "development": {
      "adm": 3,
      "dip": 2,
      "mil": 2
    },
    "cores": [
      "RAM"
    ],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": false,
      "fort": false
    }
  },
  "albania": {
    "id": "albania",
    "name": "Albania",
    "owner": "ALB",
    "controller": "ALB",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Albanian",
    "religion": "Orthodox",
    "terrain": "Mountains",
    "adjacentProvinces": [
      "macedonia",
      "morea"
    ],
    "development": {
      "adm": 2,
      "dip": 2,
      "mil": 3
    },
    "cores": [
      "ALB"
    ],
    "claims": [
      "TUR"
    ],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": {
      "workshop": false,
      "church": false,
      "barracks": true,
      "fort": true
    }
  },
  "venice": {
    "id": "venice",
    "name": "Venice",
    "owner": "VEN",
    "controller": "VEN",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Venetian",
    "religion": "Catholic",
    "terrain": "Plains",
    "adjacentProvinces": ["venice", "ferrara", "mantua", "istria"],
    "development": { "adm": 7, "dip": 8, "mil": 4 },
    "cores": ["VEN"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": true, "barracks": false, "fort": true }
  },
  "milan": {
    "id": "milan",
    "name": "Milan",
    "owner": "MLN",
    "controller": "MLN",
    "isHreProvince": true,
    "isCapital": true,
    "culture": "Lombard",
    "religion": "Catholic",
    "terrain": "Plains",
    "adjacentProvinces": ["mantua", "vienna", "genoa", "switzerland", "savoy", "north_italy_austuria"],
    "development": { "adm": 5, "dip": 5, "mil": 4 },
    "cores": ["MLN"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": true, "barracks": false, "fort": true }
  },
  "mantua": {
    "id": "mantua",
    "name": "Mantua",
    "owner": "MNT",
    "controller": "MNT",
    "isHreProvince": true,
    "isCapital": true,
    "culture": "Lombard",
    "religion": "Catholic",
    "terrain": "Plains",
    "adjacentProvinces": ["venice", "milan", "ferrara", "vienna", "north_italy_austuria"],
    "development": { "adm": 3, "dip": 3, "mil": 2 },
    "cores": ["MNT"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": true }
  },
  "ferrara": {
    "id": "ferrara",
    "name": "Ferrara",
    "owner": "FER",
    "controller": "FER",
    "isHreProvince": true,
    "isCapital": true,
    "culture": "Romagnan",
    "religion": "Catholic",
    "terrain": "Plains",
    "adjacentProvinces": ["venice", "mantua", "florence", "genoa", "rome"],
    "development": { "adm": 4, "dip": 4, "mil": 2 },
    "cores": ["FER"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": true }
  },
  "florence": {
    "id": "florence",
    "name": "Florence",
    "owner": "FLR",
    "controller": "FLR",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Tuscan",
    "religion": "Catholic",
    "terrain": "Hills",
    "adjacentProvinces": ["ferrara", "siena", "rome", "genoa"],
    "development": { "adm": 6, "dip": 6, "mil": 4 },
    "cores": ["FLR"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": true, "barracks": false, "fort": true }
  },
  "siena": {
    "id": "siena",
    "name": "Siena",
    "owner": "SIE",
    "controller": "SIE",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Tuscan",
    "religion": "Catholic",
    "terrain": "Hills",
    "adjacentProvinces": ["florence", "rome", "genoa_sardinia"],
    "development": { "adm": 3, "dip": 3, "mil": 2 },
    "cores": ["SIE"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": true }
  },
  "genoa_sardinia": {
    "id": "genoa_sardinia",
    "name": "Sardinia",
    "owner": "GEN",
    "controller": "GEN",
    "isHreProvince": false,
    "isCapital": false,
    "culture": "Sardinian",
    "religion": "Catholic",
    "terrain": "Hills",
    "adjacentProvinces": ["siena", "naples_sardinia", "rome", "genoa"],
    "development": { "adm": 2, "dip": 2, "mil": 2 },
    "cores": ["GEN"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 25,
    "minimumAutonomy": 0,
    "unrest": 1,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": false }
  },
  "genoa": {
    "id": "genoa",
    "name": "Genoa",
    "owner": "GEN",
    "controller": "GEN",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Ligurian",
    "religion": "Catholic",
    "terrain": "Hills",
    "adjacentProvinces": ["milan", "ferrara", "florence", "savoy", "switzerland", "genoa_sardinia"],
    "development": { "adm": 5, "dip": 7, "mil": 3 },
    "cores": ["GEN"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": true }
  },
  "rome": {
    "id": "rome",
    "name": "Rome",
    "owner": "PAP",
    "controller": "PAP",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Umbrian",
    "religion": "Catholic",
    "terrain": "Hills",
    "adjacentProvinces": ["florence", "ferrara", "siena", "genoa_sardinia", "naples"],
    "development": { "adm": 5, "dip": 5, "mil": 3 },
    "cores": ["PAP"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": true, "barracks": false, "fort": true }
  },
  "naples": {
    "id": "naples",
    "name": "Naples",
    "owner": "NAP",
    "controller": "NAP",
    "isHreProvince": false,
    "isCapital": true,
    "culture": "Neapolitan",
    "religion": "Catholic",
    "terrain": "Plains",
    "adjacentProvinces": ["rome", "naples_sardinia"],
    "development": { "adm": 5, "dip": 4, "mil": 4 },
    "cores": ["NAP"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": true, "barracks": false, "fort": true }
  },
  "naples_sardinia": {
    "id": "naples_sardinia",
    "name": "Calabria",
    "owner": "NAP",
    "controller": "NAP",
    "isHreProvince": false,
    "isCapital": false,
    "culture": "Neapolitan",
    "religion": "Catholic",
    "terrain": "Hills",
    "adjacentProvinces": ["naples", "genoa_sardinia"],
    "development": { "adm": 2, "dip": 2, "mil": 2 },
    "cores": ["NAP"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 20,
    "minimumAutonomy": 0,
    "unrest": 1,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": false }
  },
  "savoy": {
    "id": "savoy",
    "name": "Savoy",
    "owner": "SAV",
    "controller": "SAV",
    "isHreProvince": true,
    "isCapital": true,
    "culture": "Piedmontese",
    "religion": "Catholic",
    "terrain": "Mountains",
    "adjacentProvinces": ["milan", "genoa", "switzerland"],
    "development": { "adm": 4, "dip": 3, "mil": 3 },
    "cores": ["SAV"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": true }
  },
  "switzerland": {
    "id": "switzerland",
    "name": "Switzerland",
    "owner": "SWI",
    "controller": "SWI",
    "isHreProvince": true,
    "isCapital": true,
    "culture": "Swiss",
    "religion": "Catholic",
    "terrain": "Mountains",
    "adjacentProvinces": ["milan", "genoa", "savoy"],
    "development": { "adm": 3, "dip": 3, "mil": 3 },
    "cores": ["SWI"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 0,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": true }
  },
  "north_italy_austuria": {
    "id": "north_italy_austuria",
    "name": "Trentino",
    "owner": "HAB",
    "controller": "HAB",
    "isHreProvince": true,
    "isCapital": false,
    "culture": "Austrian",
    "religion": "Catholic",
    "terrain": "Mountains",
    "adjacentProvinces": ["istria", "mantua", "milan", "vienna"],
    "development": { "adm": 3, "dip": 2, "mil": 2 },
    "cores": ["HAB"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 20,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": false }
  },
  "istria": {
    "id": "istria",
    "name": "Istria",
    "owner": "VEN",
    "controller": "VEN",
    "isHreProvince": true,
    "isCapital": false,
    "culture": "Venetian",
    "religion": "Catholic",
    "terrain": "Hills",
    "adjacentProvinces": ["croatia", "venice", "north_italy_austuria"],
    "development": { "adm": 2, "dip": 3, "mil": 2 },
    "cores": ["VEN"],
    "claims": [],
    "coringProgress": null,
    "autonomy": 15,
    "minimumAutonomy": 0,
    "unrest": 0,
    "rebelProgress": 0,
    "rebelType": "None",
    "buildings": { "workshop": false, "church": false, "barracks": false, "fort": false }
  },
};

export const INITIAL_COUNTRIES: Record<string, Country> = {
  "HAB": {
    "tag": "HAB",
    "name": "Austria",
    "color": "#ebf5fb",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 150,
    "manpower": 10000,
    "maxManpower": 15000,
    "prestige": 10,
    "stability": 1,
    "crownLand": 65,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "vienna",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 7,
      "dip": 7,
      "mil": 8
    },
    "monarch": {
      "name": "Friedrich V",
      "dynasty": "Habsburg",
      "age": 29,
      "adm": 2,
      "dip": 2,
      "mil": 4,
      "isRegent": false
    },
    "heir": {
      "name": "Maximilian",
      "dynasty": "Habsburg",
      "age": 0,
      "adm": 4,
      "dip": 4,
      "mil": 5,
      "claim": 100
    },
    "dynasty": "Habsburg",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "HUN": 50,
      "BOH": -10,
      "TUR": -80
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 50,
        "influence": 30,
        "landShare": 15,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 25,
        "landShare": 10,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 50,
        "influence": 20,
        "landShare": 5,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "BOH": {
    "tag": "BOH",
    "name": "Bohemia",
    "color": "#85929e",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 110,
    "manpower": 8000,
    "maxManpower": 12000,
    "prestige": 5,
    "stability": 0,
    "crownLand": 70,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "prague",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 7,
      "dip": 5,
      "mil": 5
    },
    "monarch": {
      "name": "Jiri z Podebrad",
      "dynasty": "Podebrad",
      "age": 24,
      "adm": 4,
      "dip": 2,
      "mil": 2,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Podebrad",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "HAB": -10,
      "HUN": -30,
      "TUR": -40
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 50,
        "influence": 35,
        "landShare": 15,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 45,
        "influence": 20,
        "landShare": 8,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 50,
        "influence": 25,
        "landShare": 5,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "HUN": {
    "tag": "HUN",
    "name": "Hungary",
    "color": "#d9534f",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 130,
    "manpower": 12000,
    "maxManpower": 18000,
    "prestige": 15,
    "stability": 1,
    "crownLand": 60,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "pest",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 8,
      "dip": 9,
      "mil": 9
    },
    "monarch": {
      "name": "Janos Hunyadi",
      "dynasty": "Hunyadi",
      "age": 37,
      "adm": 4,
      "dip": 5,
      "mil": 5,
      "isRegent": true
    },
    "heir": {
      "name": "Laszlo V",
      "dynasty": "Habsburg",
      "age": 4,
      "adm": 2,
      "dip": 2,
      "mil": 2,
      "claim": 100
    },
    "dynasty": "Hunyadi",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "HAB": 50,
      "SER": 35,
      "TUR": -100,
      "BOH": -30
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 40,
        "influence": 40,
        "landShare": 20,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 25,
        "landShare": 10,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 45,
        "influence": 15,
        "landShare": 3,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "WAL": {
    "tag": "WAL",
    "name": "Wallachia",
    "color": "#f1c40f",
    "religion": "Orthodox",
    "techGroup": "Eastern",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 80,
    "manpower": 4500,
    "maxManpower": 7000,
    "prestige": -5,
    "stability": 1,
    "crownLand": 75,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "targoviste",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 6,
      "dip": 5,
      "mil": 7
    },
    "monarch": {
      "name": "Vlad II Dracul",
      "dynasty": "Draculesti",
      "age": 50,
      "adm": 3,
      "dip": 2,
      "mil": 4,
      "isRegent": false
    },
    "heir": {
      "name": "Vlad III",
      "dynasty": "Draculesti",
      "age": 13,
      "adm": 4,
      "dip": 3,
      "mil": 6,
      "claim": 100
    },
    "dynasty": "Draculesti",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "HUN": 20,
      "SER": 20,
      "TUR": -70
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 50,
        "influence": 35,
        "landShare": 15,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 30,
        "landShare": 12,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 40,
        "influence": 15,
        "landShare": 3,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "SER": {
    "tag": "SER",
    "name": "Serbia",
    "color": "#d2b4de",
    "religion": "Orthodox",
    "techGroup": "Eastern",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 120,
    "manpower": 5000,
    "maxManpower": 8000,
    "prestige": -5,
    "stability": 0,
    "crownLand": 70,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "belgrade",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 6,
      "dip": 5,
      "mil": 6
    },
    "monarch": {
      "name": "Djuradj Brankovic",
      "dynasty": "Brankovic",
      "age": 67,
      "adm": 3,
      "dip": 2,
      "mil": 3,
      "isRegent": false
    },
    "heir": {
      "name": "Lazar",
      "dynasty": "Brankovic",
      "age": 23,
      "adm": 2,
      "dip": 2,
      "mil": 3,
      "claim": 100
    },
    "dynasty": "Brankovic",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "HUN": 35,
      "WAL": 20,
      "BYZ": 30,
      "TUR": -60
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 50,
        "influence": 35,
        "landShare": 15,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 30,
        "landShare": 12,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 40,
        "influence": 15,
        "landShare": 3,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "BOS": {
    "tag": "BOS",
    "name": "Bosnia",
    "color": "#2e86c1",
    "religion": "Catholic",
    "techGroup": "Eastern",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 90,
    "manpower": 4000,
    "maxManpower": 6500,
    "prestige": 0,
    "stability": 1,
    "crownLand": 70,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "bosna",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 6,
      "dip": 6,
      "mil": 6
    },
    "monarch": {
      "name": "Stjepan Tomas",
      "dynasty": "Kotromanic",
      "age": 32,
      "adm": 3,
      "dip": 3,
      "mil": 3,
      "isRegent": false
    },
    "heir": {
      "name": "Stjepan Tomasevic",
      "dynasty": "Kotromanic",
      "age": 6,
      "adm": 3,
      "dip": 2,
      "mil": 4,
      "claim": 100
    },
    "dynasty": "Kotromanic",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "HUN": 40,
      "SER": 20,
      "TUR": -50
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 50,
        "influence": 30,
        "landShare": 10,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 25,
        "landShare": 8,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 45,
        "influence": 15,
        "landShare": 2,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "BYZ": {
    "tag": "BYZ",
    "name": "Byzantium",
    "color": "#8e44ad",
    "religion": "Orthodox",
    "techGroup": "Eastern",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 70,
    "manpower": 3000,
    "maxManpower": 5500,
    "prestige": -10,
    "stability": 0,
    "crownLand": 80,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "constantinople",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 5,
      "dip": 5,
      "mil": 5
    },
    "monarch": {
      "name": "Konstantinos XI",
      "dynasty": "Palaiologos",
      "age": 39,
      "adm": 2,
      "dip": 2,
      "mil": 2,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Palaiologos",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "SER": 30,
      "HUN": 20,
      "TUR": -150
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 40,
        "influence": 30,
        "landShare": 12,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 55,
        "influence": 35,
        "landShare": 15,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 40,
        "influence": 15,
        "landShare": 2,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "TUR": {
    "tag": "TUR",
    "name": "Ottomans",
    "color": "#c0392b",
    "religion": "Sunni",
    "techGroup": "Anatolian",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 200,
    "manpower": 18000,
    "maxManpower": 25000,
    "prestige": 25,
    "stability": 1,
    "crownLand": 55,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "macedonia",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 11,
      "dip": 11,
      "mil": 12
    },
    "monarch": {
      "name": "Mehmed II",
      "dynasty": "Osmanoglu",
      "age": 12,
      "adm": 6,
      "dip": 6,
      "mil": 6,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Osmanoglu",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "BYZ": -150,
      "HUN": -100,
      "KRM": -70,
      "CAN": -50,
      "DUL": -30,
      "ALB": -120
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 45,
        "influence": 30,
        "landShare": 10,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 25,
        "landShare": 8,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 40,
        "influence": 15,
        "landShare": 2,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "CAN": {
    "tag": "CAN",
    "name": "Candarids",
    "color": "#1abc9c",
    "religion": "Sunni",
    "techGroup": "Anatolian",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 70,
    "manpower": 3500,
    "maxManpower": 6000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 70,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "kastamonu",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 6,
      "dip": 5,
      "mil": 5
    },
    "monarch": {
      "name": "Ibrahim II",
      "dynasty": "Candar",
      "age": 40,
      "adm": 3,
      "dip": 2,
      "mil": 2,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Candar",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "TUR": -50,
      "KRM": 30,
      "DUL": 20
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 50,
        "influence": 30,
        "landShare": 10,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 25,
        "landShare": 8,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 45,
        "influence": 15,
        "landShare": 2,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "KRM": {
    "tag": "KRM",
    "name": "Karaman",
    "color": "#3498db",
    "religion": "Sunni",
    "techGroup": "Anatolian",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 80,
    "manpower": 4500,
    "maxManpower": 7500,
    "prestige": 5,
    "stability": 1,
    "crownLand": 65,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "karaman",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 6,
      "dip": 6,
      "mil": 7
    },
    "monarch": {
      "name": "Ibrahim II",
      "dynasty": "Karaman",
      "age": 42,
      "adm": 3,
      "dip": 3,
      "mil": 4,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Karaman",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "TUR": -70,
      "CAN": 30,
      "DUL": 40
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 55,
        "influence": 35,
        "landShare": 12,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 25,
        "landShare": 8,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 40,
        "influence": 15,
        "landShare": 2,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "DUL": {
    "tag": "DUL",
    "name": "Dulkadir",
    "color": "#e67e22",
    "religion": "Sunni",
    "techGroup": "Anatolian",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 60,
    "manpower": 3000,
    "maxManpower": 5500,
    "prestige": -5,
    "stability": 1,
    "crownLand": 75,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "kadirli",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 5,
      "dip": 6,
      "mil": 6
    },
    "monarch": {
      "name": "Suleyman I",
      "dynasty": "Dulkadir",
      "age": 45,
      "adm": 2,
      "dip": 3,
      "mil": 3,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Dulkadir",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "TUR": -30,
      "KRM": 40,
      "CAN": 20
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 50,
        "influence": 30,
        "landShare": 10,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 25,
        "landShare": 8,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 45,
        "influence": 15,
        "landShare": 2,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "RAM": {
    "tag": "RAM",
    "name": "Ramazan",
    "color": "#f39c12",
    "religion": "Sunni",
    "techGroup": "Anatolian",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 60,
    "manpower": 2500,
    "maxManpower": 5000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 75,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "adana",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 6,
      "dip": 5,
      "mil": 5
    },
    "monarch": {
      "name": "Ibrahim II",
      "dynasty": "Ramazanoglu",
      "age": 35,
      "adm": 3,
      "dip": 2,
      "mil": 2,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Ramazanoglu",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "TUR": -20,
      "KRM": 30,
      "DUL": 10
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 50,
        "influence": 30,
        "landShare": 10,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 50,
        "influence": 25,
        "landShare": 8,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 45,
        "influence": 15,
        "landShare": 2,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "ALB": {
    "tag": "ALB",
    "name": "Albania",
    "color": "#1e8449",
    "religion": "Orthodox",
    "techGroup": "Eastern",
    "techLevels": {
      "adm": 3,
      "dip": 3,
      "mil": 3
    },
    "gold": 60,
    "manpower": 3000,
    "maxManpower": 5000,
    "prestige": 15,
    "stability": 1,
    "crownLand": 80,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "albania",
    "mana": {
      "adm": 100,
      "dip": 100,
      "mil": 100
    },
    "manaIncome": {
      "adm": 5,
      "dip": 5,
      "mil": 7
    },
    "monarch": {
      "name": "Gjergj Kastrioti",
      "dynasty": "Kastrioti",
      "age": 39,
      "adm": 3,
      "dip": 3,
      "mil": 6,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Kastrioti",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {
      "TUR": -150,
      "BYZ": 40,
      "SER": 30,
      "HUN": 50
    },
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": {
        "loyalty": 60,
        "influence": 35,
        "landShare": 12,
        "activePrivileges": []
      },
      "clergy": {
        "loyalty": 55,
        "influence": 25,
        "landShare": 8,
        "activePrivileges": []
      },
      "burghers": {
        "loyalty": 45,
        "influence": 15,
        "landShare": 2,
        "activePrivileges": []
      }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": {
      "adm": null,
      "dip": null,
      "mil": null
    }
  },
  "VEN": {
    "tag": "VEN",
    "name": "Republic of Venice",
    "color": "#1e90ff",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 180,
    "manpower": 8000,
    "maxManpower": 14000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "venice",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Francesco Foscari",
      "dynasty": "Foscari",
      "age": 40,
      "adm": 4,
      "dip": 5,
      "mil": 3,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Foscari",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "MLN": {
    "tag": "MLN",
    "name": "Duchy of Milan",
    "color": "#c0c0c0",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 140,
    "manpower": 7000,
    "maxManpower": 12000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "milan",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Filippo Maria Visconti",
      "dynasty": "Visconti",
      "age": 40,
      "adm": 3,
      "dip": 4,
      "mil": 3,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Visconti",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "MNT": {
    "tag": "MNT",
    "name": "Marquessate of Mantua",
    "color": "#005500",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 60,
    "manpower": 3000,
    "maxManpower": 5000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "mantua",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Ludovico III Gonzaga",
      "dynasty": "Gonzaga",
      "age": 40,
      "adm": 3,
      "dip": 3,
      "mil": 2,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Gonzaga",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "FER": {
    "tag": "FER",
    "name": "Duchy of Ferrara",
    "color": "#228b22",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 80,
    "manpower": 4000,
    "maxManpower": 7000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "ferrara",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Leonello d'Este",
      "dynasty": "Este",
      "age": 40,
      "adm": 4,
      "dip": 4,
      "mil": 2,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Este",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "FLR": {
    "tag": "FLR",
    "name": "Republic of Florence",
    "color": "#800000",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 160,
    "manpower": 6000,
    "maxManpower": 10000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "florence",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Cosimo de Medici",
      "dynasty": "Medici",
      "age": 50,
      "adm": 5,
      "dip": 5,
      "mil": 3,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Medici",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "SIE": {
    "tag": "SIE",
    "name": "Republic of Siena",
    "color": "#555555",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 70,
    "manpower": 3000,
    "maxManpower": 5000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "siena",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Antonio Petrucci",
      "dynasty": "Petrucci",
      "age": 40,
      "adm": 2,
      "dip": 3,
      "mil": 2,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Petrucci",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "GEN": {
    "tag": "GEN",
    "name": "Republic of Genoa",
    "color": "#ffff00",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 150,
    "manpower": 5000,
    "maxManpower": 9000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "genoa",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Giano I Fregoso",
      "dynasty": "Fregoso",
      "age": 40,
      "adm": 3,
      "dip": 5,
      "mil": 2,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Fregoso",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "PAP": {
    "tag": "PAP",
    "name": "Papal States",
    "color": "#ffffcc",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 130,
    "manpower": 6000,
    "maxManpower": 10000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "rome",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Pope Eugene IV",
      "dynasty": "della Rovere",
      "age": 40,
      "adm": 3,
      "dip": 3,
      "mil": 2,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "della Rovere",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "NAP": {
    "tag": "NAP",
    "name": "Kingdom of Naples",
    "color": "#ff4444",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 140,
    "manpower": 9000,
    "maxManpower": 15000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "naples",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Alfonso V",
      "dynasty": "Trastamara",
      "age": 40,
      "adm": 4,
      "dip": 3,
      "mil": 4,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Trastamara",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "SAV": {
    "tag": "SAV",
    "name": "Duchy of Savoy",
    "color": "#eeaaff",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 100,
    "manpower": 5000,
    "maxManpower": 8000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "savoy",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Ludovico I",
      "dynasty": "Savoia",
      "age": 40,
      "adm": 3,
      "dip": 3,
      "mil": 3,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Savoia",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  },
  "SWI": {
    "tag": "SWI",
    "name": "Swiss Confederation",
    "color": "#ff7f2a",
    "religion": "Catholic",
    "techGroup": "Western",
    "techLevels": { "adm": 3, "dip": 3, "mil": 3 },
    "gold": 90,
    "manpower": 6000,
    "maxManpower": 8000,
    "prestige": 0,
    "stability": 1,
    "crownLand": 30,
    "overextension": 0,
    "victoryScore": 0,
    "capitalProvinceId": "switzerland",
    "mana": { "adm": 50, "dip": 50, "mil": 50 },
    "manaIncome": { "adm": 3, "dip": 3, "mil": 3 },
    "monarch": {
      "name": "Federal Council",
      "dynasty": "Swiss",
      "age": 40,
      "adm": 2,
      "dip": 2,
      "mil": 4,
      "isRegent": false
    },
    "heir": null,
    "dynasty": "Swiss",
    "royalMarriages": [],
    "vassals": [],
    "overlord": null,
    "diplomaticRelationsUsed": 0,
    "diplomaticRelationsMax": 4,
    "warExhaustion": 0,
    "nationalModifiers": [],
    "relations": {},
    "allies": [],
    "truces": {},
    "aggressiveExpansion": {},
    "estates": {
      "nobility": { "loyalty": 50, "influence": 30, "landShare": 20, "activePrivileges": [] },
      "clergy": { "loyalty": 50, "influence": 20, "landShare": 15, "activePrivileges": [] },
      "burghers": { "loyalty": 50, "influence": 25, "landShare": 10, "activePrivileges": [] }
    },
    "selectedIdeaGroups": [],
    "ideasCompletedCount": 0,
    "advisors": { "adm": null, "dip": null, "mil": null }
  }
};
