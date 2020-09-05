import FailedRequestNotifier from '../FailedRequestNotifier';
import { AxiosError } from 'axios';
import ReduxMockStore, { MockStore } from 'redux-mock-store';
import { NotificationActionTypes } from '@workforcesoftware/lighthouse-framework';
import { Mock } from 'ts-mockery';

/** Mock store for use in tests */
const store: MockStore = ReduxMockStore()();

jest.mock('module/FrameworkInstance', (): object => ({
    getFrameworkInstance: jest.fn((): object => ({
        getStore: jest.fn((): MockStore => store),
    })),
}));

jest.mock('services/I18n', (): object => ({
    getFrameworkI18n: jest.fn((): object => ({
        /** Mock translate function, returns all keys and values as a flatted string to aid assertions */
        translate: jest.fn((text: string, substitutions: object): string => {
            const subString: string = substitutions
                ? Object.entries(substitutions)
                      .map((entry: string[]): string => entry.join('@@'))
                      .join('..')
                : '';
            return `${text} - ${subString}`;
        }),
    })),
}));

describe('Failed request notification', (): void => {
    it('does not generate a notification for successful requests', async (): Promise<void> => {
        const error: AxiosError = Mock.of<AxiosError>({
            response: {
                status: 200,
                statusText: 'Everything is awesome',
                headers: {},
                data: {},
                config: {},
            },
            config: {},
            name: '',
            message: '',
        });

        await expect(FailedRequestNotifier(error)).rejects.toEqual(error);

        expect(store.getActions()).not.toBe(
            expect.arrayContaining([
                {
                    type: NotificationActionTypes.SendNotification,
                    notification: expect.any('string'),
                },
            ])
        );
    });

    it('generates a notification for HTTP errors.', async (): Promise<void> => {
        const error: AxiosError = Mock.of<AxiosError>({
            response: {
                status: 410,
                statusText: 'Princess is in another castle',
                headers: {},
                data: {},
                config: {},
            },
            config: {},
            name: '',
            message: '',
        });

        await expect(FailedRequestNotifier(error)).rejects.toEqual(error);

        expect(store.getActions()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    type: NotificationActionTypes.SendNotification,
                    notification: expect.stringMatching('network_error.+Princess is in another castle'),
                }),
            ])
        );
    });

    it('generates a notification when no response is provided.', async (): Promise<void> => {
        const error: AxiosError = Mock.of<AxiosError>({
            config: {},
            name: '',
            message: '',
        });

        await expect(FailedRequestNotifier(error)).rejects.toEqual(error);

        expect(store.getActions()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    type: NotificationActionTypes.SendNotification,
                    notification: expect.stringContaining('network_error_unknown'),
                }),
            ])
        );
    });
});
