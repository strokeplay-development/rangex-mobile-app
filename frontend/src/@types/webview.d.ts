interface WebViewMessage {
    postMessage: (message?: any) => void;
}

interface Window {
    ResponseReceived: WebViewMessage;
    WebviewMounted: WebViewMessage;
    SignupCompleted: WebViewMessage;
    ModifyUserRequested: WebViewMessage;
    LocationChanged: WebViewMessage;
    LogoutRequested: WebViewMessage;
    JoinRequested: WebViewMessage;
    SocialLogin: WebViewMessage;
    LanguageChangeRequested: WebViewMessage;
    ModalStateChanged: WebViewMessage;
    
    // Third party webpage
    ThirdPartyPageRequested: WebViewMessage;

    // Camera or Gallery
    OpenCameraRequested: WebViewMessage;

    // Errors
    ErrorCatched: WebViewMessage;
}