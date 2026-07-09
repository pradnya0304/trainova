const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth.middleware')
const axios = require('axios')

const fallbackFoods = {
  'banana': { name: 'Banana', calories: 89, protein: 1, carbs: 23, fat: 0 },
  'apple': { name: 'Apple', calories: 52, protein: 0, carbs: 14, fat: 0 },
  'orange': { name: 'Orange', calories: 47, protein: 1, carbs: 12, fat: 0 },
  'mango': { name: 'Mango', calories: 60, protein: 1, carbs: 15, fat: 0 },
  'grapes': { name: 'Grapes', calories: 69, protein: 1, carbs: 18, fat: 0 },
  'watermelon': { name: 'Watermelon', calories: 30, protein: 1, carbs: 8, fat: 0 },
  'strawberry': { name: 'Strawberries', calories: 32, protein: 1, carbs: 8, fat: 0 },
  'pineapple': { name: 'Pineapple', calories: 50, protein: 1, carbs: 13, fat: 0 },
  'papaya': { name: 'Papaya', calories: 43, protein: 0, carbs: 11, fat: 0 },
  'pomegranate': { name: 'Pomegranate', calories: 83, protein: 2, carbs: 19, fat: 1 },

  'chicken breast': { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 4 },
  'chicken': { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 4 },
  'egg': { name: 'Whole Egg', calories: 155, protein: 13, carbs: 1, fat: 11 },
  'eggs': { name: 'Whole Egg', calories: 155, protein: 13, carbs: 1, fat: 11 },
  'boiled egg': { name: 'Boiled Egg', calories: 155, protein: 13, carbs: 1, fat: 11 },
  'tuna': { name: 'Tuna (canned)', calories: 116, protein: 26, carbs: 0, fat: 1 },
  'salmon': { name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13 },
  'beef': { name: 'Beef (lean)', calories: 250, protein: 26, carbs: 0, fat: 15 },
  'mutton': { name: 'Mutton', calories: 294, protein: 25, carbs: 0, fat: 21 },
  'paneer': { name: 'Paneer', calories: 265, protein: 18, carbs: 4, fat: 20 },
  'tofu': { name: 'Tofu', calories: 76, protein: 8, carbs: 2, fat: 4 },
  'shrimp': { name: 'Shrimp', calories: 99, protein: 24, carbs: 0, fat: 0 },
  'turkey': { name: 'Turkey', calories: 189, protein: 29, carbs: 0, fat: 7 },

  'white rice': { name: 'White Rice (cooked)', calories: 130, protein: 3, carbs: 28, fat: 0 },
  'brown rice': { name: 'Brown Rice (cooked)', calories: 111, protein: 3, carbs: 23, fat: 1 },
  'rice': { name: 'White Rice (cooked)', calories: 130, protein: 3, carbs: 28, fat: 0 },
  'oats': { name: 'Oats', calories: 389, protein: 17, carbs: 66, fat: 7 },
  'bread': { name: 'Whole Wheat Bread', calories: 247, protein: 13, carbs: 41, fat: 4 },
  'white bread': { name: 'White Bread', calories: 265, protein: 9, carbs: 49, fat: 3 },
  'pasta': { name: 'Pasta (cooked)', calories: 131, protein: 5, carbs: 25, fat: 1 },
  'roti': { name: 'Roti/Chapati', calories: 297, protein: 10, carbs: 57, fat: 4 },
  'chapati': { name: 'Chapati', calories: 297, protein: 10, carbs: 57, fat: 4 },
  'wheat': { name: 'Whole Wheat', calories: 340, protein: 13, carbs: 72, fat: 3 },
  'idli': { name: 'Idli', calories: 58, protein: 2, carbs: 12, fat: 0 },
  'dosa': { name: 'Plain Dosa', calories: 133, protein: 3, carbs: 25, fat: 3 },
  'upma': { name: 'Upma', calories: 172, protein: 4, carbs: 27, fat: 6 },
  'poha': { name: 'Poha', calories: 180, protein: 3, carbs: 35, fat: 4 },
  'quinoa': { name: 'Quinoa (cooked)', calories: 120, protein: 4, carbs: 21, fat: 2 },
  'corn': { name: 'Sweet Corn', calories: 86, protein: 3, carbs: 19, fat: 1 },
  'potato': { name: 'Potato (boiled)', calories: 77, protein: 2, carbs: 17, fat: 0 },
  'sweet potato': { name: 'Sweet Potato', calories: 86, protein: 2, carbs: 20, fat: 0 },

  'milk': { name: 'Whole Milk', calories: 61, protein: 3, carbs: 5, fat: 3 },
  'full cream milk': { name: 'Full Cream Milk', calories: 61, protein: 3, carbs: 5, fat: 3 },
  'skim milk': { name: 'Skim Milk', calories: 34, protein: 3, carbs: 5, fat: 0 },
  'curd': { name: 'Curd/Yogurt', calories: 98, protein: 11, carbs: 4, fat: 5 },
  'yogurt': { name: 'Plain Yogurt', calories: 59, protein: 10, carbs: 4, fat: 0 },
  'greek yogurt': { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 4, fat: 0 },
  'cheese': { name: 'Cheddar Cheese', calories: 402, protein: 25, carbs: 1, fat: 33 },
  'butter': { name: 'Butter', calories: 717, protein: 1, carbs: 0, fat: 81 },
  'ghee': { name: 'Ghee', calories: 900, protein: 0, carbs: 0, fat: 99 },
  'whey protein': { name: 'Whey Protein', calories: 120, protein: 25, carbs: 3, fat: 2 },

  'broccoli': { name: 'Broccoli', calories: 34, protein: 3, carbs: 7, fat: 0 },
  'spinach': { name: 'Spinach', calories: 23, protein: 3, carbs: 4, fat: 0 },
  'tomato': { name: 'Tomato', calories: 18, protein: 1, carbs: 4, fat: 0 },
  'carrot': { name: 'Carrot', calories: 41, protein: 1, carbs: 10, fat: 0 },
  'cucumber': { name: 'Cucumber', calories: 15, protein: 1, carbs: 4, fat: 0 },
  'onion': { name: 'Onion', calories: 40, protein: 1, carbs: 9, fat: 0 },
  'capsicum': { name: 'Capsicum/Bell Pepper', calories: 20, protein: 1, carbs: 5, fat: 0 },
  'peas': { name: 'Green Peas', calories: 81, protein: 5, carbs: 14, fat: 0 },
  'cauliflower': { name: 'Cauliflower', calories: 25, protein: 2, carbs: 5, fat: 0 },
  'cabbage': { name: 'Cabbage', calories: 25, protein: 1, carbs: 6, fat: 0 },
  'lettuce': { name: 'Lettuce', calories: 15, protein: 1, carbs: 3, fat: 0 },
  'mushroom': { name: 'Mushrooms', calories: 22, protein: 3, carbs: 3, fat: 0 },

  'almonds': { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50 },
  'peanuts': { name: 'Peanuts', calories: 567, protein: 26, carbs: 16, fat: 49 },
  'cashews': { name: 'Cashews', calories: 553, protein: 18, carbs: 30, fat: 44 },
  'walnuts': { name: 'Walnuts', calories: 654, protein: 15, carbs: 14, fat: 65 },
  'peanut butter': { name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fat: 50 },
  'dal': { name: 'Dal (lentils cooked)', calories: 116, protein: 9, carbs: 20, fat: 0 },
  'lentils': { name: 'Lentils (cooked)', calories: 116, protein: 9, carbs: 20, fat: 0 },
  'chickpeas': { name: 'Chickpeas (cooked)', calories: 164, protein: 9, carbs: 27, fat: 3 },
  'rajma': { name: 'Rajma/Kidney Beans', calories: 127, protein: 9, carbs: 22, fat: 0 },
  'soybean': { name: 'Soybeans', calories: 173, protein: 17, carbs: 10, fat: 9 },

  'olive oil': { name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fat: 100 },
  'coconut oil': { name: 'Coconut Oil', calories: 862, protein: 0, carbs: 0, fat: 100 },
  'sugar': { name: 'Sugar', calories: 387, protein: 0, carbs: 100, fat: 0 },
  'honey': { name: 'Honey', calories: 304, protein: 0, carbs: 82, fat: 0 },
  'dark chocolate': { name: 'Dark Chocolate', calories: 546, protein: 5, carbs: 60, fat: 31 },
  'coffee': { name: 'Black Coffee', calories: 2, protein: 0, carbs: 0, fat: 0 },
  'green tea': { name: 'Green Tea', calories: 2, protein: 0, carbs: 0, fat: 0 },
  'orange juice': { name: 'Orange Juice', calories: 45, protein: 1, carbs: 10, fat: 0 },
  'coconut water': { name: 'Coconut Water', calories: 19, protein: 0, carbs: 4, fat: 0 },

  'samosa': { name: 'Samosa', calories: 252, protein: 4, carbs: 28, fat: 14 },
  'biryani': { name: 'Chicken Biryani', calories: 200, protein: 12, carbs: 25, fat: 6 },
  'pizza': { name: 'Pizza (1 slice)', calories: 285, protein: 12, carbs: 36, fat: 10 },
  'burger': { name: 'Burger', calories: 354, protein: 17, carbs: 29, fat: 17 },
  'french fries': { name: 'French Fries', calories: 312, protein: 3, carbs: 41, fat: 15 },
  'sandwich': { name: 'Sandwich', calories: 250, protein: 12, carbs: 33, fat: 8 },
  'noodles': { name: 'Noodles (cooked)', calories: 138, protein: 5, carbs: 25, fat: 2 }
}

router.post('/search', protect, async (req, res) => {
  try {
    const { query } = req.body

    if (!query) {
      return res.status(400).json({ message: 'Query is required' })
    }

    const queryLower = query.toLowerCase().trim()
    console.log('Searching for:', queryLower)

    const fallbackMatch = Object.keys(fallbackFoods).find(key =>
      queryLower.includes(key) || key.includes(queryLower)
    )

    if (fallbackMatch) {
      const food = fallbackFoods[fallbackMatch]
      console.log('Found in fallback:', food.name)
      return res.json([{
        id: Date.now() + Math.random(),
        name: food.name,
        quantity: '100g serving',
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat
      }])
    }

    console.log('Not in fallback, trying Open Food Facts...')

    const response = await axios.get(
      'https://world.openfoodfacts.org/cgi/search.pl',
      {
        params: {
          search_terms: query,
          search_simple: 1,
          action: 'process',
          json: 1,
          page_size: 20,
          fields: 'product_name,nutriments,lang',
          tagtype_0: 'languages',
          tag_contains_0: 'contains',
          tag_0: 'en'
        },
        timeout: 8000,
        headers: {
          'User-Agent': 'Trainova-App/1.0'
        }
      }
    )

    const products = response.data.products

    if (!products || products.length === 0) {
      return res.json([])
    }

    const englishProducts = products.filter(p => {
      const name = p.product_name || ''
      const hasEnglishChars = /^[a-zA-Z0-9\s\-\(\)\/\&\,\.\']+$/.test(name)
      const hasCalories = p.nutriments?.['energy-kcal_100g'] || p.nutriments?.['energy-kcal']
      return hasEnglishChars && hasCalories && name.length > 1 && name.length < 60
    })

    const foods = englishProducts
      .slice(0, 3)
      .map(p => ({
        id: Date.now() + Math.random(),
        name: p.product_name,
        quantity: '100g serving',
        calories: Math.round(p.nutriments?.['energy-kcal_100g'] || p.nutriments?.['energy-kcal'] || 0),
        protein: Math.round(p.nutriments?.['proteins_100g'] || p.nutriments?.['proteins'] || 0),
        carbs: Math.round(p.nutriments?.['carbohydrates_100g'] || p.nutriments?.['carbohydrates'] || 0),
        fat: Math.round(p.nutriments?.['fat_100g'] || p.nutriments?.['fat'] || 0)
      }))
      .filter(f => f.calories > 0)

    console.log('English foods found:', foods.length)
    res.json(foods)

  } catch (error) {
    console.log('Error:', error.message)
    res.status(500).json({ message: 'Food search failed', error: error.message })
  }
})

module.exports = router