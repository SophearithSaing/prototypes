import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:meal_planner/app_state.dart';
import 'package:meal_planner/main.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Android meal logging, navigation, and native persistence', (
    tester,
  ) async {
    final preferences = await SharedPreferences.getInstance();
    // Use an isolated key so testing never changes the user's actual journal.
    final key = 'nutripulse.test.${DateTime.now().microsecondsSinceEpoch}';
    addTearDown(() async {
      await preferences.remove(key);
    });
    final state = AppState(
      now: DateTime(2026, 10, 11),
      saveData: (data) async {
        if (!await preferences.setString(key, data)) {
          throw StateError('Save failed');
        }
      },
    );
    await tester.pumpWidget(MyApp(state: state));
    await tester.pumpAndSettle();
    expect(find.text('890'), findsOneWidget);

    await tester.tap(find.byKey(const ValueKey('nav-3')));
    await tester.pumpAndSettle();
    final dinner = find.byKey(const ValueKey('check-dinner'));
    await tester.ensureVisible(dinner);
    await tester.pumpAndSettle();
    await tester.tap(dinner);
    await tester.pumpAndSettle();
    expect(state.completedToday, 4);
    expect(state.planSecuredToday, isTrue);
    expect(state.calorieGoalMetToday, isFalse);

    await tester.tap(find.byKey(const ValueKey('nav-0')));
    await tester.pumpAndSettle();
    expect(find.text('340'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('nav-2')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('confirm-food')));
    await tester.pumpAndSettle();
    expect(state.consumed.calories, 2257.5);
    await state.flush();
    await preferences.reload();
    final restored = AppState(
      now: state.today,
      savedData: preferences.getString(key),
    );
    expect(restored.consumed.calories, 2257.5);
    expect(restored.completedToday, 4);
    expect(restored.planSecuredToday, isTrue);
    expect(restored.consistencyHistory().last.planComplete, isTrue);

    await tester.pumpWidget(const SizedBox());
    state.dispose();
    await tester.pumpWidget(MyApp(state: restored));
    await tester.pumpAndSettle();
    expect(find.text('93'), findsOneWidget);
    for (final index in [1, 2, 3, 4, 0]) {
      await tester.tap(find.byKey(ValueKey('nav-$index')));
      await tester.pumpAndSettle();
    }
    await tester.tap(find.byKey(const ValueKey('nav-3')));
    await tester.pumpAndSettle();
    expect(find.text('Streaks'), findsOneWidget);
    expect(find.text('Habits & Streaks'), findsNWidgets(2));
    expect(find.text('Rewards'), findsNothing);
    await tester.pumpWidget(const SizedBox());
    restored.dispose();
  });

  testWidgets(
    'Food removal bottom sheet respects native Android navigation insets',
    (tester) async {
      final state = AppState(now: DateTime(2026, 10, 11));
      await tester.pumpWidget(MyApp(state: state));
      await tester.pumpAndSettle();
      final food = find.text('Scrambled eggs on sourdough');
      await tester.ensureVisible(food);
      await tester.pumpAndSettle();
      await tester.tap(food);
      await tester.pumpAndSettle();
      final remove = find.byKey(const ValueKey('remove-log'));
      await tester.ensureVisible(remove);
      await tester.pumpAndSettle();
      final ratio = tester.view.devicePixelRatio;
      final safeBottom =
          (tester.view.physicalSize.height - tester.view.viewPadding.bottom) /
          ratio;
      expect(
        tester.getRect(remove).bottom,
        lessThanOrEqualTo(safeBottom - 24 + .01),
      );
      await tester.tap(remove);
      await tester.pumpAndSettle();
      expect(state.consumed.calories, 980);
      expect(find.byKey(const ValueKey('remove-log')), findsNothing);
      await tester.pumpWidget(const SizedBox());
      state.dispose();
    },
  );
}
