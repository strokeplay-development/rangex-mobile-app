import 'package:equatable/equatable.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  List<Object?> get props => [];
}

/// 인증상태 변경 이벤트
class AuthStatusChanged extends AuthEvent {
  const AuthStatusChanged(this.status);

  final AuthStatus status;

  @override
  List<Object?> get props => [status];
}

/// 로그아웃 요청 이벤트
class AuthLogoutRequested extends AuthEvent {}
