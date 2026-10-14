import 'package:flutter/material.dart' hide Badge;

import '../app_state.dart';
import '../models.dart';
import 'theme.dart';
import 'widgets.dart';

class StreaksScreen extends StatelessWidget {
  const StreaksScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final meals = state.checklist(state.today);
    final completed = state.completedToday;
    final missing = meals.where((meal) => !state.isLogged(meal)).length;
    final next = meals.where((meal) => !state.isLogged(meal)).firstOrNull;
    final history = state.consistencyHistory();
    return PageBody(
      children: [
        Wrap(
          alignment: WrapAlignment.spaceBetween,
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 12,
          runSpacing: 10,
          children: [
            const Text(
              'Habits & Streaks',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w600,
                letterSpacing: -.7,
              ),
            ),
            Badge(
              state.calorieStreak > 0 || state.planStreak > 0
                  ? 'Streaks Active'
                  : 'A fresh start',
              icon: Icons.circle,
            ),
          ],
        ),
        const SizedBox(height: 7),
        const Text(
          'Build nutritional consistency, one meal at a time.',
          style: TextStyle(fontSize: 11, color: Palette.muted, height: 1.6),
        ),
        const SizedBox(height: 24),
        Row(
          children: [
            const Expanded(child: Label('Active consistency engines')),
            TextButton.icon(
              key: const ValueKey('freeze-details'),
              onPressed: () => _protection(context, state),
              icon: const Icon(Icons.shield_outlined, size: 14),
              label: Text(
                '${state.freezes} Freeze ${state.freezes > 0 ? 'Armed' : 'Available'}',
                style: const TextStyle(fontSize: 10),
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        _calorieCard(context, state),
        const SizedBox(height: 14),
        _planCard(context, state),
        const SizedBox(height: 14),
        _consistencyGrid(context, history),
        const SizedBox(height: 26),
        SectionHeading(
          "Today's Meal Checklist",
          subtitle:
              '$completed of ${meals.length} logged · ${state.planSecuredToday ? 'Today’s plan secured' : 'Builds your ${state.planStreak + 1}-day plan streak'}',
          trailing: SizedBox(
            width: 65,
            child: ThinProgress(meals.isEmpty ? 0 : completed / meals.length),
          ),
        ),
        const SizedBox(height: 14),
        if (meals.isEmpty)
          const Surface(
            child: Text(
              'Apply a four-meal plan from the Plan tab to begin your checklist.',
              style: TextStyle(fontSize: 12, color: Palette.muted, height: 1.6),
            ),
          ),
        if (meals.isNotEmpty)
          Surface(
            key: const ValueKey('streak-callout'),
            padding: 12,
            color: state.planSecuredToday
                ? Palette.greenTint
                : Palette.flameTint,
            borderColor: state.planSecuredToday
                ? const Color(0xFFA7F3D0)
                : const Color(0xFFFED7AA),
            child: Row(
              children: [
                Icon(
                  state.planSecuredToday
                      ? Icons.verified_outlined
                      : Icons.local_fire_department_outlined,
                  color: state.planSecuredToday
                      ? Palette.primary
                      : Palette.flame,
                  size: 19,
                ),
                const SizedBox(width: 9),
                Expanded(
                  child: Text(
                    state.planSecuredToday
                        ? '4/4 meals completed · Today’s plan streak secured!'
                        : missing == 0
                        ? 'Add all four meal slots to secure your plan streak.'
                        : '$missing more ${missing == 1 ? 'meal' : 'meals'} to secure today’s plan streak!',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: state.planSecuredToday
                          ? Palette.primary
                          : Palette.flame,
                      height: 1.6,
                    ),
                  ),
                ),
              ],
            ),
          ),
        const SizedBox(height: 13),
        for (final meal in meals) ...[
          _checklistRow(context, meal, next?.id == meal.id),
          const SizedBox(height: 10),
        ],
        const SizedBox(height: 16),
        Row(
          children: [
            const Expanded(child: Label('Streak milestones & insights')),
            TextButton(
              key: const ValueKey('streak-milestones'),
              onPressed: () => _milestones(context, state),
              child: const Text(
                'Milestones (8)',
                style: TextStyle(fontSize: 11),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        LayoutBuilder(
          builder: (context, constraints) {
            final calorie = _milestoneCard(
              title: '3-Week Calorie Master',
              description:
                  'Reach 21 consecutive days hitting your calorie target.',
              current: state.calorieStreak,
              goal: 21,
              tag: 'Target: 21 Days',
              color: Palette.flame,
              icon: Icons.local_fire_department_outlined,
            );
            final plan = _milestoneCard(
              title: 'Plan Adherence Record',
              description:
                  'Current: ${state.planStreak} days · Record to beat: ${state.planBest} days.',
              current: state.planStreak,
              goal: state.planBest,
              tag: 'Personal Best',
              color: Palette.primary,
              icon: Icons.workspace_premium_outlined,
            );
            if (constraints.maxWidth < 310 ||
                MediaQuery.textScalerOf(context).scale(1) > 1.25) {
              return Column(
                children: [calorie, const SizedBox(height: 12), plan],
              );
            }
            return IntrinsicHeight(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Expanded(child: calorie),
                  const SizedBox(width: 10),
                  Expanded(child: plan),
                ],
              ),
            );
          },
        ),
        const SizedBox(height: 14),
        InkWell(
          onTap: () => _protection(context, state),
          borderRadius: BorderRadius.circular(16),
          child: Surface(
            padding: 14,
            child: Row(
              children: [
                Container(
                  width: 34,
                  height: 34,
                  decoration: BoxDecoration(
                    color: Palette.greenTint,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(
                    Icons.shield_outlined,
                    size: 20,
                    color: Palette.primary,
                  ),
                ),
                const SizedBox(width: 11),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Streak Freeze Protection',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 5),
                      const Text(
                        'A little breathing room for an accidental missed day.',
                        style: TextStyle(
                          fontSize: 10,
                          color: Palette.muted,
                          height: 1.6,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                Badge(state.freezes > 0 ? 'Armed' : 'Empty'),
              ],
            ),
          ),
        ),
        const SizedBox(height: 18),
        const Text(
          'Past streaks and history include sample data. Today’s checklist is live. Automatic freezes are a preview.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 9, color: Palette.muted, height: 1.7),
        ),
      ],
    );
  }

  Widget _calorieCard(BuildContext context, AppState state) {
    final history = state.consistencyHistory(7);
    final past = history
        .where((day) => dateKey(day.date) != state.todayKey)
        .toList();
    final onTarget = past.where((day) => day.calorieOnTarget).length;
    return Surface(
      padding: 16,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _streakHeader(
            title: 'Calorie Goal Streak',
            subtitle:
                'Target ${count(state.targets.calories)} kcal (±50 kcal zone)',
            days: state.calorieStreak,
            color: Palette.flame,
            tint: Palette.flameTint,
            icon: Icons.local_fire_department_outlined,
            tag: state.calorieStreak >= state.calorieBest
                ? 'All-Time Peak'
                : 'Best: ${state.calorieBest} days',
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Palette.track,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Palette.line),
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    const Expanded(
                      child: Text(
                        'Past 7 Days History',
                        style: TextStyle(fontSize: 10, color: Palette.muted),
                      ),
                    ),
                    Text(
                      '$onTarget/${past.length} on target',
                      style: const TextStyle(
                        fontSize: 10,
                        color: Palette.primary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 13),
                Row(
                  children: [
                    for (final day in history)
                      Expanded(child: _dayNode(context, state, day)),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _streakHeader({
    required String title,
    required String subtitle,
    required int days,
    required Color color,
    required Color tint,
    required IconData icon,
    required String tag,
  }) => Row(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: tint,
          borderRadius: BorderRadius.circular(11),
        ),
        child: Icon(icon, color: color, size: 21),
      ),
      const SizedBox(width: 10),
      Expanded(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Wrap(
              spacing: 6,
              runSpacing: 6,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Badge(tag, color: color, background: tint),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              subtitle,
              style: const TextStyle(
                fontSize: 10,
                color: Palette.muted,
                height: 1.6,
              ),
            ),
          ],
        ),
      ),
      const SizedBox(width: 9),
      Column(
        children: [
          Text(
            '$days',
            style: const TextStyle(
              fontSize: 26,
              fontWeight: FontWeight.w600,
              letterSpacing: -.8,
            ),
          ),
          Text(
            'Days',
            style: TextStyle(
              fontSize: 10,
              color: color,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    ],
  );

  Widget _dayNode(BuildContext context, AppState state, ConsistencyDay day) {
    final today = dateKey(day.date) == state.todayKey;
    return Tooltip(
      message:
          '${shortDate(day.date)} · ${day.calorieOnTarget
              ? 'Calorie target met'
              : today
              ? 'In progress'
              : 'Target not met'}${day.sample ? ' (sample)' : ''}',
      child: InkWell(
        onTap: () => _dayDetails(context, day),
        borderRadius: BorderRadius.circular(10),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 3),
          child: Column(
            children: [
              Container(
                width: 27,
                height: 27,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: today && !day.calorieOnTarget
                      ? const Color(0xFFFFEDD5)
                      : day.calorieOnTarget
                      ? Palette.flame
                      : const Color(0xFFE2E8F0),
                  border: today
                      ? Border.all(color: Palette.flame, width: 1.5)
                      : null,
                ),
                child: Icon(
                  today && !day.calorieOnTarget
                      ? Icons.bolt
                      : day.calorieOnTarget
                      ? Icons.local_fire_department
                      : Icons.remove,
                  size: 15,
                  color: today && !day.calorieOnTarget
                      ? Palette.flame
                      : day.calorieOnTarget
                      ? Colors.white
                      : Palette.muted,
                ),
              ),
              const SizedBox(height: 7),
              Text(
                today ? 'Today' : weekdays[day.date.weekday - 1][0],
                style: TextStyle(
                  fontSize: 9,
                  color: today ? Palette.flame : Palette.muted,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _planCard(BuildContext context, AppState state) {
    final day = state.planStreak == 0 ? 0 : (state.planStreak - 1) % 14 + 1;
    final remaining = 14 - day;
    return Surface(
      padding: 16,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _streakHeader(
            title: 'Meal Plan Adherence',
            subtitle: 'Following daily planned macro recipes',
            days: state.planStreak,
            color: Palette.primary,
            tint: const Color(0xFFE6F4EE),
            icon: Icons.calendar_today_outlined,
            tag: state.planStreak > 0 ? 'Active Streak' : 'Start today',
          ),
          const SizedBox(height: 18),
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            spacing: 10,
            runSpacing: 6,
            children: [
              Text(
                'Current Cycle: Day $day of 14',
                style: const TextStyle(fontSize: 10, color: Palette.muted),
              ),
              Text(
                remaining == 0
                    ? '14-Day Badge reached'
                    : '$remaining days to 14-Day Badge',
                style: const TextStyle(
                  fontSize: 10,
                  color: Palette.primary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          for (var row = 0; row < 2; row++) ...[
            if (row > 0) const SizedBox(height: 8),
            Row(
              children: [
                for (var column = 0; column < 7; column++) ...[
                  if (column > 0) const SizedBox(width: 6),
                  Expanded(
                    child: Semantics(
                      label:
                          'Cycle day ${row * 7 + column + 1}: ${row * 7 + column < day ? 'completed' : 'upcoming'}',
                      child: Container(
                        height: 7,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: row * 7 + column < day
                              ? Palette.primary
                              : const Color(0xFFE2E8F0),
                          border: row * 7 + column == day - 1
                              ? Border.all(
                                  color: const Color(0xFF6BB399),
                                  width: 2,
                                )
                              : null,
                        ),
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ],
          const SizedBox(height: 15),
          const Divider(),
          const SizedBox(height: 8),
          InkWell(
            onTap: () => _protection(context, state),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                children: [
                  const Icon(
                    Icons.verified_user_outlined,
                    size: 15,
                    color: Palette.primary,
                  ),
                  const SizedBox(width: 6),
                  const Expanded(
                    child: Text(
                      'Streak Freeze · 1 missed-day protection',
                      style: TextStyle(fontSize: 10, color: Palette.muted),
                    ),
                  ),
                  const SizedBox(width: 6),
                  Text(
                    state.freezes > 0 ? 'Armed' : 'Empty',
                    style: const TextStyle(
                      fontSize: 10,
                      color: Palette.primary,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _consistencyGrid(BuildContext context, List<ConsistencyDay> history) {
    final logged = history.where((day) => day.logged).length;
    return Surface(
      padding: 16,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 10,
            runSpacing: 8,
            children: [
              const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.calendar_view_month_outlined,
                    size: 16,
                    color: Palette.primary,
                  ),
                  SizedBox(width: 6),
                  Flexible(
                    child: Text(
                      '4-Week Consistency Grid',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
              Text(
                '$logged / 28 Days Logged',
                key: const ValueKey('consistency-total'),
                style: const TextStyle(
                  fontSize: 10,
                  color: Palette.primary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 17),
          for (var row = 0; row < 4; row++) ...[
            if (row > 0) const SizedBox(height: 7),
            Row(
              children: [
                SizedBox(
                  width: 30,
                  child: Text(
                    row == 3 ? 'Now' : 'W-${3 - row}',
                    style: TextStyle(
                      fontSize: 9,
                      color: row == 3 ? Palette.flame : Palette.muted,
                    ),
                  ),
                ),
                for (var column = 0; column < 7; column++) ...[
                  if (column > 0) const SizedBox(width: 6),
                  Expanded(
                    child: _historyCell(
                      context,
                      history[row * 7 + column],
                      row == 3,
                    ),
                  ),
                ],
              ],
            ),
          ],
          const SizedBox(height: 14),
          Row(
            children: [
              const Expanded(
                child: Text(
                  'Less consistent',
                  style: TextStyle(fontSize: 9, color: Palette.muted),
                ),
              ),
              for (final color in [
                const Color(0xFFE2E8F0),
                const Color(0xFFA7F3D0),
                Palette.primary,
                Palette.flame,
              ])
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 2),
                  child: Container(
                    width: 9,
                    height: 9,
                    decoration: BoxDecoration(
                      color: color,
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                ),
              const SizedBox(width: 6),
              const Expanded(
                child: Text(
                  'Active streak',
                  textAlign: TextAlign.end,
                  style: TextStyle(fontSize: 9, color: Palette.muted),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _historyCell(BuildContext context, ConsistencyDay day, bool latest) {
    final today = dateKey(day.date) == AppScope.of(context).todayKey;
    final color = today && !day.planComplete
        ? Palette.flameTint
        : !day.logged
        ? const Color(0xFFE2E8F0)
        : latest
        ? Palette.flame
        : Palette.primary;
    return Semantics(
      button: true,
      label:
          '${shortDate(day.date)}: ${day.logged ? 'logged' : 'not logged'}${day.sample ? ', sample history' : ''}',
      child: Tooltip(
        message: shortDate(day.date),
        child: InkWell(
          key: ValueKey('history-${dateKey(day.date)}'),
          onTap: () => _dayDetails(context, day),
          borderRadius: BorderRadius.circular(4),
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Container(
              height: 13,
              decoration: BoxDecoration(
                color: color,
                borderRadius: BorderRadius.circular(4),
                border: today ? Border.all(color: Palette.flame) : null,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _checklistRow(BuildContext context, PlannedMeal meal, bool next) {
    final state = AppScope.of(context);
    final done = state.isLogged(meal);
    return Surface(
      padding: 10,
      borderColor: next ? Palette.primary.withValues(alpha: .3) : Palette.line,
      child: Row(
        children: [
          IconButton(
            key: ValueKey('check-${meal.slot.name}'),
            tooltip: done
                ? '${meal.slot.label} is logged'
                : 'Check off ${meal.slot.label.toLowerCase()}',
            onPressed: done
                ? () => toast(
                    context,
                    'Already logged. To undo, remove it from Today’s meal journal.',
                  )
                : () => _check(context, meal),
            icon: Icon(
              done ? Icons.check_circle : Icons.radio_button_unchecked,
              color: done
                  ? Palette.primary.withValues(alpha: .7)
                  : next
                  ? Palette.primary.withValues(alpha: .4)
                  : const Color(0xFFCBD5E1),
              size: 21,
            ),
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  meal.food.name,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: done ? FontWeight.w400 : FontWeight.w600,
                    color: done ? Palette.muted : Palette.ink,
                    decoration: done ? TextDecoration.lineThrough : null,
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  '${meal.slot.label} · ${meal.slot.time}',
                  style: TextStyle(
                    fontSize: 10,
                    color: next ? Palette.primary : Palette.muted,
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  '${count(meal.food.nutrients.calories)} kcal · ${amount(meal.food.nutrients.protein)}g P',
                  style: const TextStyle(fontSize: 10, color: Palette.muted),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          SizedBox(
            width: 80,
            child: Column(
              children: [
                Text(
                  done
                      ? 'Secured'
                      : next
                      ? 'Next in Streak'
                      : 'Pending',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 9,
                    color: done
                        ? Palette.primary
                        : next
                        ? Palette.flame
                        : Palette.muted,
                  ),
                ),
                if (!done) ...[
                  const SizedBox(height: 6),
                  if (next)
                    FilledButton(
                      onPressed: () => _check(context, meal),
                      style: FilledButton.styleFrom(
                        minimumSize: const Size(0, 38),
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                      ),
                      child: const Text(
                        'Check off',
                        style: TextStyle(fontSize: 10),
                      ),
                    )
                  else
                    OutlinedButton(
                      onPressed: () => _check(context, meal),
                      style: OutlinedButton.styleFrom(
                        minimumSize: const Size(0, 38),
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                      ),
                      child: const Text(
                        'Check off',
                        style: TextStyle(fontSize: 10),
                      ),
                    ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _milestoneCard({
    required String title,
    required String description,
    required int current,
    required int goal,
    required String tag,
    required Color color,
    required IconData icon,
  }) => Surface(
    padding: 14,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Wrap(
          spacing: 6,
          runSpacing: 6,
          alignment: WrapAlignment.spaceBetween,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            Icon(icon, size: 18, color: color),
            Badge(
              tag,
              color: color,
              background: color == Palette.flame
                  ? Palette.flameTint
                  : Palette.greenTint,
            ),
          ],
        ),
        const SizedBox(height: 12),
        Text(
          title,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            height: 1.6,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          description,
          style: const TextStyle(
            fontSize: 10,
            color: Palette.muted,
            height: 1.7,
          ),
        ),
        const SizedBox(height: 17),
        Text(
          '$current / $goal Days',
          style: TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w600,
            color: color,
          ),
        ),
        const SizedBox(height: 5),
        Text(
          current >= goal
              ? 'Milestone reached'
              : '${goal - current} days ${title == 'Plan Adherence Record' ? 'to match record' : 'left'}',
          style: const TextStyle(fontSize: 9, color: Palette.muted),
        ),
        const SizedBox(height: 8),
        ThinProgress(goal == 0 ? 1 : current / goal, color: color),
      ],
    ),
  );

  void _check(BuildContext context, PlannedMeal meal) {
    final state = AppScope.of(context);
    if (state.logPlanned(meal)) {
      toast(
        context,
        state.planSecuredToday
            ? 'All four meals logged. Today’s plan streak is secured!'
            : 'Meal secured. Keep your rhythm going.',
      );
    }
  }

  void _dayDetails(BuildContext context, ConsistencyDay day) {
    final state = AppScope.of(context);
    final logs = state.logsFor(day.date);
    showModalBottomSheet<void>(
      context: context,
      useSafeArea: true,
      isScrollControlled: true,
      builder: (context) => SafeArea(
        top: false,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(24, 0, 24, 28),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  shortDate(day.date),
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  day.sample
                      ? 'Sample history · ${day.logged ? 'Meals logged' : 'No meals logged'}'
                      : '${logs.length} food ${logs.length == 1 ? 'entry' : 'entries'} logged',
                  style: const TextStyle(fontSize: 12, color: Palette.muted),
                ),
                const SizedBox(height: 12),
                Text(
                  day.calorieOnTarget
                      ? '✓ Calorie target met'
                      : 'Calorie target not met yet',
                  style: const TextStyle(fontSize: 12),
                ),
                const SizedBox(height: 7),
                Text(
                  day.planComplete
                      ? '✓ Meal plan complete'
                      : 'Meal plan not complete',
                  style: const TextStyle(fontSize: 12),
                ),
                if (day.sample) ...[
                  const SizedBox(height: 14),
                  const Text(
                    'This is illustrative history, not a saved food journal.',
                    style: TextStyle(fontSize: 11, color: Palette.muted),
                  ),
                ],
                for (final log in logs)
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text(
                      log.food.name,
                      style: const TextStyle(fontSize: 12),
                    ),
                    subtitle: Text(
                      '${log.slot.label} · ${count(log.nutrients.calories)} kcal',
                      style: const TextStyle(fontSize: 11),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _protection(BuildContext context, AppState state) => showDialog<void>(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text(
        'A little breathing room',
        style: TextStyle(fontSize: 18),
      ),
      content: Text(
        'Your sample profile has ${state.freezes} streak ${state.freezes == 1 ? 'freeze' : 'freezes'} available.\n\nA freeze is designed to protect one missed day and regenerate after seven active days. Automatic use and regeneration are preview-only in this prototype.\n\nCompleting the checklist secures the meal-plan goal. The calorie goal is separate: net intake must be within ±50 kcal of your target.',
        style: const TextStyle(fontSize: 12, height: 1.7),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Got it'),
        ),
      ],
    ),
  );

  void _milestones(BuildContext context, AppState state) =>
      showModalBottomSheet<void>(
        context: context,
        isScrollControlled: true,
        useSafeArea: true,
        builder: (context) => SafeArea(
          top: false,
          child: SizedBox(
            height: MediaQuery.sizeOf(context).height * .7,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(24, 0, 24, 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Text(
                    'Consistency milestones',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 7),
                  const Text(
                    'Progress, not points. One day at a time.',
                    style: TextStyle(fontSize: 11, color: Palette.muted),
                  ),
                  const SizedBox(height: 14),
                  Expanded(
                    child: ListView(
                      children: [
                        for (final (label, current, goal, color)
                            in <(String, int, int, Color)>[
                              (
                                'One-Week Calorie Rhythm',
                                state.calorieStreak,
                                7,
                                Palette.flame,
                              ),
                              (
                                'Two-Week Calorie Rhythm',
                                state.calorieStreak,
                                14,
                                Palette.flame,
                              ),
                              (
                                '3-Week Calorie Master',
                                state.calorieStreak,
                                21,
                                Palette.flame,
                              ),
                              (
                                '30-Day Calorie Consistency',
                                state.calorieStreak,
                                30,
                                Palette.flame,
                              ),
                              (
                                'One-Week Plan Rhythm',
                                state.planStreak,
                                7,
                                Palette.primary,
                              ),
                              (
                                '14-Day Plan Badge',
                                state.planStreak,
                                14,
                                Palette.primary,
                              ),
                              (
                                'Plan Adherence Record',
                                state.planStreak,
                                state.planBest,
                                Palette.primary,
                              ),
                              (
                                '30-Day Planning Rhythm',
                                state.planStreak,
                                30,
                                Palette.primary,
                              ),
                            ])
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                SectionHeading(
                                  label,
                                  trailing: Badge(
                                    current >= goal
                                        ? 'Reached'
                                        : '$current/$goal',
                                    color: color,
                                    background: color == Palette.flame
                                        ? Palette.flameTint
                                        : Palette.greenTint,
                                  ),
                                ),
                                const SizedBox(height: 10),
                                ThinProgress(
                                  goal == 0 ? 1 : current / goal,
                                  color: color,
                                ),
                              ],
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
}
