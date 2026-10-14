import 'package:flutter/material.dart' hide Badge;

import '../models.dart';
import 'theme.dart';
import 'widgets.dart';

class PlannerScreen extends StatefulWidget {
  const PlannerScreen({super.key, required this.onStreaks});
  final VoidCallback onStreaks;
  @override
  State<PlannerScreen> createState() => _PlannerScreenState();
}

class _PlannerScreenState extends State<PlannerScreen> {
  DateTime? selected;
  DateTime? monday;
  String? observedDay;
  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    if (observedDay != state.todayKey) {
      observedDay = state.todayKey;
      selected = state.today;
      monday = state.today.subtract(Duration(days: state.today.weekday - 1));
    }
    selected ??= state.today;
    monday ??= state.today.subtract(Duration(days: state.today.weekday - 1));
    final end = monday!.add(const Duration(days: 6));
    final plan = state.planFor(selected!);
    final total = state.projection(selected!);
    final percent = (total.calories / state.targets.calories * 100).round();
    return PageBody(
      children: [
        Row(
          children: [
            IconButton(
              tooltip: 'Previous week',
              onPressed: () => _changeWeek(-7),
              icon: const Icon(Icons.chevron_left, size: 20),
            ),
            Expanded(
              child: Text(
                '${months[monday!.month - 1]} ${monday!.day} – ${months[end.month - 1]} ${end.day}',
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            IconButton(
              tooltip: 'Next week',
              onPressed: () => _changeWeek(7),
              icon: const Icon(Icons.chevron_right, size: 20),
            ),
            TextButton.icon(
              onPressed: () {
                if (plan.length == 4) {
                  toast(
                    context,
                    'All four slots are already filled. Swap a meal to change it.',
                  );
                } else {
                  state.autoFill(selected!);
                  toast(
                    context,
                    'Empty slots filled with balanced mock meals.',
                  );
                }
              },
              icon: const Icon(Icons.auto_fix_high, size: 16),
              label: const Text('Auto-Fill'),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            for (var i = 0; i < 7; i++)
              Expanded(
                child: Padding(
                  padding: EdgeInsets.only(right: i < 6 ? 4 : 0),
                  child: _day(monday!.add(Duration(days: i))),
                ),
              ),
          ],
        ),
        const SizedBox(height: 28),
        Surface(
          padding: 16,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Wrap(
                alignment: WrapAlignment.spaceBetween,
                runSpacing: 8,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        shortDate(selected!),
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        '${count(total.calories)} of ${count(state.targets.calories)} kcal planned',
                        style: const TextStyle(
                          fontSize: 11,
                          color: Palette.muted,
                        ),
                      ),
                    ],
                  ),
                  Badge(
                    '$percent% of target',
                    color: percent > 105 ? Palette.fat : Palette.primary,
                    background: percent > 105
                        ? Palette.amberTint
                        : Palette.greenTint,
                  ),
                ],
              ),
              const SizedBox(height: 16),
              const Divider(),
              const SizedBox(height: 14),
              MacroBars(values: total, targets: state.targets, compact: true),
            ],
          ),
        ),
        const SizedBox(height: 24),
        for (final slot in MealSlot.values) ...[
          _slot(slot, plan.where((meal) => meal.slot == slot).firstOrNull),
          const SizedBox(height: 12),
        ],
        const SizedBox(height: 10),
        InkWell(
          onTap: widget.onStreaks,
          borderRadius: BorderRadius.circular(12),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
            child: Row(
              children: [
                const Icon(
                  Icons.local_fire_department_outlined,
                  size: 18,
                  color: Palette.amber,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'A little planning keeps your ${state.planStreak}-day rhythm going.',
                    style: const TextStyle(fontSize: 11, color: Palette.muted),
                  ),
                ),
                const Icon(Icons.chevron_right, size: 18),
              ],
            ),
          ),
        ),
        const SizedBox(height: 20),
        FilledButton.icon(
          key: const ValueKey('apply-plan'),
          onPressed: plan.length != 4
              ? null
              : () {
                  state.applyPlan(selected!);
                  toast(
                    context,
                    dateKey(selected!) == state.todayKey
                        ? 'Plan synced to today’s checklist. Logged meals are unchanged.'
                        : 'Plan saved for ${shortDate(selected!)}. It will be ready on that day.',
                  );
                },
          icon: const Icon(Icons.checklist, size: 18),
          label: Text(
            state.isApplied(selected!)
                ? 'Update Plan in Checklist'
                : 'Apply Plan to Checklist',
          ),
        ),
        const SizedBox(height: 12),
        TextButton.icon(
          onPressed: () => setState(() {
            selected = state.today;
            monday = state.today.subtract(
              Duration(days: state.today.weekday - 1),
            );
          }),
          icon: const Icon(Icons.today_outlined, size: 16),
          label: const Text('Back to today'),
        ),
      ],
    );
  }

  void _changeWeek(int days) => setState(() {
    monday = DateTime(monday!.year, monday!.month, monday!.day + days);
    selected = DateTime(selected!.year, selected!.month, selected!.day + days);
  });

  Widget _day(DateTime date) {
    final state = AppScope.of(context);
    final active = dateKey(date) == dateKey(selected!);
    return Semantics(
      selected: active,
      label: shortDate(date),
      button: true,
      child: InkWell(
        key: ValueKey('day-${dateKey(date)}'),
        onTap: () => setState(() => selected = date),
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: active ? Palette.ink : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            children: [
              Text(
                weekdays[date.weekday - 1].toUpperCase(),
                style: TextStyle(
                  fontSize: 9,
                  color: active ? const Color(0xFFCBD5E1) : Palette.muted,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                '${date.day}',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: active ? Colors.white : Palette.ink,
                ),
              ),
              const SizedBox(height: 9),
              Container(
                width: 4,
                height: 4,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: state.planFor(date).isEmpty
                      ? Colors.transparent
                      : active
                      ? const Color(0xFF34D399)
                      : const Color(0xFFCBD5E1),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _slot(MealSlot slot, PlannedMeal? meal) {
    final state = AppScope.of(context);
    final locked = meal != null && state.isLogged(meal);
    return Surface(
      padding: 14,
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  '${slot.label}${meal == null ? '' : '  ·  ${count(meal.food.nutrients.calories)} kcal'}',
                  style: const TextStyle(fontSize: 11, color: Palette.muted),
                ),
              ),
              if (locked) const Badge('Logged', icon: Icons.check),
              if (!locked) ...[
                IconButton(
                  key: ValueKey('swap-${slot.name}'),
                  tooltip: 'Swap ${slot.label.toLowerCase()}',
                  constraints: const BoxConstraints(
                    minWidth: 36,
                    minHeight: 36,
                  ),
                  onPressed: () => _choose(slot),
                  icon: const Icon(Icons.swap_horiz, size: 18),
                ),
                if (meal != null)
                  PopupMenuButton<String>(
                    tooltip: 'Meal options',
                    icon: const Icon(Icons.more_horiz, size: 18),
                    itemBuilder: (_) => [
                      const PopupMenuItem(
                        value: 'remove',
                        child: Text('Remove meal'),
                      ),
                    ],
                    onSelected: (_) => state.removeMeal(meal),
                  ),
              ],
            ],
          ),
          const SizedBox(height: 8),
          if (meal != null)
            Row(
              children: [
                FoodGlyph(slot),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        meal.food.name,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          height: 1.5,
                        ),
                      ),
                      const SizedBox(height: 5),
                      Text(
                        '${amount(meal.food.nutrients.protein)}g P · ${amount(meal.food.nutrients.carbs)}g C · ${amount(meal.food.nutrients.fat)}g F',
                        style: const TextStyle(
                          fontSize: 10,
                          color: Palette.muted,
                        ),
                      ),
                      const SizedBox(height: 7),
                      Badge(
                        meal.tag,
                        color: Palette.muted,
                        background: Palette.track,
                      ),
                    ],
                  ),
                ),
              ],
            )
          else
            OutlinedButton.icon(
              onPressed: () => _choose(slot),
              icon: const Icon(Icons.add, size: 17),
              label: Text('Plan ${slot.label.toLowerCase()}'),
            ),
        ],
      ),
    );
  }

  Future<void> _choose(MealSlot slot) async {
    final state = AppScope.of(context);
    final date = selected!;
    final food = await chooseFood(
      context,
      title: 'Plan ${slot.label.toLowerCase()}',
    );
    if (food != null) state.setMeal(date, slot, food);
  }
}
