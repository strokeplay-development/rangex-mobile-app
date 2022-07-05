import 'package:equatable/equatable.dart';

class WebviewState extends Equatable {
  @override
  List<Object?> get props => [];
}

class WebviewStateNotLoaded extends WebviewState {}

class WebviewStateCreated extends WebviewState {}

class WebviewStateRoot extends WebviewState {}

class WebviewStateDeep extends WebviewState {}

class WebviewStateModal extends WebviewState {}
