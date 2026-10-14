import 'dart:convert';

import 'package:flutter/foundation.dart';

import 'models.dart';

typedef SaveData = Future<void> Function(String data);

class AppState extends ChangeNotifier {
  AppState({DateTime? now, this.saveData, String? savedData})
    : _today = DateUtilsOnly.day(now ?? DateTime.now()),
      tracksSystemDate = now == null {
    if (savedData != null) {
      try {
        _restore(jsonDecode(savedData) as Map<String, dynamic>);
        return;
      } catch (_) {
        storageMessage =
            'Saved data could not be read. Demo data has been restored.';
      }
    }
    _seed();
  }

  DateTime _today;
  DateTime get today => _today;
  final bool tracksSystemDate;
  final SaveData? saveData;
  String name = 'Alex';
  Nutrients targets = const Nutrients(2100, 140, 210, 65);
  int calorieStreak = 14;
  int planStreak = 8;
  int freezes = 1;
  int calorieBest = 14;
  int planBest = 12;
  DateTime? _historyAnchor;
  // Legacy balances are retained for saved-data compatibility, not awarded or displayed.
  int level = 7;
  int xp = 1450;
  int gems = 480;
  String dietaryPreference = 'Balanced';
  String? storageMessage;
  final List<PlannedMeal> _plans = [];
  final List<FoodLog> _logs = [];
  final List<Food> _customFoods = [];
  final Set<String> _appliedDays = {};
  final Set<String> _awardedMeals = {};
  final Set<String> _bonuses = {};
  final Set<String> _claimed = {};
  final Set<String> _favorites = {'chicken', 'toast', 'yogurt'};
  final Map<String, double> _exercise = {};
  Future<void> _saving = Future.value();
  int _sequence = 0;

  List<Food> get foods => [...mockFoods, ..._customFoods];
  List<FoodLog> get logs => List.unmodifiable(_logs);
  Set<String> get favorites => Set.unmodifiable(_favorites);
  String get todayKey => dateKey(today);

  void refreshDay([DateTime? now]) {
    final date = DateUtilsOnly.day(now ?? DateTime.now());
    if (dateKey(date) == todayKey) return;
    _today = date;
    notifyListeners();
  }

  double get exercise => _exercise[todayKey] ?? 0;
  Nutrients get consumed => totalLogs(today);
  double get remaining => targets.calories - consumed.calories + exercise;
  int get completedToday => checklist(today).where(isLogged).length;
  bool get planSecuredToday =>
      checklist(today).length == 4 && completedToday == 4;
  bool get calorieGoalMetToday =>
      logsFor(today).isNotEmpty && remaining.abs() <= 50;

  List<ConsistencyDay> consistencyHistory([int days = 28]) {
    if (days < 1 || days > 365) {
      throw ArgumentError('History range must be 1–365 days.');
    }
    final anchor = _historyAnchor ?? today;
    return List.generate(days, (index) {
      final date = DateTime(
        today.year,
        today.month,
        today.day - days + index + 1,
      );
      final offset = DateTime.utc(
        date.year,
        date.month,
        date.day,
      ).difference(DateTime.utc(anchor.year, anchor.month, anchor.day)).inDays;
      if (offset >= -27 && offset < 0 && logsFor(date).isEmpty) {
        final logged = offset != -22 && offset != -15;
        return ConsistencyDay(
          date: date,
          logged: logged,
          calorieOnTarget: logged,
          planComplete: logged && offset >= -planStreak,
          sample: true,
        );
      }
      final entries = logsFor(date);
      final meals = checklist(date);
      final netCalories =
          totalLogs(date).calories - (_exercise[dateKey(date)] ?? 0);
      return ConsistencyDay(
        date: date,
        logged: entries.isNotEmpty,
        calorieOnTarget:
            entries.isNotEmpty && (targets.calories - netCalories).abs() <= 50,
        planComplete: meals.length == 4 && meals.every(isLogged),
      );
    });
  }

  List<String> get recentIds =>
      _logs.reversed.map((log) => log.food.id).toSet().toList();

  String _id() => '${DateTime.now().microsecondsSinceEpoch}-${_sequence++}';
  List<PlannedMeal> planFor(DateTime date) =>
      _plans.where((meal) => meal.date == dateKey(date)).toList()
        ..sort((a, b) => a.slot.index.compareTo(b.slot.index));
  List<PlannedMeal> checklist(DateTime date) =>
      isApplied(date) ? planFor(date) : [];
  bool isApplied(DateTime date) => _appliedDays.contains(dateKey(date));
  bool isLogged(PlannedMeal meal) => _logs.any((log) => log.planId == meal.id);
  List<FoodLog> logsFor(DateTime date, [MealSlot? slot]) => _logs
      .where(
        (log) =>
            log.date == dateKey(date) && (slot == null || slot == log.slot),
      )
      .toList();
  Nutrients totalLogs(DateTime date) =>
      logsFor(date).fold(Nutrients.zero, (total, log) => total + log.nutrients);
  Nutrients projection(DateTime date) =>
      planFor(date)
          .fold(Nutrients.zero, (total, meal) => total + meal.food.nutrients);

  void _seed() {
    _historyAnchor = today;
    final monday = today.subtract(Duration(days: today.weekday - 1));
    for (var day = 0; day < 7; day++) {
      final date = monday.add(Duration(days: day));
      final foodIndexes = dateKey(date) == todayKey
          ? [0, 1, 2, 3]
          : [6, 7, 8, 9];
      for (final slot in MealSlot.values) {
        _plans.add(
          PlannedMeal(
            id: '${dateKey(date)}-${slot.name}',
            date: dateKey(date),
            slot: slot,
            food: mockFoods[foodIndexes[slot.index]],
            tag: _tag(slot),
          ),
        );
      }
    }
    _appliedDays.add(todayKey);
    for (final meal in planFor(
      today,
    ).where((meal) => meal.slot != MealSlot.dinner)) {
      _logs.add(
        FoodLog(
          id: _id(),
          date: todayKey,
          slot: meal.slot,
          food: meal.food,
          multiplier: 1,
          time: meal.slot.time,
          planId: meal.id,
        ),
      );
      _awardedMeals.add(meal.id);
    }
    _exercise[todayKey] = 250;
  }

  String _tag(MealSlot slot) => switch (slot) {
    MealSlot.breakfast => 'Prep Ahead',
    MealSlot.lunch => 'Batch Cooked',
    MealSlot.dinner => 'Requires Cook Time',
    MealSlot.snack => 'Quick Energy',
  };

  bool logPlanned(PlannedMeal meal) {
    final current = _plans.where((item) => item.id == meal.id).firstOrNull;
    if (current == null ||
        current.date != todayKey ||
        !isApplied(today) ||
        isLogged(current)) {
      return false;
    }
    _logs.add(
      FoodLog(
        id: _id(),
        date: todayKey,
        slot: current.slot,
        food: current.food,
        multiplier: 1,
        time: _currentTime(),
        planId: current.id,
      ),
    );
    _changed();
    return true;
  }

  void logFood(Food food, MealSlot slot, double multiplier) {
    if (!multiplier.isFinite || multiplier <= 0 || multiplier > 20) {
      throw ArgumentError('Serving amount must be between 0 and 20.');
    }
    _logs.add(
      FoodLog(
        id: _id(),
        date: todayKey,
        slot: slot,
        food: food,
        multiplier: multiplier,
        time: _currentTime(),
      ),
    );
    _changed();
  }

  String _currentTime() {
    final now = DateTime.now();
    return '${now.hour % 12 == 0 ? 12 : now.hour % 12}:${now.minute.toString().padLeft(2, '0')} ${now.hour < 12 ? 'AM' : 'PM'}';
  }

  void removeLog(String id) {
    _logs.removeWhere((log) => log.id == id);
    _changed();
  }

  bool setMeal(DateTime date, MealSlot slot, Food food) {
    final previous = planFor(date)
        .where((meal) => meal.slot == slot)
        .firstOrNull;
    if (previous != null && isLogged(previous)) return false;
    _plans.removeWhere(
      (meal) => meal.date == dateKey(date) && meal.slot == slot,
    );
    _plans.add(
      PlannedMeal(
        id: previous?.id ?? '${dateKey(date)}-${slot.name}',
        date: dateKey(date),
        slot: slot,
        food: food,
        tag: _tag(slot),
      ),
    );
    _changed();
    return true;
  }

  bool removeMeal(PlannedMeal meal) {
    if (isLogged(meal)) return false;
    _plans.removeWhere((item) => item.id == meal.id);
    _changed();
    return true;
  }

  void autoFill(DateTime date) {
    const indexes = [6, 7, 8, 9];
    for (final slot in MealSlot.values) {
      if (!planFor(date).any((meal) => meal.slot == slot)) {
        _plans.add(
          PlannedMeal(
            id: '${dateKey(date)}-${slot.name}',
            date: dateKey(date),
            slot: slot,
            food: mockFoods[indexes[slot.index]],
            tag: _tag(slot),
          ),
        );
      }
    }
    _changed();
  }

  bool applyPlan(DateTime date) {
    if (planFor(date).length != 4) return false;
    _appliedDays.add(dateKey(date));
    _changed();
    return true;
  }

  Food createFood(String title, Nutrients nutrients, {bool recipe = false}) {
    final values = [
      nutrients.calories,
      nutrients.protein,
      nutrients.carbs,
      nutrients.fat,
    ];
    if (title.trim().isEmpty ||
        values.any((value) => !value.isFinite || value < 0) ||
        nutrients.calories <= 0) {
      throw ArgumentError('Enter a name and positive, valid nutrition values.');
    }
    final food = Food(
      id: _id(),
      name: title.trim(),
      nutrients: nutrients,
      grams: 0,
      unit: '1 serving',
      category: recipe ? 'Custom recipe' : 'Quick entry',
      verified: false,
      custom: true,
    );
    _customFoods.add(food);
    _changed();
    return food;
  }

  void toggleFavorite(Food food) {
    if (!_favorites.remove(food.id)) _favorites.add(food.id);
    _changed();
  }

  void updateProfile({
    required String userName,
    required Nutrients goals,
    required String preference,
  }) {
    final values = [goals.calories, goals.protein, goals.carbs, goals.fat];
    if (userName.trim().isEmpty ||
        values.any((value) => !value.isFinite || value <= 0)) {
      throw ArgumentError('A name and positive targets are required.');
    }
    name = userName.trim();
    targets = goals;
    dietaryPreference = preference;
    _changed();
  }

  void setExercise(double calories) {
    if (!calories.isFinite || calories < 0) {
      throw ArgumentError('Invalid exercise calories.');
    }
    _exercise[todayKey] = calories;
    _changed();
  }

  Map<String, dynamic> toJson() => {
    'version': 1,
    'name': name,
    'targets': targets.toJson(),
    'calorieStreak': calorieStreak,
    'planStreak': planStreak,
    'freezes': freezes,
    'calorieBest': calorieBest,
    'planBest': planBest,
    'historyAnchor': dateKey(_historyAnchor ?? today),
    'level': level,
    'xp': xp,
    'gems': gems,
    'preference': dietaryPreference,
    'plans': _plans.map((meal) => meal.toJson()).toList(),
    'logs': _logs.map((log) => log.toJson()).toList(),
    'customFoods': _customFoods.map((food) => food.toJson()).toList(),
    'applied': _appliedDays.toList(),
    'awarded': _awardedMeals.toList(),
    'bonuses': _bonuses.toList(),
    'claimed': _claimed.toList(),
    'favorites': _favorites.toList(),
    'exercise': _exercise,
  };

  void _restore(Map<String, dynamic> json) {
    if (json['version'] != 1) {
      throw const FormatException('Unsupported version');
    }
    // Parse everything before assigning, avoiding partial restores on corrupt data.
    final plans = (json['plans'] as List)
        .map((item) => PlannedMeal.fromJson(item as Map<String, dynamic>))
        .toList();
    final logs = (json['logs'] as List)
        .map((item) => FoodLog.fromJson(item as Map<String, dynamic>))
        .toList();
    final custom = (json['customFoods'] as List)
        .map((item) => Food.fromJson(item as Map<String, dynamic>))
        .toList();
    final goals = Nutrients.fromJson(json['targets'] as Map<String, dynamic>);
    final applied = Set<String>.from(json['applied'] as List);
    final awarded = Set<String>.from(json['awarded'] as List);
    final bonuses = Set<String>.from(json['bonuses'] as List);
    final claimed = Set<String>.from(json['claimed'] as List);
    final favorites = Set<String>.from(json['favorites'] as List);
    final exercise = (json['exercise'] as Map<String, dynamic>).map(
      (key, value) => MapEntry(key, (value as num).toDouble()),
    );
    final restoredName = json['name'] as String;
    final restoredPreference = json['preference'] as String;
    final restoredCounters = [
      'calorieStreak',
      'planStreak',
      'freezes',
      'level',
      'xp',
      'gems',
    ].map((key) => json[key] as int).toList();
    final restoredCalorieBest =
        (json['calorieBest'] as int?) ?? restoredCounters[0];
    final restoredPlanBest = (json['planBest'] as int?) ?? 12;
    final logDates = logs.map((log) => log.date).toList()..sort();
    final restoredAnchor = DateTime.parse(
      (json['historyAnchor'] as String?) ??
          (logDates.isEmpty ? todayKey : logDates.first),
    );
    name = restoredName;
    dietaryPreference = restoredPreference;
    targets = goals;
    calorieStreak = restoredCounters[0];
    planStreak = restoredCounters[1];
    freezes = restoredCounters[2];
    calorieBest = restoredCalorieBest;
    planBest = restoredPlanBest;
    _historyAnchor = restoredAnchor;
    level = restoredCounters[3];
    xp = restoredCounters[4];
    gems = restoredCounters[5];
    _plans.addAll(plans);
    _logs.addAll(logs);
    _customFoods.addAll(custom);
    _appliedDays.addAll(applied);
    _awardedMeals.addAll(awarded);
    _bonuses.addAll(bonuses);
    _claimed.addAll(claimed);
    _favorites
      ..clear()
      ..addAll(favorites);
    _exercise.addAll(exercise);
  }

  void _changed() {
    notifyListeners();
    persist();
  }

  void persist() {
    if (saveData == null) return;
    final snapshot = jsonEncode(toJson());
    _saving = _saving.then((_) async {
      try {
        await saveData!(snapshot);
      } catch (_) {
        storageMessage =
            'Changes are in memory, but could not be saved on this device.';
        notifyListeners();
      }
    });
  }

  Future<void> flush() => _saving;
}

class DateUtilsOnly {
  static DateTime day(DateTime date) =>
      DateTime(date.year, date.month, date.day);
}
