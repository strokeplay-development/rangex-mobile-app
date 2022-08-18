interface WebViewMessage {
    postMessage: (message: any) => void;
}

interface Window {
    SignupCompleted: WebViewMessage
    LocationChanged: WebViewMessage;
    LogoutRequested: WebViewMessage;
    JoinRequested: WebViewMessage;
    SocialLogin: WebViewMessage
}