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
    NewProfilePictureRequested: WebViewMessage;
    LanguageChangeRequested: WebViewMessage;
}