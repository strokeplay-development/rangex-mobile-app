import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';

class LoginEvent extends Equatable {
  @override
  // TODO: implement props
  List<Object?> get props => [];
}

/// 로그인 요청 이벤트
class LoginRequested extends LoginEvent {
  LoginRequested(this.userAccount, this.userPW);

  final String userAccount;
  final String userPW;

  @override
  // TODO: implement props
  List<Object?> get props => [userAccount];
}
