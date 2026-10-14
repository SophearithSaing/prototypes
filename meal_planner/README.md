# NutriPulse

An Android-first Flutter prototype for mindful nutrition tracking, built from the product brief and visual references in `refs/`.

## Run

```bash
flutter pub get
flutter run -d emulator-5554
```

Use `flutter devices` to find your phone or emulator's ID. No API keys, account, or backend is needed. Plus Jakarta Sans is bundled for offline use; its license is in `assets/fonts/OFL.txt`.

## Included

- **Today:** calorie budget (`goal − food + exercise`), macro progress, meal journal, one-tap planned meal logging, swaps, exercise entry, and journal removal.
- **Plan:** seven-day calendar, week navigation, nutrition projections, food selection, swaps, removal, empty-slot auto-fill, and applying plans to dated checklists. Logged meals are protected from editing.
- **Log:** searchable mock foods, recent/favorite/verified/custom filters, editable portion multipliers, manual calorie/macro entry, and recipes assembled from ingredients with per-serving nutrition.
- **Streaks:** dual calorie/meal-plan streak cards, seven-day calorie history, a 14-day plan timeline, an interactive 28-day consistency grid, a live shared meal checklist, and eight consistency milestones. Calorie goal status is independent of meal-plan completion.
- **Profile:** editable name, nutrition targets, and saved dietary preference.
- Local persistence using SharedPreferences, including plans, food logs, custom foods, favorites, streak history, and preferences. Older reward-era saves are supported without resetting journals; legacy balances remain stored but are no longer displayed or earned.

Meal illustrations are simple icons, not external images. All screens scroll and respect Android system insets; keyboard forms and Android back navigation are supported.

## Demo boundaries

The initial sample profile has three logged meals, a 2,100 kcal target, 250 exercise calories, and 14/8-day historical streaks. Remaining calories are **890**, correcting the reference screenshot's inconsistent 640. Nutrient totals and all projections are calculated from the same data. The new `refs/streak_minimalist/` design supersedes the rewards screen in the original product brief: there are no points, currencies, levels, or perk claims in the UI.

Food values, past streak counters, personal bests, and pre-existing history are mock data, not medical advice. Sample history stays anchored to the initial demo date; actual journal days and today's progress are derived from saved meals. Checking off all four meals secures the plan goal, not the calorie goal: net intake must independently be within ±50 kcal of the target. New dates do not inherit yesterday's intake. Future plans appear in that day's checklist only after being applied. Automatic day-end streak counter updates, freeze use, and seven-day freeze regeneration are preview-only. Dietary preferences are saved but do not filter mock recommendations yet. There is no live food database, barcode/voice scanning, grocery ingredient generation, health integration, authentication, or cloud sync.

Recipes save the calculated per-serving food; ingredient editing of an existing saved recipe is not implemented. SharedPreferences is appropriate for this prototype, not a production-scale or encrypted nutrition database. Android release signing still uses the starter debug signing configuration.

## Verify

```bash
flutter analyze
flutter test
flutter test integration_test/app_test.dart -d emulator-5554
flutter build apk --debug
```

Unit and widget tests cover calorie/macro math, idempotent logging, independent streak goals, history and legacy-save migration, planner synchronization, recipe creation, form validation, persistence, navigation, narrow screens, landscape, keyboard insets, and enlarged text. The Android integration test uses an isolated storage key and checks meal logging and native on-device persistence without altering the main journal.

Debug APK: `build/app/outputs/flutter-apk/app-debug.apk`.

## Source layout

- `lib/models.dart` — food, nutrition, meal slots, plans, logs, and sample foods.
- `lib/app_state.dart` — shared state, calculations, consistency history, legacy-save compatibility, and serialization.
- `lib/main.dart` — device storage initialization and startup.
- `lib/ui/` — app shell, theme, reusable components, and the five screens.
- `test/` and `integration_test/` — automated verification.
