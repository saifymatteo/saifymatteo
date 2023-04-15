import 'package:flutter_web/ui/pages/about/model.dart';
import 'package:rxdart/rxdart.dart';

class PortfolioAboutState {
  final _name = BehaviorSubject<String>.seeded('');
  final _counter = BehaviorSubject<int>.seeded(0);

  BehaviorSubject<String> get name => _name;

  BehaviorSubject<int> get counter => _counter;

  Stream<PortfolioAboutModel> get stream => Rx.combineLatest(
        [_name, _counter],
        (values) => PortfolioAboutModel(
          name: values[0] as String,
          counter: values[1] as int,
        ),
      );
}
