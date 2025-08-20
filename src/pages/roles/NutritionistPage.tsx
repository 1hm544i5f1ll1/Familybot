import React, { useState, useEffect } from 'react';
import { Apple, Camera, Calculator, ShoppingCart, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { StatusBadge } from '../../components/common/StatusBadge';

interface NutritionProfile {
  id: string;
  name: string;
  avatar: string;
  dailyCalories: number;
  targetCalories: number;
  macros: {
    protein: { current: number; target: number };
    carbs: { current: number; target: number };
    fat: { current: number; target: number };
  };
  meals: Meal[];
  groceryList: GroceryItem[];
  allergies: string[];
}

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  image?: string;
  ingredients: string[];
  status: 'planned' | 'eaten' | 'skipped';
}

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  purchased: boolean;
}

export const NutritionistPage: React.FC = () => {
  const [profiles, setProfiles] = useState<NutritionProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  useEffect(() => {
    loadNutritionData();
  }, []);

  const loadNutritionData = async () => {
    const mockData: NutritionProfile[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        dailyCalories: 1650,
        targetCalories: 1800,
        macros: {
          protein: { current: 85, target: 120 },
          carbs: { current: 180, target: 200 },
          fat: { current: 65, target: 80 }
        },
        allergies: ['nuts', 'shellfish'],
        meals: [
          { id: '1', name: 'Greek Yogurt Bowl', time: '08:00', calories: 320, ingredients: ['yogurt', 'berries', 'granola'], status: 'eaten' },
          { id: '2', name: 'Quinoa Salad', time: '12:30', calories: 450, ingredients: ['quinoa', 'vegetables', 'olive oil'], status: 'planned' },
          { id: '3', name: 'Grilled Salmon', time: '19:00', calories: 380, ingredients: ['salmon', 'asparagus', 'rice'], status: 'planned' }
        ],
        groceryList: [
          { id: '1', name: 'Greek Yogurt', category: 'Dairy', quantity: '2 containers', purchased: true },
          { id: '2', name: 'Fresh Berries', category: 'Produce', quantity: '1 lb', purchased: false },
          { id: '3', name: 'Quinoa', category: 'Grains', quantity: '1 bag', purchased: false }
        ]
      }
    ];
    setProfiles(mockData);
    setSelectedProfile(mockData[0]?.id || null);
    setLoading(false);
  };

  const selectedProfileData = profiles.find(profile => profile.id === selectedProfile);

  const getMacroPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Nutritionist/Dietitian"
        description="Diet analysis, meal planning, and nutrition tracking"
      >
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
          <Apple className="w-4 h-4" />
          <span className="text-sm font-medium">AI Analyzing</span>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Family Members</h3>
          <div className="space-y-3">
            {profiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  selectedProfile === profile.id ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{profile.name}</p>
                  <p className="text-sm text-gray-500">{profile.dailyCalories}/{profile.targetCalories} cal</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {selectedProfileData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Calories Today</h3>
                    <Calculator className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedProfileData.dailyCalories}
                  </p>
                  <p className="text-sm text-gray-500">of {selectedProfileData.targetCalories}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Protein</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${getMacroPercentage(selectedProfileData.macros.protein.current, selectedProfileData.macros.protein.target)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedProfileData.macros.protein.current}g / {selectedProfileData.macros.protein.target}g
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Carbs</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${getMacroPercentage(selectedProfileData.macros.carbs.current, selectedProfileData.macros.carbs.target)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedProfileData.macros.carbs.current}g / {selectedProfileData.macros.carbs.target}g
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Fat</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${getMacroPercentage(selectedProfileData.macros.fat.current, selectedProfileData.macros.fat.target)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedProfileData.macros.fat.current}g / {selectedProfileData.macros.fat.target}g
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Meals</h3>
                  <Camera className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-4">
                  {selectedProfileData.meals.map(meal => (
                    <div key={meal.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{meal.name}</h4>
                        <p className="text-sm text-gray-600">{meal.time} • {meal.calories} calories</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {meal.ingredients.map(ingredient => (
                            <span key={ingredient} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      <StatusBadge 
                        status={meal.status} 
                        variant={meal.status === 'eaten' ? 'success' : meal.status === 'planned' ? 'warning' : 'error'}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Grocery List</h3>
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                </div>
                <div className="space-y-3">
                  {selectedProfileData.groceryList.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          checked={item.purchased}
                          className="w-4 h-4 text-green-600"
                          readOnly
                        />
                        <div>
                          <p className={`font-medium ${item.purchased ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">{item.category} • {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};