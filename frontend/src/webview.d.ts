interface Window {
    LocationChanged: {
        postMessage: (message: any) => void;
    };
    LogoutRequested: {
        postMessage: (message: any) => void;
    }
}