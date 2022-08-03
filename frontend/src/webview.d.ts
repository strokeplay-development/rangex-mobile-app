interface Window {
    SignupCompleted: {
        postMessage: (message: any) => void;
    }
    LocationChanged: {
        postMessage: (message: any) => void;
    };
    LogoutRequested: {
        postMessage: (message: any) => void;
    };
    JoinRequested: {
        postMessage: (message: any) => void;
    };
}