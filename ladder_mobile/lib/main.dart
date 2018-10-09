import 'package:flutter/material.dart';
import './widgets/home.widget.dart';
import './widgets/personal-timeline.widget.dart';

void main() => runApp(new KingOfPong());

Route<Null> _getRoute(RouteSettings settings) {
  final List<String> path = settings.name.split('/');
  if (path[0] != '') {
    return null;
  } else if (path.indexOf('timeline') >= 0) {
    String name = path[path.length - 1];
    return new MaterialPageRoute<Null>(
      builder: (BuildContext context) => new PersonalTimelineWidget(name: name),
    );
  } else {
    return new MaterialPageRoute<Null>(
      builder: (BuildContext context) => new HomeWidget(),
    );
  }
}

class KingOfPong extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        fontFamily: 'Raleway',
        primarySwatch: Colors.red,
      ),
      home: HomeWidget(),
      routes: <String, WidgetBuilder>{
        '/home': (BuildContext ctx) => new HomeWidget(),
      },
      onGenerateRoute: _getRoute,
    );
  }
  
}
