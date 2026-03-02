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
  { id: "f1", name: "Garden Fresh Salad", description: "Crisp greens with cherry tomatoes, cucumber, and lemon vinaigrette", price: 8.99, category: "Appetizers", tags: ["Vegan", "Gluten Free", "Low Calorie"], emoji: "🥗" },
  { id: "f2", name: "Stuffed Mushrooms", description: "Button mushrooms filled with herbs, garlic, and breadcrumbs", price: 10.99, category: "Appetizers", tags: ["Vegetarian"], emoji: "🍄" },
  { id: "f3", name: "Hummus Platter", description: "Creamy chickpea hummus with fresh pita and veggie sticks", price: 9.49, category: "Appetizers", tags: ["Vegan", "Lactose Free"], emoji: "🫘" },
  { id: "f4", name: "Grilled Chicken Breast", description: "Herb-marinated chicken breast with steamed vegetables", price: 16.99, category: "Main Course", tags: ["Gluten Free", "High Protein"], emoji: "🍗" },
  { id: "f5", name: "Veggie Stir Fry", description: "Seasonal vegetables wok-tossed with ginger-soy sauce", price: 13.99, category: "Main Course", tags: ["Vegan", "Low Calorie"], emoji: "🥘" },
  { id: "f6", name: "Salmon Teriyaki", description: "Pan-seared salmon fillet with teriyaki glaze and rice", price: 19.99, category: "Main Course", tags: ["Gluten Free", "High Protein"], emoji: "🐟" },
  { id: "f7", name: "Quinoa Power Bowl", description: "Quinoa with avocado, black beans, corn, and cilantro lime dressing", price: 14.49, category: "Healthy Bowls", tags: ["Vegan", "Gluten Free", "Diabetic Friendly"], emoji: "🥑" },
  { id: "f8", name: "Mediterranean Bowl", description: "Falafel, tabbouleh, pickled onions, and tahini sauce", price: 13.99, category: "Healthy Bowls", tags: ["Vegan", "Lactose Free"], emoji: "🧆" },
  { id: "f9", name: "Mango Coconut Panna Cotta", description: "Silky coconut panna cotta topped with fresh mango coulis", price: 7.99, category: "Desserts", tags: ["Gluten Free", "Lactose Free"], emoji: "🍮" },
  { id: "f10", name: "Dark Chocolate Mousse", description: "Rich vegan chocolate mousse with cocoa nibs", price: 8.49, category: "Desserts", tags: ["Vegan", "Gluten Free"], emoji: "🍫" },
  { id: "f11", name: "Green Detox Smoothie", description: "Spinach, banana, ginger, and coconut water", price: 6.99, category: "Beverages", tags: ["Vegan", "Gluten Free", "Diabetic Friendly", "Low Calorie"], emoji: "🥤" },
  { id: "f12", name: "Turmeric Latte", description: "Warm oat milk with turmeric, cinnamon, and honey", price: 5.49, category: "Beverages", tags: ["Lactose Free"], emoji: "☕" },
];

export const utensils: UtensilItem[] = [
  { id: "u1", name: "Dinner Plate Set (10)", description: "Elegant white ceramic dinner plates, set of 10", pricePerDay: 15, available: 20, emoji: "🍽️" },
  { id: "u2", name: "Glass Tumbler Set (20)", description: "Crystal clear glass tumblers, set of 20", pricePerDay: 12, available: 15, emoji: "🥂" },
  { id: "u3", name: "Cutlery Set (10 place)", description: "Stainless steel fork, knife, spoon for 10 people", pricePerDay: 10, available: 25, emoji: "🍴" },
  { id: "u4", name: "Serving Bowl Set (5)", description: "Large ceramic serving bowls, set of 5", pricePerDay: 8, available: 18, emoji: "🥣" },
  { id: "u5", name: "Chafing Dish", description: "Stainless steel buffet chafing dish with fuel holder", pricePerDay: 25, available: 10, emoji: "🍲" },
  { id: "u6", name: "Beverage Dispenser", description: "5-gallon glass beverage dispenser with spigot", pricePerDay: 18, available: 8, emoji: "🫗" },
];

export const cooks: CookProfile[] = [
  { id: "c1", name: "Chef Arjun Mehta", specialty: "North Indian & Mughlai Cuisine", hourlyRate: 35, fullDayRate: 220, rating: 4.9, available: true, emoji: "👨‍🍳" },
  { id: "c2", name: "Chef Priya Sharma", specialty: "South Indian & Healthy Cuisine", hourlyRate: 30, fullDayRate: 190, rating: 4.8, available: true, emoji: "👩‍🍳" },
  { id: "c3", name: "Chef Marco Rossi", specialty: "Italian & Mediterranean", hourlyRate: 40, fullDayRate: 260, rating: 4.7, available: false, emoji: "👨‍🍳" },
  { id: "c4", name: "Chef Yuki Tanaka", specialty: "Japanese & Asian Fusion", hourlyRate: 38, fullDayRate: 240, rating: 4.9, available: true, emoji: "👩‍🍳" },
];
