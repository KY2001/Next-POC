/* tslint:disable */
/* eslint-disable */
/**
 * openapi template
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GetHealthResponse
 */
export interface GetHealthResponse {
    /**
     * Server and DB status.
     * @type {string}
     * @memberof GetHealthResponse
     */
    status: string;
}

/**
 * Check if a given object implements the GetHealthResponse interface.
 */
export function instanceOfGetHealthResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "status" in value;

    return isInstance;
}

export function GetHealthResponseFromJSON(json: any): GetHealthResponse {
    return GetHealthResponseFromJSONTyped(json, false);
}

export function GetHealthResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetHealthResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
    };
}

export function GetHealthResponseToJSON(value?: GetHealthResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
    };
}

