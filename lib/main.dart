import 'package:flutter/material.dart';

void main() => runApp(Water());

class Water extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Drink Water',
      home: SafeArea(
          child: Scaffold(
        appBar: AppBar(
          title: const Text("Drink Water"),
          backgroundColor: Colors.blue[900],
          centerTitle: true,
        ),
        drawer: const Drawer(),
        body: const Center(
          child: Text("Drink Water more!"),
        ),
      )),
    );
  }
}
