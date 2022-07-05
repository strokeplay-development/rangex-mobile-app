import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/authentication/models/user.dart';
import 'package:mobile/authentication/repositories/user_repository.dart';

/// State
///
class SignupState extends Equatable {
  @override
  List<Object?> get props => [];
}

class SignupStateSuccess extends SignupState {}

class SignupStateFailure extends SignupState {}

/// Event
///
class SignupRequested extends Equatable {
  const SignupRequested(this.userInfo);

  final User userInfo;

  @override
  List<Object?> get props => [userInfo];
}

/// Bloc
///
class SignupBloc extends Bloc<SignupRequested, SignupState> {
  SignupBloc({required UserRepository userRepository})
      : _userRepository = userRepository,
        super(SignupState()) {
    on(_onRequestToState);
  }

  final UserRepository _userRepository;

  void _onRequestToState(SignupRequested event, Emitter<SignupState> emit) {
    try {
      final me = _userRepository.signUp(event.userInfo);

      if (me != null) {
        emit(SignupStateSuccess());
        return;
      }

      emit(SignupStateFailure());
    } catch (e) {
      print(e);
      emit(SignupStateFailure());
    }
  }
}
