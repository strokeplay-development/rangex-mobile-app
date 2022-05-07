import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';

class LoginState extends Equatable {
  @override
  List<Object?> get props => [];
}

class LoginStateNone extends LoginState {}

class LoginStateSuccess extends LoginState {}

class LoginStateFailure extends LoginState {
  LoginStateFailure(this.exception);
  final dynamic exception;

  @override
  List<Object?> get props => [exception];
}
