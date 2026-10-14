import 'dart:math' as math;

import 'package:flutter/material.dart' hide Badge;

import '../app_state.dart';
import '../models.dart';
import 'theme.dart';
import 'widgets.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key, required this.onLog});
  final void Function([MealSlot slot]) onLog;

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final recorded = MealSlot.values
        .where((slot) => state.logsFor(state.today, slot).isNotEmpty)
        .length;
    return PageBody(
      children: [
        Wrap(
          spacing: 12,
          runSpacing: 8,
          alignment: WrapAlignment.spaceBetween,
          children: [
            _momentum('${state.calorieStreak}d', 'Calorie goal', Palette.carbs),
            _momentum('${state.planStreak}d', 'Adherence', Palette.emerald),
            Badge('${state.completedToday}/4 planned'),
          ],
        ),
        const SizedBox(height: 28),
        Surface(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Wrap(
                alignment: WrapAlignment.spaceBetween,
                spacing: 12,
                runSpacing: 8,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  const Label('Calorie budget'),
                  Badge(
                    state.remaining < 0 ? 'Over budget' : 'On Track',
                    color: state.remaining < 0 ? Palette.fat : Palette.primary,
                    background: state.remaining < 0
                        ? Palette.amberTint
                        : Palette.greenTint,
                    icon: Icons.circle,
                  ),
                ],
              ),
              const SizedBox(height: 24),
              LayoutBuilder(
                builder: (context, constraints) {
                  final ring = Semantics(
                    label:
                        '${count(state.remaining.abs())} calories ${state.remaining < 0 ? 'over budget' : 'remaining'}',
                    child: SizedBox(
                      width: 126,
                      height: 126,
                      child: CustomPaint(
                        painter: _BudgetRing(
                          progress:
                              (state.consumed.calories - state.exercise) /
                              state.targets.calories,
                          color: state.remaining < 0
                              ? Palette.amber
                              : Palette.primary,
                        ),
                        child: Center(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 12,
                                ),
                                child: FittedBox(
                                  fit: BoxFit.scaleDown,
                                  child: Text(
                                    count(state.remaining.abs()),
                                    key: const ValueKey('remaining-calories'),
                                    maxLines: 1,
                                    style: const TextStyle(
                                      fontSize: 27,
                                      fontWeight: FontWeight.w600,
                                      letterSpacing: -.8,
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 3),
                              Text(
                                state.remaining < 0 ? 'KCAL OVER' : 'KCAL LEFT',
                                style: const TextStyle(
                                  fontSize: 9,
                                  color: Palette.muted,
                                  letterSpacing: .6,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                  final details = Column(
                    children: [
                      _budgetRow('Base Goal', count(state.targets.calories)),
                      const SizedBox(height: 12),
                      _budgetRow(
                        'Food Logged',
                        '+${count(state.consumed.calories)}',
                        Palette.fat,
                      ),
                      const SizedBox(height: 4),
                      InkWell(
                        onTap: () => _editExercise(context, state),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          child: _budgetRow(
                            'Exercise',
                            '+${count(state.exercise)}',
                            Palette.primary,
                          ),
                        ),
                      ),
                      const Divider(),
                      const SizedBox(height: 10),
                      _budgetRow(
                        'Net today',
                        '${count(state.consumed.calories - state.exercise)} kcal',
                        Palette.muted,
                        10,
                      ),
                    ],
                  );
                  return constraints.maxWidth < 280
                      ? Column(
                          children: [ring, const SizedBox(height: 20), details],
                        )
                      : Row(
                          children: [
                            ring,
                            const SizedBox(width: 20),
                            Expanded(child: details),
                          ],
                        );
                },
              ),
            ],
          ),
        ),
        const SizedBox(height: 24),
        Surface(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Wrap(
                alignment: WrapAlignment.spaceBetween,
                spacing: 12,
                runSpacing: 8,
                children: [
                  Label('Macronutrients'),
                  Text(
                    'Daily targets',
                    style: TextStyle(fontSize: 10, color: Palette.muted),
                  ),
                ],
              ),
              const SizedBox(height: 22),
              MacroBars(values: state.consumed, targets: state.targets),
            ],
          ),
        ),
        const SizedBox(height: 28),
        SectionHeading(
          "Today's Meals",
          trailing: Text(
            '$recorded of 4 recorded',
            style: const TextStyle(fontSize: 11, color: Palette.muted),
          ),
        ),
        const SizedBox(height: 14),
        Surface(
          padding: 0,
          child: Column(
            children: [
              for (final slot in MealSlot.values) ...[
                if (slot.index > 0) const Divider(),
                _mealRow(context, state, slot),
              ],
            ],
          ),
        ),
        const SizedBox(height: 22),
        FilledButton.icon(
          onPressed: () => onLog(),
          icon: const Icon(Icons.add, size: 18),
          label: const Text('Log Food or Drink'),
        ),
        const SizedBox(height: 12),
        const Text(
          'A little awareness. A healthier rhythm.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 10, color: Palette.muted),
        ),
      ],
    );
  }

  Widget _momentum(String value, String label, Color color) => Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Container(
        width: 6,
        height: 6,
        decoration: BoxDecoration(color: color, shape: BoxShape.circle),
      ),
      const SizedBox(width: 5),
      Text(
        value,
        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
      ),
      const SizedBox(width: 4),
      Text(label, style: const TextStyle(fontSize: 10, color: Palette.muted)),
    ],
  );

  Widget _budgetRow(
    String label,
    String value, [
    Color color = Palette.ink,
    double size = 11,
  ]) => Row(
    children: [
      Expanded(
        child: Text(
          label,
          style: TextStyle(fontSize: size, color: Palette.muted),
        ),
      ),
      Text(
        value,
        style: TextStyle(
          fontSize: size,
          color: color,
          fontWeight: FontWeight.w600,
        ),
      ),
    ],
  );

  Widget _mealRow(BuildContext context, AppState state, MealSlot slot) {
    final logs = state.logsFor(state.today, slot);
    final plan = state
        .checklist(state.today)
        .where((meal) => meal.slot == slot)
        .firstOrNull;
    final pending = plan != null && !state.isLogged(plan);
    final total = logs.fold(Nutrients.zero, (sum, log) => sum + log.nutrients);
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 2),
            child: Icon(
              logs.isNotEmpty
                  ? Icons.check_circle
                  : Icons.radio_button_unchecked,
              size: 17,
              color: logs.isNotEmpty
                  ? Palette.emerald
                  : const Color(0xFFCBD5E1),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Wrap(
                        spacing: 8,
                        runSpacing: 6,
                        crossAxisAlignment: WrapCrossAlignment.center,
                        children: [
                          Text(
                            slot.label,
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          if (pending && logs.isEmpty) ...[
                            const Badge(
                              'Planned',
                              color: Palette.fat,
                              background: Palette.amberTint,
                            ),
                          ],
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      '${count(logs.isNotEmpty ? total.calories : plan?.food.nutrients.calories ?? 0)} kcal',
                      style: TextStyle(
                        fontSize: 11,
                        color: logs.isNotEmpty ? Palette.ink : Palette.muted,
                        fontWeight: logs.isNotEmpty
                            ? FontWeight.w600
                            : FontWeight.w400,
                      ),
                    ),
                  ],
                ),
                if (logs.isNotEmpty) ...[
                  for (final log in logs)
                    InkWell(
                      onTap: () => _logDetails(context, state, log),
                      child: Padding(
                        padding: const EdgeInsets.only(top: 7),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              log.food.name,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 11,
                                color: Palette.muted,
                                height: 1.5,
                              ),
                            ),
                            const SizedBox(height: 3),
                            Text(
                              log.time,
                              style: const TextStyle(
                                fontSize: 9,
                                color: Palette.muted,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                ],
                if (pending) ...[
                  const SizedBox(height: 6),
                  Text(
                    plan.food.name,
                    style: const TextStyle(fontSize: 11, color: Palette.muted),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Suggested for ${slot.time}',
                    style: const TextStyle(fontSize: 9, color: Palette.muted),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: FilledButton.icon(
                          key: ValueKey('log-plan-${slot.name}'),
                          style: FilledButton.styleFrom(
                            backgroundColor: Palette.ink,
                            minimumSize: const Size(0, 40),
                          ),
                          onPressed: () {
                            if (state.logPlanned(plan)) {
                              toast(
                                context,
                                'Meal logged. Your checklist and nutrition are up to date!',
                              );
                            }
                          },
                          icon: const Icon(Icons.check, size: 16),
                          label: const Text('Log Meal'),
                        ),
                      ),
                      const SizedBox(width: 8),
                      TextButton(
                        onPressed: () async {
                          final food = await chooseFood(
                            context,
                            title: 'Swap ${slot.label.toLowerCase()}',
                          );
                          if (food != null) {
                            state.setMeal(state.today, slot, food);
                          }
                        },
                        child: const Text('Swap'),
                      ),
                    ],
                  ),
                ],
                if (logs.isEmpty && !pending) ...[
                  const SizedBox(height: 5),
                  TextButton(
                    onPressed: () => onLog(slot),
                    style: TextButton.styleFrom(
                      alignment: Alignment.centerLeft,
                      padding: EdgeInsets.zero,
                    ),
                    child: const Text('Add food'),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _logDetails(BuildContext context, AppState state, FoodLog log) {
    showModalBottomSheet<void>(
      context: context,
      useSafeArea: true,
      isScrollControlled: true,
      builder: (sheetContext) => SafeArea(
        top: false,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  log.food.name,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  '${log.slot.label} · ${log.time} · ${amount(log.multiplier)} servings',
                  style: const TextStyle(fontSize: 12, color: Palette.muted),
                ),
                const SizedBox(height: 20),
                Text(
                  '${count(log.nutrients.calories)} kcal',
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 12),
                MacroBars(
                  values: log.nutrients,
                  targets: state.targets,
                  compact: true,
                ),
                const SizedBox(height: 24),
                OutlinedButton.icon(
                  key: const ValueKey('remove-log'),
                  onPressed: () {
                    state.removeLog(log.id);
                    Navigator.pop(sheetContext);
                    toast(
                      context,
                      'Food removed. Your journal and checklist are updated.',
                    );
                  },
                  icon: const Icon(Icons.delete_outline, size: 18),
                  label: const Text('Remove from journal'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _editExercise(BuildContext context, AppState state) async {
    final controller = TextEditingController(text: amount(state.exercise));
    final key = GlobalKey<FormState>();
    await showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Exercise calories', style: TextStyle(fontSize: 18)),
        content: Form(
          key: key,
          child: TextFormField(
            controller: controller,
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            decoration: const InputDecoration(labelText: 'Calories burned'),
            validator: (value) {
              final number = double.tryParse(value ?? '');
              return number == null ||
                      !number.isFinite ||
                      number < 0 ||
                      number > 10000
                  ? 'Enter 0–10,000 kcal'
                  : null;
            },
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () {
              if (!key.currentState!.validate()) return;
              state.setExercise(double.parse(controller.text));
              Navigator.pop(context);
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
    // Dialog exit animations finish before its field releases the controller.
    await Future<void>.delayed(const Duration(milliseconds: 250));
    controller.dispose();
  }
}

class _BudgetRing extends CustomPainter {
  const _BudgetRing({required this.progress, required this.color});
  final double progress;
  final Color color;
  @override
  void paint(Canvas canvas, Size size) {
    final rect = Rect.fromLTWH(6, 6, size.width - 12, size.height - 12);
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 6
      ..strokeCap = StrokeCap.round;
    canvas.drawOval(rect, paint..color = Palette.track);
    canvas.drawArc(
      rect,
      -math.pi / 2,
      2 * math.pi * progress.clamp(0, 1),
      false,
      paint..color = color,
    );
  }

  @override
  bool shouldRepaint(_BudgetRing oldDelegate) =>
      progress != oldDelegate.progress || color != oldDelegate.color;
}
