// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$PortfolioHomeModel {
  String get name => throw _privateConstructorUsedError;
  List<String> get counter => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $PortfolioHomeModelCopyWith<PortfolioHomeModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PortfolioHomeModelCopyWith<$Res> {
  factory $PortfolioHomeModelCopyWith(
          PortfolioHomeModel value, $Res Function(PortfolioHomeModel) then) =
      _$PortfolioHomeModelCopyWithImpl<$Res, PortfolioHomeModel>;
  @useResult
  $Res call({String name, List<String> counter});
}

/// @nodoc
class _$PortfolioHomeModelCopyWithImpl<$Res, $Val extends PortfolioHomeModel>
    implements $PortfolioHomeModelCopyWith<$Res> {
  _$PortfolioHomeModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? counter = null,
  }) {
    return _then(_value.copyWith(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      counter: null == counter
          ? _value.counter
          : counter // ignore: cast_nullable_to_non_nullable
              as List<String>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_PortfolioHomeModelCopyWith<$Res>
    implements $PortfolioHomeModelCopyWith<$Res> {
  factory _$$_PortfolioHomeModelCopyWith(_$_PortfolioHomeModel value,
          $Res Function(_$_PortfolioHomeModel) then) =
      __$$_PortfolioHomeModelCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String name, List<String> counter});
}

/// @nodoc
class __$$_PortfolioHomeModelCopyWithImpl<$Res>
    extends _$PortfolioHomeModelCopyWithImpl<$Res, _$_PortfolioHomeModel>
    implements _$$_PortfolioHomeModelCopyWith<$Res> {
  __$$_PortfolioHomeModelCopyWithImpl(
      _$_PortfolioHomeModel _value, $Res Function(_$_PortfolioHomeModel) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? counter = null,
  }) {
    return _then(_$_PortfolioHomeModel(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      counter: null == counter
          ? _value._counter
          : counter // ignore: cast_nullable_to_non_nullable
              as List<String>,
    ));
  }
}

/// @nodoc

class _$_PortfolioHomeModel implements _PortfolioHomeModel {
  _$_PortfolioHomeModel(
      {required this.name, required final List<String> counter})
      : _counter = counter;

  @override
  final String name;
  final List<String> _counter;
  @override
  List<String> get counter {
    if (_counter is EqualUnmodifiableListView) return _counter;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_counter);
  }

  @override
  String toString() {
    return 'PortfolioHomeModel(name: $name, counter: $counter)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_PortfolioHomeModel &&
            (identical(other.name, name) || other.name == name) &&
            const DeepCollectionEquality().equals(other._counter, _counter));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType, name, const DeepCollectionEquality().hash(_counter));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_PortfolioHomeModelCopyWith<_$_PortfolioHomeModel> get copyWith =>
      __$$_PortfolioHomeModelCopyWithImpl<_$_PortfolioHomeModel>(
          this, _$identity);
}

abstract class _PortfolioHomeModel implements PortfolioHomeModel {
  factory _PortfolioHomeModel(
      {required final String name,
      required final List<String> counter}) = _$_PortfolioHomeModel;

  @override
  String get name;
  @override
  List<String> get counter;
  @override
  @JsonKey(ignore: true)
  _$$_PortfolioHomeModelCopyWith<_$_PortfolioHomeModel> get copyWith =>
      throw _privateConstructorUsedError;
}
