import 'package:flutter/material.dart';

import '../app_state.dart';
import '../models.dart';
import 'theme.dart';

class AppScope extends InheritedNotifier<AppState> {
  const AppScope({super.key, required AppState state, required super.child})
    : super(notifier: state);
  static AppState of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<AppScope>()!.notifier!;
}

class PageBody extends StatelessWidget {
  const PageBody({super.key, required this.children, this.padding = 20});
  final List<Widget> children;
  final double padding;
  @override
  Widget build(BuildContext context) => SingleChildScrollView(
    child: Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 560),
        child: Padding(
          padding: EdgeInsets.fromLTRB(padding, 12, padding, 28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: children,
          ),
        ),
      ),
    ),
  );
}

class Surface extends StatelessWidget {
  const Surface({
    super.key,
    required this.child,
    this.padding = 20,
    this.borderColor = Palette.line,
    this.color = Colors.white,
  });
  final Widget child;
  final double padding;
  final Color borderColor;
  final Color color;
  @override
  Widget build(BuildContext context) => Container(
    padding: EdgeInsets.all(padding),
    decoration: BoxDecoration(
      color: color,
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: borderColor),
      boxShadow: [
        BoxShadow(
          color: Palette.ink.withValues(alpha: .015),
          blurRadius: 16,
          offset: const Offset(0, 4),
        ),
      ],
    ),
    child: child,
  );
}

class Label extends StatelessWidget {
  const Label(this.text, {super.key});
  final String text;
  @override
  Widget build(BuildContext context) => Text(
    text.toUpperCase(),
    style: const TextStyle(
      fontSize: 10,
      fontWeight: FontWeight.w600,
      letterSpacing: 1,
      color: Palette.muted,
    ),
  );
}

class Badge extends StatelessWidget {
  const Badge(
    this.text, {
    super.key,
    this.color = Palette.primary,
    this.background = Palette.greenTint,
    this.icon,
  });
  final String text;
  final Color color;
  final Color background;
  final IconData? icon;
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
    decoration: BoxDecoration(
      color: background,
      borderRadius: BorderRadius.circular(30),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (icon != null) ...[
          Icon(icon, size: 13, color: color),
          const SizedBox(width: 4),
        ],
        Flexible(
          child: Text(
            text,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ),
      ],
    ),
  );
}

class SectionHeading extends StatelessWidget {
  const SectionHeading(this.title, {super.key, this.trailing, this.subtitle});
  final String title;
  final Widget? trailing;
  final String? subtitle;
  @override
  Widget build(BuildContext context) => Row(
    children: [
      Expanded(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
            ),
            if (subtitle != null) ...[
              const SizedBox(height: 3),
              Text(
                subtitle!,
                style: const TextStyle(fontSize: 11, color: Palette.muted),
              ),
            ],
          ],
        ),
      ),
      ?trailing,
    ],
  );
}

class ThinProgress extends StatelessWidget {
  const ThinProgress(
    this.value, {
    super.key,
    this.color = Palette.primary,
    this.height = 5,
  });
  final double value;
  final Color color;
  final double height;
  @override
  Widget build(BuildContext context) => ClipRRect(
    borderRadius: BorderRadius.circular(10),
    child: LinearProgressIndicator(
      value: value.clamp(0, 1),
      minHeight: height,
      backgroundColor: Palette.track,
      color: color,
    ),
  );
}

class MacroBars extends StatelessWidget {
  const MacroBars({
    super.key,
    required this.values,
    required this.targets,
    this.compact = false,
  });
  final Nutrients values;
  final Nutrients targets;
  final bool compact;
  @override
  Widget build(BuildContext context) {
    final data = <(String, double, double, Color)>[
      ('Protein', values.protein, targets.protein, Palette.emerald),
      ('Carbs', values.carbs, targets.carbs, Palette.carbs),
      ('Fats', values.fat, targets.fat, Palette.fat),
    ];
    if (compact) {
      return Row(
        children: [
          for (var i = 0; i < data.length; i++) ...[
            if (i > 0) const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    data[i].$1,
                    style: const TextStyle(fontSize: 10, color: Palette.muted),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    '${amount(data[i].$2)}g',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 7),
                  ThinProgress(
                    data[i].$2 / data[i].$3,
                    color: data[i].$4,
                    height: 4,
                  ),
                ],
              ),
            ),
          ],
        ],
      );
    }
    return Column(
      children: [
        for (var i = 0; i < data.length; i++) ...[
          if (i > 0) const SizedBox(height: 17),
          Row(
            children: [
              Expanded(
                child: Text(data[i].$1, style: const TextStyle(fontSize: 12)),
              ),
              Text(
                '${amount(data[i].$2)}g',
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
              Text(
                ' / ${amount(data[i].$3)}g',
                style: const TextStyle(fontSize: 11, color: Palette.muted),
              ),
              const SizedBox(width: 7),
              Text(
                '${(data[i].$2 / data[i].$3 * 100).round()}%',
                style: TextStyle(fontSize: 10, color: data[i].$4),
              ),
            ],
          ),
          const SizedBox(height: 7),
          ThinProgress(data[i].$2 / data[i].$3, color: data[i].$4),
        ],
      ],
    );
  }
}

class FoodGlyph extends StatelessWidget {
  const FoodGlyph(this.slot, {super.key, this.size = 48});
  final MealSlot slot;
  final double size;
  @override
  Widget build(BuildContext context) => Container(
    width: size,
    height: size,
    decoration: BoxDecoration(
      color: switch (slot) {
        MealSlot.breakfast => Palette.amberTint,
        MealSlot.lunch => Palette.greenTint,
        MealSlot.dinner => const Color(0xFFFFF7ED),
        MealSlot.snack => const Color(0xFFF0F4FF),
      },
      borderRadius: BorderRadius.circular(12),
    ),
    child: Icon(
      switch (slot) {
        MealSlot.breakfast => Icons.breakfast_dining_outlined,
        MealSlot.lunch => Icons.lunch_dining_outlined,
        MealSlot.dinner => Icons.dinner_dining_outlined,
        MealSlot.snack => Icons.local_cafe_outlined,
      },
      size: size * .48,
      color: switch (slot) {
        MealSlot.breakfast => Palette.amber,
        MealSlot.lunch => Palette.primary,
        MealSlot.dinner => Palette.fat,
        MealSlot.snack => Palette.muted,
      },
    ),
  );
}

void toast(BuildContext context, String message) {
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(
      SnackBar(
        content: Text(message, style: const TextStyle(fontSize: 12)),
        duration: const Duration(seconds: 3),
      ),
    );
}

Future<Food?> chooseFood(
  BuildContext context, {
  String title = 'Choose a meal',
}) => showModalBottomSheet<Food>(
  context: context,
  isScrollControlled: true,
  useSafeArea: true,
  builder: (_) => SafeArea(
    top: false,
    child: FoodPicker(state: AppScope.of(context), title: title),
  ),
);

class FoodPicker extends StatefulWidget {
  const FoodPicker({super.key, required this.state, required this.title});
  final AppState state;
  final String title;
  @override
  State<FoodPicker> createState() => _FoodPickerState();
}

class _FoodPickerState extends State<FoodPicker> {
  String query = '';
  @override
  Widget build(BuildContext context) {
    final foods = widget.state.foods
        .where((food) => food.name.toLowerCase().contains(query.toLowerCase()))
        .toList();
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(context).bottom),
      child: SizedBox(
        height: MediaQuery.sizeOf(context).height * .7,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
              child: Column(
                children: [
                  SectionHeading(
                    widget.title,
                    trailing: IconButton(
                      tooltip: 'Close',
                      onPressed: () => Navigator.pop(context),
                      icon: const Icon(Icons.close),
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    autofocus: false,
                    decoration: const InputDecoration(
                      hintText: 'Search mock foods…',
                      prefixIcon: Icon(Icons.search),
                    ),
                    onChanged: (value) => setState(() => query = value),
                  ),
                ],
              ),
            ),
            Expanded(
              child: foods.isEmpty
                  ? const Center(
                      child: Text(
                        'No matching foods',
                        style: TextStyle(color: Palette.muted),
                      ),
                    )
                  : ListView.separated(
                      itemCount: foods.length,
                      separatorBuilder: (_, _) => const Divider(),
                      itemBuilder: (context, index) => ListTile(
                        title: Text(
                          foods[index].name,
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        subtitle: Text(
                          '${count(foods[index].nutrients.calories)} kcal · ${amount(foods[index].nutrients.protein)}g protein',
                          style: const TextStyle(
                            fontSize: 11,
                            color: Palette.muted,
                          ),
                        ),
                        trailing: const Icon(
                          Icons.add_circle_outline,
                          color: Palette.primary,
                        ),
                        onTap: () => Navigator.pop(context, foods[index]),
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
