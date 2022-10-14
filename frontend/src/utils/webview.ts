/**
 * 웹뷰로 보내는 로그 스트링 생성
 */
 export const webViewLog = (title: string, log?: unknown): string => {
    const logMessage = typeof log === 'string' ? log : JSON.stringify(log);
    return `[${title}] ${logMessage}`;
};

/* 웹뷰 메시지들 ****************************************************************/
export const webviewError = window.ErrorCatched?.postMessage;