import 'package:equatable/equatable.dart';
import 'package:rangex/authentication/bloc/login_event.dart';

class LoginState extends Equatable {
  @override
  List<Object?> get props => [];
}

class LoginStateNone extends LoginState {}

class LoginStateSocial extends LoginState {
  LoginStateSocial({required this.loginType});
  final LoginType loginType;

  @override
  List<Object?> get props => [loginType];
}

class LoginStateSuccess extends LoginState {}

class LoginStateFailure extends LoginState {
  LoginStateFailure(this.exception);
  final dynamic exception;

  @override
  List<Object?> get props => [exception];
}
