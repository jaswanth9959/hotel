const rooms = [
  {
    title: "Standard Single Room",
    description: "Cozy single room with a comfortable bed and basic amenities.",
    image: "/images/1.jpg",
    price: 50,
    category: "Standard",
    maxpeople: 1,
  },
  {
    title: "Deluxe Double Room",
    description:
      "Spacious double room with a queen-sized bed, elegant furnishings, and a view of the city skyline.",
    image: "/images/2.jpg",

    price: 100,
    category: "Deluxe",
    maxpeople: 2,
  },
  {
    title: "Family Suite",
    description:
      "Large suite with separate bedrooms, ideal for families or groups.",
    image: "/images/3.jpg",

    price: 200,
    category: "Suite",
    maxpeople: 4,
    unavailableDates: [
      "2024-03-23T19:06:38.932+00:00",
      "2024-03-24T19:06:38.932+00:00",
    ],
  },
  {
    title: "Executive Suite",
    description:
      "Luxurious suite with a king-sized bed, living area, and panoramic views.",
    image: "/images/1.jpg",

    price: 300,
    category: "Suite",
    maxpeople: 2,
    unavailableDates: [
      "2024-03-23T19:06:38.932+00:00",
      "2024-03-24T19:06:38.932+00:00",
    ],
  },
  {
    title: "Ocean View Room",
    description:
      "Elegant room with a stunning ocean view and modern amenities.",
    image: "/images/3.jpg",

    price: 150,
    category: "Premium",
    maxpeople: 2,
    unavailableDates: [
      "2024-03-23T19:06:38.932+00:00",
      "2024-03-24T19:06:38.932+00:00",
    ],
  },
  {
    title: "Presidential Suite",
    description:
      "The epitome of luxury, this suite offers unparalleled comfort, privacy, and service.",
    image: "/images/4.jpg",

    price: 500,
    category: "Suite",
    maxpeople: 6,
  },
];

export default rooms;
