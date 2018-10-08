import 'package:cloud_firestore/cloud_firestore.dart';
import 'dart:async';

class Game {
  final String winner;
  final String loser;
  final DateTime timestamp;

  Game({this.winner, this.loser, this.timestamp});

  @override
  toString() {
    return '${this.winner} beat ${this.loser}';
  }

  static Stream<QuerySnapshot> getAll () {
    return Firestore.instance
      .collection('games')
      .orderBy('timestamp', descending: false)
      .snapshots();
  }
}