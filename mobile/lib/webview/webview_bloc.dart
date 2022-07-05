import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/webview/webview_event.dart';
import 'package:mobile/webview/webview_repository.dart';
import 'package:mobile/webview/webview_state.dart';

class WebviewBloc extends Bloc<WebviewEvent, WebviewState> {
  WebviewBloc({
    required WebviewRepository webviewRepository,
  })  : _webviewRepository = webviewRepository,
        super(WebviewStateNotLoaded()) {
    on(_onWebviewUrlChanged);
  }

  final WebviewRepository _webviewRepository;

  late StreamSubscription<WebviewEvent> _webviewEventSubscription;

  void _onWebviewUrlChanged(
    WebviewEvent event,
    Emitter<WebviewState> emit,
  ) {
    if (event is WebviewCreated) {
      return emit(WebviewStateCreated());
    }

    if (event is WebviewUrlChanged) {
      bool isRoot = _webviewRepository.rootPaths.contains(event.currentUrl);

      return isRoot ? emit(WebviewStateRoot()) : emit(WebviewStateDeep());
    }

    return emit(WebviewStateNotLoaded());
  }

  @override
  Future<void> close() {
    _webviewEventSubscription.cancel();
    return super.close();
  }
}
