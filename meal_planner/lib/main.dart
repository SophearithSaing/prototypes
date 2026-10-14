import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'app_state.dart';
import 'ui/app.dart';

export 'ui/app.dart' show MyApp;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      systemNavigationBarColor: Colors.white,
      systemNavigationBarIconBrightness: Brightness.dark,
    ),
  );
  AppState state;
  try {
    final preferences = await SharedPreferences.getInstance();
    state = AppState(
      savedData: preferences.getString('nutripulse.v1'),
      saveData: (data) async {
        if (!await preferences.setString('nutripulse.v1', data)) {
          throw StateError('Device storage write failed');
        }
      },
    );
    state.persist();
  } catch (_) {
    state = AppState()..storageMessage = 'Device storage is unavailable. Changes will last for this session only.';
  }
  runApp(MyApp(state: state));
}
