import { Location } from "react-router-dom";

export type QueryObject = {
    [key: string]: number | string;
}

/**
 * URL 쿼리스트링을 Object로 변환
 */
export const getQueryJSON = (location: Location): QueryObject => {
    const queryString = location.search.split('?')[1];
    const queries = queryString.split('&');
    
    const queryObject: QueryObject = {};

    for (const query of queries) {
        const q = query.split('=');
        queryObject[q[0]] = q[1];
    }

    return queryObject;
}

/**
 * 빈 오프젝트인지 확인
 */
export const isEmptyObject = (target: object): boolean => {
    if (
        target 
        && Object.keys(target).length === 0 
        && (target.constructor === Object || (typeof target) === 'object')
    ) return true;
    
    return false;
}