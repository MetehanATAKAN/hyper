import * as React from 'react';
import SubProcess from '../SubProcess';
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
        const result = await FetchApiGet('services/TaskManagement/SubProcess/GetAllSubProcess', 'GET');
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
        .create(<SubProcess updateSubProcess={[]} setOnModal={true} subProcess={data.data} />)
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
        const { getByTestId } = render(<SubProcess updateSubProcess={[]} setOnModal={true} subProcess={data.data} />);
        const input = getByTestId('sub-process-name');
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
        const { getByTestId } = render(<SubProcess updateSubProcess={[]} setOnModal={true} subProcess={data.data} />);
        const handleChange = jest.fn();
        const input = getByTestId('sub-process-name');
        fireEvent.change(input, { target: { value: 'test' } });
        const button = getByTestId('create-sub-process');
        button.click();
        const postData = {
            subProcessTitle: 'test',
            createdBy: 'string',
            parentProcessId: 0,
        };
        FetchApiPost.mockResolvedValueOnce(postData);
        const result = await FetchApiPost('services/TaskManagement/SubProcess/CreateSubProcess', 'POST', postData);
        expect(result).toEqual(postData);
    });
});
