import { AxiosRequestConfig } from 'axios';
import * as moxios from 'moxios';
import Http from '../Http';

jest.mock('../AddAuthorizationHeader', (): object => ({
    __esModule: true,
    default: jest.fn(
        async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
            config.headers.common.Authorization = 'Auth header';
            return config;
        }
    ),
}));

describe('Http library', (): void => {
    beforeEach((): void => {
        moxios.install(Http);
    });

    afterEach((): void => {
        moxios.uninstall(Http);
    });

    it('Adds an Authorization header to outgoing requests', async (): Promise<void> => {
        moxios.stubRequest('http://success', {
            status: 200,
            response: '',
        });
        await Http.get('http://success');
        expect(moxios.requests.first().headers.Authorization).toContain('Auth header');
    });
});
