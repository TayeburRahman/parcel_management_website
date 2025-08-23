

export const initialFAQs = [
  {
    id: 1,
    question: "How do I register for the app?",
    answer:
      "Users can register using their email, phone number, or social media accounts. Profile verification ensures authenticity and can be done via email, or phone.",
  },
  {
    id: 2,
    question: "What is the purpose of this dating app?",
    answer:
      "PodLove fosters authentic connections through podcast-style matchmaking, designed for individuals seeking meaningful relationships.",
  },
  {
    id: 3,
    question: "Is the app free to use?",
    answer:
      "Yes, the app is free to download and includes a free tier. Premium features and membership levels are available for added benefits. Need to purchase the premium packages.",
  },
  {
    id: 4,
    question: "How is user privacy and security ensured?",
    answer:
      "We use end-to-end encryption for data protection, strict vetting procedures, and regular security audits to ensure user information is secure.",
  },
];

export const notifications = [
  {
    message:
      "A new user has completed the vetting process and registered on Local coupon.",
    time: "Just Now",
  },
  {
    message:
      "Feedback forms for the last episode have been completed by participants.",
    time: "5 min ago",
  },
  {
    message:
      "Reminder: The next podcast episode is scheduled for tomorrow at 5 PM.",
    time: "30 min ago",
  },
  {
    message: "Podcast episode has been successfully completed.",
    time: "6 hours ago",
  },
  {
    message:
      "Reminder: Prepare questions for the primary user in the next podcast episode.",
    time: "8 hours ago",
  },
];

export const user = {
  "_id": "admin001",
  "userName": "Nurulla Hasan",
  "email": "nurullahasan@gmail.com",
  "role": "SuperAdmin",
  "status": "Active",
  "lastLogin": "2025-06-23T22:04:28Z",
  "profileImage": "/images/avatar.jpg",
  "contactInfo": {
    "phone": "+8801812345678",
    "address": {
      "street": "Admin Tower, Road 7",
      "city": "Dhaka",
      "postCode": "1212",
      "country": "Bangladesh"
    }
  }
}

export const recentMatches = [
  {
    id: "#01",
    avatar: "/images/avatar.png",
    participants: "John Smith Vs Emily",
    date: "April 30 at 10:00 AM",
    bateAmount: "$50.20",
    win: "Emily",
    matchFormat: "Championship (Black)",
  },
  {
    id: "#02",
    avatar: "/images/avatar.png",
    participants: "John Smith Vs Emily",
    date: "April 30 at 10:00 AM",
    bateAmount: "$50.20",
    win: "John Smith",
    matchFormat: "Championship (Black)",
  },
  {
    id: "#03",
    avatar: "/images/avatar.png",
    participants: "John Smith Vs Emily",
    date: "April 30 at 10:00 AM",
    bateAmount: "$50.20",
    win: "John Smith",
    matchFormat: "Championship (Black)",
  },
];

// Dashboard stats
export const dashboardStats = [
  {
    id: "total_company",
    iconSrc: "/images/company.png",
    iconBgColor: "#00B2DC78",
    value: "12",
    label: "Total Company",
  },
  {
    id: "active_users",
    iconSrc: "/images/active.png",
    iconBgColor: "#FFE7E9",
    value: "35",
    label: "Active",
  },
  {
    id: "this_weeks_mill",
    iconSrc: "/images/mill.png",
    iconBgColor: "#00C2FF82",
    value: "1240",
    label: "This Weeks Mill",
  },
  {
    id: "total_revenue",
    iconSrc: "/images/money.png",
    iconBgColor: "#DDE0FF8C",
    value: "$100K",
    label: "Total Revenue",
  },
];

// Companies Data
export const companies = [
  {
    _id: "d0e1c2b3a4f5e6d7c8b9a0b1",
    companyName: "Zenith Global Co.",
    companyPhoto: "/images/zenith.png",
    companyEmail: "zenith77@example.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 123-4567",
    companyAddress: "123 Oak Ave, New York, NY, USA",
    plants: 7,
    activeEmployees: 850,
    status: "Active",
  },
  {
    _id: "e1c2b3a4f5e6d7c8b9a0b1c2",
    companyName: "Apex Innovations Inc.",
    companyEmail: "apex23@mail.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 987-6543",
    companyAddress: "456 Pine Ln, Los Angeles, CA, USA",
    plants: 3,
    activeEmployees: 150,
    status: "Inactive",
  },
  {
    _id: "f2d3c4b5a6f7e8d9c0b1a2d3",
    companyName: "Pioneer Ventures Corp.",
    companyEmail: "pion99@biz.net",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 234-5678",
    companyAddress: "789 Main St, Chicago, IL, USA",
    plants: 9,
    activeEmployees: 620,
    status: "Active",
  },
  {
    _id: "a3e4d5c6b7f8e9d0c1b2a3e4",
    companyName: "Horizon Innovations",
    companyEmail: "hori12@info.org",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 345-6789",
    companyAddress: "101 Elm Blvd, Houston, TX, USA",
    plants: 2,
    activeEmployees: 280,
    status: "Active",
  },
  {
    _id: "b4f5e6d7c8a9b0c1d2e3f4a5",
    companyName: "Quantum Dynamics Ltd.",
    companyEmail: "quan45@example.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 456-7890",
    companyAddress: "222 Maple Rd, Phoenix, AZ, USA",
    plants: 8,
    activeEmployees: 910,
    status: "Active",
  },
  {
    _id: "c5a6b7c8d9e0f1a2b3c4d5e6",
    companyName: "Prime Industries Group",
    companyEmail: "prim67@mail.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 567-8901",
    companyAddress: "333 Oak Ave, New York, NY, USA",
    plants: 4,
    activeEmployees: 400,
    status: "Inactive",
  },
  {
    _id: "d6b7c8d9e0f1a2b3c4d5e6f7",
    companyName: "Everest Technologies",
    companyEmail: "ever88@biz.net",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 678-9012",
    companyAddress: "444 Pine Ln, Los Angeles, CA, USA",
    plants: 6,
    activeEmployees: 730,
    status: "Active",
  },
  {
    _id: "e7c8d9e0f1a2b3c4d5e6f7a8",
    companyName: "Nexus Technologies",
    companyEmail: "nexu01@info.org",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 789-0123",
    companyAddress: "555 Main St, Chicago, IL, USA",
    plants: 1,
    activeEmployees: 90,
    status: "Active",
  },
  {
    _id: "f8d9e0f1a2b3c4d5e6f7a8b9",
    companyName: "Dynamic Edge Co.",
    companyEmail: "dyna21@example.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 890-1234",
    companyAddress: "666 Elm Blvd, Houston, TX, USA",
    plants: 5,
    activeEmployees: 550,
    status: "Active",
  },
  {
    _id: "a9e0f1a2b3c4d5e6f7a8b9c0",
    companyName: "OptiServe Systems",
    companyEmail: "opti54@mail.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 012-3456",
    companyAddress: "777 Maple Rd, Phoenix, AZ, USA",
    plants: 10,
    activeEmployees: 1100,
    status: "Inactive",
  },
  {
    _id: "b0f1a2b3c4d5e6f7a8b9c0d1",
    companyName: "Silver Stream Pvt. Ltd.",
    companyEmail: "silv87@biz.net",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 111-2222",
    companyAddress: "888 Oak Ave, New York, NY, USA",
    plants: 3,
    activeEmployees: 180,
    status: "Active",
  },
  {
    _id: "c1a2b3c4d5e6f7a8b9c0d1e2",
    companyName: "Bright Star Corp.",
    companyEmail: "brig34@info.org",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 333-4444",
    companyAddress: "999 Pine Ln, Los Angeles, CA, USA",
    plants: 7,
    activeEmployees: 770,
    status: "Active",
  },
  {
    _id: "d2b3c4d5e6f7a8b9c0d1e2f3",
    companyName: "Green Planet Solutions",
    companyEmail: "gree65@example.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 555-6666",
    companyAddress: "121 Main St, Chicago, IL, USA",
    plants: 2,
    activeEmployees: 60,
    status: "Active",
  },
  {
    _id: "e3c4d5e6f7a8b9c0d1e2f3a4",
    companyName: "Swift Connect Systems",
    companyEmail: "swif09@mail.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 777-8888",
    companyAddress: "131 Elm Blvd, Houston, TX, USA",
    plants: 9,
    activeEmployees: 980,
    status: "Inactive",
  },
  {
    _id: "f4d5e6f7a8b9c0d1e2f3a4b5",
    companyName: "Infinite Pathways",
    companyEmail: "infi76@biz.net",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 999-0000",
    companyAddress: "141 Maple Rd, Phoenix, AZ, USA",
    plants: 4,
    activeEmployees: 320,
    status: "Active",
  },
  {
    _id: "a5e6f7a8b9c0d1e2f3a4b5c6",
    companyName: "Cosmic Labs LLC",
    companyEmail: "cosm22@info.org",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 000-1111",
    companyAddress: "151 Oak Ave, New York, NY, USA",
    plants: 6,
    activeEmployees: 650,
    status: "Active",
  },
  {
    _id: "b6f7a8b9c0d1e2f3a4b5c6d7",
    companyName: "Stellar Minds Inc.",
    companyEmail: "stel33@example.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 222-3333",
    companyAddress: "161 Pine Ln, Los Angeles, CA, USA",
    plants: 1,
    activeEmployees: 110,
    status: "Active",
  },
  {
    _id: "c7a8b9c0d1e2f3a4b5c6d7e8",
    companyName: "Veridian Dynamics",
    companyEmail: "veri44@mail.com",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 444-5555",
    companyAddress: "171 Main St, Chicago, IL, USA",
    plants: 8,
    activeEmployees: 890,
    status: "Inactive",
  },
  {
    _id: "d8b9c0d1e2f3a4b5c6d7e8f9",
    companyName: "Blue Sky Enterprises",
    companyEmail: "blue55@biz.net",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 666-7777",
    companyAddress: "181 Elm Blvd, Houston, TX, USA",
    plants: 5,
    activeEmployees: 470,
    status: "Active",
  },
  {
    _id: "e9c0d1e2f3a4b5c6d7e8f9a0",
    companyName: "Global Solutions Corp.",
    companyEmail: "glob66@info.org",
    companyPhoto: "/images/zenith.png",
    companyPhone: "+1 (555) 888-9999",
    companyAddress: "191 Maple Rd, Phoenix, AZ, USA",
    plants: 10,
    activeEmployees: 1050,
    status: "Active",
  },
];

// User Data
export const userData = [
  {
    _id: "f82b9f72-1ab8-473f-ba73-87d96966510b",
    companyName: "Innovate Solutions Corp.",
    userEmail: "alice.johnson@innovatesol.com",
    userName: "Alice Johnson",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Alice+Johnson",
    plantName: "Research Hub Alpha",
    status: "Inactive",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "d5f666ca-6d18-4a79-8782-fbb50ee5c273",
    companyName: "Dynamic Edge Systems",
    userEmail: "bob.brown@dynamicedge.net",
    userName: "Bob Brown",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Bob+Brown",
    plantName: "Assembly Line One",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "1bf11493-2fd2-4ce4-b3c4-a41eaa7c719f",
    companyName: "Summit Tech Global",
    userEmail: "carol.white@summitglobal.org",
    userName: "Carol White",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Carol+White",
    plantName: "Distribution Center X",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "bb150f9c-4370-4136-8b1d-89aff2293e96",
    companyName: "Quantum Leap Analytics",
    userEmail: "dave.green@quantumleap.biz",
    userName: "Dave Green",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Dave+Green",
    plantName: "Data Center West",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "f4f3e07c-6074-48c3-9ef0-e74db1684588",
    companyName: "Everest Ventures Ltd.",
    userEmail: "eve.black@everestventures.com",
    userName: "Eve Black",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Eve+Black",
    plantName: "Innovation Lab 7",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "171c94dc-987a-4342-bc90-23c9cc4e92b2",
    companyName: "Nexus Corporate Solutions",
    userEmail: "frank.gray@nexuscorp.com",
    userName: "Frank Gray",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Frank+Gray",
    plantName: "Client Services Hub",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "d03b62a1-0f3a-41db-b2f1-615af7fcff1e",
    companyName: "Prime Digital Group",
    userEmail: "grace.hall@primedigital.net",
    userName: "Grace Hall",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Grace+Hall",
    plantName: "Software Development Center",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "08e94653-1cb1-4a12-99e4-f5ff528e5d15",
    companyName: "Horizon Technologies Inc.",
    userEmail: "henry.king@horizontech.org",
    userName: "Henry King",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Henry+King",
    plantName: "Hardware Testing Facility",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "fb51760b-b78b-434c-98f9-28b8c0a27bc7",
    companyName: "OptiServe Systems",
    userEmail: "irene.lee@optiserve.biz",
    userName: "Irene Lee",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Irene+Lee",
    plantName: "Customer Support Center",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "a2f90ccf-a923-4ef1-9249-8483f5a53ebc",
    companyName: "Bright Star Innovations",
    userEmail: "jack.moore@brightstar.com",
    userName: "Jack Moore",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Jack+Moore",
    plantName: "Product Design Studio",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "88b6dbc5-4cec-4e36-8d99-26affdf027fc",
    companyName: "Green Planet Solutions",
    userEmail: "karen.taylor@greenplanet.net",
    userName: "Karen Taylor",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Karen+Taylor",
    plantName: "Eco-Friendly Production",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
  {
    _id: "eb1438a1-7c37-4f5e-b5b9-7ba505e11cb7",
    companyName: "Swift Connect Ventures",
    userEmail: "leo.clark@swiftconnect.org",
    userName: "Leo Clark",
    photoUrl: "https://api.dicebear.com/8.x/initials/svg?seed=Leo+Clark",
    plantName: "Remote Operations Hub",
    status: "Active",
    weeklyMealSchedule: [
      {
        day: "Sunday",
        meal: "Vegetable Stir-fry",
      },
      {
        day: "Monday",
        meal: "Pasta Primavera",
      },
      {
        day: "Tuesday",
        meal: "Grilled Fish and Salad",
      },
      {
        day: "Wednesday",
        meal: "Vegetable Curry, Rice",
      },
      {
        day: "Thursday",
        meal: "Beef Stew with Potatoes",
      },
      {
        day: "Friday",
        meal: "Pizza Night",
      },
      {
        day: "Saturday",
        meal: "Roasted Vegetable Medley",
      },
    ],
  },
];

// weekly menu
export const weeklyMenu = [
  {
    "_id": "665ccdf23f1a3e98a94e2201",
    "dishName": "Thai Chicken",
    "mealType": ["Lunch"],
    "company": "Innovate Solutions",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "354 Kcal",
      "protein": "25g",
      "fat": "10g",
      "allergens": "None"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2202",
    "dishName": "Grilled Salmon",
    "mealType": ["Dinner"],
    "company": "XYZ Corp",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "420 Kcal",
      "protein": "35g",
      "fat": "18g",
      "allergens": "Fish"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2203",
    "dishName": "Veggie Omelette",
    "mealType": ["Breakfast"],
    "company": "ABC Group",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "230 Kcal",
      "protein": "14g",
      "fat": "12g",
      "allergens": "Egg"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2204",
    "dishName": "Beef Stir Fry",
    "mealType": ["Lunch", "Dinner"],
    "company": "Foodies Inc",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "480 Kcal",
      "protein": "40g",
      "fat": "22g",
      "allergens": "Soy"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2205",
    "dishName": "Quinoa Salad",
    "mealType": ["Lunch"],
    "company": "Healthy Bites",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "310 Kcal",
      "protein": "12g",
      "fat": "9g",
      "allergens": "None"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2206",
    "dishName": "Chicken Caesar Wrap",
    "mealType": ["Lunch"],
    "company": "ABC Group",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "390 Kcal",
      "protein": "28g",
      "fat": "16g",
      "allergens": "Gluten, Dairy"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2207",
    "dishName": "Pancakes with Syrup",
    "mealType": ["Breakfast"],
    "company": "XYZ Corp",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "450 Kcal",
      "protein": "8g",
      "fat": "14g",
      "allergens": "Gluten, Dairy"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2208",
    "dishName": "Tofu Teriyaki",
    "mealType": ["Dinner"],
    "company": "Healthy Bites",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "340 Kcal",
      "protein": "20g",
      "fat": "11g",
      "allergens": "Soy"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2209",
    "dishName": "Turkey Sandwich",
    "mealType": ["Lunch"],
    "company": "Foodies Inc",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "370 Kcal",
      "protein": "26g",
      "fat": "13g",
      "allergens": "Gluten"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2210",
    "dishName": "Miso Soup",
    "mealType": ["Dinner"],
    "company": "ABC Group",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "90 Kcal",
      "protein": "5g",
      "fat": "3g",
      "allergens": "Soy"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2211",
    "dishName": "Chickpea Curry",
    "mealType": ["Lunch", "Dinner"],
    "company": "Healthy Bites",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "400 Kcal",
      "protein": "22g",
      "fat": "17g",
      "allergens": "None"
    }
  },
  {
    "_id": "665ccdf23f1a3e98a94e2212",
    "dishName": "Fruit Yogurt Parfait",
    "mealType": ["Breakfast"],
    "company": "XYZ Corp",
    "week": "Jan 25–31",
    "menuImage": "/images/menu.png",
    "nutrition": {
      "calories": "300 Kcal",
      "protein": "10g",
      "fat": "6g",
      "allergens": "Dairy"
    }
  }
];

// Nutriton data
export const nutritionData = [
  {
    "_id": "dish001",
    "dishName": "Grilled Salmon with Asparagus",
    "description": "Perfectly grilled salmon fillet served with steamed asparagus and a lemon-dill sauce.",
    "imageUrl": "https://example.com/images/grilled_salmon_asparagus.jpg",
    "mealType": "Dinner",
    "assignedToUser": "user123",
    "assignedToCompany": "companyABC",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing001", "name": "Salmon Fillet", "quantity": 180, "unit": "grms" },
      { "ingredientId": "ing002", "name": "Asparagus", "quantity": 100, "unit": "grms" },
      { "ingredientId": "ing003", "name": "Lemon", "quantity": 0.5, "unit": "unit" },
      { "ingredientId": "ing004", "name": "Olive Oil", "quantity": 10, "unit": "ml" },
      { "ingredientId": "ing005", "name": "Dill (fresh)", "quantity": 3, "unit": "grms" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut001", "name": "Calories", "value": 380, "unit": "kcal" },
      { "nutrientId": "nut002", "name": "Protein", "value": 28, "unit": "g" },
      { "nutrientId": "nut003", "name": "Fat", "value": 26, "unit": "g" },
      { "nutrientId": "nut004", "name": "Carbohydrates", "value": 8, "unit": "g" },
      { "nutrientId": "nut005", "name": "Fiber", "value": 3, "unit": "g" }
    ],
    "allergens": [{ "allergenId": "all001", "name": "Fish", "details": "Contains salmon" }]
  },
  {
    "_id": "dish002",
    "dishName": "Spicy Chicken Stir-fry",
    "description": "Tender chicken strips stir-fried with colorful bell peppers, broccoli, and a spicy sauce.",
    "imageUrl": "https://example.com/images/chicken_stir_fry.jpg",
    "mealType": "Lunch",
    "assignedToUser": "user456",
    "assignedToCompany": "companyXYZ",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing006", "name": "Chicken Breast", "quantity": 150, "unit": "grms" },
      { "ingredientId": "ing007", "name": "Bell Peppers", "quantity": 80, "unit": "grms" },
      { "ingredientId": "ing008", "name": "Broccoli", "quantity": 70, "unit": "grms" },
      { "ingredientId": "ing009", "name": "Soy Sauce", "quantity": 15, "unit": "ml" },
      { "ingredientId": "ing010", "name": "Chili Garlic Sauce", "quantity": 5, "unit": "ml" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut006", "name": "Calories", "value": 320, "unit": "kcal" },
      { "nutrientId": "nut007", "name": "Protein", "value": 25, "unit": "g" },
      { "nutrientId": "nut008", "name": "Fat", "value": 15, "unit": "g" },
      { "nutrientId": "nut009", "name": "Carbohydrates", "value": 20, "unit": "g" },
      { "nutrientId": "nut010", "name": "Sodium", "value": 600, "unit": "mg" }
    ],
    "allergens": [{ "allergenId": "all002", "name": "Soy", "details": "Contains soy sauce" }]
  },
  {
    "_id": "dish003",
    "dishName": "Vegetable Lentil Soup",
    "description": "Hearty and nutritious soup made with lentils, carrots, celery, and spinach.",
    "imageUrl": "https://example.com/images/lentil_soup.jpg",
    "mealType": "Lunch",
    "assignedToUser": "user123",
    "assignedToCompany": "companyABC",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing011", "name": "Red Lentils", "quantity": 100, "unit": "grms" },
      { "ingredientId": "ing012", "name": "Carrots", "quantity": 50, "unit": "grms" },
      { "ingredientId": "ing013", "name": "Celery", "quantity": 40, "unit": "grms" },
      { "ingredientId": "ing014", "name": "Spinach", "quantity": 30, "unit": "grms" },
      { "ingredientId": "ing015", "name": "Vegetable Broth", "quantity": 250, "unit": "ml" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut011", "name": "Calories", "value": 250, "unit": "kcal" },
      { "nutrientId": "nut012", "name": "Protein", "value": 15, "unit": "g" },
      { "nutrientId": "nut013", "name": "Fat", "value": 5, "unit": "g" },
      { "nutrientId": "nut014", "name": "Carbohydrates", "value": 35, "unit": "g" },
      { "nutrientId": "nut015", "name": "Fiber", "value": 10, "unit": "g" }
    ],
    "allergens": []
  },
  {
    "_id": "dish004",
    "dishName": "Quinoa Salad with Chickpeas",
    "description": "A refreshing salad with fluffy quinoa, chickpeas, cucumber, tomatoes, and a lemon vinaigrette.",
    "imageUrl": "https://example.com/images/quinoa_salad.jpg",
    "mealType": "Lunch",
    "assignedToUser": "user789",
    "assignedToCompany": "companyDEF",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing016", "name": "Quinoa (cooked)", "quantity": 120, "unit": "grms" },
      { "ingredientId": "ing017", "name": "Chickpeas (canned)", "quantity": 80, "unit": "grms" },
      { "ingredientId": "ing018", "name": "Cucumber", "quantity": 50, "unit": "grms" },
      { "ingredientId": "ing019", "name": "Cherry Tomatoes", "quantity": 40, "unit": "grms" },
      { "ingredientId": "ing020", "name": "Lemon Juice", "quantity": 10, "unit": "ml" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut016", "name": "Calories", "value": 280, "unit": "kcal" },
      { "nutrientId": "nut017", "name": "Protein", "value": 12, "unit": "g" },
      { "nutrientId": "nut018", "name": "Fat", "value": 8, "unit": "g" },
      { "nutrientId": "nut019", "name": "Carbohydrates", "value": 40, "unit": "g" },
      { "nutrientId": "nut020", "name": "Fiber", "value": 7, "unit": "g" }
    ],
    "allergens": []
  },
  {
    "_id": "dish005",
    "dishName": "Beef and Broccoli",
    "description": "Savory beef strips with tender broccoli florets in a rich, garlicky sauce.",
    "imageUrl": "https://example.com/images/beef_broccoli.jpg",
    "mealType": "Dinner",
    "assignedToUser": "user123",
    "assignedToCompany": "companyXYZ",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing021", "name": "Beef Sirloin", "quantity": 180, "unit": "grms" },
      { "ingredientId": "ing022", "name": "Broccoli", "quantity": 150, "unit": "grms" },
      { "ingredientId": "ing023", "name": "Soy Sauce", "quantity": 20, "unit": "ml" },
      { "ingredientId": "ing024", "name": "Garlic (minced)", "quantity": 5, "unit": "grms" },
      { "ingredientId": "ing025", "name": "Ginger (grated)", "quantity": 3, "unit": "grms" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut021", "name": "Calories", "value": 450, "unit": "kcal" },
      { "nutrientId": "nut022", "name": "Protein", "value": 35, "unit": "g" },
      { "nutrientId": "nut023", "name": "Fat", "value": 28, "unit": "g" },
      { "nutrientId": "nut024", "name": "Carbohydrates", "value": 15, "unit": "g" },
      { "nutrientId": "nut025", "name": "Iron", "value": 5, "unit": "mg" }
    ],
    "allergens": [{ "allergenId": "all003", "name": "Soy", "details": "Contains soy sauce" }]
  },
  {
    "_id": "dish006",
    "dishName": "Spinach & Feta Omelette",
    "description": "Fluffy omelette filled with fresh spinach and crumbled feta cheese, perfect for breakfast.",
    "imageUrl": "https://example.com/images/spinach_feta_omelette.jpg",
    "mealType": "Breakfast",
    "assignedToUser": "user456",
    "assignedToCompany": "companyDEF",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing026", "name": "Eggs", "quantity": 2, "unit": "unit" },
      { "ingredientId": "ing027", "name": "Fresh Spinach", "quantity": 50, "unit": "grms" },
      { "ingredientId": "ing028", "name": "Feta Cheese", "quantity": 30, "unit": "grms" },
      { "ingredientId": "ing029", "name": "Milk", "quantity": 15, "unit": "ml" },
      { "ingredientId": "ing030", "name": "Salt & Pepper", "quantity": 1, "unit": "grms" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut026", "name": "Calories", "value": 200, "unit": "kcal" },
      { "nutrientId": "nut027", "name": "Protein", "value": 14, "unit": "g" },
      { "nutrientId": "nut028", "name": "Fat", "value": 15, "unit": "g" },
      { "nutrientId": "nut029", "name": "Carbohydrates", "value": 5, "unit": "g" },
      { "nutrientId": "nut030", "name": "Calcium", "value": 150, "unit": "mg" }
    ],
    "allergens": [
      { "allergenId": "all004", "name": "Eggs", "details": "Contains eggs" },
      { "allergenId": "all005", "name": "Dairy", "details": "Contains milk and feta cheese" }
    ]
  },
  {
    "_id": "dish007",
    "dishName": "Chickpea & Vegetable Wrap",
    "description": "Whole wheat wrap filled with mashed chickpeas, assorted fresh vegetables, and a light dressing.",
    "imageUrl": "https://example.com/images/chickpea_wrap.jpg",
    "mealType": "Lunch",
    "assignedToUser": "user123",
    "assignedToCompany": "companyABC",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing031", "name": "Whole Wheat Tortilla", "quantity": 1, "unit": "unit" },
      { "ingredientId": "ing032", "name": "Chickpeas (mashed)", "quantity": 100, "unit": "grms" },
      { "ingredientId": "ing033", "name": "Mixed Greens", "quantity": 30, "unit": "grms" },
      { "ingredientId": "ing034", "name": "Tomato", "quantity": 20, "unit": "grms" },
      { "ingredientId": "ing035", "name": "Cucumber", "quantity": 20, "unit": "grms" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut031", "name": "Calories", "value": 290, "unit": "kcal" },
      { "nutrientId": "nut032", "name": "Protein", "value": 10, "unit": "g" },
      { "nutrientId": "nut033", "name": "Fat", "value": 8, "unit": "g" },
      { "nutrientId": "nut034", "name": "Carbohydrates", "value": 45, "unit": "g" },
      { "nutrientId": "nut035", "name": "Fiber", "value": 8, "unit": "g" }
    ],
    "allergens": [{ "allergenId": "all006", "name": "Gluten", "details": "Contains whole wheat tortilla" }]
  },
  {
    "_id": "dish008",
    "dishName": "Chicken Caesar Salad",
    "description": "Crisp romaine lettuce, grilled chicken breast, croutons, parmesan cheese, and creamy Caesar dressing.",
    "imageUrl": "https://example.com/images/chicken_caesar_salad.jpg",
    "mealType": "Lunch",
    "assignedToUser": "user789",
    "assignedToCompany": "companyXYZ",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing036", "name": "Romaine Lettuce", "quantity": 100, "unit": "grms" },
      { "ingredientId": "ing037", "name": "Grilled Chicken", "quantity": 120, "unit": "grms" },
      { "ingredientId": "ing038", "name": "Croutons", "quantity": 20, "unit": "grms" },
      { "ingredientId": "ing039", "name": "Parmesan Cheese", "quantity": 15, "unit": "grms" },
      { "ingredientId": "ing040", "name": "Caesar Dressing", "quantity": 30, "unit": "ml" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut036", "name": "Calories", "value": 370, "unit": "kcal" },
      { "nutrientId": "nut037", "name": "Protein", "value": 28, "unit": "g" },
      { "nutrientId": "nut038", "name": "Fat", "value": 25, "unit": "g" },
      { "nutrientId": "nut039", "name": "Carbohydrates", "value": 15, "unit": "g" },
      { "nutrientId": "nut040", "name": "Sodium", "value": 700, "unit": "mg" }
    ],
    "allergens": [
      { "allergenId": "all007", "name": "Dairy", "details": "Contains Parmesan cheese" },
      { "allergenId": "all008", "name": "Gluten", "details": "Contains croutons" }
    ]
  },
  {
    "_id": "dish009",
    "dishName": "Miso Soup with Tofu",
    "description": "Traditional Japanese soup with savory miso paste, soft tofu, and seaweed.",
    "imageUrl": "https://example.com/images/miso_soup.jpg",
    "mealType": "Dinner",
    "assignedToUser": "user123",
    "assignedToCompany": "companyDEF",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing041", "name": "Miso Paste", "quantity": 20, "unit": "grms" },
      { "ingredientId": "ing042", "name": "Soft Tofu", "quantity": 80, "unit": "grms" },
      { "ingredientId": "ing043", "name": "Dried Wakame Seaweed", "quantity": 5, "unit": "grms" },
      { "ingredientId": "ing044", "name": "Green Onions", "quantity": 10, "unit": "grms" },
      { "ingredientId": "ing045", "name": "Water", "quantity": 300, "unit": "ml" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut041", "name": "Calories", "value": 120, "unit": "kcal" },
      { "nutrientId": "nut042", "name": "Protein", "value": 8, "unit": "g" },
      { "nutrientId": "nut043", "name": "Fat", "value": 5, "unit": "g" },
      { "nutrientId": "nut044", "name": "Carbohydrates", "value": 10, "unit": "g" },
      { "nutrientId": "nut045", "name": "Sodium", "value": 800, "unit": "mg" }
    ],
    "allergens": [{ "allergenId": "all009", "name": "Soy", "details": "Contains miso paste (fermented soy)" }]
  },
  {
    "_id": "dish010",
    "dishName": "Fruit Salad with Yogurt",
    "description": "A refreshing mix of seasonal fruits topped with creamy Greek yogurt and a drizzle of honey.",
    "imageUrl": "https://example.com/images/fruit_salad_yogurt.jpg",
    "mealType": "Snacks",
    "assignedToUser": "user456",
    "assignedToCompany": "companyABC",
    "weekRange": {
      "startDate": "2025-06-24T00:00:00.000Z",
      "endDate": "2025-06-30T00:00:00.000Z"
    },
    "ingredients": [
      { "ingredientId": "ing046", "name": "Mixed Berries", "quantity": 80, "unit": "grms" },
      { "ingredientId": "ing047", "name": "Banana", "quantity": 50, "unit": "grms" },
      { "ingredientId": "ing048", "name": "Apple", "quantity": 40, "unit": "grms" },
      { "ingredientId": "ing049", "name": "Greek Yogurt", "quantity": 100, "unit": "grms" },
      { "ingredientId": "ing050", "name": "Honey", "quantity": 5, "unit": "ml" }
    ],
    "nutritionInfo": [
      { "nutrientId": "nut046", "name": "Calories", "value": 180, "unit": "kcal" },
      { "nutrientId": "nut047", "name": "Protein", "value": 8, "unit": "g" },
      { "nutrientId": "nut048", "name": "Fat", "value": 3, "unit": "g" },
      { "nutrientId": "nut049", "name": "Carbohydrates", "value": 30, "unit": "g" },
      { "nutrientId": "nut050", "name": "Vitamin C", "value": 40, "unit": "mg" }
    ],
    "allergens": [{ "allergenId": "all010", "name": "Dairy", "details": "Contains Greek Yogurt" }]
  }
]

// reports data

export const reportsData = [
  {
    _id: "report_A001",
    date: "1 Jan 2025",
    plant: "Plant A",
    mealType: "Lunch",
    employeeCount: 45,
    totalMeal: 45,
    prize: 24,
    details: {
      dishes: [
        { dishName: "Grilled Salmon with Asparagus", served: 20, pricePerMeal: 2.5 },
        { dishName: "Quinoa Salad with Chickpeas", served: 25, pricePerMeal: 2.0 },
      ],
      notes: "Standard lunch service, no issues.",
    },
  },
  {
    _id: "report_A002",
    date: "1 Jan 2025",
    plant: "Plant A",
    mealType: "Lunch",
    employeeCount: 40,
    totalMeal: 40,
    prize: 22,
    details: {
      dishes: [
        { dishName: "Spicy Chicken Stir-fry", served: 22, pricePerMeal: 3.0 },
        { dishName: "Vegetable Lentil Soup", served: 18, pricePerMeal: 1.8 },
      ],
      notes: "Slightly fewer employees than usual.",
    },
  },
  {
    _id: "report_B001",
    date: "1 Jan 2025",
    plant: "Plant B",
    mealType: "Lunch",
    employeeCount: 34,
    totalMeal: 34,
    prize: 20,
    details: {
      dishes: [
        { dishName: "Beef and Broccoli", served: 15, pricePerMeal: 3.5 },
        { dishName: "Chickpea & Vegetable Wrap", served: 19, pricePerMeal: 2.2 },
      ],
      notes: "Regular service.",
    },
  },
  {
    _id: "report_A003",
    date: "2 Jan 2025",
    plant: "Plant A",
    mealType: "Dinner",
    employeeCount: 60,
    totalMeal: 60,
    prize: 35,
    details: {
      dishes: [
        { dishName: "Chicken Caesar Salad", served: 30, pricePerMeal: 3.2 },
        { dishName: "Miso Soup with Tofu", served: 30, pricePerMeal: 2.8 },
      ],
      notes: "High demand for dinner service.",
    },
  },
  {
    _id: "report_B002",
    date: "2 Jan 2025",
    plant: "Plant B",
    mealType: "Breakfast",
    employeeCount: 34,
    totalMeal: 34,
    prize: 15,
    details: {
      dishes: [
        { dishName: "Spinach & Feta Omelette", served: 18, pricePerMeal: 1.5 },
        { dishName: "Fruit Salad with Yogurt", served: 16, pricePerMeal: 1.2 },
      ],
      notes: "Breakfast service for early shift.",
    },
  },
  {
    _id: "report_A004",
    date: "3 Jan 2025",
    plant: "Plant A",
    mealType: "Lunch",
    employeeCount: 45,
    totalMeal: 45,
    prize: 23,
    details: {
      dishes: [
        { dishName: "Thai Chicken", served: 25, pricePerMeal: 2.8 },
        { dishName: "Grilled Salmon with Asparagus", served: 20, pricePerMeal: 2.5 },
      ],
      notes: "Popular Thai Chicken day.",
    },
  },
  {
    _id: "report_B003",
    date: "3 Jan 2025",
    plant: "Plant B",
    mealType: "Dinner",
    employeeCount: 50,
    totalMeal: 50,
    prize: 30,
    details: {
      dishes: [
        { dishName: "Beef and Broccoli", served: 25, pricePerMeal: 3.5 },
        { dishName: "Spicy Chicken Stir-fry", served: 25, pricePerMeal: 3.0 },
      ],
      notes: "Balanced dinner demand.",
    },
  },
  {
    _id: "report_A005",
    date: "4 Jan 2025",
    plant: "Plant A",
    mealType: "Breakfast",
    employeeCount: 38,
    totalMeal: 38,
    prize: 16,
    details: {
      dishes: [
        { dishName: "Vegetable Lentil Soup", served: 18, pricePerMeal: 1.8 },
        { dishName: "Miso Soup with Tofu", served: 20, pricePerMeal: 1.7 },
      ],
      notes: "Soup options popular for breakfast.",
    },
  },
  {
    _id: "report_C001",
    date: "4 Jan 2025",
    plant: "Plant C",
    mealType: "Lunch",
    employeeCount: 55,
    totalMeal: 55,
    prize: 28,
    details: {
      dishes: [
        { dishName: "Chicken Caesar Salad", served: 30, pricePerMeal: 3.2 },
        { dishName: "Quinoa Salad with Chickpeas", served: 25, pricePerMeal: 2.0 },
      ],
      notes: "New plant, high lunch turnout.",
    },
  },
  {
    _id: "report_A006",
    date: "5 Jan 2025",
    plant: "Plant A",
    mealType: "Dinner",
    employeeCount: 65,
    totalMeal: 65,
    prize: 38,
    details: {
      dishes: [
        { dishName: "Thai Chicken", served: 35, pricePerMeal: 2.8 },
        { dishName: "Beef and Broccoli", served: 30, pricePerMeal: 3.5 },
      ],
      notes: "Weekend dinner rush.",
    },
  },
];