import { Location } from "react-router-dom";

export type QueryObject = {
    [key: string]: number | string;
}

export const getQueryJSON= (location: Location): QueryObject => {
    const queryString = location.search.split('?')[1];
    const queries = queryString.split('&');
    
    const queryObject: QueryObject = {};

    for (const query of queries) {
        const q = query.split('=');
        queryObject[q[0]] = q[1];
    }

    return queryObject;
}