interface WebViewMessage {
    postMessage: (message: any) => void;
}

interface Window {
    WebviewMounted: WebViewMessage;
    SignupCompleted: WebViewMessage;
    ModifyUserRequested: WebViewMessage;
    LocationChanged: WebViewMessage;
    LogoutRequested: WebViewMessage;
    JoinRequested: WebViewMessage;
    SocialLogin: WebViewMessage;
}