interface Window {
    LocationChanged: {
        postMessage: (message: any) => void;
    };
}