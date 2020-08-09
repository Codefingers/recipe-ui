import AddAuthorizationHeader from '../AddAuthorizationHeader';
import { AxiosRequestConfig } from 'axios';
import { HttpRequest } from 'services/Http';

/** Token function known to configuration service */
let mockTokenFunction: () => Promise<string>;

/** JWT status for configuration service */
let jwtEnabled: boolean;

jest.mock('module/FrameworkInstance', (): object => ({
    getFrameworkInstance: jest.fn((): object => ({
        getConfiguration: jest.fn((): object => ({
            get: jest.fn((module: string, setting: string): boolean | typeof mockTokenFunction => {
                if (module === 'login' && setting === 'jwtEnabled') {
                    return jwtEnabled;
                }

                return mockTokenFunction;
            }),
        })),
    })),
}));

describe('Authorization header', (): void => {
    afterEach((): void => {
        jest.resetModules();
        jwtEnabled = true;
        ((mockTokenFunction as unknown) as undefined) = undefined;
    });

    describe('when JWT is disabled', (): void => {
        beforeEach((): void => {
            jwtEnabled = false;
        });

        it('does not add an authorization header', async (): Promise<void> => {
            const config: Partial<AxiosRequestConfig> = await AddAuthorizationHeader({
                headers: {
                    common: {},
                },
            });

            expect(config.headers.common.Authorization).toBeUndefined();
        });
    });

    describe('with JWT enabled', (): void => {
        it('throws an error if no token function is provided', async (): Promise<void> => {
            await expect(
                AddAuthorizationHeader({
                    headers: {
                        common: {},
                    },
                })
            ).rejects.toThrow();
        });

        it('throws an error if no token is obtained', async (): Promise<void> => {
            mockTokenFunction = async (): Promise<string> => '';
            await expect(
                AddAuthorizationHeader({
                    headers: {
                        common: {},
                    },
                })
            ).rejects.toThrow();
        });

        it('retrieves the authorization token', async (): Promise<void> => {
            mockTokenFunction = async (): Promise<string> => 'hello';
            const config: Partial<HttpRequest> = await AddAuthorizationHeader({
                headers: {
                    common: {},
                },
            });

            expect(config.headers.common.Authorization).toBe('Bearer hello');
        });
    });
});
