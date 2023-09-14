import React from 'react';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { Button } from '../../../../components/FormElements/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import '../../../../assets/scss/custom/settings/columnSettings.scss';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Checkbox, Skeleton, Col, Row } from 'antd';

const roleId = JSON.parse(localStorage.getItem('roleId'))[0];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: 0,
        width: 200,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));
const Columns = () => {
    const [selectPage, setSelectPage] = useState();
    const [optionsPage, setOptionsPage] = useState([]);
    const [pageTabs, setPageTabs] = useState([]);
    const [selectTab, setSelectTab] = useState();
    const [columns, setColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [isTabLoading, setIsTabLoading] = useState(false);
    const [isColumnLoading, setIsColumnLoading] = useState(false);
    const handleChangeTab = (event, nextView) => {
        setSelectTab(nextView);
    };
    const handleChangeColumn = (checkedValues) => {
        setSelectedColumns(checkedValues);
    };
    useEffect(() => {
        FetchApiGet(`services/AuthorizationSystem/Page/GetAllPagesByRoleId?id=${roleId}`, 'GET')
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then(({ data }) => {
                        const pages = data?.map((x) => ({ value: x.id, label: x.label }));
                        setOptionsPage(pages);
                        setSelectPage(pages[0]);
                    });
                }
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (!selectPage) return;
        setIsTabLoading(true);
        const postData = {
            pageId: selectPage?.value,
            roleId: roleId,
        };
        FetchApiPost('services/AuthorizationSystem/PageTab/GetPageTabsForRoleByPageId', 'POST', postData)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then(({ data }) => {
                        const pages = data?.map((x) => ({ value: x.id, label: x.tabName }));
                        setPageTabs(pages);
                        setIsTabLoading(false);
                    });
                }
            })
            .catch((err) => console.log(err));
    }, [selectPage]);

    useEffect(() => {
        if (!selectTab) return;
        setIsColumnLoading(true);
        const postData = {
            pageTabId: selectTab,
            roleId: roleId,
        };
        FetchApiPost(
            'services/AuthorizationSystem/RolePermissions/GetUnauthorizedColumnsInPageTabByRoleId',
            'POST',
            postData
        )
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then(({ data }) => {
                        const checkedColumns = data?.filter((x) => x.validStatus === true);
                        setColumns(data);
                        setIsColumnLoading(false);
                        setSelectedColumns(checkedColumns?.map((x) => x.id));
                    });
                }
            })
            .catch((err) => console.log(err));
    }, [selectTab]);

    const handleSave = () => {
        const unCheckedColumns = columns.filter((x) => !selectedColumns.includes(x.id));
        const postData = {
            columnIds: unCheckedColumns?.map((x) => x.id),
            pageTabId: selectTab,
            roleId: roleId,
        };
        FetchApiPost('services/AuthorizationSystem/RolePermissions/SaveUnauthorizedColumns', 'POST', postData)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then(({ data }) => {
                        console.log(data);
                    });
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <section className="column-settings-section">
            <div className="column-settings-section__pages-section">
                <SingleSelects
                    label={'Select Page'}
                    selectedItems={selectPage}
                    setSelectedItems={setSelectPage}
                    options={optionsPage}
                />
                <Skeleton paragraph={{ rows: 10 }} title={false} loading={isTabLoading} active>
                    <StyledToggleButtonGroup
                        orientation="vertical"
                        value={selectTab}
                        exclusive
                        onChange={handleChangeTab}>
                        {pageTabs?.map((x, i) => {
                            return (
                                <ToggleButton value={x.value} aria-label={x.value}>
                                    <span>{x.label}</span>
                                </ToggleButton>
                            );
                        })}
                    </StyledToggleButtonGroup>
                    <Button onClick={handleSave} className="save-btn" size="large" type="primary">
                        SAVE
                    </Button>
                </Skeleton>
            </div>
            <div className="column-settings-section__column-section">
                <Checkbox.Group
                    style={{
                        width: '100%',
                    }}
                    value={selectedColumns}
                    onChange={handleChangeColumn}>
                    <Row>
                        {columns?.map((x, i) => {
                            return (
                                <Col key={i} span={8}>
                                    <Checkbox key={x.id} value={x.id}>
                                        {x.key}
                                    </Checkbox>
                                </Col>
                            );
                        })}
                    </Row>
                </Checkbox.Group>
            </div>
        </section>
    );
};

export default Columns;
