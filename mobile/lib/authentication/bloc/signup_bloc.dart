import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rangex/authentication/bloc/signup_event.dart';
import 'package:rangex/authentication/repositories/user_repository.dart';

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

/// Bloc
///
class SignupBloc extends Bloc<SignupEvent, SignupState> {
  SignupBloc({required UserRepository userRepository})
      : _userRepository = userRepository,
        super(SignupState()) {
    on(_onAuthCodeRequested);
    on(_onRequestToState);
  }

  final UserRepository _userRepository;

  void _onAuthCodeRequested(
      AuthCodeRequested event, Emitter<SignupState> emit) {
    print('ddf');
  }

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
