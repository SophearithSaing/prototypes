import 'package:flutter/material.dart';

import '../models.dart';
import 'log_food.dart';
import 'theme.dart';
import 'widgets.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});
  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final form = GlobalKey<FormState>();
  final name = TextEditingController();
  final calories = TextEditingController();
  final protein = TextEditingController();
  final carbs = TextEditingController();
  final fat = TextEditingController();
  String preference = 'Balanced';
  bool loaded = false;
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!loaded) {
      final state = AppScope.of(context);
      name.text = state.name;
      calories.text = amount(state.targets.calories);
      protein.text = amount(state.targets.protein);
      carbs.text = amount(state.targets.carbs);
      fat.text = amount(state.targets.fat);
      preference = state.dietaryPreference;
      loaded = true;
    }
  }

  @override
  void dispose() {
    for (final controller in [name, calories, protein, carbs, fat]) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    return PageBody(
      children: [
        const Text(
          'Your mindful routine',
          style: TextStyle(
            fontSize: 25,
            fontWeight: FontWeight.w600,
            letterSpacing: -.8,
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'Personal goals, at your own pace.',
          style: TextStyle(fontSize: 12, color: Palette.muted),
        ),
        const SizedBox(height: 24),
        Surface(
          child: Row(
            children: [
              const CircleAvatar(
                radius: 27,
                backgroundColor: Palette.greenTint,
                child: Icon(
                  Icons.spa_outlined,
                  color: Palette.primary,
                  size: 26,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      state.name,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      '${state.planStreak}-day meal planning rhythm',
                      style: const TextStyle(
                        fontSize: 11,
                        color: Palette.muted,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 28),
        Form(
          key: form,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SectionHeading('Personal details'),
              const SizedBox(height: 14),
              TextFormField(
                key: const ValueKey('profile-name'),
                controller: name,
                decoration: const InputDecoration(labelText: 'Your name'),
                textCapitalization: TextCapitalization.words,
                validator: (value) => value == null || value.trim().isEmpty
                    ? 'Enter your name'
                    : null,
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                initialValue: preference,
                isExpanded: true,
                decoration: const InputDecoration(
                  labelText: 'Dietary preference',
                ),
                items: ['Balanced', 'Vegetarian', 'Vegan', 'High protein']
                    .map(
                      (value) => DropdownMenuItem(
                        value: value,
                        child: Text(
                          value,
                          style: const TextStyle(fontSize: 13),
                        ),
                      ),
                    )
                    .toList(),
                onChanged: (value) => setState(() => preference = value!),
              ),
              const SizedBox(height: 8),
              const Text(
                'Preference is saved for your profile; sample meal suggestions are not diet-filtered yet.',
                style: TextStyle(
                  fontSize: 10,
                  color: Palette.muted,
                  height: 1.6,
                ),
              ),
              const SizedBox(height: 28),
              const SectionHeading('Daily nutrition targets'),
              const SizedBox(height: 14),
              NutritionInput(
                label: 'Calorie goal (kcal)',
                controller: calories,
                positive: true,
                fieldKey: 'profile-calories',
              ),
              const SizedBox(height: 16),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: NutritionInput(
                      label: 'Protein (g)',
                      controller: protein,
                      positive: true,
                      fieldKey: 'profile-protein',
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: NutritionInput(
                      label: 'Carbs (g)',
                      controller: carbs,
                      positive: true,
                      fieldKey: 'profile-carbs',
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: NutritionInput(
                      label: 'Fat (g)',
                      controller: fat,
                      positive: true,
                      fieldKey: 'profile-fat',
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 22),
              FilledButton.icon(
                key: const ValueKey('save-profile'),
                onPressed: () {
                  if (!form.currentState!.validate()) return;
                  state.updateProfile(
                    userName: name.text,
                    goals: Nutrients(
                      double.parse(calories.text),
                      double.parse(protein.text),
                      double.parse(carbs.text),
                      double.parse(fat.text),
                    ),
                    preference: preference,
                  );
                  FocusManager.instance.primaryFocus?.unfocus();
                  toast(
                    context,
                    'Profile saved. Your dashboard and plan targets are updated.',
                  );
                },
                icon: const Icon(Icons.check, size: 18),
                label: const Text('Save Changes'),
              ),
            ],
          ),
        ),
        const SizedBox(height: 28),
        const Surface(
          padding: 16,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(Icons.phone_android_outlined, color: Palette.primary),
              SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'On this device, just for you',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: 6),
                    Text(
                      'Your journal, plans, recipes, and preferences are saved locally. No account or internet connection needed.',
                      style: TextStyle(
                        fontSize: 11,
                        color: Palette.muted,
                        height: 1.7,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        TextButton(
          onPressed: () => showAboutDialog(
            context: context,
            applicationName: 'NutriPulse',
            applicationVersion: '1.0 · Android prototype',
            applicationIcon: const Icon(
              Icons.spa_outlined,
              size: 36,
              color: Palette.primary,
            ),
            children: [
              const Text(
                'Mindful meal planning, one small step at a time.\n\nFood nutrition and historical progress are mock data, not medical advice.',
                style: TextStyle(fontSize: 12, height: 1.7),
              ),
            ],
          ),
          child: const Text('About NutriPulse'),
        ),
      ],
    );
  }
}
