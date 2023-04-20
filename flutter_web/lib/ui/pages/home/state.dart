import 'dart:async';

import 'package:flutter_web/lib.dart';
import 'package:flutter_web/ui/pages/home/model.dart';
import 'package:rxdart/rxdart.dart';

class PortfolioHomeState {
  final _name = BehaviorSubject<String>.seeded('');
  final _listString = BehaviorSubject<List<String>>.seeded([]);

  BehaviorSubject<String> get name => _name;

  BehaviorSubject<List<String>> get listString => _listString;

  Stream<PortfolioHomeModel> get stream => Rx.combineLatest(
        [_name, _listString],
        (values) => PortfolioHomeModel(
          name: values[0] as String,
          counter: values[1] as List<String>,
        ),
      );

  Future<void> setAndStreamCounter() async {
    if (_listString.hasListener) {
      return;
    }

    _listString.interval(1.seconds).listen(Log.root.finest);

    for (var i = 0; i < 10; i++) {
      final current = _listString.hasValue ? _listString.value : ['Item $i'];
      _listString.add([...current, 'Item $i']);
      await Future<void>.delayed(1.seconds);
    }
  }

  Future<void> dispose() async {
    await _name.close();
    await _listString.close();
  }
}
