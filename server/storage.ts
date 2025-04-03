import { users, type User, type InsertUser, properties, type Property, type InsertProperty, inquiries, type Inquiry, type InsertInquiry } from "@shared/schema";

// Interface defining all CRUD operations for the storage
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property operations
  getProperties(location?: string, propertyType?: string, priceRange?: string, bedrooms?: string): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<Property>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Inquiry operations
  getInquiries(): Promise<Inquiry[]>;
  getInquiryById(id: number): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private inquiries: Map<number, Inquiry>;
  private userId: number;
  private propertyId: number;
  private inquiryId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.inquiries = new Map();
    this.userId = 1;
    this.propertyId = 1;
    this.inquiryId = 1;
    
    // Initialize with sample properties
    this.initSampleProperties();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Property operations
  async getProperties(
    location?: string, 
    propertyType?: string, 
    priceRange?: string, 
    bedrooms?: string
  ): Promise<Property[]> {
    let properties = Array.from(this.properties.values());
    
    // Apply filters if provided
    if (location && location !== 'All Locations') {
      properties = properties.filter(p => p.location.includes(location));
    }
    
    if (propertyType && propertyType !== 'All Types') {
      properties = properties.filter(p => p.propertyType === propertyType);
    }
    
    if (priceRange && priceRange !== 'Any Price') {
      const ranges: Record<string, [number, number]> = {
        '$100k - $200k': [100000, 200000],
        '$200k - $500k': [200000, 500000],
        '$500k - $1M': [500000, 1000000],
        '$1M+': [1000000, Number.MAX_SAFE_INTEGER]
      };
      
      const [min, max] = ranges[priceRange] || [0, Number.MAX_SAFE_INTEGER];
      properties = properties.filter(p => p.price >= min && p.price <= max);
    }
    
    if (bedrooms && bedrooms !== 'Any') {
      const minBedrooms = parseInt(bedrooms);
      if (!isNaN(minBedrooms)) {
        properties = properties.filter(p => p.bedrooms >= minBedrooms);
      }
    }
    
    return properties;
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.featured);
  }

  async getPropertyById(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.propertyId++;
    const property: Property = { ...insertProperty, id };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: number, propertyData: Partial<Property>): Promise<Property | undefined> {
    const property = this.properties.get(id);
    if (!property) return undefined;
    
    const updatedProperty: Property = { ...property, ...propertyData };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }

  // Inquiry operations
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async getInquiryById(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      status: "new" 
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    const inquiry = this.inquiries.get(id);
    if (!inquiry) return undefined;
    
    const updatedInquiry: Inquiry = { ...inquiry, status };
    this.inquiries.set(id, updatedInquiry);
    return updatedInquiry;
  }

  // Initialize with sample properties data
  private initSampleProperties() {
    const properties: InsertProperty[] = [
      {
        title: "Modern Luxury Home",
        description: "This stunning modern luxury home features an open floor plan, high ceilings, and premium finishes throughout. The gourmet kitchen includes top-of-the-line appliances and a large island perfect for entertaining. The primary suite offers a spa-like bathroom and walk-in closet.",
        price: 1950000,
        location: "Beverly Hills, CA",
        bedrooms: 4,
        bathrooms: 3,
        area: 3200,
        propertyType: "House",
        status: "available",
        featured: true,
        isNew: false,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        images: [
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        ],
        features: ["Pool", "Home Office", "Smart Home", "Security System", "Fireplace", "Garage (2 cars)"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: "Beachfront Villa",
        description: "Luxurious beachfront villa with breathtaking ocean views from every room. This spectacular property features direct beach access, an infinity pool, and spacious outdoor entertainment areas. The interior boasts high-end finishes, a gourmet kitchen, and a master suite with panoramic water views.",
        price: 3750000,
        location: "Malibu, CA",
        bedrooms: 5,
        bathrooms: 4,
        area: 4500,
        propertyType: "Villa",
        status: "available",
        featured: true,
        isNew: false,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        images: [
          "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        ],
        features: ["Beachfront", "Infinity Pool", "Outdoor Kitchen", "Wine Cellar", "Home Theater", "Guest House"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: "Urban Apartment",
        description: "Contemporary apartment in the heart of the city with stunning skyline views. This stylish residence features floor-to-ceiling windows, premium finishes, and an open concept design. The building offers numerous amenities including a rooftop terrace, fitness center, and 24-hour concierge service.",
        price: 895000,
        location: "New York, NY",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        propertyType: "Apartment",
        status: "available",
        featured: true,
        isNew: true,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        ],
        features: ["City Views", "Concierge", "Fitness Center", "Rooftop Deck", "Pet Friendly", "In-unit Laundry"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: "Country Estate",
        description: "Expansive country estate nestled on 5 acres of lush landscaping. This elegant property features a grand entryway, formal dining room, gourmet kitchen, and spacious living areas perfect for entertaining. The outdoor space includes a pool, tennis court, and beautifully maintained gardens.",
        price: 2650000,
        location: "Greenwich, CT",
        bedrooms: 6,
        bathrooms: 5,
        area: 5800,
        propertyType: "House",
        status: "available",
        featured: false,
        isNew: false,
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        images: [
          "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        ],
        features: ["Tennis Court", "Pool", "Horse Stables", "Wine Cellar", "Library", "4-Car Garage"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: "Downtown Loft",
        description: "Stylish industrial loft in the trendy downtown district. This unique space features exposed brick walls, high ceilings with original beams, and large factory windows providing abundant natural light. The open floor plan can be customized to suit your lifestyle needs.",
        price: 750000,
        location: "Chicago, IL",
        bedrooms: 1,
        bathrooms: 2,
        area: 1800,
        propertyType: "Loft",
        status: "available",
        featured: false,
        isNew: true,
        image: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        images: [
          "https://images.unsplash.com/photo-1560448204-cff674bfa6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1560448082-4d6eb68e1100?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1560448075-d03ef8bbfa7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        ],
        features: ["Exposed Brick", "High Ceilings", "Industrial Design", "Open Floor Plan", "Freight Elevator", "Roof Access"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        title: "Waterfront Condo",
        description: "Luxurious waterfront condo with panoramic bay views. This elegant residence features an open-concept living space with floor-to-ceiling windows, a gourmet kitchen with top-of-the-line appliances, and a spacious balcony overlooking the water. Building amenities include a pool, spa, and fitness center.",
        price: 1250000,
        location: "Miami, FL",
        bedrooms: 3,
        bathrooms: 3,
        area: 2200,
        propertyType: "Condo",
        status: "available",
        featured: false,
        isNew: false,
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        images: [
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1536746803623-cef87080bfc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        ],
        features: ["Waterfront", "Doorman", "Pool & Spa", "Private Balcony", "Marina Access", "Valet Parking"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    // Add properties to storage
    properties.forEach(property => {
      const id = this.propertyId++;
      this.properties.set(id, { ...property, id });
    });
  }
}

export const storage = new MemStorage();
