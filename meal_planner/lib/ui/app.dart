import 'dart:async';

import 'package:flutter/material.dart' hide Badge;

import '../app_state.dart';
import '../models.dart';
import 'dashboard.dart';
import 'log_food.dart';
import 'planner.dart';
import 'profile.dart';
import 'streaks.dart';
import 'theme.dart';
import 'widgets.dart';

class MyApp extends StatefulWidget {
  const MyApp({super.key, this.state});
  final AppState? state;
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with WidgetsBindingObserver {
  late final AppState state = widget.state ?? AppState();
  Timer? dayTimer;
  @override
  void initState() {
    super.initState();
    if (state.tracksSystemDate) {
      WidgetsBinding.instance.addObserver(this);
      dayTimer = Timer.periodic(
        const Duration(minutes: 1),
        (_) => state.refreshDay(),
      );
    }
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState lifecycle) {
    if (lifecycle == AppLifecycleState.resumed) state.refreshDay();
  }

  @override
  void dispose() {
    dayTimer?.cancel();
    WidgetsBinding.instance.removeObserver(this);
    if (widget.state == null) state.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => AppScope(
    state: state,
    child: MaterialApp(
      title: 'NutriPulse',
      debugShowCheckedModeBanner: false,
      theme: appTheme(),
      home: const AppShell(),
    ),
  );
}

class AppShell extends StatefulWidget {
  const AppShell({super.key});
  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int tab = 0;
  MealSlot logSlot = MealSlot.lunch;
  void openLog([MealSlot slot = MealSlot.lunch]) {
    ScaffoldMessenger.of(context).removeCurrentSnackBar();
    setState(() {
      logSlot = slot;
      tab = 2;
    });
  }

  void selectTab(int index) {
    ScaffoldMessenger.of(context).removeCurrentSnackBar();
    FocusManager.instance.primaryFocus?.unfocus();
    setState(() => tab = index);
  }

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final keyboardOpen = MediaQuery.viewInsetsOf(context).bottom > 0;
    return PopScope(
      canPop: tab == 0,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop) selectTab(0);
      },
      child: Scaffold(
        body: SafeArea(
          bottom: false,
          child: Column(
            children: [
              if (tab != 2) _header(state),
              if (state.storageMessage != null)
                Container(
                  width: double.infinity,
                  color: Palette.amberTint,
                  padding: const EdgeInsets.all(10),
                  child: Text(
                    state.storageMessage!,
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 11, color: Palette.fat),
                  ),
                ),
              Expanded(
                child: IndexedStack(
                  index: tab,
                  children: [
                    DashboardScreen(onLog: openLog),
                    PlannerScreen(onStreaks: () => selectTab(3)),
                    LogFoodScreen(
                      keyboardOpen: keyboardOpen,
                      slot: logSlot,
                      onSlotChanged: (slot) => setState(() => logSlot = slot),
                      onClose: () => selectTab(0),
                      onLogged: () => selectTab(0),
                    ),
                    const StreaksScreen(),
                    const ProfileScreen(),
                  ],
                ),
              ),
            ],
          ),
        ),
        bottomNavigationBar: keyboardOpen
            ? null
            : Container(
                decoration: const BoxDecoration(
                  color: Colors.white,
                  border: Border(top: BorderSide(color: Palette.line)),
                ),
                child: SafeArea(
                  top: false,
                  child: Center(
                    heightFactor: 1,
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 560),
                      child: SizedBox(
                        height: 66,
                        child: Row(
                          children: [
                            for (var index = 0; index < 5; index++)
                              Expanded(
                                child: Semantics(
                                  selected: index == tab,
                                  button: true,
                                  child: InkWell(
                                    key: ValueKey('nav-$index'),
                                    onTap: () => selectTab(index),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Container(
                                          width: 30,
                                          height: 28,
                                          decoration: index == 2 && tab == 2
                                              ? const BoxDecoration(
                                                  color: Palette.primary,
                                                  shape: BoxShape.circle,
                                                )
                                              : null,
                                          child: Icon(
                                            [
                                              tab == 0
                                                  ? Icons.grid_view_rounded
                                                  : Icons.grid_view_outlined,
                                              Icons.calendar_today_outlined,
                                              Icons.add_circle_outline,
                                              tab == 3
                                                  ? Icons.local_fire_department
                                                  : Icons
                                                        .local_fire_department_outlined,
                                              Icons.person_outline,
                                            ][index],
                                            size: index == 2 ? 24 : 21,
                                            color: index == 2 && tab == 2
                                                ? Colors.white
                                                : index == tab
                                                ? Palette.primary
                                                : Palette.muted,
                                          ),
                                        ),
                                        const SizedBox(height: 3),
                                        Text(
                                          [
                                            'Today',
                                            'Plan',
                                            'Log',
                                            'Streaks',
                                            'Profile',
                                          ][index],
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                          style: TextStyle(
                                            fontSize: 10,
                                            fontWeight: index == tab
                                                ? FontWeight.w600
                                                : FontWeight.w400,
                                            color: index == tab
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
                    ),
                  ),
                ),
              ),
      ),
    );
  }

  Widget _header(AppState state) => Center(
    child: ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 560),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        child: Row(
          children: [
            Semantics(
              label: 'Open profile',
              button: true,
              child: InkWell(
                borderRadius: BorderRadius.circular(30),
                onTap: () => selectTab(4),
                child: CircleAvatar(
                  radius: 20,
                  backgroundColor: const Color(0xFFE6F4EE),
                  child: Text(
                    state.name
                        .trim()
                        .split(RegExp(r'\s+'))
                        .take(2)
                        .map((part) => part[0])
                        .join()
                        .toUpperCase(),
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: Palette.primary,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    tab == 0
                        ? '${_greeting()}, ${state.name.split(' ').first}'
                        : 'NutriPulse',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      letterSpacing: -.4,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    tab == 0
                        ? shortDate(state.today)
                        : [
                            'Today',
                            'Weekly Meal Plan',
                            '',
                            'Habits & Streaks',
                            'Your mindful routine',
                          ][tab],
                    style: const TextStyle(fontSize: 11, color: Palette.muted),
                  ),
                ],
              ),
            ),
            InkWell(
              onTap: () => selectTab(3),
              borderRadius: BorderRadius.circular(30),
              child: Badge(
                tab == 3
                    ? '${state.calorieStreak} Day Streak'
                    : '${state.calorieStreak} d',
                color: tab == 3 ? Palette.flame : Palette.fat,
                background: tab == 3 ? Palette.flameTint : Palette.amberTint,
                icon: Icons.local_fire_department_outlined,
              ),
            ),
          ],
        ),
      ),
    ),
  );

  String _greeting() => DateTime.now().hour < 12
      ? 'Good morning'
      : DateTime.now().hour < 18
      ? 'Good afternoon'
      : 'Good evening';
}
