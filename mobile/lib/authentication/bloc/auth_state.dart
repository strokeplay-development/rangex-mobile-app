import 'package:equatable/equatable.dart';
import 'package:rangex/authentication/models/user.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';

class AuthState extends Equatable {
  /// Constructor
  const AuthState._({
    this.status = AuthStatus.unknown,
    this.user = User.unknown,
  });

  /// Constructor
  const AuthState.unknown() : this._();

  /// Constructor
  const AuthState.authenticated(User user)
      : this._(
          status: AuthStatus.authenticated,
          user: user,
        );

  /// Constructor
  const AuthState.unauthenticated()
      : this._(status: AuthStatus.unauthenticated);

  final AuthStatus status;
  final User user;

  @override
  List<Object?> get props => [status];
}
