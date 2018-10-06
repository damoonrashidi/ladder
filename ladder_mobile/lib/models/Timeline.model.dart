import 'package:cloud_firestore/cloud_firestore.dart';
import './game.model.dart';
import 'dart:async';

class Timeline {
  static Future<List<Game>> getFor({String name}) async {
    QuerySnapshot matches = await Firestore.instance
      .collection('games')
      .orderBy('timestamp', descending: true)
      .getDocuments();

    return matches.documents
    .where((dynamic player) => player['winner'] == name || player['loser'] == name)
    .map((game) => new Game(
      winner: game['winner'],
      loser: game['loser'],
      timestamp: game['timestamp'],
    )).toList();
  }
}