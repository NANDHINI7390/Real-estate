import { Property } from '../types';

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Prestige Lakeside Habitat Apartment',
    price: 135, // ₹1.35 Cr
    location: 'Whitefield, Bengaluru',
    city: 'Bengaluru',
    bhk: 3,
    bathrooms: 3,
    sqft: 1850,
    type: 'Apartment',
    purpose: 'Buy',
    description: 'Beautiful 3 BHK semi-furnished apartment on high floor overlooking the Varthur lake. Features premium modular kitchen, wardrobes, elegant false ceiling, and massive spacious balconies with panoramic views. Located in a world-class gated community with superior amenities including a mini-golf course, multiple swimming pools, and extensive gardens.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Parking', 'Lift', 'Gym', 'Security', 'Power Backup', 'Swimming Pool', 'Clubhouse', 'Garden'],
    agent_name: 'Rajesh Sharma',
    agent_phone: '+91 98765 43210',
    facing: 'East',
    floor: '18th of 24 Floors'
  },
  {
    id: 'prop-2',
    title: 'Sobha Elan Ultra Luxury Villa',
    price: 450, // ₹4.50 Cr
    location: 'Kalyani Nagar, Pune',
    city: 'Pune',
    bhk: 4,
    bathrooms: 5,
    sqft: 4200,
    type: 'Villa',
    purpose: 'Buy',
    description: 'Spectacular 4 BHK ultra-luxury villa featuring state-of-the-art Italian marble flooring, double-height ceilings, a private plunge pool, and a beautifully manicured private lawn. Pre-fitted with smart automation systems, VRV air conditioning, and a fully equipped modular kitchen with imported appliances.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Parking', 'Gym', 'Security', 'Power Backup', 'Swimming Pool', 'Clubhouse', 'Garden', 'Private Pool'],
    agent_name: 'Anjali Deshmukh',
    agent_phone: '+91 87654 32109',
    facing: 'North-East',
    floor: 'G + 2 Floors'
  },
  {
    id: 'prop-3',
    title: 'Lodha Amara Premium Tower',
    price: 35, // ₹35,000/month rent
    location: 'Thane West, Mumbai',
    city: 'Mumbai',
    bhk: 2,
    bathrooms: 2,
    sqft: 950,
    type: 'Apartment',
    purpose: 'Rent',
    description: 'Elegant, modern 2 BHK flat available for rent in Thane\'s finest gated development. Bright and airy layout with premium bath fittings, copper gas pipelines, and a spacious utility area. The community offers a 25-acre forest backyard, multiple sports courts, and a magnificent club house.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Parking', 'Lift', 'Gym', 'Security', 'Power Backup', 'Swimming Pool', 'Clubhouse'],
    agent_name: 'Vikas Mehta',
    agent_phone: '+91 96543 21098',
    facing: 'West',
    floor: '12th of 30 Floors'
  },
  {
    id: 'prop-4',
    title: 'Devanahalli Green Meadows Plot',
    price: 85, // ₹85 Lakhs
    location: 'Devanahalli, Bengaluru',
    city: 'Bengaluru',
    bhk: 0,
    bathrooms: 0,
    sqft: 2400,
    type: 'Plot',
    purpose: 'Buy',
    description: 'Premium villa plot of 2400 sq.ft (40x60) in a highly secured BIAAPA approved gated layout close to the Kempegowda International Airport. Ready for registration and immediate construction. The layout features wide asphalted roads, underground electricity and water lines, sewage treatment plant, and a high-end clubhouse.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Security', 'Clubhouse', 'Garden', 'Water Supply', 'Asphalted Roads'],
    agent_name: 'Rajesh Sharma',
    agent_phone: '+91 98765 43210',
    facing: 'North',
    floor: 'Plots Only'
  },
  {
    id: 'prop-5',
    title: 'TechHub Grade-A Commercial Office',
    price: 150, // ₹1.50 Lakhs/month rent (150,000 INR)
    location: 'Baner, Pune',
    city: 'Pune',
    bhk: 0,
    bathrooms: 2,
    sqft: 3200,
    type: 'Commercial',
    purpose: 'Rent',
    description: 'Grade-A fully furnished IT/Commercial office space available for immediate lease. Configured with 45 spacious workstations, 2 executive cabins, 1 conference room (10 seater), cafeteria, reception area, and dedicated server room. Centrally air-conditioned with 100% power backup and dedicated parking slots.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Parking', 'Lift', 'Security', 'Power Backup', 'Air Conditioning', 'Cafeteria'],
    agent_name: 'Anjali Deshmukh',
    agent_phone: '+91 87654 32109',
    facing: 'South',
    floor: '4th of 8 Floors'
  },
  {
    id: 'prop-6',
    title: 'DLF Royal Greens Penthouse',
    price: 290, // ₹2.90 Cr
    location: 'DLF Phase 3, Delhi NCR',
    city: 'Delhi NCR',
    bhk: 4,
    bathrooms: 4,
    sqft: 3600,
    type: 'Apartment',
    purpose: 'Buy',
    description: 'Magnificent 4 BHK duplex penthouse with massive double-height living room and a private rooftop terrace. Spectacular views of the Aravali range and city skyline. Includes fully loaded modern kitchen, wooden flooring in master suites, servant quarter, and 3 reserved basement car parking bays.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Parking', 'Lift', 'Gym', 'Security', 'Power Backup', 'Swimming Pool', 'Clubhouse', 'Garden', 'Servant Room'],
    agent_name: 'Kabir Kapoor',
    agent_phone: '+91 99999 88888',
    facing: 'North-West',
    floor: 'Penthouse (20th & 21st Floor)'
  }
];

export const AVAILABLE_CITIES = ['All', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune'];

export const ALL_AMENITIES = [
  'Parking',
  'Lift',
  'Gym',
  'Security',
  'Power Backup',
  'Swimming Pool',
  'Clubhouse',
  'Garden',
  'Private Pool',
  'Water Supply',
  'Asphalted Roads',
  'Air Conditioning',
  'Cafeteria',
  'Servant Room'
];
