import 'package:equatable/equatable.dart';

class SignupEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class AuthCodeRequested extends SignupEvent {
  AuthCodeRequested(this.phoneNumber);

  final String phoneNumber;

  @override
  List<Object?> get props => [phoneNumber];
}

class SignupRequested extends SignupEvent {
  SignupRequested(this.userInfo);

  final Map<String, dynamic> userInfo;

  @override
  List<Object?> get props => [userInfo];
}
