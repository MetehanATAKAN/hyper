import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import '../../../../assets/scss/custom/settings/manageBar.scss';
import Icon from '@mdi/react';
import { mdiDeleteOutline, mdiPencil, mdiPlus, mdiRefresh } from '@mdi/js';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddModal from './AddModal';
import ResetModal from './ResetModal';
import ActionModal from '../../../../components/Modals/ActionModal';
import EditModal from './EditModal';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useDispatch } from 'react-redux';
import { menu_items } from '../../../../redux/settings/actions';
import { useHistory } from 'react-router-dom';

const ManageLeftBar = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [item, setItem] = useState(null);
    const [selectHomePage, setSelectHomePage] = useState();
    const [pages, setPages] = useState([]);
    const userName = localStorage.getItem('userName');
    const getMenu = () => {
        FetchApiGet('services/AuthorizationSystem/ManageLeftBar/GetManageLeftBar', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    const arr = [...data.modules, ...data.pages].sort((a, b) => {
                        return a.order - b.order;
                    });
                    const newArr = arr.map((el, i) => {
                        return { ...el, isTitle: false };
                    });
                    setPages(newArr);
                    // send menu bar
                    const module = data.modules.filter((el) => el.status !== false);
                    const page = data.pages.filter((el) => el.status !== false);
                    const newLeftBarArr = [...module, ...page].sort((a, b) => {
                        return a.order - b.order;
                    });
                    const newBarArr = newLeftBarArr.map((el, i) => {
                        return { ...el, isTitle: false };
                    });
                    dispatch(menu_items(newBarArr));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    useEffect(() => {
        FetchApiGet('services/AuthorizationSystem/ManageLeftBar/GetManageLeftBar', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    const arr = [...data.modules, ...data.pages].sort((a, b) => {
                        return a.order - b.order;
                    });
                    const newArr = arr.map((el, i) => {
                        return { ...el, isTitle: false };
                    });
                    setPages(newArr);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        const findObject = (data, id) => {
            let foundObject = data.find((item) => item.key === id);
            if (!foundObject) {
                data.forEach((item) => {
                    if (item.pages) {
                        foundObject = item.pages.find((child) => child.key === id);
                        if (foundObject) return foundObject;
                    }
                });
            }
            return foundObject;
        };
        const findChildIndex = (data, id, itemId) => {
            const parent = data.find((item) => item.key === id);
            if (!parent || !parent.pages) return -1;
            return parent.pages.findIndex((child) => child.key === draggedId);
        };
        // Sürüklenip bırakma işlemi gerçekleşmedi
        if (!result.destination) {
            return;
        }
        // Sürüklenip bırakılan item'ın yeni pozisyonunu ve hedef item'ı al
        const { source, destination } = result;
        const draggedId = result.draggableId;
        const draggedItem = findObject(pages, draggedId);
        // Sürüklenip bırakılan item'ın index'ini ve hedef item'ın index'ini al
        const sourceIndex = source.index;
        const destinationIndex = destination.index;
        //sürüklenip bırakılan item
        if (destination.droppableId !== source.droppableId) {
            const targetGroup = pages.find((i) => i.key === destination.droppableId);
            if (source.droppableId === 'groups' && !draggedItem.hasOwnProperty('pages')) {
                if (targetGroup) {
                    targetGroup.pages = [
                        ...targetGroup.pages,
                        { ...draggedItem, parentKey: destination.droppableId, order: destinationIndex + 1 },
                    ];
                    setPages([...pages.filter((i) => i.key !== draggedId)]);
                    return;
                }
            }

            if (source.droppableId !== 'groups') {
                if (targetGroup) {
                    // grubun içine sürüklenen itemın grup içindeki index'ini al
                    // const sourceGroup = items.find((i) => i.pages && i.pages.includes(draggedId));
                    const sourceGroup = pages.find((i) => i.key === source.droppableId);
                    const sourceGroupIndex = pages.indexOf(sourceGroup);
                    // grup içinden çıkarılacak itemın index'ini al
                    // const sourceItemIndex = sourceGroup.pages.indexOf(draggedId);
                    const sourceItemIndex = findChildIndex(pages, sourceGroup.key, draggedId);
                    const sourceItem = sourceGroup.pages?.find((el) => el.key === draggedId);
                    // itemı grubun içinden çıkar
                    sourceGroup.pages.splice(sourceItemIndex, 1);
                    // itemı hedef grupun içine ekle

                    targetGroup.pages = [
                        ...targetGroup.pages,
                        { ...sourceItem, parentKey: targetGroup.key, order: destinationIndex + 1 },
                    ];
                    // items dizisini güncelle
                    const newItems = [...pages];
                    newItems.splice(sourceGroupIndex, 1, sourceGroup);
                    setPages(newItems);
                    return;
                }
            }
        }

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId !== 'groups') {
                const group = pages.find((i) => i.key === source.droppableId);
                if (group) {
                    const newChildren = [...group.pages];
                    newChildren.splice(destinationIndex, 0, newChildren.splice(sourceIndex, 1)[0]);
                    setPages(
                        pages.map((item) => {
                            if (item.key === group.key) {
                                return { ...item, pages: newChildren };
                            }
                            return item;
                        })
                    );
                }
                return;
            }

            if (source.droppableId === 'groups') {
                const arr = reorder(pages, sourceIndex, destinationIndex);
                setPages(arr);
                return;
            }
        }

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === 'groups') {
                const sourceGroup = pages.find((i) => i.key === source.droppableId);
                if (sourceGroup) {
                    // // itemı grubun içinden çıkar
                    const sourceItem = sourceGroup.pages?.find((el) => el.key === draggedId);
                    sourceGroup.pages = sourceGroup.pages.filter((item) => item.key !== draggedId);
                    // // itemı gruplar dizisine ekle
                    // setPages([{ id: draggedId, content: draggedId }, ...items]);
                    delete sourceItem.parentKey;
                    // return;
                    pages.splice(destinationIndex, 0, sourceItem);
                    setPages(pages);
                }
            }
        }
        if (source.droppableId !== destination.droppableId) {
            if (draggedId === destination.droppableId) {
                const arr = reorder(pages, sourceIndex, destinationIndex);
                setPages(arr);
                return;
            } else {
                const test = pages.findIndex((el) => el.key === destination.droppableId);
                const arr = reorder(pages, sourceIndex, test + 1);
                setPages(arr);
                return;
            }
        }
        // Sürüklenip bırakılan item bir grup içinden diğerine sürükleniyorsa
        if (source.droppableId === destination.droppableId && source.droppableId !== 'groups') {
            const group = pages.find((i) => i.key === source.droppableId);
            if (group) {
                const newChildren = [...group.pages];
                newChildren.splice(destinationIndex, 0, draggedId);
                newChildren.splice(sourceIndex, 1);
                setPages(
                    pages.map((item) => {
                        if (item.key === group.key) {
                            return { ...item, pages: newChildren };
                        }
                        return item;
                    })
                );
                return;
            }
        }
        return;
    };
    const userEmpId = localStorage.getItem('userEmpId');
    const getLeftMenuItems = () => {
        FetchApiGet(`services/AuthorizationSystem/ManageLeftBar/GetUsingLeftBar?id=${userEmpId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    if (data.modules !== null) {
                        const arr = [...data?.modules].sort((a, b) => {
                            return a.order - b.order;
                        });
                        const newArr = arr.map((el, i) => {
                            return { ...el, isTitle: false };
                        });
                        dispatch(menu_items(newArr));
                    }
                    if (data.pages !== null) {
                        const arr = [...data?.pages].sort((a, b) => {
                            return a.order - b.order;
                        });
                        const newArr = arr.map((el, i) => {
                            return { ...el, isTitle: false };
                        });
                        dispatch(menu_items(newArr));
                    }
                    if (data.modules !== null && data.pages !== null) {
                        const arr = [...data?.modules, ...data?.pages].sort((a, b) => {
                            return a.order - b.order;
                        });
                        const newArr = arr.map((el, i) => {
                            return { ...el, isTitle: false };
                        });
                        dispatch(menu_items(newArr));
                    }
                });
            }
        });
    };
    const handleSaveButton = () => {
        const pageArr = pages
            .map((obj, i) => {
                if (!obj.pages) {
                    return { ...obj, order: i };
                }
                if (obj.pages) {
                    const arr = obj.pages.map((el, i) => {
                        return { ...el, order: i };
                    });
                    return arr;
                }
            })
            .flat();
        const moduleArr = pages
            .map((obj, i) => {
                if (obj.pages) {
                    return { ...obj, order: i };
                }
            })
            .filter((el) => el !== undefined);
        const data = {
            pages: pageArr.map((el) => ({
                moduleKey: el.parentKey !== null ? String(el.parentKey) : null,
                key: el.key,
                order: el.order,
                status: el.status,
            })),
            modules: moduleArr.map((el) => ({
                key: String(el.key),
                order: el.order,
                status: el.status,
            })),
        };
        FetchApiPost('services/AuthorizationSystem/ManageLeftBar/UpdateManageLeftBar', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    const arr = [...data.modules, ...data.pages].sort((a, b) => {
                        return a.order - b.order;
                    });
                    const newArr = arr.map((el, i) => {
                        return { ...el, isTitle: false };
                    });
                    setPages(newArr);
                    // send menu bar
                    const module = data.modules.map((el) => {
                        if (el.status !== false) {
                            const newPages = el.pages.filter((x) => x.status !== false);
                            return { ...el, pages: newPages };
                        }
                        return false;
                    });
                    const module2 = module.filter((x) => x !== false);
                    const page = data.pages.filter((el) => el.status !== false);
                    const newLeftBarArr = [...module2, ...page].sort((a, b) => {
                        return a.order - b.order;
                    });
                    const newBarArr = newLeftBarArr.map((el, i) => {
                        return { ...el, isTitle: false };
                    });
                    // dispatch(menu_items(newBarArr));
                    getLeftMenuItems();
                });
            }
        });
    };
    const openAddModal = () => {
        setShowAddModal(true);
        handleSaveButton();
    };
    const statusChange = (id, childId, isChild) => {
        if (!isChild) {
            const arr = pages.map((el) => {
                if (el.id === id) {
                    if (!el.pages) {
                        return { ...el, status: !el.status };
                    }
                    if (el.pages) {
                        const child = el.pages.map((child) => {
                            return { ...child, status: !el.status };
                        });
                        return { ...el, status: !el.status, pages: child };
                    }
                }
                return el;
            });
            setPages(arr);
        }
        if (isChild) {
            const arr = pages.map((el) => {
                if (el.id === id) {
                    const child = el.pages.map((child) => {
                        if (child.id === childId) {
                            return { ...child, status: !child.status };
                        }
                        return child;
                    });
                    const status = child.some((x) => x.status === true);
                    return { ...el, status: status, pages: child };
                }
                return el;
            });
            setPages(arr);
        }
    };
    return (
        <>
            <div className="card">
                <div id="manage-bar-top-container">
                    <SingleSelects
                        selectedItems={selectHomePage}
                        setSelectedItems={setSelectHomePage}
                        options={[]}
                        label="Your Home Page"
                        width={'25%'}
                    />
                    <div className="manage-container">
                        <div className="manage-container__header">
                            <div className="manage-container__header__title">
                                <span className="header">{t('Manage items in the left navigation bar')}</span>
                                <span className="content">
                                    {t(
                                        'You can show hide and reorder items in the left nav bar for this role. You can also add, remove and rename groups.'
                                    )}
                                </span>
                            </div>
                            <div className="manage-container__header__buttons">
                                <Button
                                    variant="light"
                                    style={{ backgroundColor: '#CED4DA', color: '#fff' }}
                                    className="me-1"
                                    onClick={() => setShowResetModal(true)}>
                                    {t('reset to default')}
                                    <Icon path={mdiRefresh} size={0.7} title={t('reset')} />
                                </Button>
                                <Button onClick={openAddModal}>
                                    {t('add group')}
                                    <Icon path={mdiPlus} size={0.7} title={t('add')} />
                                </Button>
                            </div>
                        </div>
                        <div className="drag-drop-container">
                            {pages.length > 0 && (
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="groups">
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {pages?.map((item, index) => (
                                                    <Draggable key={item.key} draggableId={item.key} index={index}>
                                                        {(provided) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps}>
                                                                <div
                                                                    style={{
                                                                        backgroundColor: item.pages
                                                                            ? '#EEF2F7'
                                                                            : '#fff',
                                                                        border: '1px solid #DEE2E6',
                                                                        height: '40px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        fontWeight: item.pages ? 600 : 'normal',
                                                                        color: '#6C757D',
                                                                        width: '100%',
                                                                    }}>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            width: '100%',
                                                                        }}>
                                                                        <span>
                                                                            <i
                                                                                {...provided.dragHandleProps}
                                                                                style={{
                                                                                    marginRight: '8px',
                                                                                    marginLeft: '24px',
                                                                                }}
                                                                                className="fas fa-grip-vertical"></i>
                                                                            <i
                                                                                onClick={() =>
                                                                                    statusChange(item.id, false)
                                                                                }
                                                                                style={{
                                                                                    marginRight: '8px',
                                                                                    cursor: 'pointer',
                                                                                    opacity:
                                                                                        item.status === true
                                                                                            ? '1'
                                                                                            : '0.5',
                                                                                }}
                                                                                className={
                                                                                    item.status === true
                                                                                        ? 'far fa-eye'
                                                                                        : 'far fa-eye-slash'
                                                                                }></i>
                                                                            <i
                                                                                style={{
                                                                                    marginRight: '8px',
                                                                                }}
                                                                                className={item.icon}></i>
                                                                            {t(item.label)}
                                                                        </span>
                                                                        <div
                                                                            style={{
                                                                                marginLeft: 'auto',
                                                                                marginRight: '24px',
                                                                            }}>
                                                                            {item.pages && (
                                                                                <>
                                                                                    <Icon
                                                                                        path={mdiPencil}
                                                                                        size={0.7}
                                                                                        title={t('edit')}
                                                                                        onClick={() => {
                                                                                            setShowEditModal(true);
                                                                                            setItem(item);
                                                                                        }}
                                                                                    />
                                                                                    <Icon
                                                                                        path={mdiDeleteOutline}
                                                                                        size={0.7}
                                                                                        title={t('delete')}
                                                                                        onClick={() => {
                                                                                            setShowDeleteModal(true);
                                                                                            setItem(item);
                                                                                        }}
                                                                                    />
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div style={{ marginBottom: '15px' }}>
                                                                    {item.pages && (
                                                                        <Droppable droppableId={item.key}>
                                                                            {(provided) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.droppableProps}>
                                                                                    {item.pages.map((child, index) => (
                                                                                        <Draggable
                                                                                            key={child.key}
                                                                                            draggableId={child.key}
                                                                                            index={index}>
                                                                                            {(provided) => (
                                                                                                <div
                                                                                                    ref={
                                                                                                        provided.innerRef
                                                                                                    }
                                                                                                    {...provided.draggableProps}>
                                                                                                    <div
                                                                                                        style={{
                                                                                                            border: '1px solid #DEE2E6',
                                                                                                            height: '40px',
                                                                                                            display:
                                                                                                                'flex',
                                                                                                            alignItems:
                                                                                                                'center',
                                                                                                            color: '#6C757D',
                                                                                                        }}>
                                                                                                        <i
                                                                                                            {...provided.dragHandleProps}
                                                                                                            style={{
                                                                                                                marginRight:
                                                                                                                    '8px',
                                                                                                                marginLeft:
                                                                                                                    '24px',
                                                                                                            }}
                                                                                                            className="fas fa-grip-vertical"></i>
                                                                                                        <i
                                                                                                            onClick={() =>
                                                                                                                statusChange(
                                                                                                                    item.id,
                                                                                                                    child.id,
                                                                                                                    true
                                                                                                                )
                                                                                                            }
                                                                                                            style={{
                                                                                                                marginRight:
                                                                                                                    '8px',
                                                                                                                cursor: 'pointer',
                                                                                                                opacity:
                                                                                                                    child.status ===
                                                                                                                    true
                                                                                                                        ? '1'
                                                                                                                        : '0.5',
                                                                                                            }}
                                                                                                            className={
                                                                                                                child.status ===
                                                                                                                true
                                                                                                                    ? 'far fa-eye'
                                                                                                                    : 'far fa-eye-slash'
                                                                                                            }></i>
                                                                                                        {t(child.label)}
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </Draggable>
                                                                                    ))}
                                                                                    {provided.placeholder}
                                                                                </div>
                                                                            )}
                                                                        </Droppable>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            )}
                        </div>
                        <div className="drag-drop-container__buttons">
                            {/* <Button variant="light" className="me-1">
                                {t('cancel')}
                            </Button> */}
                            <Button onClick={handleSaveButton}>{t('save')}</Button>
                        </div>
                    </div>
                </div>
            </div>
            {showAddModal && (
                <AddModal
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    index={pages.length}
                    setPages={setPages}
                    pages={pages}
                />
            )}
            {showResetModal && <ResetModal showModal={showResetModal} setShowModal={setShowResetModal} />}
            {showEditModal && (
                <EditModal showModal={showEditModal} setShowModal={setShowEditModal} item={item} getMenu={getMenu} />
            )}
            {showDeleteModal && (
                <ActionModal
                    type="delete"
                    setShowModal={setShowDeleteModal}
                    showModal={showDeleteModal}
                    url={'services/AdminPanel/Module/DeleteModule'}
                    postData={{ key: item.key, modifiedBy: userName }}
                    dataName={item.label}
                    handleData={getMenu}
                />
            )}
        </>
    );
};

export default ManageLeftBar;
