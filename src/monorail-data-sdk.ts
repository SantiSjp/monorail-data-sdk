/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface IClient {
    /**
     * Total portfolio value
     * @param address The address to fetch value for, must be a valid EVM address
     * @return OK
     */
    value(address: string): Promise<USDValueResponse>;
    /**
     * Price of MON in USD
     * @return OK
     */
    mONUSD(): Promise<PriceResponse>;
    /**
     * Get a token
     * @param contractAddress The token contract address in EVM format
     * @return A token's metadata
     */
    token(contractAddress: string): Promise<TokenResult>;
    /**
     * Find tokens
     * @param find (optional) The partial name, ticker or address of the token to find
     * @param address (optional) The optional address of a wallet to add balance information for each token
     * @return A list of tokens matching the query
     */
    tokens(find: string | null | undefined, address: string | null | undefined): Promise<TokenResult[]>;
    /**
     * Tokens by category
     * @param category Category of tokens to fetch
     * @param address (optional) Monad address to include token balances for (required for wallet category)
     * @return List of tokens with details and balances if address provided
     */
    category(category: Category, address: string | null | undefined): Promise<TokenResult[]>;
    /**
     * Balances of all tokens for an address
     * @param address The address to fetch balances for, must be a valid EVM address
     * @return OK
     */
    balances(address: string): Promise<TokenResult[]>;
}

export class Client implements IClient {
    protected instance: AxiosInstance;
    protected baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance || axios.create();
        this.baseUrl = baseUrl ?? "https://testnet-api.monorail.xyz/v1";
    }

    /**
     * Total portfolio value
     * @param address The address to fetch value for, must be a valid EVM address
     * @return OK
     */
    value(address: string, cancelToken?: CancelToken): Promise<USDValueResponse> {
        let url_ = this.baseUrl + "/portfolio/{address}/value";
        if (address === undefined || address === null)
            throw new Error("The parameter 'address' must be defined.");
        url_ = url_.replace("{address}", encodeURIComponent("" + address));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processValue(_response);
        });
    }

    protected processValue(response: AxiosResponse): Promise<USDValueResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = USDValueResponse.fromJS(resultData200);
            return Promise.resolve<USDValueResponse>(result200);

        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ErrorResponse.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<USDValueResponse>(null as any);
    }

    /**
     * Price of MON in USD
     * @return OK
     */
    mONUSD(cancelToken?: CancelToken): Promise<PriceResponse> {
        let url_ = this.baseUrl + "/symbol/MONUSD";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processMONUSD(_response);
        });
    }

    protected processMONUSD(response: AxiosResponse): Promise<PriceResponse> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = PriceResponse.fromJS(resultData200);
            return Promise.resolve<PriceResponse>(result200);

        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ErrorResponse.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<PriceResponse>(null as any);
    }

    /**
     * Get a token
     * @param contractAddress The token contract address in EVM format
     * @return A token's metadata
     */
    token(contractAddress: string, cancelToken?: CancelToken): Promise<TokenResult> {
        let url_ = this.baseUrl + "/token/{contractAddress}";
        if (contractAddress === undefined || contractAddress === null)
            throw new Error("The parameter 'contractAddress' must be defined.");
        url_ = url_.replace("{contractAddress}", encodeURIComponent("" + contractAddress));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processToken(_response);
        });
    }

    protected processToken(response: AxiosResponse): Promise<TokenResult> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = TokenResult.fromJS(resultData200);
            return Promise.resolve<TokenResult>(result200);

        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ErrorResponse.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<TokenResult>(null as any);
    }

    /**
     * Find tokens
     * @param find (optional) The partial name, ticker or address of the token to find
     * @param address (optional) The optional address of a wallet to add balance information for each token
     * @return A list of tokens matching the query
     */
    tokens(find: string | null | undefined, address: string | null | undefined, cancelToken?: CancelToken): Promise<TokenResult[]> {
        let url_ = this.baseUrl + "/tokens?";
        if (find !== undefined && find !== null)
            url_ += "find=" + encodeURIComponent("" + find) + "&";
        if (address !== undefined && address !== null)
            url_ += "address=" + encodeURIComponent("" + address) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processTokens(_response);
        });
    }

    protected processTokens(response: AxiosResponse): Promise<TokenResult[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(TokenResult.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return Promise.resolve<TokenResult[]>(result200);

        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ErrorResponse.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<TokenResult[]>(null as any);
    }

    /**
     * Tokens by category
     * @param category Category of tokens to fetch
     * @param address (optional) Monad address to include token balances for (required for wallet category)
     * @return List of tokens with details and balances if address provided
     */
    category(category: Category, address: string | null | undefined, cancelToken?: CancelToken): Promise<TokenResult[]> {
        let url_ = this.baseUrl + "/tokens/category/{category}?";
        if (category === undefined || category === null)
            throw new Error("The parameter 'category' must be defined.");
        url_ = url_.replace("{category}", encodeURIComponent("" + category));
        if (address !== undefined && address !== null)
            url_ += "address=" + encodeURIComponent("" + address) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processCategory(_response);
        });
    }

    protected processCategory(response: AxiosResponse): Promise<TokenResult[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(TokenResult.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return Promise.resolve<TokenResult[]>(result200);

        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ErrorResponse.fromJS(resultData400);
            return throwException("Invalid parameters", status, _responseText, _headers, result400);

        } else if (status === 500) {
            const _responseText = response.data;
            let result500: any = null;
            let resultData500  = _responseText;
            result500 = ErrorResponse.fromJS(resultData500);
            return throwException("Server error", status, _responseText, _headers, result500);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<TokenResult[]>(null as any);
    }

    /**
     * Balances of all tokens for an address
     * @param address The address to fetch balances for, must be a valid EVM address
     * @return OK
     */
    balances(address: string, cancelToken?: CancelToken): Promise<TokenResult[]> {
        let url_ = this.baseUrl + "/wallet/{address}/balances";
        if (address === undefined || address === null)
            throw new Error("The parameter 'address' must be defined.");
        url_ = url_.replace("{address}", encodeURIComponent("" + address));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processBalances(_response);
        });
    }

    protected processBalances(response: AxiosResponse): Promise<TokenResult[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (const k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(TokenResult.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return Promise.resolve<TokenResult[]>(result200);

        } else if (status === 400) {
            const _responseText = response.data;
            let result400: any = null;
            let resultData400  = _responseText;
            result400 = ErrorResponse.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<TokenResult[]>(null as any);
    }
}

export class ErrorResponse implements IErrorResponse {
    message?: string | undefined;

    constructor(data?: IErrorResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.message = _data["message"];
        }
    }

    static fromJS(data: any): ErrorResponse {
        data = typeof data === 'object' ? data : {};
        let result = new ErrorResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["message"] = this.message;
        return data;
    }
}

export interface IErrorResponse {
    message?: string | undefined;
}

export class PriceResponse implements IPriceResponse {
    price?: string | undefined;

    constructor(data?: IPriceResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.price = _data["price"];
        }
    }

    static fromJS(data: any): PriceResponse {
        data = typeof data === 'object' ? data : {};
        let result = new PriceResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["price"] = this.price;
        return data;
    }
}

export interface IPriceResponse {
    price?: string | undefined;
}

/** Represents the JSON structure of a token result */
export class TokenResult implements ITokenResult {
    /** The EVM address of the token */
    address?: string | undefined;
    /** The balance of the token for the address formatted with correct decimals, if applicable */
    balance?: string | undefined;
    /** The categories the token belongs to */
    categories?: string[] | undefined;
    /** The number of decimals the token uses */
    decimals?: string | undefined;
    /** The MON per token value, formatted with correct decimals */
    mon_per_token?: string | undefined;
    /** The MON value of the balance of the token for the address formatted with correct decimals, if applicable */
    mon_value?: string | undefined;
    /** The name of the token */
    name?: string | undefined;
    /** The price confidence of the token between 0 - 100. It is based on the number of sources and liquidity available for this token */
    pconf?: string | undefined;
    /** The symbol of the token */
    symbol?: string | undefined;

    constructor(data?: ITokenResult) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.address = _data["address"];
            this.balance = _data["balance"];
            if (Array.isArray(_data["categories"])) {
                this.categories = [] as any;
                for (let item of _data["categories"])
                    this.categories!.push(item);
            }
            this.decimals = _data["decimals"];
            this.mon_per_token = _data["mon_per_token"];
            this.mon_value = _data["mon_value"];
            this.name = _data["name"];
            this.pconf = _data["pconf"];
            this.symbol = _data["symbol"];
        }
    }

    static fromJS(data: any): TokenResult {
        data = typeof data === 'object' ? data : {};
        let result = new TokenResult();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["address"] = this.address;
        data["balance"] = this.balance;
        if (Array.isArray(this.categories)) {
            data["categories"] = [];
            for (let item of this.categories)
                data["categories"].push(item);
        }
        data["decimals"] = this.decimals;
        data["mon_per_token"] = this.mon_per_token;
        data["mon_value"] = this.mon_value;
        data["name"] = this.name;
        data["pconf"] = this.pconf;
        data["symbol"] = this.symbol;
        return data;
    }
}

/** Represents the JSON structure of a token result */
export interface ITokenResult {
    /** The EVM address of the token */
    address?: string | undefined;
    /** The balance of the token for the address formatted with correct decimals, if applicable */
    balance?: string | undefined;
    /** The categories the token belongs to */
    categories?: string[] | undefined;
    /** The number of decimals the token uses */
    decimals?: string | undefined;
    /** The MON per token value, formatted with correct decimals */
    mon_per_token?: string | undefined;
    /** The MON value of the balance of the token for the address formatted with correct decimals, if applicable */
    mon_value?: string | undefined;
    /** The name of the token */
    name?: string | undefined;
    /** The price confidence of the token between 0 - 100. It is based on the number of sources and liquidity available for this token */
    pconf?: string | undefined;
    /** The symbol of the token */
    symbol?: string | undefined;
}

export class USDValueResponse implements IUSDValueResponse {
    value?: string | undefined;

    constructor(data?: IUSDValueResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.value = _data["value"];
        }
    }

    static fromJS(data: any): USDValueResponse {
        data = typeof data === 'object' ? data : {};
        let result = new USDValueResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["value"] = this.value;
        return data;
    }
}

export interface IUSDValueResponse {
    value?: string | undefined;
}

/** Category of tokens to fetch */
export enum Category {
    Wallet = "wallet",
    Verified = "verified",
    Stable = "stable",
    Lst = "lst",
    Bridged = "bridged",
    Meme = "meme",
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

export function isAxiosError(obj: any): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}