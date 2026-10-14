import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:meal_planner/app_state.dart';
import 'package:meal_planner/models.dart';

void main() {
  late AppState state;
  setUp(() => state = AppState(now: DateTime(2026, 10, 11)));
  tearDown(() => state.dispose());

  test('Seeded budget honors goal minus logged food plus exercise', () {
    expect(state.consumed.calories, 1460);
    expect(state.consumed.protein, 112);
    expect(state.consumed.carbs, 165);
    expect(state.consumed.fat, 42);
    expect(state.remaining, 890);
    expect(state.completedToday, 3);
    expect(state.projection(state.today).calories, 2010);
  });

  test('Planned logging is shared, idempotent, and secures only the meal-plan goal', () {
    final dinner = state
        .planFor(state.today)
        .singleWhere((meal) => meal.slot == MealSlot.dinner);
    expect(state.logPlanned(dinner), isTrue);
    expect(state.logPlanned(dinner), isFalse);
    expect(state.remaining, 340);
    expect(state.completedToday, 4);
    expect(state.planSecuredToday, isTrue);
    expect(state.calorieGoalMetToday, isFalse);
    expect(state.xp, 1450); // Legacy balances are preserved, never awarded.
  });

  test(
    'Undo and re-log update streak readiness without duplicate food logs',
    () {
      final dinner = state
          .planFor(state.today)
          .singleWhere((meal) => meal.slot == MealSlot.dinner);
      state.logPlanned(dinner);
      final log = state.logs.singleWhere((log) => log.planId == dinner.id);
      state.removeLog(log.id);
      expect(state.completedToday, 3);
      expect(state.remaining, 890);
      state.logPlanned(dinner);
      expect(state.planSecuredToday, isTrue);
      expect(state.logsFor(state.today).length, 4);
      expect(state.xp, 1450);
    },
  );

  test('Portion math scales every nutrient together', () {
    state.logFood(mockFoods[4], MealSlot.lunch, 1.5);
    final log = state.logs.last;
    expect(log.nutrients.calories, 247.5);
    expect(log.nutrients.protein, 46.5);
    expect(log.nutrients.carbs, 0);
    expect(log.nutrients.fat, closeTo(5.4, .0001));
    expect(state.completedToday, 3);
    expect(state.xp, 1450);
  });

  test('Invalid serving values cannot enter the journal', () {
    for (final amount in [0.0, -1.0, double.nan, double.infinity, 21.0]) {
      expect(
        () => state.logFood(mockFoods.first, MealSlot.lunch, amount),
        throwsArgumentError,
      );
    }
    expect(state.logs.length, 3);
  });

  test('Logged plans cannot be edited or deleted', () {
    final breakfast = state.planFor(state.today).first;
    expect(
      state.setMeal(state.today, MealSlot.breakfast, mockFoods.last),
      isFalse,
    );
    expect(state.removeMeal(breakfast), isFalse);
    expect(state.planFor(state.today).first.food.id, 'eggs');
  });

  test('Swaps update projection without changing consumed nutrition', () {
    expect(state.setMeal(state.today, MealSlot.dinner, mockFoods[8]), isTrue);
    expect(state.projection(state.today).calories, 2140);
    expect(state.consumed.calories, 1460);
    expect(
      state
          .checklist(state.today)
          .singleWhere((meal) => meal.slot == MealSlot.dinner)
          .food
          .id,
      'quinoa',
    );
  });

  test('Auto-fill preserves existing slots and applying a plan requires four meals', () {
    final future = state.today.add(const Duration(days: 8));
    expect(state.applyPlan(future), isFalse);
    state.setMeal(future, MealSlot.breakfast, mockFoods.first);
    state.autoFill(future);
    expect(state.planFor(future).length, 4);
    expect(state.planFor(future).first.food.id, 'eggs');
    expect(state.applyPlan(future), isTrue);
    expect(state.checklist(future).length, 4);
    expect(state.logPlanned(state.planFor(future).last), isFalse);
    expect(state.consumed.calories, 1460);
  });

  test(
    'History has 28 dated cells, sample past days, and a live today cell',
    () {
      final history = state.consistencyHistory();
      expect(history.length, 28);
      expect(history.where((day) => day.logged).length, 26);
      expect(history.where((day) => day.sample).length, 27);
      expect(history.last.date, state.today);
      expect(history.last.sample, isFalse);
      expect(history.last.logged, isTrue);
      expect(history.last.planComplete, isFalse);
      expect(history.last.calorieOnTarget, isFalse);
      expect(() => state.consistencyHistory(0), throwsArgumentError);
    },
  );

  test('Today’s consistency cell reflects logging and removal', () {
    final dinner = state
        .planFor(state.today)
        .singleWhere((meal) => meal.slot == MealSlot.dinner);
    state.logPlanned(dinner);
    expect(state.consistencyHistory().last.planComplete, isTrue);
    for (final log in state.logsFor(state.today)) {
      state.removeLog(log.id);
    }
    expect(state.consistencyHistory().last.logged, isFalse);
    expect(state.consistencyHistory().where((day) => day.logged).length, 25);
  });

  test(
    'Calorie target status is independent, includes exercise, and honors ±50',
    () {
      state.setExercise(0);
      state.logFood(mockFoods[2], MealSlot.dinner, 1); // Net 2010, goal 2100.
      expect(state.calorieGoalMetToday, isFalse);
      state.logFood(mockFoods.last, MealSlot.snack, 1); // Net 2115.
      expect(state.calorieGoalMetToday, isTrue);
      expect(state.planSecuredToday, isFalse);
      state.setExercise(65); // Exactly 50 kcal below target.
      expect(state.calorieGoalMetToday, isTrue);
      state.setExercise(66);
      expect(state.calorieGoalMetToday, isFalse);
    },
  );

  test('Profile and exercise edits update the same budget', () {
    state.updateProfile(
      userName: ' Jordan ',
      goals: const Nutrients(2300, 150, 230, 70),
      preference: 'Vegetarian',
    );
    state.setExercise(100);
    expect(state.name, 'Jordan');
    expect(state.remaining, 940);
    expect(state.dietaryPreference, 'Vegetarian');
    expect(() => state.setExercise(double.nan), throwsArgumentError);
  });

  test('Invalid custom nutrition and targets are rejected', () {
    expect(
      () => state.createFood('', const Nutrients(100, 1, 1, 1)),
      throwsArgumentError,
    );
    expect(
      () => state.createFood('Bad', const Nutrients(100, -1, 1, 1)),
      throwsArgumentError,
    );
    expect(
      () => state.createFood('Bad', const Nutrients(double.nan, 1, 1, 1)),
      throwsArgumentError,
    );
    expect(
      () => state.updateProfile(
        userName: 'Alex',
        goals: const Nutrients(2000, 0, 200, 60),
        preference: 'Balanced',
      ),
      throwsArgumentError,
    );
  });

  test(
    'Recipes, logs, history, favorites and settings survive serialization',
    () {
      final custom = state.createFood(
        'Homemade bowl',
        const Nutrients(300, 20, 35, 8),
        recipe: true,
      );
      state.logFood(custom, MealSlot.dinner, 2);
      state.toggleFavorite(custom);
      final restored = AppState(
        now: state.today,
        savedData: jsonEncode(state.toJson()),
      );
      addTearDown(restored.dispose);
      expect(restored.consumed.calories, 2060);
      expect(
        restored.consistencyHistory().map((day) => dateKey(day.date)),
        state.consistencyHistory().map((day) => dateKey(day.date)),
      );
      expect(restored.favorites, contains(custom.id));
      expect(restored.foods.last.name, 'Homemade bowl');
      expect(restored.completedToday, 3);
    },
  );

  test(
    'Old reward-era saves migrate without dropping journals or legacy metadata',
    () {
      final old = state.toJson()
        ..remove('historyAnchor')
        ..remove('calorieBest')
        ..remove('planBest');
      old['xp'] = 1570;
      old['gems'] = 580;
      old['claimed'] = ['pioneer'];
      final restored = AppState(now: state.today, savedData: jsonEncode(old));
      addTearDown(restored.dispose);
      expect(restored.storageMessage, isNull);
      expect(restored.remaining, 890);
      expect(restored.planFor(restored.today).length, 4);
      expect(
        restored.consistencyHistory().where((day) => day.logged).length,
        26,
      );
      expect(restored.toJson()['xp'], 1570);
      expect(restored.toJson()['gems'], 580);
      expect(restored.toJson()['claimed'], ['pioneer']);
      final dinner = restored
          .planFor(restored.today)
          .singleWhere((meal) => meal.slot == MealSlot.dinner);
      restored.logPlanned(dinner);
      expect(restored.toJson()['xp'], 1570);
    },
  );

  test('Sample history stays anchored across saved sessions and new dates', () {
    final nextDay = AppState(
      now: state.today.add(const Duration(days: 1)),
      savedData: jsonEncode(state.toJson()),
    );
    addTearDown(nextDay.dispose);
    final history = nextDay.consistencyHistory();
    expect(history[26].date, state.today);
    expect(history[26].sample, isFalse);
    expect(history[26].logged, isTrue);
    expect(history.last.sample, isFalse);
    expect(history.last.logged, isFalse);
  });

  test('New days do not inherit yesterday’s logs or calorie burn', () {
    final nextDay = AppState(
      now: state.today.add(const Duration(days: 1)),
      savedData: jsonEncode(state.toJson()),
    );
    addTearDown(nextDay.dispose);
    expect(nextDay.consumed.calories, 0);
    expect(nextDay.exercise, 0);
    expect(nextDay.remaining, 2100);
    expect(nextDay.completedToday, 0);
  });

  test('A running session rolls over without carrying yesterday’s intake', () {
    final tomorrow = state.today.add(const Duration(days: 1));
    state.autoFill(tomorrow);
    state.applyPlan(tomorrow);
    state.refreshDay(tomorrow);
    expect(state.consumed.calories, 0);
    expect(state.remaining, 2100);
    expect(state.checklist(state.today).length, 4);
    expect(state.completedToday, 0);
    expect(state.logPlanned(state.checklist(state.today).first), isTrue);
    expect(state.consumed.calories, 450);
  });

  test('Corrupt saved data restores a clean demo with a visible warning', () {
    final broken = AppState(
      now: state.today,
      savedData: '{"version":1,"plans":[]}',
    );
    addTearDown(broken.dispose);
    expect(broken.storageMessage, isNotNull);
    expect(broken.remaining, 890);
    expect(broken.planFor(state.today).length, 4);
  });

  test('Persistence is ordered and the latest changes are saved', () async {
    final saved = <String>[];
    final persistent = AppState(
      now: state.today,
      saveData: (data) async {
        saved.add(data);
      },
    );
    addTearDown(persistent.dispose);
    persistent.setExercise(100);
    persistent.setExercise(200);
    await persistent.flush();
    expect(saved.length, 2);
    expect(
      (jsonDecode(saved.last) as Map)['exercise'][persistent.todayKey],
      200,
    );
  });

  test(
    'Storage errors preserve in-memory edits and report the limitation',
    () async {
      final persistent = AppState(
        now: state.today,
        saveData: (_) async {
          throw StateError('Disk full');
        },
      );
      addTearDown(persistent.dispose);
      persistent.setExercise(100);
      await persistent.flush();
      expect(persistent.exercise, 100);
      expect(persistent.storageMessage, contains('could not be saved'));
    },
  );
}
