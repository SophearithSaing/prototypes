import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:meal_planner/app_state.dart';
import 'package:meal_planner/main.dart';
import 'package:meal_planner/models.dart';
import 'package:meal_planner/ui/widgets.dart';

void main() {
  Future<AppState> start(
    WidgetTester tester, {
    Size size = const Size(393, 852),
    double scale = 1,
  }) async {
    tester.view.physicalSize = size;
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    tester.platformDispatcher.textScaleFactorTestValue = scale;
    addTearDown(tester.platformDispatcher.clearTextScaleFactorTestValue);
    final state = AppState(now: DateTime(2026, 10, 11));
    await tester.pumpWidget(MyApp(state: state));
    await tester.pumpAndSettle();
    return state;
  }

  Future<void> tab(WidgetTester tester, int index) async {
    await tester.tap(find.byKey(ValueKey('nav-$index')));
    await tester.pumpAndSettle();
  }

  Future<void> enter(WidgetTester tester, String key, String value) async {
    final field = find.byKey(ValueKey(key));
    await tester.ensureVisible(field);
    await tester.pumpAndSettle();
    await tester.enterText(field, value);
    await tester.pumpAndSettle();
  }

  testWidgets('Dashboard has correct budget and all five destinations work', (
    tester,
  ) async {
    await start(tester);
    expect(find.text('890'), findsOneWidget);
    expect(find.text('3 of 4 recorded'), findsOneWidget);
    await tab(tester, 1);
    expect(find.text('Weekly Meal Plan'), findsOneWidget);
    await tab(tester, 2);
    expect(find.text('Log Food'), findsOneWidget);
    await tab(tester, 3);
    expect(find.text('Habits & Streaks'), findsNWidgets(2));
    expect(find.text('Streaks'), findsOneWidget);
    expect(find.text('Rewards'), findsNothing);
    await tab(tester, 4);
    expect(find.text('Your mindful routine'), findsNWidgets(2));
    expect(tester.takeException(), isNull);
  });

  testWidgets('Checklist completion updates dashboard and streak readiness', (
    tester,
  ) async {
    final state = await start(tester);
    await tab(tester, 3);
    final dinner = find.byKey(const ValueKey('check-dinner'));
    await tester.ensureVisible(dinner);
    await tester.pumpAndSettle();
    await tester.tap(dinner);
    await tester.pumpAndSettle();
    expect(state.completedToday, 4);
    expect(state.planSecuredToday, isTrue);
    expect(state.calorieGoalMetToday, isFalse);
    expect(
      find.text('4/4 meals completed · Today’s plan streak secured!'),
      findsOneWidget,
    );
    await tester.tap(dinner);
    await tester.pumpAndSettle();
    expect(state.logsFor(state.today).length, 4);
    await tab(tester, 0);
    expect(find.text('340'), findsOneWidget);
  });

  testWidgets(
    'Streaks replaces currencies with history, milestones, and freeze details',
    (tester) async {
      final state = await start(tester);
      await tab(tester, 3);
      expect(find.text('Calorie Goal Streak'), findsOneWidget);
      expect(find.text('Meal Plan Adherence'), findsOneWidget);
      expect(find.text('26 / 28 Days Logged'), findsOneWidget);
      expect(find.textContaining('XP'), findsNothing);
      expect(find.textContaining('Gems'), findsNothing);
      expect(find.byKey(const ValueKey('claim-gems')), findsNothing);
      final cell = find.byKey(ValueKey('history-${dateKey(state.today)}'));
      await tester.ensureVisible(cell);
      await tester.pumpAndSettle();
      await tester.tap(cell);
      await tester.pumpAndSettle();
      expect(find.text('3 food entries logged'), findsOneWidget);
      await tester.tapAt(const Offset(10, 10));
      await tester.pumpAndSettle();
      final milestones = find.byKey(const ValueKey('streak-milestones'));
      await tester.ensureVisible(milestones);
      await tester.pumpAndSettle();
      await tester.tap(milestones);
      await tester.pumpAndSettle();
      expect(find.text('Consistency milestones'), findsOneWidget);
      expect(find.byType(LinearProgressIndicator), findsAtLeastNWidgets(8));
      await tester.tapAt(const Offset(10, 10));
      await tester.pumpAndSettle();
      final freeze = find.byKey(const ValueKey('freeze-details'));
      await tester.ensureVisible(freeze);
      await tester.pumpAndSettle();
      await tester.tap(freeze);
      await tester.pumpAndSettle();
      expect(find.textContaining('preview-only'), findsOneWidget);
    },
  );

  testWidgets('Portions recalculate and confirmation logs the selected food', (
    tester,
  ) async {
    final state = await start(tester);
    await tab(tester, 2);
    expect(find.text('Add to Lunch · 248 kcal'), findsOneWidget);
    await tester.tap(find.byTooltip('Increase servings').first);
    await tester.pumpAndSettle();
    expect(find.text('Add to Lunch · 289 kcal'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('confirm-food')));
    await tester.pumpAndSettle();
    expect(state.consumed.calories, closeTo(1748.75, .001));
    expect(state.completedToday, 3);
    expect(find.text('601'), findsOneWidget);
  });

  testWidgets('Search handles empty results and Quick Add validates inputs', (
    tester,
  ) async {
    final state = await start(tester);
    await tab(tester, 2);
    await tester.enterText(
      find.byKey(const ValueKey('food-search')),
      'unknown food',
    );
    await tester.pumpAndSettle();
    expect(find.text('No matching foods'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('log-mode-1')));
    await tester.pumpAndSettle();
    final save = find.byKey(const ValueKey('save-quick'));
    await tester.ensureVisible(save);
    await tester.pumpAndSettle();
    await tester.tap(save);
    await tester.pumpAndSettle();
    expect(find.text('Give this entry a name'), findsOneWidget);
    expect(find.text('Invalid value'), findsOneWidget);
    await enter(tester, 'quick-name', 'Cafe soup');
    await enter(tester, 'quick-calories', '250');
    await enter(tester, 'quick-protein', '12');
    await tester.testTextInput.receiveAction(TextInputAction.done);
    await tester.pumpAndSettle();
    await tester.ensureVisible(save);
    await tester.pumpAndSettle();
    await tester.tap(save);
    await tester.pumpAndSettle();
    expect(state.foods.any((food) => food.name == 'Cafe soup'), isTrue);
    expect(state.consumed.calories, 1710);
  });

  testWidgets('Planner swaps a pending meal and protects logged slots', (
    tester,
  ) async {
    final state = await start(tester);
    await tab(tester, 1);
    expect(find.byKey(const ValueKey('swap-breakfast')), findsNothing);
    final swap = find.byKey(const ValueKey('swap-dinner'));
    await tester.ensureVisible(swap);
    await tester.pumpAndSettle();
    await tester.tap(swap);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Scrambled eggs on sourdough').last);
    await tester.pumpAndSettle();
    expect(
      state
          .planFor(state.today)
          .singleWhere((meal) => meal.slot == MealSlot.dinner)
          .food
          .id,
      'eggs',
    );
    expect(state.projection(state.today).calories, 1940);
    expect(state.consumed.calories, 1460);
  });

  testWidgets('Recipe ingredients produce a saved per-serving custom food', (
    tester,
  ) async {
    final state = await start(tester);
    await tab(tester, 2);
    await tester.tap(find.byKey(const ValueKey('log-mode-2')));
    await tester.pumpAndSettle();
    await tester.enterText(
      find.byKey(const ValueKey('recipe-name')),
      'Chicken for two',
    );
    await tester.testTextInput.receiveAction(TextInputAction.done);
    final add = find.byKey(const ValueKey('add-ingredient'));
    await tester.ensureVisible(add);
    await tester.pumpAndSettle();
    await tester.tap(add);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Grilled Chicken Breast').last);
    await tester.pumpAndSettle();
    final save = find.byKey(const ValueKey('save-recipe'));
    await tester.ensureVisible(save);
    await tester.pumpAndSettle();
    await tester.tap(save);
    await tester.pumpAndSettle();
    final recipe = state.foods.singleWhere(
      (food) => food.name == 'Chicken for two',
    );
    expect(recipe.nutrients.calories, 82.5);
    expect(recipe.nutrients.protein, 15.5);
    expect(state.consumed.calories, 1542.5);
  });

  testWidgets('Profile changes update the calorie budget', (tester) async {
    final state = await start(tester);
    await tab(tester, 4);
    await enter(tester, 'profile-name', 'Jordan');
    await enter(tester, 'profile-calories', '2300');
    await tester.testTextInput.receiveAction(TextInputAction.done);
    final save = find.byKey(const ValueKey('save-profile'));
    await tester.ensureVisible(save);
    await tester.pumpAndSettle();
    await tester.tap(save);
    await tester.pumpAndSettle();
    expect(state.name, 'Jordan');
    await tab(tester, 0);
    expect(find.text('1,090'), findsOneWidget);
  });

  for (final (name, size, inset, scale) in <(String, Size, double, double)>[
    ('gesture navigation', const Size(393, 852), 24, 1),
    ('three-button navigation', const Size(393, 852), 48, 1),
    ('large navigation area and text', const Size(393, 852), 72, 1.5),
    ('landscape', const Size(640, 360), 48, 1),
  ]) {
    testWidgets('Food details and removal stay above $name', (tester) async {
      final state = await start(tester, size: size, scale: scale);
      tester.view.padding = FakeViewPadding(bottom: inset);
      tester.view.viewPadding = FakeViewPadding(bottom: inset);
      addTearDown(tester.view.resetPadding);
      addTearDown(tester.view.resetViewPadding);
      await tester.pumpAndSettle();
      final food = find.text('Scrambled eggs on sourdough');
      await tester.ensureVisible(food);
      await tester.pumpAndSettle();
      await tester.tap(food);
      await tester.pumpAndSettle();
      final remove = find.byKey(const ValueKey('remove-log'));
      await tester.ensureVisible(remove);
      await tester.pumpAndSettle();
      expect(
        tester.getRect(remove).bottom,
        lessThanOrEqualTo(size.height - inset - 24 + .01),
      );
      expect(tester.getRect(remove).top, greaterThanOrEqualTo(0));
      await tester.tap(remove);
      await tester.pumpAndSettle();
      expect(state.consumed.calories, 980);
      expect(state.completedToday, 2);
      expect(find.byKey(const ValueKey('remove-log')), findsNothing);
    });
  }

  testWidgets(
    'Food picker and milestone lists clear Android’s bottom navigation area',
    (tester) async {
      await start(tester);
      tester.view.padding = const FakeViewPadding(bottom: 48);
      tester.view.viewPadding = const FakeViewPadding(bottom: 48);
      addTearDown(tester.view.resetPadding);
      addTearDown(tester.view.resetViewPadding);
      await tester.pumpAndSettle();
      await tab(tester, 1);
      final swap = find.byKey(const ValueKey('swap-dinner'));
      await tester.ensureVisible(swap);
      await tester.pumpAndSettle();
      await tester.tap(swap);
      await tester.pumpAndSettle();
      expect(
        tester.getRect(find.byType(FoodPicker)).bottom,
        lessThanOrEqualTo(852 - 48),
      );
      await tester.tap(find.byTooltip('Close'));
      await tester.pumpAndSettle();
      await tab(tester, 3);
      final milestones = find.byKey(const ValueKey('streak-milestones'));
      await tester.ensureVisible(milestones);
      await tester.pumpAndSettle();
      await tester.tap(milestones);
      await tester.pumpAndSettle();
      final list = find.descendant(
        of: find.byType(BottomSheet),
        matching: find.byType(ListView),
      );
      expect(tester.getRect(list).bottom, lessThanOrEqualTo(852 - 48 - 20));
    },
  );

  for (final (size, scale) in <(Size, double)>[
    (const Size(320, 640), 1),
    (const Size(393, 852), 1.5),
    (const Size(800, 600), 1),
  ]) {
    testWidgets('No layout exceptions at $size, text scale $scale', (
      tester,
    ) async {
      await start(tester, size: size, scale: scale);
      for (var index = 0; index < 5; index++) {
        await tab(tester, index);
      }
    });
  }

  testWidgets('Keyboard insets do not overflow compact Android layouts', (
    tester,
  ) async {
    await start(tester, size: const Size(320, 640));
    addTearDown(tester.view.resetViewInsets);
    for (var index = 0; index < 5; index++) {
      tester.view.viewInsets = const FakeViewPadding();
      await tester.pumpAndSettle();
      await tab(tester, index);
      tester.view.viewInsets = const FakeViewPadding(bottom: 320);
      await tester.pumpAndSettle();
    }
  });
}
