import 'package:equatable/equatable.dart';

class WebviewEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class WebviewCreateReady extends WebviewEvent {}

class WebviewCreated extends WebviewEvent {}

class WebviewUrlChanged extends WebviewEvent {
  WebviewUrlChanged(this.currentUrl);

  final String? currentUrl;

  @override
  List<Object?> get props => [currentUrl];
}

class WebviewModalOpened extends WebviewEvent {}
