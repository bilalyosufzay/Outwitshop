
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  countryAvailability?: string[];
  images?: string[];
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    countryAvailability: ["US", "DE", "ES"],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80",
    ]
  },
  {
    id: "2",
    name: "Classic Leather Watch",
    price: 199.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80",
    ]
  },
  {
    id: "3",
    name: "Artistic Table Lamp",
    price: 89.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
      "https://images.unsplash.com/photo-1534105615256-13940a56ff44?w=800&q=80",
      "https://images.unsplash.com/photo-1543198126-a3459b931bb3?w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    ]
  },
  {
    id: "4",
    name: "Minimalist Backpack",
    price: 129.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
      "https://images.unsplash.com/photo-1591375275624-c2f8673f9c74?w=800&q=80",
    ]
  },
  {
    id: "13",
    name: "Smart Home Security Camera",
    price: 149.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfb9e5e01b4b?w=800&q=80",
      "https://images.unsplash.com/photo-1593112659664-e032a6178112?w=800&q=80",
      "https://images.unsplash.com/photo-1588689115724-95081d6c23f3?w=800&q=80",
    ]
  },
  {
    id: "14",
    name: "Mechanical Keyboard",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
    countryAvailability: ["US", "DE", "ES"],
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      "https://images.unsplash.com/photo-1595225353939-8883a9a4a008?w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    ]
  }
];

export const TRENDING_PRODUCTS: Product[] = [
  {
    id: "5",
    name: "Smart Fitness Watch",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    countryAvailability: ["US", "DE", "ES"],
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    ]
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    price: 179.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      "https://images.unsplash.com/photo-1560274789-6a6b5ffd1a33?w=800&q=80",
    ]
  },
  {
    id: "7",
    name: "Barista Coffee Machine",
    price: 249.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1606483956061-46a898dce538?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606483956061-46a898dce538?w=800&q=80",
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      "https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?w=800&q=80",
    ]
  },
  {
    id: "8",
    name: "Wireless Earbuds",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&q=80",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&q=80",
      "https://images.unsplash.com/photo-1598331668711-03c2b1620c6c?w=800&q=80",
    ]
  },
  {
    id: "15",
    name: "Smart Plant Pot",
    price: 49.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1592170577795-dcc7116cafcd?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1592170577795-dcc7116cafcd?w=800&q=80",
      "https://images.unsplash.com/photo-1592170577795-dcc7116cafcd?w=800&q=80",
      "https://images.unsplash.com/photo-1592170577795-dcc7116cafcd?w=800&q=80",
      "https://images.unsplash.com/photo-1592170577795-dcc7116cafcd?w=800&q=80",
    ]
  },
  {
    id: "16",
    name: "Yoga Mat Premium",
    price: 89.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1592432678016-e910b6506c3d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b6506c3d?w=800&q=80",
      "https://images.unsplash.com/photo-1592432678016-e910b6506c3d?w=800&q=80",
      "https://images.unsplash.com/photo-1592432678016-e910b6506c3d?w=800&q=80",
      "https://images.unsplash.com/photo-1592432678016-e910b6506c3d?w=800&q=80",
    ]
  }
];

export const SALE_PRODUCTS: Product[] = [
  {
    id: "9",
    name: "Summer Dress",
    price: 39.99,
    originalPrice: 79.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    countryAvailability: ["US", "DE", "ES"],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80",
    ]
  },
  {
    id: "10",
    name: "Running Shoes",
    price: 69.99,
    originalPrice: 129.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    ]
  },
  {
    id: "11",
    name: "Portable Speaker",
    price: 49.99,
    originalPrice: 99.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=800&q=80",
      "https://images.unsplash.com/photo-1574154894072-18ba0d48bd0f?w=800&q=80",
      "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=800&q=80",
    ]
  },
  {
    id: "12",
    name: "Professional Stand Mixer",
    price: 199.99,
    originalPrice: 299.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1546549095-5d8bc3c37ffa?w=800&q=80",
      "https://images.unsplash.com/photo-1622444435576-c8d475d86d09?w=800&q=80",
    ]
  },
  {
    id: "17",
    name: "Gaming Mouse",
    price: 45.99,
    originalPrice: 89.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
      "https://images.unsplash.com/photo-1586349906319-48d20e9d17e9?w=800&q=80",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
      "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&q=80",
    ]
  },
  {
    id: "18",
    name: "Smart Doorbell",
    price: 79.99,
    originalPrice: 149.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558989994-08bf50b89b14?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558989994-08bf50b89b14?w=800&q=80",
      "https://images.unsplash.com/photo-1544484579-173b48cde2e5?w=800&q=80",
      "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?w=800&q=80",
      "https://images.unsplash.com/photo-1558989966-f593c1a08922?w=800&q=80",
    ]
  }
];
