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
mixin _$PortfolioAboutModel {
  String get name => throw _privateConstructorUsedError;
  int get counter => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $PortfolioAboutModelCopyWith<PortfolioAboutModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PortfolioAboutModelCopyWith<$Res> {
  factory $PortfolioAboutModelCopyWith(
          PortfolioAboutModel value, $Res Function(PortfolioAboutModel) then) =
      _$PortfolioAboutModelCopyWithImpl<$Res, PortfolioAboutModel>;
  @useResult
  $Res call({String name, int counter});
}

/// @nodoc
class _$PortfolioAboutModelCopyWithImpl<$Res, $Val extends PortfolioAboutModel>
    implements $PortfolioAboutModelCopyWith<$Res> {
  _$PortfolioAboutModelCopyWithImpl(this._value, this._then);

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
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_PortfolioAboutModelCopyWith<$Res>
    implements $PortfolioAboutModelCopyWith<$Res> {
  factory _$$_PortfolioAboutModelCopyWith(_$_PortfolioAboutModel value,
          $Res Function(_$_PortfolioAboutModel) then) =
      __$$_PortfolioAboutModelCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String name, int counter});
}

/// @nodoc
class __$$_PortfolioAboutModelCopyWithImpl<$Res>
    extends _$PortfolioAboutModelCopyWithImpl<$Res, _$_PortfolioAboutModel>
    implements _$$_PortfolioAboutModelCopyWith<$Res> {
  __$$_PortfolioAboutModelCopyWithImpl(_$_PortfolioAboutModel _value,
      $Res Function(_$_PortfolioAboutModel) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? counter = null,
  }) {
    return _then(_$_PortfolioAboutModel(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      counter: null == counter
          ? _value.counter
          : counter // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc

class _$_PortfolioAboutModel implements _PortfolioAboutModel {
  _$_PortfolioAboutModel({required this.name, required this.counter});

  @override
  final String name;
  @override
  final int counter;

  @override
  String toString() {
    return 'PortfolioAboutModel(name: $name, counter: $counter)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_PortfolioAboutModel &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.counter, counter) || other.counter == counter));
  }

  @override
  int get hashCode => Object.hash(runtimeType, name, counter);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_PortfolioAboutModelCopyWith<_$_PortfolioAboutModel> get copyWith =>
      __$$_PortfolioAboutModelCopyWithImpl<_$_PortfolioAboutModel>(
          this, _$identity);
}

abstract class _PortfolioAboutModel implements PortfolioAboutModel {
  factory _PortfolioAboutModel(
      {required final String name,
      required final int counter}) = _$_PortfolioAboutModel;

  @override
  String get name;
  @override
  int get counter;
  @override
  @JsonKey(ignore: true)
  _$$_PortfolioAboutModelCopyWith<_$_PortfolioAboutModel> get copyWith =>
      throw _privateConstructorUsedError;
}
