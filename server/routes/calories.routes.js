const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth.middleware')

const foodDatabase = {
  // FRUITS
  'banana': { name: 'Banana', calories: 89, protein: 1, carbs: 23, fat: 0 },
  'apple': { name: 'Apple', calories: 52, protein: 0, carbs: 14, fat: 0 },
  'orange': { name: 'Orange', calories: 47, protein: 1, carbs: 12, fat: 0 },
  'mango': { name: 'Mango', calories: 60, protein: 1, carbs: 15, fat: 0 },
  'grapes': { name: 'Grapes', calories: 69, protein: 1, carbs: 18, fat: 0 },
  'watermelon': { name: 'Watermelon', calories: 30, protein: 1, carbs: 8, fat: 0 },
  'strawberry': { name: 'Strawberries', calories: 32, protein: 1, carbs: 8, fat: 0 },
  'strawberries': { name: 'Strawberries', calories: 32, protein: 1, carbs: 8, fat: 0 },
  'pineapple': { name: 'Pineapple', calories: 50, protein: 1, carbs: 13, fat: 0 },
  'papaya': { name: 'Papaya', calories: 43, protein: 0, carbs: 11, fat: 0 },
  'pomegranate': { name: 'Pomegranate', calories: 83, protein: 2, carbs: 19, fat: 1 },
  'kiwi': { name: 'Kiwi', calories: 61, protein: 1, carbs: 15, fat: 1 },
  'peach': { name: 'Peach', calories: 39, protein: 1, carbs: 10, fat: 0 },
  'pear': { name: 'Pear', calories: 57, protein: 0, carbs: 15, fat: 0 },
  'plum': { name: 'Plum', calories: 46, protein: 1, carbs: 11, fat: 0 },
  'guava': { name: 'Guava', calories: 68, protein: 3, carbs: 14, fat: 1 },
  'lychee': { name: 'Lychee', calories: 66, protein: 1, carbs: 17, fat: 0 },
  'fig': { name: 'Fig', calories: 74, protein: 1, carbs: 19, fat: 0 },
  'dates': { name: 'Dates', calories: 282, protein: 2, carbs: 75, fat: 0 },
  'date': { name: 'Date', calories: 282, protein: 2, carbs: 75, fat: 0 },
  'coconut': { name: 'Coconut', calories: 354, protein: 3, carbs: 15, fat: 33 },
  'avocado': { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15 },
  'blueberries': { name: 'Blueberries', calories: 57, protein: 1, carbs: 14, fat: 0 },
  'blueberry': { name: 'Blueberry', calories: 57, protein: 1, carbs: 14, fat: 0 },

  // PROTEINS
  'chicken breast': { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 4 },
  'chicken': { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 4 },
  'egg': { name: 'Whole Egg', calories: 155, protein: 13, carbs: 1, fat: 11 },
  'eggs': { name: 'Whole Egg', calories: 155, protein: 13, carbs: 1, fat: 11 },
  'boiled egg': { name: 'Boiled Egg', calories: 155, protein: 13, carbs: 1, fat: 11 },
  'boiled eggs': { name: 'Boiled Egg', calories: 155, protein: 13, carbs: 1, fat: 11 },
  'egg white': { name: 'Egg White', calories: 52, protein: 11, carbs: 1, fat: 0 },
  'egg whites': { name: 'Egg White', calories: 52, protein: 11, carbs: 1, fat: 0 },
  'scrambled eggs': { name: 'Scrambled Eggs', calories: 148, protein: 10, carbs: 1, fat: 11 },
  'omelette': { name: 'Omelette', calories: 154, protein: 11, carbs: 0, fat: 12 },
  'tuna': { name: 'Tuna (canned)', calories: 116, protein: 26, carbs: 0, fat: 1 },
  'salmon': { name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13 },
  'beef': { name: 'Lean Beef', calories: 250, protein: 26, carbs: 0, fat: 15 },
  'mutton': { name: 'Mutton', calories: 294, protein: 25, carbs: 0, fat: 21 },
  'lamb': { name: 'Lamb', calories: 294, protein: 25, carbs: 0, fat: 21 },
  'pork': { name: 'Pork', calories: 242, protein: 27, carbs: 0, fat: 14 },
  'paneer': { name: 'Paneer', calories: 265, protein: 18, carbs: 4, fat: 20 },
  'tofu': { name: 'Tofu', calories: 76, protein: 8, carbs: 2, fat: 4 },
  'shrimp': { name: 'Shrimp', calories: 99, protein: 24, carbs: 0, fat: 0 },
  'prawns': { name: 'Prawns', calories: 99, protein: 24, carbs: 0, fat: 0 },
  'turkey': { name: 'Turkey', calories: 189, protein: 29, carbs: 0, fat: 7 },
  'fish': { name: 'Fish (general)', calories: 136, protein: 22, carbs: 0, fat: 5 },
  'whey protein': { name: 'Whey Protein', calories: 120, protein: 25, carbs: 3, fat: 2 },

  // GRAINS AND CARBS
  'white rice': { name: 'White Rice (cooked)', calories: 130, protein: 3, carbs: 28, fat: 0 },
  'brown rice': { name: 'Brown Rice (cooked)', calories: 111, protein: 3, carbs: 23, fat: 1 },
  'rice': { name: 'White Rice (cooked)', calories: 130, protein: 3, carbs: 28, fat: 0 },
  'oats': { name: 'Oats', calories: 389, protein: 17, carbs: 66, fat: 7 },
  'oatmeal': { name: 'Oatmeal (cooked)', calories: 71, protein: 2, carbs: 12, fat: 1 },
  'bread': { name: 'Whole Wheat Bread', calories: 247, protein: 13, carbs: 41, fat: 4 },
  'white bread': { name: 'White Bread', calories: 265, protein: 9, carbs: 49, fat: 3 },
  'brown bread': { name: 'Brown Bread', calories: 247, protein: 13, carbs: 41, fat: 4 },
  'pasta': { name: 'Pasta (cooked)', calories: 131, protein: 5, carbs: 25, fat: 1 },
  'roti': { name: 'Roti/Chapati', calories: 297, protein: 10, carbs: 57, fat: 4 },
  'chapati': { name: 'Chapati', calories: 297, protein: 10, carbs: 57, fat: 4 },
  'idli': { name: 'Idli', calories: 58, protein: 2, carbs: 12, fat: 0 },
  'dosa': { name: 'Plain Dosa', calories: 133, protein: 3, carbs: 25, fat: 3 },
  'upma': { name: 'Upma', calories: 172, protein: 4, carbs: 27, fat: 6 },
  'poha': { name: 'Poha', calories: 180, protein: 3, carbs: 35, fat: 4 },
  'quinoa': { name: 'Quinoa (cooked)', calories: 120, protein: 4, carbs: 21, fat: 2 },
  'corn': { name: 'Sweet Corn', calories: 86, protein: 3, carbs: 19, fat: 1 },
  'potato': { name: 'Potato (boiled)', calories: 77, protein: 2, carbs: 17, fat: 0 },
  'sweet potato': { name: 'Sweet Potato', calories: 86, protein: 2, carbs: 20, fat: 0 },
  'noodles': { name: 'Noodles (cooked)', calories: 138, protein: 5, carbs: 25, fat: 2 },
  'maggi': { name: 'Maggi Noodles', calories: 203, protein: 5, carbs: 30, fat: 8 },

  // DAIRY AND DRINKS
  'milk': { name: 'Whole Milk', calories: 61, protein: 3, carbs: 5, fat: 3 },
  'full cream milk': { name: 'Full Cream Milk', calories: 61, protein: 3, carbs: 5, fat: 3 },
  'skim milk': { name: 'Skim Milk', calories: 34, protein: 3, carbs: 5, fat: 0 },
  'toned milk': { name: 'Toned Milk', calories: 44, protein: 3, carbs: 5, fat: 1 },
  'milk tea': { name: 'Milk Tea / Chai', calories: 55, protein: 2, carbs: 6, fat: 2 },
  'chai': { name: 'Chai / Milk Tea', calories: 55, protein: 2, carbs: 6, fat: 2 },
  'tea': { name: 'Tea with Milk', calories: 30, protein: 1, carbs: 3, fat: 1 },
  'black tea': { name: 'Black Tea', calories: 2, protein: 0, carbs: 0, fat: 0 },
  'green tea': { name: 'Green Tea', calories: 2, protein: 0, carbs: 0, fat: 0 },
  'coffee': { name: 'Black Coffee', calories: 2, protein: 0, carbs: 0, fat: 0 },
  'black coffee': { name: 'Black Coffee', calories: 2, protein: 0, carbs: 0, fat: 0 },
  'cappuccino': { name: 'Cappuccino', calories: 74, protein: 4, carbs: 6, fat: 3 },
  'latte': { name: 'Latte', calories: 101, protein: 7, carbs: 10, fat: 4 },
  'curd': { name: 'Curd/Yogurt', calories: 98, protein: 11, carbs: 4, fat: 5 },
  'yogurt': { name: 'Plain Yogurt', calories: 59, protein: 10, carbs: 4, fat: 0 },
  'greek yogurt': { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 4, fat: 0 },
  'lassi': { name: 'Lassi (sweet)', calories: 78, protein: 4, carbs: 11, fat: 2 },
  'buttermilk': { name: 'Buttermilk', calories: 40, protein: 3, carbs: 5, fat: 1 },
  'cheese': { name: 'Cheddar Cheese', calories: 402, protein: 25, carbs: 1, fat: 33 },
  'butter': { name: 'Butter', calories: 717, protein: 1, carbs: 0, fat: 81 },
  'ghee': { name: 'Ghee', calories: 900, protein: 0, carbs: 0, fat: 99 },
  'orange juice': { name: 'Orange Juice', calories: 45, protein: 1, carbs: 10, fat: 0 },
  'coconut water': { name: 'Coconut Water', calories: 19, protein: 0, carbs: 4, fat: 0 },
  'protein shake': { name: 'Protein Shake', calories: 130, protein: 25, carbs: 5, fat: 2 },

  // VEGETABLES
  'broccoli': { name: 'Broccoli', calories: 34, protein: 3, carbs: 7, fat: 0 },
  'spinach': { name: 'Spinach', calories: 23, protein: 3, carbs: 4, fat: 0 },
  'tomato': { name: 'Tomato', calories: 18, protein: 1, carbs: 4, fat: 0 },
  'tomatoes': { name: 'Tomatoes', calories: 18, protein: 1, carbs: 4, fat: 0 },
  'carrot': { name: 'Carrot', calories: 41, protein: 1, carbs: 10, fat: 0 },
  'carrots': { name: 'Carrots', calories: 41, protein: 1, carbs: 10, fat: 0 },
  'cucumber': { name: 'Cucumber', calories: 15, protein: 1, carbs: 4, fat: 0 },
  'onion': { name: 'Onion', calories: 40, protein: 1, carbs: 9, fat: 0 },
  'capsicum': { name: 'Capsicum', calories: 20, protein: 1, carbs: 5, fat: 0 },
  'bell pepper': { name: 'Bell Pepper', calories: 20, protein: 1, carbs: 5, fat: 0 },
  'peas': { name: 'Green Peas', calories: 81, protein: 5, carbs: 14, fat: 0 },
  'cauliflower': { name: 'Cauliflower', calories: 25, protein: 2, carbs: 5, fat: 0 },
  'cabbage': { name: 'Cabbage', calories: 25, protein: 1, carbs: 6, fat: 0 },
  'lettuce': { name: 'Lettuce', calories: 15, protein: 1, carbs: 3, fat: 0 },
  'mushroom': { name: 'Mushrooms', calories: 22, protein: 3, carbs: 3, fat: 0 },
  'mushrooms': { name: 'Mushrooms', calories: 22, protein: 3, carbs: 3, fat: 0 },
  'garlic': { name: 'Garlic', calories: 149, protein: 6, carbs: 33, fat: 1 },
  'ginger': { name: 'Ginger', calories: 80, protein: 2, carbs: 18, fat: 1 },

  // PULSES AND LEGUMES
  'dal': { name: 'Dal (lentils cooked)', calories: 116, protein: 9, carbs: 20, fat: 0 },
  'lentils': { name: 'Lentils (cooked)', calories: 116, protein: 9, carbs: 20, fat: 0 },
  'chickpeas': { name: 'Chickpeas (cooked)', calories: 164, protein: 9, carbs: 27, fat: 3 },
  'chana': { name: 'Chana (chickpeas)', calories: 164, protein: 9, carbs: 27, fat: 3 },
  'rajma': { name: 'Rajma/Kidney Beans', calories: 127, protein: 9, carbs: 22, fat: 0 },
  'kidney beans': { name: 'Kidney Beans', calories: 127, protein: 9, carbs: 22, fat: 0 },
  'soybean': { name: 'Soybeans', calories: 173, protein: 17, carbs: 10, fat: 9 },
  'moong dal': { name: 'Moong Dal', calories: 105, protein: 7, carbs: 19, fat: 0 },

  // NUTS AND OILS
  'almonds': { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50 },
  'almond': { name: 'Almond', calories: 579, protein: 21, carbs: 22, fat: 50 },
  'peanuts': { name: 'Peanuts', calories: 567, protein: 26, carbs: 16, fat: 49 },
  'cashews': { name: 'Cashews', calories: 553, protein: 18, carbs: 30, fat: 44 },
  'walnuts': { name: 'Walnuts', calories: 654, protein: 15, carbs: 14, fat: 65 },
  'peanut butter': { name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fat: 50 },
  'almond butter': { name: 'Almond Butter', calories: 614, protein: 21, carbs: 19, fat: 56 },
  'olive oil': { name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fat: 100 },
  'coconut oil': { name: 'Coconut Oil', calories: 862, protein: 0, carbs: 0, fat: 100 },

  // MISC AND SWEETS
  'sugar': { name: 'Sugar', calories: 387, protein: 0, carbs: 100, fat: 0 },
  'honey': { name: 'Honey', calories: 304, protein: 0, carbs: 82, fat: 0 },
  'dark chocolate': { name: 'Dark Chocolate', calories: 546, protein: 5, carbs: 60, fat: 31 },
  'chocolate': { name: 'Milk Chocolate', calories: 535, protein: 8, carbs: 60, fat: 30 },
  'ice cream': { name: 'Ice Cream', calories: 207, protein: 4, carbs: 24, fat: 11 },
  'protein bar': { name: 'Protein Bar', calories: 200, protein: 20, carbs: 22, fat: 7 },

  // INDIAN FOODS
  'samosa': { name: 'Samosa', calories: 252, protein: 4, carbs: 28, fat: 14 },
  'biryani': { name: 'Chicken Biryani', calories: 200, protein: 12, carbs: 25, fat: 6 },
  'chicken biryani': { name: 'Chicken Biryani', calories: 200, protein: 12, carbs: 25, fat: 6 },
  'dal rice': { name: 'Dal Rice', calories: 140, protein: 6, carbs: 28, fat: 1 },
  'khichdi': { name: 'Khichdi', calories: 130, protein: 5, carbs: 25, fat: 2 },
  'pav bhaji': { name: 'Pav Bhaji', calories: 300, protein: 8, carbs: 45, fat: 10 },
  'chole': { name: 'Chole (chickpea curry)', calories: 180, protein: 9, carbs: 25, fat: 5 },
  'palak paneer': { name: 'Palak Paneer', calories: 220, protein: 10, carbs: 10, fat: 16 },
  'butter chicken': { name: 'Butter Chicken', calories: 243, protein: 25, carbs: 8, fat: 13 },
  'aloo paratha': { name: 'Aloo Paratha', calories: 300, protein: 7, carbs: 45, fat: 11 },
  'paratha': { name: 'Plain Paratha', calories: 260, protein: 6, carbs: 35, fat: 11 },
  'dhokla': { name: 'Dhokla', calories: 160, protein: 5, carbs: 28, fat: 4 },
  'vada': { name: 'Vada', calories: 180, protein: 4, carbs: 22, fat: 9 },
  'puri': { name: 'Puri', calories: 150, protein: 3, carbs: 18, fat: 8 },

  // INTERNATIONAL FOODS
  'pizza': { name: 'Pizza (1 slice)', calories: 285, protein: 12, carbs: 36, fat: 10 },
  'burger': { name: 'Burger', calories: 354, protein: 17, carbs: 29, fat: 17 },
  'french fries': { name: 'French Fries', calories: 312, protein: 3, carbs: 41, fat: 15 },
  'sandwich': { name: 'Sandwich', calories: 250, protein: 12, carbs: 33, fat: 8 },
  'sushi': { name: 'Sushi (per piece)', calories: 40, protein: 2, carbs: 7, fat: 1 },
  'salad': { name: 'Mixed Green Salad', calories: 20, protein: 2, carbs: 4, fat: 0 }
}

const parseGrams = (query) => {
  const gramMatch = query.match(/(\d+)\s*(g|gm|grams?|kg)\b/i)
  const mlMatch = query.match(/(\d+)\s*(ml|milliliter|litre?|liter?|l)\b/i)
  const cupMatch = query.match(/(\d+\.?\d*)\s*(cup|cups)\b/i)
  const tbspMatch = query.match(/(\d+\.?\d*)\s*(tbsp|tablespoon|tablespoons)\b/i)
  const tspMatch = query.match(/(\d+\.?\d*)\s*(tsp|teaspoon|teaspoons)\b/i)
  const pieceMatch = query.match(/(\d+)\s*(piece|pieces|slice|slices|pc|pcs)\b/i)

  if (gramMatch) {
    let grams = parseFloat(gramMatch[1])
    if (gramMatch[2].toLowerCase() === 'kg') grams *= 1000
    return { grams, label: `${gramMatch[1]}${gramMatch[2]}` }
  }
  if (mlMatch) {
    let ml = parseFloat(mlMatch[1])
    if (mlMatch[2].toLowerCase().startsWith('l') || mlMatch[2].toLowerCase() === 'litre' || mlMatch[2].toLowerCase() === 'liter') ml *= 1000
    return { grams: ml, label: `${mlMatch[1]}ml` }
  }
  if (cupMatch) return { grams: parseFloat(cupMatch[1]) * 240, label: `${cupMatch[1]} cup` }
  if (tbspMatch) return { grams: parseFloat(tbspMatch[1]) * 15, label: `${tbspMatch[1]} tbsp` }
  if (tspMatch) return { grams: parseFloat(tspMatch[1]) * 5, label: `${tspMatch[1]} tsp` }
  if (pieceMatch) return { grams: null, pieces: parseInt(pieceMatch[1]), label: `${pieceMatch[1]} piece` }

  return { grams: 100, label: '100g' }
}

router.post('/search', protect, async (req, res) => {
  try {
    const { query } = req.body
    if (!query) return res.status(400).json({ message: 'Query is required' })

    const queryLower = query.toLowerCase().trim()
    console.log('Searching for:', queryLower)

    const portion = parseGrams(queryLower)
    const cleanQuery = queryLower
      .replace(/(\d+)\s*(g|gm|grams?|kg|ml|l|litre?|liter?|cup|cups|tbsp|tablespoons?|tsp|teaspoons?|piece|pieces|slice|slices|pc|pcs)\b/gi, '')
      .replace(/^\s*(a|an|some|the|of)\s+/i, '')
      .trim()

    console.log('Clean query:', cleanQuery)
    console.log('Portion:', portion)

    const sortedKeys = Object.keys(foodDatabase).sort((a, b) => b.length - a.length)
    const exactMatch = sortedKeys.find(key => cleanQuery === key)
    const startsWithMatch = sortedKeys.find(key => cleanQuery.startsWith(key) || key.startsWith(cleanQuery))
    const includesMatch = sortedKeys.find(key => cleanQuery.includes(key) && key.length > 3)

    const matchedKey = exactMatch || startsWithMatch || includesMatch

    if (matchedKey) {
      const food = foodDatabase[matchedKey]
      const multiplier = portion.grams !== null ? portion.grams / 100 : (portion.pieces || 1)

      const result = {
        id: Date.now() + Math.random(),
        name: food.name,
        quantity: portion.label,
        calories: Math.round(food.calories * multiplier),
        protein: Math.round(food.protein * multiplier),
        carbs: Math.round(food.carbs * multiplier),
        fat: Math.round(food.fat * multiplier)
      }

      console.log('Found:', result)
      return res.json([result])
    }

    console.log('Not found in database')
    return res.json([])

  } catch (error) {
    console.log('Error:', error.message)
    res.status(500).json({ message: 'Food search failed', error: error.message })
  }
})

module.exports = router