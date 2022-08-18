import 'package:equatable/equatable.dart';

enum LoginType { direct, kakao }

String loginTypeToString(LoginType loginType) {
  switch (loginType) {
    case LoginType.direct:
      return 'direct';
    case LoginType.kakao:
      return 'kakao';
    default:
      return 'unknown';
  }
}

class LoginEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

/// 로그인 요청 이벤트
class LoginRequested extends LoginEvent {
  LoginRequested(
    this.type, [
    this.userAccount,
    this.userPW,
    this.authCode,
  ]);

  final LoginType type;
  final String? userAccount;
  final String? userPW;
  final dynamic authCode;

  @override
  List<Object?> get props => [userAccount];
}

class SocialLoginRequested extends LoginEvent {
  SocialLoginRequested(this.type);

  final LoginType type;

  @override
  List<Object?> get props => [type];
}
