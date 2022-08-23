interface WebViewMessage {
    postMessage: (message: any) => void;
}

interface Window {
    SignupCompleted: WebViewMessage;
    ModifyUserRequested: WebViewMessage;
    LocationChanged: WebViewMessage;
    LogoutRequested: WebViewMessage;
    JoinRequested: WebViewMessage;
    SocialLogin: WebViewMessage;
}