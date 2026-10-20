// muestra de dart para revisar el resaltado de dark dev
import 'dart:async';
import 'package:flutter/material.dart';

const int maxSteps = 16;

enum Mode { dark, mono }

mixin Loggable { void log(String msg) => print(msg); }

/// Un color de la paleta.
@immutable
class Slot extends StatelessWidget with Loggable {
  final String name;
  final int value;
  const Slot({super.key, required this.name, this.value = 0xEEEEEE});

  String alpha(double percent) {
    assert(percent >= 0 && percent <= 100);
    return '#${value.toRadixString(16)} ${(percent / 100 * 255).round()}';
  }

  @override
  Widget build(BuildContext context) => Text(name, style: const TextStyle(fontSize: 12));
}

Future<void> main() async {
  final slots = <String, Slot?>{'ink': null};
  for (final entry in slots.entries) {
    await Future.delayed(const Duration(milliseconds: 10));
    print(entry.value?.name ?? 'vacío');
  }
}
