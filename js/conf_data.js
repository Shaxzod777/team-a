/*
    Пути к фото лежат в папке public/photos/.
    Пробел в названии папки "A class" кодируется как %20.
    У каждого цвета своё фото — конфигуратор меняет картинку при выборе.
*/

const cars = [
    {
        id: "a-class",
        category: "A-Class",
        name: "Mercedes-Benz A-Класс 250e Седан",
        generation: "W177",
        years: "с 2023 года",
        price: 95000,

        image: "public/photos/A%20class/250e_black.jpg",

        colors: [
            {
                id: "obsidian",
                name: "Obsidian Black",
                price: 0,
                color: "#111111",
                image: "public/photos/A%20class/250e_black.jpg"
            },
            {
                id: "graphite",
                name: "Graphite Grey",
                price: 1800,
                color: "#55585b",
                image: "public/photos/A%20class/250e_gray.jpg"
            },
            {
                id: "red",
                name: "Patagonia Red",
                price: 2200,
                color: "#6e1c22",
                image: "public/photos/A%20class/250e_red.jpg"
            }
        ],

        wheels: [
            {
                id: "five-spoke",
                name: '19" Five-Spoke',
                price: 0
            },
            {
                id: "multi-spoke",
                name: '20" Multi-Spoke',
                price: 2500
            },
            {
                id: "twin-spoke",
                name: '21" Twin-Spoke',
                price: 4200
            }
        ],

        interiors: [
            {
                id: "black",
                name: "Black Leather",
                price: 0
            },
            {
                id: "beige",
                name: "Macchiato Beige",
                price: 1800
            },
            {
                id: "brown",
                name: "Brown Leather",
                price: 2400
            }
        ]
    },

    {
        id: "c-class",
        category: "C-Class",
        name: "Mercedes-AMG CLA 45 S 4MATIC+ Купе",
        generation: "C118",
        years: "2019 — 2025",
        price: 112000,

        image: "public/photos/C-class/cla_black.jpg",

        colors: [
            {
                id: "obsidian",
                name: "Obsidian Black",
                price: 0,
                color: "#111111",
                image: "public/photos/C-class/cla_black.jpg"
            },
            {
                id: "white",
                name: "Polar White",
                price: 1200,
                color: "#eeeeee",
                image: "public/photos/C-class/cla_white.jpg"
            },
            {
                id: "red",
                name: "MANUFAKTUR Red",
                price: 2500,
                color: "#66151b",
                image: "public/photos/C-class/cla_red.jpg"
            }
        ],

        wheels: [
            {
                id: "amg-five",
                name: '19" AMG Five-Spoke',
                price: 0
            },
            {
                id: "amg-multi",
                name: '20" AMG Multi-Spoke',
                price: 3200
            },
            {
                id: "amg-forged",
                name: '21" AMG Forged',
                price: 5200
            }
        ],

        interiors: [
            {
                id: "black",
                name: "AMG Black",
                price: 0
            },
            {
                id: "red-black",
                name: "AMG Red / Black",
                price: 2800
            },
            {
                id: "brown",
                name: "Brown Leather",
                price: 3200
            }
        ]
    },

    {
        id: "eqs",
        category: "EQS",
        name: "Mercedes-Benz EQS Sedan",
        generation: "",
        years: "",
        price: 135000,

        image: "public/photos/EQS/eqs_black.jpg",

        colors: [
            {
                id: "black",
                name: "Obsidian Black",
                price: 0,
                color: "#111111",
                image: "public/photos/EQS/eqs_black.jpg"
            },
            {
                id: "silver",
                name: "High-Tech Silver",
                price: 1900,
                color: "#a7a9ab",
                image: "public/photos/EQS/eqs_gray.jpg"
            }
        ],

        wheels: [
            {
                id: "aero",
                name: '20" Aero Wheels',
                price: 0
            },
            {
                id: "multi",
                name: '21" Multi-Spoke',
                price: 3500
            },
            {
                id: "premium",
                name: '22" Premium Wheels',
                price: 5200
            }
        ],

        interiors: [
            {
                id: "black",
                name: "Black Leather",
                price: 0
            },
            {
                id: "beige",
                name: "Macchiato Beige",
                price: 2200
            }
        ]
    },

    {
        id: "eqc",
        category: "EQC",
        name: "Mercedes-Benz EQC",
        generation: "",
        years: "",
        price: 98000,

        image: "public/photos/EQC/eqc_black.jpg",

        colors: [
            {
                id: "black",
                name: "Obsidian Black",
                price: 0,
                color: "#111111",
                image: "public/photos/EQC/eqc_black.jpg"
            },
            {
                id: "grey",
                name: "Graphite Grey",
                price: 1600,
                color: "#62666a",
                image: "public/photos/EQC/eqc_gray.jpg"
            }
        ],

        wheels: [
            {
                id: "five",
                name: '19" Five-Spoke',
                price: 0
            },
            {
                id: "multi",
                name: '20" Multi-Spoke',
                price: 2400
            },
            {
                id: "twin",
                name: '21" Twin-Spoke',
                price: 4000
            }
        ],

        interiors: [
            {
                id: "black",
                name: "Black Leather",
                price: 0
            },
            {
                id: "beige",
                name: "Macchiato Beige",
                price: 1900
            }
        ]
    },

    {
        id: "eqa",
        category: "EQA",
        name: "Mercedes-Benz EQA 250+/260",
        generation: "H243",
        years: "2021 — 2026",
        price: 72000,

        image: "public/photos/EQA/eqa_white.jpg",

        colors: [
            {
                id: "white",
                name: "Polar White",
                price: 0,
                color: "#eeeeee",
                image: "public/photos/EQA/eqa_white.jpg"
            },
            {
                id: "black",
                name: "Obsidian Black",
                price: 800,
                color: "#111111",
                image: "public/photos/EQA/eqa_black.jpg"
            },
            {
                id: "blue",
                name: "Spectral Blue",
                price: 1800,
                color: "#263c5c",
                image: "public/photos/EQA/eqa_blue.jpg"
            }
        ],

        wheels: [
            {
                id: "aero",
                name: '18" Aero Wheels',
                price: 0
            },
            {
                id: "five",
                name: '19" Five-Spoke',
                price: 2200
            },
            {
                id: "multi",
                name: '20" Multi-Spoke',
                price: 3600
            }
        ],

        interiors: [
            {
                id: "black",
                name: "Black Leather",
                price: 0
            },
            {
                id: "beige",
                name: "Macchiato Beige",
                price: 1700
            }
        ]
    }
];


const categories = [
    {
        id: "A-Class",
        name: "A-Class",
        description: "Compact luxury"
    },
    {
        id: "C-Class",
        name: "C-Class",
        description: "Sedans & Coupés"
    },
    {
        id: "E-Class",
        name: "E-Class",
        description: "Executive class"
    },
    {
        id: "S-Class",
        name: "S-Class",
        description: "Luxury class"
    },
    {
        id: "G-Class",
        name: "G-Class",
        description: "Off-road"
    },
    {
        id: "GLA",
        name: "GLA",
        description: "Compact SUV"
    },
    {
        id: "GLC",
        name: "GLC",
        description: "Mid-size SUV"
    },
    {
        id: "GLE",
        name: "GLE",
        description: "Luxury SUV"
    },
    {
        id: "EQS",
        name: "EQS",
        description: "Electric luxury"
    },
    {
        id: "EQC",
        name: "EQC",
        description: "Electric SUV"
    },
    {
        id: "EQA",
        name: "EQA",
        description: "Electric compact SUV"
    }
];