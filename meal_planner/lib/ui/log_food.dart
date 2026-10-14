import 'package:flutter/material.dart' hide Badge;
import 'package:flutter/services.dart';

import '../models.dart';
import 'theme.dart';
import 'widgets.dart';

class LogFoodScreen extends StatefulWidget {
  const LogFoodScreen({
    super.key,
    required this.slot,
    required this.onSlotChanged,
    required this.onClose,
    required this.onLogged,
    this.keyboardOpen = false,
  });
  final MealSlot slot;
  final ValueChanged<MealSlot> onSlotChanged;
  final VoidCallback onClose;
  final VoidCallback onLogged;
  final bool keyboardOpen;
  @override
  State<LogFoodScreen> createState() => _LogFoodScreenState();
}

class _LogFoodScreenState extends State<LogFoodScreen> {
  final search = TextEditingController();
  int mode = 0;
  String filter = 'Verified';
  Food? selected = mockFoods[4];
  double multiplier = 1.5;
  @override
  void dispose() {
    search.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final foods =
        state.foods.where((food) {
          final matches = food.name.toLowerCase().contains(
            search.text.toLowerCase(),
          );
          return matches &&
              switch (filter) {
                'Recent' => state.recentIds.contains(food.id),
                'Favorites' => state.favorites.contains(food.id),
                'Custom Foods' => food.custom,
                _ => food.verified,
              };
        }).toList()..sort((a, b) {
          if (filter == 'Recent') {
            return state.recentIds
                .indexOf(a.id)
                .compareTo(state.recentIds.indexOf(b.id));
          }
          const first = ['chicken', 'toast'];
          final ai = first.indexOf(a.id), bi = first.indexOf(b.id);
          return (ai == -1 ? 2 : ai).compareTo(bi == -1 ? 2 : bi);
        });
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 560),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 10, 16, 14),
              child: Row(
                children: [
                  IconButton(
                    tooltip: 'Back to today',
                    onPressed: widget.onClose,
                    icon: const Icon(Icons.arrow_back, size: 20),
                  ),
                  const SizedBox(width: 4),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Log Food',
                          style: TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          '●  Multi-Mode Entry',
                          style: TextStyle(
                            fontSize: 10,
                            color: Palette.primary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  PopupMenuButton<MealSlot>(
                    tooltip: 'Select meal slot',
                    onSelected: widget.onSlotChanged,
                    itemBuilder: (_) => MealSlot.values
                        .map(
                          (slot) => PopupMenuItem(
                            value: slot,
                            child: Text(
                              slot.label,
                              style: const TextStyle(fontSize: 13),
                            ),
                          ),
                        )
                        .toList(),
                    child: Badge(
                      widget.slot.label,
                      icon: Icons.restaurant_outlined,
                      background: Palette.track,
                      color: Palette.ink,
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(20, 4, 20, 24),
                children: [
                  if (mode == 0) ...[
                    TextField(
                      key: const ValueKey('food-search'),
                      controller: search,
                      style: const TextStyle(fontSize: 13),
                      decoration: InputDecoration(
                        hintText: 'Search food, brand, restaurant…',
                        prefixIcon: const Icon(Icons.search, size: 20),
                        suffixIcon: search.text.isEmpty
                            ? null
                            : IconButton(
                                tooltip: 'Clear search',
                                onPressed: () => setState(() {
                                  search.clear();
                                  selected = null;
                                }),
                                icon: const Icon(Icons.close, size: 18),
                              ),
                      ),
                      onChanged: (_) => setState(() => selected = null),
                    ),
                    const SizedBox(height: 20),
                  ],
                  Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: const Color(0xFFEAF0F5),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        for (var index = 0; index < 3; index++)
                          Expanded(
                            child: InkWell(
                              key: ValueKey('log-mode-$index'),
                              onTap: () => setState(() {
                                mode = index;
                              }),
                              borderRadius: BorderRadius.circular(9),
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 12,
                                ),
                                decoration: BoxDecoration(
                                  color: mode == index
                                      ? Colors.white
                                      : Colors.transparent,
                                  borderRadius: BorderRadius.circular(9),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      [
                                        Icons.manage_search,
                                        Icons.bolt_outlined,
                                        Icons.edit_note,
                                      ][index],
                                      size: 16,
                                      color: mode == index
                                          ? Palette.primary
                                          : Palette.muted,
                                    ),
                                    const SizedBox(width: 4),
                                    Flexible(
                                      child: Text(
                                        [
                                          'Search',
                                          'Quick Add',
                                          'Recipe',
                                        ][index],
                                        style: TextStyle(
                                          fontSize: 11,
                                          fontWeight: FontWeight.w500,
                                          color: mode == index
                                              ? Palette.ink
                                              : Palette.muted,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 22),
                  if (mode == 0) ...[
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          for (final (label, icon) in <(String, IconData)>[
                            ('Recent', Icons.schedule),
                            ('Favorites', Icons.favorite_outline),
                            ('Verified', Icons.verified_outlined),
                            ('Custom Foods', Icons.menu_book_outlined),
                          ])
                            Padding(
                              padding: const EdgeInsets.only(right: 7),
                              child: InkWell(
                                key: ValueKey('filter-$label'),
                                borderRadius: BorderRadius.circular(30),
                                onTap: () => setState(() {
                                  filter = label;
                                  selected = null;
                                }),
                                child: Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 12,
                                    vertical: 9,
                                  ),
                                  decoration: BoxDecoration(
                                    color: filter == label
                                        ? Palette.greenTint
                                        : Colors.white,
                                    borderRadius: BorderRadius.circular(30),
                                    border: Border.all(
                                      color: filter == label
                                          ? const Color(0xFFA7F3D0)
                                          : Palette.line,
                                    ),
                                  ),
                                  child: Row(
                                    children: [
                                      Icon(
                                        icon,
                                        size: 13,
                                        color: filter == label
                                            ? Palette.primary
                                            : Palette.muted,
                                      ),
                                      const SizedBox(width: 5),
                                      Text(
                                        label,
                                        style: TextStyle(
                                          fontSize: 10,
                                          color: filter == label
                                              ? Palette.primary
                                              : Palette.muted,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    Row(
                      children: [
                        Expanded(child: Label('$filter results')),
                        const Text(
                          'Tap to adjust portion',
                          style: TextStyle(fontSize: 9, color: Palette.muted),
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    if (foods.isEmpty)
                      Surface(
                        child: Column(
                          children: [
                            const Icon(Icons.search_off, size: 28),
                            const SizedBox(height: 12),
                            const Text(
                              'No matching foods',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            const SizedBox(height: 8),
                            const Text(
                              'Try another search, or add your own nutrition values.',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 11,
                                color: Palette.muted,
                              ),
                            ),
                            TextButton(
                              onPressed: () => setState(() => mode = 1),
                              child: const Text('Use Quick Add'),
                            ),
                          ],
                        ),
                      ),
                    if (foods.isNotEmpty)
                      Surface(
                        padding: 0,
                        child: Column(
                          children: [
                            for (var i = 0; i < foods.length; i++) ...[
                              if (i > 0) const Divider(),
                              _foodRow(foods[i]),
                            ],
                          ],
                        ),
                      ),
                    const SizedBox(height: 20),
                    const Text(
                      'Sample food library · no live database connected',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 10, color: Palette.muted),
                    ),
                  ],
                  if (mode == 1)
                    QuickEntryForm(slot: widget.slot, onSaved: _didLog),
                  if (mode == 2)
                    RecipeForm(slot: widget.slot, onSaved: _didLog),
                ],
              ),
            ),
            if (mode == 0 && selected != null && !widget.keyboardOpen)
              _portion(),
          ],
        ),
      ),
    );
  }

  Widget _foodRow(Food food) {
    final state = AppScope.of(context);
    final active = selected?.id == food.id;
    return InkWell(
      key: ValueKey('food-${food.id}'),
      onTap: () {
        FocusManager.instance.primaryFocus?.unfocus();
        setState(() {
          selected = food;
          multiplier = 1;
        });
      },
      child: Container(
        color: active
            ? Palette.greenTint.withValues(alpha: .3)
            : Colors.transparent,
        padding: const EdgeInsets.fromLTRB(14, 16, 8, 16),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Flexible(
                        child: Text(
                          food.name,
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      if (food.verified) ...[
                        const SizedBox(width: 5),
                        const Icon(
                          Icons.verified,
                          size: 14,
                          color: Palette.primary,
                        ),
                      ],
                    ],
                  ),
                  const SizedBox(height: 7),
                  Text(
                    '${count(food.nutrients.calories)} kcal / ${food.unit}',
                    style: const TextStyle(fontSize: 11, color: Palette.muted),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 4,
                    runSpacing: 5,
                    children: [
                      Badge('${amount(food.nutrients.protein)}g Protein'),
                      Badge(
                        '${amount(food.nutrients.carbs)}g Carbs',
                        color: Palette.muted,
                        background: Palette.track,
                      ),
                      Badge(
                        '${amount(food.nutrients.fat)}g Fats',
                        color: Palette.muted,
                        background: Palette.track,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 5),
            Column(
              children: [
                IconButton(
                  tooltip: active ? 'Selected food' : 'Select food',
                  icon: Icon(
                    active ? Icons.check_circle : Icons.add_circle_outline,
                    color: Palette.primary,
                    size: 25,
                  ),
                  onPressed: () => setState(() {
                    selected = food;
                    multiplier = 1;
                  }),
                ),
                IconButton(
                  tooltip: state.favorites.contains(food.id)
                      ? 'Remove favorite'
                      : 'Save favorite',
                  constraints: const BoxConstraints(
                    minWidth: 40,
                    minHeight: 36,
                  ),
                  onPressed: () => state.toggleFavorite(food),
                  icon: Icon(
                    state.favorites.contains(food.id)
                        ? Icons.favorite
                        : Icons.favorite_outline,
                    color: state.favorites.contains(food.id)
                        ? Palette.amber
                        : Palette.muted,
                    size: 16,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _portion() {
    final food = selected!;
    final nutrients = food.nutrients.scaled(multiplier);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
      child: Surface(
        padding: 16,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                const Icon(Icons.circle, size: 7, color: Palette.primary),
                const SizedBox(width: 7),
                Expanded(
                  child: Text(
                    food.name,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                IconButton(
                  tooltip: 'Close portion drawer',
                  visualDensity: VisualDensity.compact,
                  onPressed: () => setState(() => selected = null),
                  icon: const Icon(Icons.close, size: 17),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Row(
              children: [
                StepperControl(
                  value: multiplier,
                  minimum: .25,
                  maximum: 20,
                  step: .25,
                  onChanged: (value) => setState(() => multiplier = value),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    food.grams > 0
                        ? '${amount(food.grams * multiplier)} g'
                        : '${amount(multiplier)} servings',
                    style: const TextStyle(fontSize: 11, color: Palette.muted),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                for (final (name, value, color) in <(String, double, Color)>[
                  ('Protein', nutrients.protein, Palette.primary),
                  ('Carbs', nutrients.carbs, Palette.muted),
                  ('Fats', nutrients.fat, Palette.muted),
                ])
                  Expanded(
                    child: Column(
                      children: [
                        Text(
                          name.toUpperCase(),
                          style: const TextStyle(
                            fontSize: 9,
                            color: Palette.muted,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          '${amount(value)}g',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: color,
                          ),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 15),
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                key: const ValueKey('confirm-food'),
                onPressed: () {
                  AppScope.of(context).logFood(food, widget.slot, multiplier);
                  _didLog(food);
                },
                icon: const Icon(Icons.check, size: 18),
                label: Text(
                  'Add to ${widget.slot.label} · ${count(nutrients.calories)} kcal',
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _didLog(Food food) {
    FocusManager.instance.primaryFocus?.unfocus();
    setState(() {
      selected = null;
      search.clear();
    });
    widget.onLogged();
    toast(context, '${food.name} added to ${widget.slot.label.toLowerCase()}.');
  }
}

class StepperControl extends StatelessWidget {
  const StepperControl({
    super.key,
    required this.value,
    required this.onChanged,
    this.minimum = .25,
    this.maximum = 20,
    this.step = .25,
  });
  final double value;
  final ValueChanged<double> onChanged;
  final double minimum;
  final double maximum;
  final double step;
  @override
  Widget build(BuildContext context) => Container(
    decoration: BoxDecoration(
      color: Palette.track,
      borderRadius: BorderRadius.circular(10),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        IconButton(
          tooltip: 'Decrease servings',
          onPressed: value <= minimum
              ? null
              : () => onChanged((value - step).clamp(minimum, maximum)),
          icon: const Icon(Icons.remove, size: 17),
          constraints: const BoxConstraints(minWidth: 40, minHeight: 42),
        ),
        TextButton(
          onPressed: () async {
            final entered = await showDialog<double>(
              context: context,
              builder: (_) => NumberEntryDialog(
                title: 'Serving multiplier',
                initial: value,
                minimum: minimum,
                maximum: maximum,
              ),
            );
            if (entered != null) onChanged(entered);
          },
          style: TextButton.styleFrom(
            minimumSize: const Size(48, 42),
            padding: const EdgeInsets.symmetric(horizontal: 4),
          ),
          child: Text(
            '${amount(value)}x',
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: Palette.ink,
            ),
          ),
        ),
        IconButton(
          tooltip: 'Increase servings',
          onPressed: value >= maximum
              ? null
              : () => onChanged((value + step).clamp(minimum, maximum)),
          icon: const Icon(Icons.add, size: 17),
          constraints: const BoxConstraints(minWidth: 40, minHeight: 42),
        ),
      ],
    ),
  );
}

class NumberEntryDialog extends StatefulWidget {
  const NumberEntryDialog({
    super.key,
    required this.title,
    required this.initial,
    required this.minimum,
    required this.maximum,
  });
  final String title;
  final double initial;
  final double minimum;
  final double maximum;
  @override
  State<NumberEntryDialog> createState() => _NumberEntryDialogState();
}

class _NumberEntryDialogState extends State<NumberEntryDialog> {
  late final controller = TextEditingController(text: amount(widget.initial));
  final form = GlobalKey<FormState>();
  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => AlertDialog(
    title: Text(widget.title, style: const TextStyle(fontSize: 18)),
    content: Form(
      key: form,
      child: TextFormField(
        autofocus: true,
        controller: controller,
        keyboardType: const TextInputType.numberWithOptions(decimal: true),
        decoration: InputDecoration(
          labelText: '${amount(widget.minimum)}–${amount(widget.maximum)}',
        ),
        validator: (value) {
          final number = double.tryParse(value ?? '');
          return number == null ||
                  !number.isFinite ||
                  number < widget.minimum ||
                  number > widget.maximum
              ? 'Enter a value in the allowed range'
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
          if (form.currentState!.validate()) {
            Navigator.pop(context, double.parse(controller.text));
          }
        },
        child: const Text('Save'),
      ),
    ],
  );
}

class QuickEntryForm extends StatefulWidget {
  const QuickEntryForm({super.key, required this.slot, required this.onSaved});
  final MealSlot slot;
  final ValueChanged<Food> onSaved;
  @override
  State<QuickEntryForm> createState() => _QuickEntryFormState();
}

class _QuickEntryFormState extends State<QuickEntryForm> {
  final form = GlobalKey<FormState>();
  final name = TextEditingController();
  final calories = TextEditingController();
  final protein = TextEditingController(text: '0');
  final carbs = TextEditingController(text: '0');
  final fat = TextEditingController(text: '0');
  @override
  void dispose() {
    for (final controller in [name, calories, protein, carbs, fat]) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Form(
    key: form,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Text(
          'Quick add, keep moving.',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w600,
            letterSpacing: -.5,
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'Eating out or reading a label? Enter the values for what you ate. No searching needed.',
          style: TextStyle(fontSize: 12, color: Palette.muted, height: 1.7),
        ),
        const SizedBox(height: 24),
        TextFormField(
          key: const ValueKey('quick-name'),
          controller: name,
          textCapitalization: TextCapitalization.sentences,
          decoration: const InputDecoration(labelText: 'Food or meal name'),
          validator: (value) => value == null || value.trim().isEmpty
              ? 'Give this entry a name'
              : null,
        ),
        const SizedBox(height: 16),
        NutritionInput(
          label: 'Calories (kcal)',
          controller: calories,
          positive: true,
          fieldKey: 'quick-calories',
        ),
        const SizedBox(height: 16),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: NutritionInput(
                label: 'Protein (g)',
                controller: protein,
                fieldKey: 'quick-protein',
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: NutritionInput(
                label: 'Carbs (g)',
                controller: carbs,
                fieldKey: 'quick-carbs',
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: NutritionInput(
                label: 'Fat (g)',
                controller: fat,
                fieldKey: 'quick-fat',
              ),
            ),
          ],
        ),
        const SizedBox(height: 24),
        FilledButton.icon(
          key: const ValueKey('save-quick'),
          onPressed: () {
            if (!form.currentState!.validate()) return;
            final state = AppScope.of(context);
            final food = state.createFood(
              name.text,
              Nutrients(
                double.parse(calories.text),
                double.parse(protein.text),
                double.parse(carbs.text),
                double.parse(fat.text),
              ),
            );
            state.logFood(food, widget.slot, 1);
            widget.onSaved(food);
            name.clear();
            calories.clear();
            protein.text = '0';
            carbs.text = '0';
            fat.text = '0';
          },
          icon: const Icon(Icons.bolt, size: 18),
          label: Text('Save & Log to ${widget.slot.label}'),
        ),
        const SizedBox(height: 14),
        const Text(
          'Saved to Custom Foods for next time.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 10, color: Palette.muted),
        ),
      ],
    ),
  );
}

class NutritionInput extends StatelessWidget {
  const NutritionInput({
    super.key,
    required this.label,
    required this.controller,
    this.positive = false,
    this.fieldKey,
  });
  final String label;
  final TextEditingController controller;
  final bool positive;
  final String? fieldKey;
  @override
  Widget build(BuildContext context) => TextFormField(
    key: fieldKey == null ? null : ValueKey<String>(fieldKey!),
    controller: controller,
    keyboardType: const TextInputType.numberWithOptions(decimal: true),
    inputFormatters: [FilteringTextInputFormatter.allow(RegExp(r'[0-9.]'))],
    decoration: InputDecoration(labelText: label),
    style: const TextStyle(fontSize: 13),
    validator: (value) {
      final number = double.tryParse(value ?? '');
      return number == null ||
              !number.isFinite ||
              number < 0 ||
              (positive && number == 0) ||
              number > 10000
          ? 'Invalid value'
          : null;
    },
  );
}

class RecipeForm extends StatefulWidget {
  const RecipeForm({super.key, required this.slot, required this.onSaved});
  final MealSlot slot;
  final ValueChanged<Food> onSaved;
  @override
  State<RecipeForm> createState() => _RecipeFormState();
}

class _RecipeFormState extends State<RecipeForm> {
  final name = TextEditingController();
  final form = GlobalKey<FormState>();
  final List<(Food, double)> ingredients = [];
  double servings = 2;
  @override
  void dispose() {
    name.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final total = ingredients.fold(
      Nutrients.zero,
      (sum, item) => sum + item.$1.nutrients.scaled(item.$2),
    );
    final perServing = total.scaled(1 / servings);
    return Form(
      key: form,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            'Make it your own.',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              letterSpacing: -.5,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Combine ingredients into a reusable recipe. Nutrition is calculated per serving.',
            style: TextStyle(fontSize: 12, color: Palette.muted, height: 1.7),
          ),
          const SizedBox(height: 24),
          TextFormField(
            key: const ValueKey('recipe-name'),
            controller: name,
            decoration: const InputDecoration(labelText: 'Recipe name'),
            validator: (value) => value == null || value.trim().isEmpty
                ? 'Name your recipe'
                : null,
          ),
          const SizedBox(height: 20),
          const SectionHeading('Ingredients'),
          const SizedBox(height: 12),
          for (var i = 0; i < ingredients.length; i++) ...[
            Surface(
              padding: 12,
              child: Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          ingredients[i].$1.name,
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                      IconButton(
                        tooltip: 'Remove ingredient',
                        onPressed: () =>
                            setState(() => ingredients.removeAt(i)),
                        icon: const Icon(Icons.close, size: 18),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      StepperControl(
                        value: ingredients[i].$2,
                        onChanged: (value) => setState(
                          () => ingredients[i] = (ingredients[i].$1, value),
                        ),
                      ),
                      const Spacer(),
                      Text(
                        '${count(ingredients[i].$1.nutrients.calories * ingredients[i].$2)} kcal',
                        style: const TextStyle(
                          fontSize: 11,
                          color: Palette.muted,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
          ],
          OutlinedButton.icon(
            key: const ValueKey('add-ingredient'),
            onPressed: () async {
              final food = await chooseFood(
                context,
                title: 'Add an ingredient',
              );
              if (food != null && mounted) {
                setState(() => ingredients.add((food, 1)));
              }
            },
            icon: const Icon(Icons.add, size: 18),
            label: const Text('Add Ingredient'),
          ),
          const SizedBox(height: 20),
          Wrap(
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            runSpacing: 12,
            children: [
              const Text('Recipe makes', style: TextStyle(fontSize: 12)),
              StepperControl(
                value: servings,
                minimum: 1,
                maximum: 20,
                step: 1,
                onChanged: (value) => setState(() => servings = value),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Surface(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Label('Per serving'),
                const SizedBox(height: 12),
                Text(
                  '${count(perServing.calories)} kcal',
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 14),
                MacroBars(
                  values: perServing,
                  targets: AppScope.of(context).targets,
                  compact: true,
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          FilledButton.icon(
            key: const ValueKey('save-recipe'),
            onPressed: () {
              if (!form.currentState!.validate()) return;
              if (ingredients.isEmpty || total.calories <= 0) {
                toast(context, 'Add at least one ingredient first.');
                return;
              }
              final state = AppScope.of(context);
              final food = state.createFood(
                name.text,
                perServing,
                recipe: true,
              );
              state.logFood(food, widget.slot, 1);
              widget.onSaved(food);
              setState(() {
                ingredients.clear();
                name.clear();
                servings = 2;
              });
            },
            icon: const Icon(Icons.check, size: 18),
            label: Text('Save Recipe & Log 1 Serving to ${widget.slot.label}'),
          ),
        ],
      ),
    );
  }
}
