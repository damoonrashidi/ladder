import 'package:flutter/material.dart';
import '../models/person.model.dart';
import './person.widget.dart';
import './game.widget.dart';
import './title.widget.dart';
import '../models/game.model.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'dart:async';

class HomeWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new HomeWidgetState();
}

class HomeWidgetState extends State<HomeWidget> {

  final GoogleSignIn _googleSignIn = GoogleSignIn();
  final FirebaseAuth _auth = FirebaseAuth.instance;

  FirebaseUser user;
  List<Person> people = [];
  List<Game> games = [];
  List<PersonWidget> list = [];
  List<GameWidget> gameList = [];
  final RadialGradient _gradient = const RadialGradient(
    center: const Alignment(0.7, -1.0),
    stops: [0.2, 1.4],
    radius: 1.8,
    colors: [
      const Color.fromARGB(255, 109, 82, 190),
      const Color.fromARGB(255, 226, 51, 51),
    ]
  );

  final Function _onReport = (String winner, String loser) {
    return () async {
      await http.post('https://us-central1-ladder-41a39.cloudfunctions.net/reportGame', body: {
        'winner': winner,
        'loser': loser,
      });
    };
  };

  Future<FirebaseUser> _handleSignIn() async {
    GoogleSignInAccount googleUser = await _googleSignIn.signIn();
    GoogleSignInAuthentication googleAuth = await googleUser.authentication;
    FirebaseUser user = await _auth.signInWithGoogle(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    this.user = user;
    return user;
  }

  @override
  initState() {
    _handleSignIn();
    _getPeople();
    super.initState();
  }

  _getPeople () {
    Game.getAll().listen((snapshot) {
      this.games = snapshot.documents.map((game) => new Game(
        winner: game['winner'],
        loser: game['loser'],
        timestamp: game['timestamp'],
      )).toList();
      setState(() {
        this.people = Person.scores({}, games);
        this.people.sort((a, b) => a.points > b.points ? -1 : 1);
        this.list = this.people.map(
<<<<<<< HEAD
          (Person person) => new PersonWidget(person: person, onReport: this._onReport(this.user.displayName, person.name))
=======
          (Person person) => new PersonWidget(person: person, onReport: this._onReport(this.user.displayName, name))
>>>>>>> 98f207de662f0457796e1396952b3223590867b6
        ).toList();
        this.gameList = new List.generate(this.games.length, (int i) {
          return new GameWidget(
            game: this.games[i],
            name: 'Damoon',
          );
        });
      });
    });
  }

  @override
  Widget build(BuildContext ctx) {

    TopListWidget first = new TopListWidget(
      title: 'King of Pong',
      list: this.list,
      gradient: this._gradient
    );
    TopListWidget second = new TopListWidget(
      title: 'Games',
      list: this.gameList,
      gradient: this._gradient,
    );

    List<Widget> widgetList = [first, second];

    return new Scaffold(
      body: new Swiper(
        itemCount: widgetList.length,
        itemBuilder: (BuildContext context, int i) => widgetList[i],
      )
    );
  }
}

class TopListWidget extends StatelessWidget {

  final String title;
  final List<Widget> list;
  final RadialGradient gradient;

  TopListWidget({this.title, this.list, this.gradient});

  @override
  Widget build (BuildContext ctx) {
    return new Container(
      decoration: new BoxDecoration(
        gradient: this.gradient,
      ),
      child: new Column(children: [
        new TitleWidget(this.title),
        new Expanded(
          child: new Padding(
            padding: new EdgeInsets.only(left: 24.0, right: 24.0),
            child: new ListView(children: this.list)
          )
        ),
      ]),
    );
  }
}