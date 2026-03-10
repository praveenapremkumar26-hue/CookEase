export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  emoji: string;
}

export interface UtensilItem {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  available: number;
  emoji: string;
}

export interface CookProfile {
  id: string;
  name: string;
  specialty: string;
  hourlyRate: number;
  fullDayRate: number;
  rating: number;
  available: boolean;
  emoji: string;
}

export const categories = [
  "All",
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Healthy Bowls",
];

export const dietaryFilters = [
  "Vegetarian",
  "Vegan",
  "Gluten Free",
  "Diabetic Friendly",
  "Low Calorie",
  "Lactose Free",
];

export const healthOptions = [
  "No Oil",
  "Low Oil",
  "No Sugar",
  "Low Sugar",
  "Diabetic Friendly",
  "Gluten Free",
  "Vegan",
  "Lactose Free",
  "Nut Free",
  "Low Sodium",
  "No Spice",
  "High Protein",
];

export const foodItems: FoodItem[] = [
  { id: "f1", name: "Samosa Chaat", description: "Crispy samosas crushed and topped with yogurt, chutneys, and spices", price: 120, category: "Appetizers", tags: ["Vegetarian"], emoji: "🥔" },
  { id: "f2", name: "Paneer Tikka", description: "Cubes of paneer marinated in yogurt and spices, grilled to perfection", price: 250, category: "Appetizers", tags: ["Vegetarian", "Gluten Free", "High Protein"], emoji: "🧀" },
  { id: "f3", name: "Hara Bhara Kabab", description: "Healthy patties made of spinach, peas, and potatoes", price: 180, category: "Appetizers", tags: ["Vegan", "Lactose Free", "Low Calorie"], emoji: "🌱" },
  { id: "f4", name: "Butter Chicken", description: "Tender chicken cooked in a rich and creamy tomato sauce", price: 380, category: "Main Course", tags: ["Gluten Free", "High Protein"], emoji: "🍗" },
  { id: "f5", name: "Palak Paneer", description: "Cottage cheese cubes cooked in a smooth spinach gravy", price: 320, category: "Main Course", tags: ["Vegetarian", "Gluten Free"], emoji: "🥬" },
  { id: "f6", name: "Dal Makhani", description: "Slow-cooked black lentils and kidney beans with butter and cream", price: 280, category: "Main Course", tags: ["Vegetarian", "Gluten Free"], emoji: "🥣" },
  { id: "f7", name: "Quinoa Khichdi", description: "Nutritious blend of quinoa, lentils, and fresh vegetables", price: 240, category: "Healthy Bowls", tags: ["Vegan", "Gluten Free", "Diabetic Friendly", "Low Calorie"], emoji: "🥗" },
  { id: "f8", name: "Millet Bisi Bele Bath", description: "Spicy and tangy traditional dish made with healthy millets and lentils", price: 220, category: "Healthy Bowls", tags: ["Vegetarian", "Gluten Free", "High Protein"], emoji: "🍛" },
  { id: "f9", name: "Rasmalai", description: "Soft cottage cheese dumplings soaked in sweetened, thickened milk", price: 150, category: "Desserts", tags: ["Vegetarian", "Gluten Free"], emoji: "🍨" },
  { id: "f10", name: "Gajar Ka Halwa", description: "Classic dessert made with grated carrots, milk, sugar, and nuts", price: 140, category: "Desserts", tags: ["Vegetarian", "Gluten Free"], emoji: "🥕" },
  { id: "f11", name: "Mango Lassi", description: "Refreshing yogurt-based drink sweetened with mango pulp", price: 110, category: "Beverages", tags: ["Vegetarian", "Gluten Free"], emoji: "🥭" },
  { id: "f12", name: "Masala Chai", description: "Traditional Indian tea brewed with aromatic spices and herbs", price: 90, category: "Beverages", tags: ["Vegetarian", "Gluten Free"], emoji: "☕" },
];

export const utensils: UtensilItem[] = [
  { id: "u1", name: "Dinner Plate Set (10)", description: "Elegant white ceramic dinner plates, set of 10", pricePerDay: 450, available: 20, emoji: "🍽️" },
  { id: "u2", name: "Glass Tumbler Set (20)", description: "Crystal clear glass tumblers, set of 20", pricePerDay: 350, available: 15, emoji: "🥂" },
  { id: "u3", name: "Cutlery Set (10 place)", description: "Stainless steel fork, knife, spoon for 10 people", pricePerDay: 250, available: 25, emoji: "🍴" },
  { id: "u4", name: "Serving Bowl Set (5)", description: "Large ceramic serving bowls, set of 5", pricePerDay: 300, available: 18, emoji: "🥣" },
  { id: "u5", name: "Chafing Dish", description: "Stainless steel buffet chafing dish with fuel holder", pricePerDay: 500, available: 10, emoji: "🍲" },
  { id: "u6", name: "Beverage Dispenser", description: "5-gallon glass beverage dispenser with spigot", pricePerDay: 380, available: 8, emoji: "🫗" },
];

export const cooks: CookProfile[] = [
  { id: "c1", name: "Chef Arjun Mehta", specialty: "North Indian & Mughlai Cuisine", hourlyRate: 350, fullDayRate: 2000, rating: 4.9, available: true, emoji: "👨‍🍳" },
  { id: "c2", name: "Chef Priya Sharma", specialty: "South Indian & Healthy Cuisine", hourlyRate: 300, fullDayRate: 1800, rating: 4.8, available: true, emoji: "👩‍🍳" },
  { id: "c3", name: "Chef Vikas Khanna", specialty: "Modern Indian & Fusion Cuisine", hourlyRate: 400, fullDayRate: 2500, rating: 4.7, available: false, emoji: "👨‍🍳" },
  { id: "c4", name: "Chef Garima Arora", specialty: "Traditional Indian & Street Food", hourlyRate: 380, fullDayRate: 2200, rating: 4.9, available: true, emoji: "👩‍🍳" },
];
