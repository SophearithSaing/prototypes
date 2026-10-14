enum MealSlot {
  breakfast('Breakfast', '8:30 AM'),
  lunch('Lunch', '12:45 PM'),
  dinner('Dinner', '7:15 PM'),
  snack('Snack', '4:00 PM');

  const MealSlot(this.label, this.time);
  final String label;
  final String time;
}

class Nutrients {
  const Nutrients(this.calories, this.protein, this.carbs, this.fat);
  static const zero = Nutrients(0, 0, 0, 0);
  final double calories;
  final double protein;
  final double carbs;
  final double fat;

  Nutrients operator +(Nutrients other) => Nutrients(
    calories + other.calories,
    protein + other.protein,
    carbs + other.carbs,
    fat + other.fat,
  );

  Nutrients scaled(double factor) => Nutrients(
    calories * factor,
    protein * factor,
    carbs * factor,
    fat * factor,
  );

  Map<String, dynamic> toJson() => {
    'calories': calories,
    'protein': protein,
    'carbs': carbs,
    'fat': fat,
  };

  factory Nutrients.fromJson(Map<String, dynamic> json) => Nutrients(
    (json['calories'] as num).toDouble(),
    (json['protein'] as num).toDouble(),
    (json['carbs'] as num).toDouble(),
    (json['fat'] as num).toDouble(),
  );
}

class Food {
  const Food({
    required this.id,
    required this.name,
    required this.nutrients,
    this.grams = 100,
    this.unit = '100 g',
    this.category = 'Balanced meal',
    this.verified = true,
    this.custom = false,
  });
  final String id;
  final String name;
  final Nutrients nutrients;
  final double grams;
  final String unit;
  final String category;
  final bool verified;
  final bool custom;

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'nutrients': nutrients.toJson(),
    'grams': grams,
    'unit': unit,
    'category': category,
    'verified': verified,
    'custom': custom,
  };

  factory Food.fromJson(Map<String, dynamic> json) => Food(
    id: json['id'] as String,
    name: json['name'] as String,
    nutrients: Nutrients.fromJson(json['nutrients'] as Map<String, dynamic>),
    grams: (json['grams'] as num).toDouble(),
    unit: json['unit'] as String,
    category: json['category'] as String,
    verified: json['verified'] as bool,
    custom: json['custom'] as bool,
  );
}

class PlannedMeal {
  const PlannedMeal({
    required this.id,
    required this.date,
    required this.slot,
    required this.food,
    this.tag = 'Prep Ahead',
  });
  final String id;
  final String date;
  final MealSlot slot;
  final Food food;
  final String tag;

  Map<String, dynamic> toJson() => {
    'id': id,
    'date': date,
    'slot': slot.name,
    'food': food.toJson(),
    'tag': tag,
  };
  factory PlannedMeal.fromJson(Map<String, dynamic> json) => PlannedMeal(
    id: json['id'] as String,
    date: json['date'] as String,
    slot: MealSlot.values.byName(json['slot'] as String),
    food: Food.fromJson(json['food'] as Map<String, dynamic>),
    tag: json['tag'] as String,
  );
}

class FoodLog {
  const FoodLog({
    required this.id,
    required this.date,
    required this.slot,
    required this.food,
    required this.multiplier,
    required this.time,
    this.planId,
  });
  final String id;
  final String date;
  final MealSlot slot;
  final Food food;
  final double multiplier;
  final String time;
  final String? planId;
  Nutrients get nutrients => food.nutrients.scaled(multiplier);

  Map<String, dynamic> toJson() => {
    'id': id,
    'date': date,
    'slot': slot.name,
    'food': food.toJson(),
    'multiplier': multiplier,
    'time': time,
    'planId': planId,
  };
  factory FoodLog.fromJson(Map<String, dynamic> json) => FoodLog(
    id: json['id'] as String,
    date: json['date'] as String,
    slot: MealSlot.values.byName(json['slot'] as String),
    food: Food.fromJson(json['food'] as Map<String, dynamic>),
    multiplier: (json['multiplier'] as num).toDouble(),
    time: json['time'] as String,
    planId: json['planId'] as String?,
  );
}

const mockFoods = <Food>[
  Food(
    id: 'eggs',
    name: 'Scrambled eggs on sourdough',
    nutrients: Nutrients(480, 30, 42, 20),
    grams: 260,
    unit: '1 plate',
    category: 'Avocado & black coffee',
  ),
  Food(
    id: 'bowl',
    name: 'Grilled chicken quinoa bowl',
    nutrients: Nutrients(620, 58, 75, 12),
    grams: 420,
    unit: '1 bowl',
    category: 'Roasted seasonal vegetables',
  ),
  Food(
    id: 'salmon',
    name: 'Herb salmon with asparagus',
    nutrients: Nutrients(550, 46, 35, 22),
    grams: 350,
    unit: '1 plate',
    category: 'Fresh & nourishing',
  ),
  Food(
    id: 'yogurt',
    name: 'Greek yogurt & blueberries',
    nutrients: Nutrients(360, 24, 48, 10),
    grams: 250,
    unit: '1 bowl',
    category: 'High-protein snack',
  ),
  Food(
    id: 'chicken',
    name: 'Grilled Chicken Breast',
    nutrients: Nutrients(165, 31, 0, 3.6),
    category: 'Pure lean protein',
  ),
  Food(
    id: 'toast',
    name: 'Avocado Toast with Egg',
    nutrients: Nutrients(340, 14, 28, 19),
    grams: 185,
    unit: '1 serving',
    category: 'A breakfast favorite',
  ),
  Food(
    id: 'oats',
    name: 'Overnight Oats with Chia & Berries',
    nutrients: Nutrients(450, 24, 58, 12),
    grams: 280,
    unit: '1 bowl',
    category: 'Prep ahead, enjoy slowly',
  ),
  Food(
    id: 'wrap',
    name: 'Turkey & Avocado Wrap',
    nutrients: Nutrients(620, 48, 62, 18),
    grams: 320,
    unit: '1 wrap',
    category: 'With sweet potato fries',
  ),
  Food(
    id: 'quinoa',
    name: 'Pan-Seared Salmon & Quinoa',
    nutrients: Nutrients(680, 52, 45, 22),
    grams: 380,
    unit: '1 plate',
    category: 'A balanced dinner',
  ),
  Food(
    id: 'apple',
    name: 'Apple Slices & Almond Butter',
    nutrients: Nutrients(230, 6, 28, 10),
    grams: 180,
    unit: '1 serving',
    category: 'Quick energy',
  ),
  Food(
    id: 'banana',
    name: 'Banana',
    nutrients: Nutrients(105, 1.3, 27, 0.4),
    grams: 118,
    unit: '1 medium',
    category: 'Fresh fruit',
  ),
];

String dateKey(DateTime date) =>
    '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';

class ConsistencyDay {
  const ConsistencyDay({
    required this.date,
    required this.logged,
    required this.calorieOnTarget,
    required this.planComplete,
    this.sample = false,
  });
  final DateTime date;
  final bool logged;
  final bool calorieOnTarget;
  final bool planComplete;
  final bool sample;
}

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
String shortDate(DateTime date) =>
    '${weekdays[date.weekday - 1]}, ${months[date.month - 1]} ${date.day}';
String amount(num value) => value == value.roundToDouble()
    ? value.toInt().toString()
    : value.toStringAsFixed(1);
String count(num value) => value.round().toString().replaceAllMapped(
  RegExp(r'(\d)(?=(\d{3})+(?!\d))'),
  (match) => '${match[1]},',
);
