/**
 * 웹뷰로 보내는 로그 스트링 생성
 */
 export const webViewLog = (title: string, log?: unknown): string => {
    const logMessage = typeof log === 'string' ? log : JSON.stringify(log);
    return `[${title}] ${logMessage}`;
};

/* 웹뷰 메시지들 ****************************************************************/

// 응답로그 전달
export const webviewPrint = (message: unknown) => window.ResponseReceived?.postMessage(
    webViewLog('Webview Print', message)
);

// 에러로그 전달
export const webviewError = (message: unknown) => window.ErrorCatched?.postMessage(
    webViewLog('Webview Error', message)
);

// 로그아웃 요청
export const webviewLogout = (message: string) => window.LogoutRequested?.postMessage(
    webViewLog('Logout',message)
);