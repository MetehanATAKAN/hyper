import * as React from 'react';
import BusinessProcess from '../BusinessProcess';
import renderer from 'react-test-renderer';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { render, fireEvent } from '@testing-library/react';
jest.mock('../../../../utils/http.helper', () => {
    return {
        FetchApiGet: jest.fn(),
        FetchApiPost: jest.fn(),
    };
});

describe('fetch api', () => {
    it('should fetch data', async () => {
        const data = {
            data: [
                [
                    {
                        id: 1,
                        title: 'test',
                    },
                    {
                        id: 1,
                        title: 'test',
                    },
                ],
            ],
        };
        FetchApiGet.mockResolvedValueOnce(data);
        const result = await FetchApiGet('services/TaskManagement/BusinessProcess/GetAllBusinessProcess', 'GET');
        expect(result).toEqual(data);
    });
});
it('should render correctly', () => {
    const data = {
        data: [
            [
                {
                    id: 1,
                    title: 'test',
                },
                {
                    id: 1,
                    title: 'test',
                },
            ],
        ],
    };
    FetchApiGet.mockResolvedValue(data);
    const tree = renderer
        .create(<BusinessProcess updateBusinessProcess={[]} setOnModal={true} businessProcess={data.data} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
describe('input change', () => {
    it('should change input value', () => {
        const data = {
            data: [
                [
                    {
                        id: 1,
                        title: 'test',
                    },
                    {
                        id: 1,
                        title: 'test',
                    },
                ],
            ],
        };
        FetchApiGet.mockResolvedValue(data);
        const { getByTestId } = render(
            <BusinessProcess updateBusinessProcess={[]} setOnModal={true} businessProcess={data.data} />
        );
        const input = getByTestId('business-process-name');
        input.value = 'test';
        expect(input.value).toBe('test');
    });
});
describe('button click', () => {
    it('should call create business process', async () => {
        const data = {
            data: [
                [
                    {
                        id: 1,
                        title: 'test',
                    },
                    {
                        id: 1,
                        title: 'test',
                    },
                ],
            ],
        };
        FetchApiGet.mockResolvedValue(data);
        const { getByTestId } = render(
            <BusinessProcess updateBusinessProcess={[]} setOnModal={true} businessProcess={data.data} />
        );
        const handleChange = jest.fn();
        const input = getByTestId('business-process-name');
        fireEvent.change(input, { target: { value: 'test' } });
        const button = getByTestId('create-business-process');
        button.click();
        const postData = {
            businesProcessTitle: 'test',
            createdBy: 'string',
            jobDescriptionId: 0,
            category: 'string',
            ownerBP: 'string',
        };
        FetchApiPost.mockResolvedValueOnce(postData);
        const result = await FetchApiPost(
            'services/TaskManagement/BusinessProcess/CreateBusinessProcess',
            'POST',
            postData
        );
        expect(result).toEqual(postData);
    });
});
