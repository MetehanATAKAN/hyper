import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FetchApiPost } from '../../../../utils/http.helper';
import EmailEditor from 'react-email-editor';
export const template = {
    counters: {
        u_row: 13,
        u_column: 16,
        u_content_menu: 3,
        u_content_text: 11,
        u_content_image: 3,
        u_content_button: 4,
        u_content_social: 1,
        u_content_divider: 6,
    },
    body: {
        id: 'vQFjJtGKbF',
        rows: [
            {
                id: 'tOpezgYfPj',
                cells: [1],
                columns: [
                    {
                        id: '6ROpqM1F_Z',
                        contents: [
                            {
                                id: 'Vrk-4-a4An',
                                type: 'divider',
                                values: {
                                    width: '100%',
                                    border: {
                                        borderTopWidth: '0px',
                                        borderTopStyle: 'solid',
                                        borderTopColor: '#BBBBBB',
                                    },
                                    textAlign: 'center',
                                    containerPadding: '5px',
                                    anchor: '',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_divider_6',
                                        htmlClassNames: 'u_content_divider',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_16',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '',
                    backgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_13',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
            {
                id: 'tkHvxnNzBx',
                cells: [1, 1, 1],
                columns: [
                    {
                        id: 'jcPUtlDFTc',
                        contents: [
                            {
                                id: 'DJD7JR-9cf',
                                type: 'menu',
                                values: {
                                    containerPadding: '25px 10px 10px',
                                    anchor: '',
                                    menu: {
                                        items: [
                                            {
                                                key: '1606923979328',
                                                link: {
                                                    name: 'web',
                                                    values: {
                                                        href: '',
                                                        target: '_self',
                                                    },
                                                },
                                                text: 'NEWS',
                                            },
                                            {
                                                key: '1606924033905',
                                                link: {
                                                    name: 'web',
                                                    values: {
                                                        href: '',
                                                        target: '_self',
                                                    },
                                                },
                                                text: 'SERVICE',
                                            },
                                        ],
                                    },
                                    fontFamily: {
                                        label: 'Montserrat',
                                        value: "'Montserrat',sans-serif",
                                        url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                                        defaultFont: true,
                                    },
                                    fontSize: '14px',
                                    textColor: '#444444',
                                    linkColor: '#0068A5',
                                    align: 'center',
                                    layout: 'horizontal',
                                    separator: '',
                                    padding: '5px 15px',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_menu_3',
                                        htmlClassNames: 'u_content_menu',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_1',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                    {
                        id: 'gE0tuWNyA2',
                        contents: [
                            {
                                id: '2BrKfRmcag',
                                type: 'image',
                                values: {
                                    containerPadding: '20px 10px',
                                    anchor: '',
                                    src: {
                                        url: 'https://cdn.templates.unlayer.com/assets/1606906849237-logo.png',
                                        width: 248,
                                        height: 56,
                                        maxWidth: '77%',
                                        autoWidth: false,
                                    },
                                    textAlign: 'center',
                                    altText: 'Image',
                                    action: {
                                        name: 'web',
                                        values: {
                                            href: '',
                                            target: '_blank',
                                        },
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_image_1',
                                        htmlClassNames: 'u_content_image',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    _override: {
                                        mobile: {
                                            src: {
                                                maxWidth: '58%',
                                                autoWidth: false,
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_2',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                    {
                        id: 'lAOK0OQwxT',
                        contents: [
                            {
                                id: 'h7Ff5zsLvQ',
                                type: 'menu',
                                values: {
                                    containerPadding: '25px 10px 30px',
                                    anchor: '',
                                    menu: {
                                        items: [
                                            {
                                                key: '1606923979328',
                                                link: {
                                                    name: 'web',
                                                    values: {
                                                        href: '',
                                                        target: '_self',
                                                    },
                                                },
                                                text: 'ABOUT',
                                            },
                                            {
                                                key: '1606924033905',
                                                link: {
                                                    name: 'web',
                                                    values: {
                                                        href: '',
                                                        target: '_self',
                                                    },
                                                },
                                                text: 'CONTACT',
                                            },
                                        ],
                                    },
                                    fontFamily: {
                                        label: 'Montserrat',
                                        value: "'Montserrat',sans-serif",
                                        url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                                        defaultFont: true,
                                    },
                                    fontSize: '14px',
                                    textColor: '#444444',
                                    linkColor: '#0068A5',
                                    align: 'center',
                                    layout: 'horizontal',
                                    separator: '',
                                    padding: '5px 15px',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_menu_2',
                                        htmlClassNames: 'u_content_menu',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_3',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '#ffffff',
                    backgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_1',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
            {
                id: 'PLGK5slzga',
                cells: [1],
                columns: [
                    {
                        id: 'OKPAgpEw7c',
                        contents: [
                            {
                                id: '2dbGN8Llmi',
                                type: 'divider',
                                values: {
                                    width: '100%',
                                    border: {
                                        borderTopWidth: '0px',
                                        borderTopStyle: 'solid',
                                        borderTopColor: '#BBBBBB',
                                    },
                                    textAlign: 'center',
                                    containerPadding: '150px 10px 10px',
                                    anchor: '',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_divider_2',
                                        htmlClassNames: 'u_content_divider',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                },
                            },
                            {
                                id: 'zGQKysUXa6',
                                type: 'text',
                                values: {
                                    containerPadding: '10px',
                                    anchor: '',
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    lineHeight: '140%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_1',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong><span style="font-size: 44px; line-height: 61.6px;">NEW ARRIVAL</span></strong></span></p>',
                                },
                            },
                            {
                                id: 'qC7qZ81IUa',
                                type: 'button',
                                values: {
                                    containerPadding: '10px 10px 50px',
                                    anchor: '',
                                    href: {
                                        name: 'web',
                                        values: {
                                            href: '',
                                            target: '_blank',
                                        },
                                    },
                                    buttonColors: {
                                        color: '#463a41',
                                        backgroundColor: '#ffffff',
                                        hoverColor: '#FFFFFF',
                                        hoverBackgroundColor: '#3AAEE0',
                                    },
                                    size: {
                                        autoWidth: true,
                                        width: '100%',
                                    },
                                    textAlign: 'center',
                                    lineHeight: '120%',
                                    padding: '12px 22px',
                                    border: {},
                                    borderRadius: '0px',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_button_1',
                                        htmlClassNames: 'u_content_button',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<strong><span style="font-size: 14px; line-height: 16.8px;">VIEW MORE</span></strong>',
                                    calculatedWidth: 134,
                                    calculatedHeight: 40,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_5',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '',
                    backgroundImage: {
                        url: 'https://cdn.templates.unlayer.com/assets/1606924485372-1.jpg',
                        fullWidth: false,
                        repeat: false,
                        center: true,
                        cover: false,
                        width: 626,
                        height: 500,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_3',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
            {
                id: 'uYkT3VBOjG',
                cells: [1],
                columns: [
                    {
                        id: 'nox-fVULce',
                        contents: [
                            {
                                id: 'oVZxzpHYep',
                                type: 'text',
                                values: {
                                    containerPadding: '40px 10px 10px',
                                    anchor: '',
                                    textAlign: 'center',
                                    lineHeight: '140%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_2',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="line-height: 140%; font-size: 14px;"><span style="line-height: 33.6px; font-size: 24px; font-family: \'Playfair Display\', serif;"><span style="line-height: 33.6px; font-size: 24px;"><strong>Purchasing Focal Just got easier</strong></span></span></p>',
                                },
                            },
                            {
                                id: '3rV2cfJvO1',
                                type: 'text',
                                values: {
                                    containerPadding: '0px 10px 40px',
                                    anchor: '',
                                    textAlign: 'center',
                                    lineHeight: '140%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_11',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">Lorem ipsum dolor sit amet,&nbsp;</span></p>',
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_7',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '#ffffff',
                    backgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_5',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
            {
                id: '745WDOtWxL',
                cells: [1, 1],
                columns: [
                    {
                        id: '1u8s8mWWSg',
                        contents: [
                            {
                                id: '7G7AZkl93z',
                                type: 'image',
                                values: {
                                    containerPadding: '10px',
                                    anchor: '',
                                    src: {
                                        url: 'https://cdn.templates.unlayer.com/assets/1606934810497-02.png',
                                        width: 626,
                                        height: 418,
                                    },
                                    textAlign: 'center',
                                    altText: 'Image',
                                    action: {
                                        name: 'web',
                                        values: {
                                            href: '',
                                            target: '_blank',
                                        },
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_image_3',
                                        htmlClassNames: 'u_content_image',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                },
                            },
                            {
                                id: 'deiZln6_LE',
                                type: 'text',
                                values: {
                                    containerPadding: '10px 10px 0px',
                                    anchor: '',
                                    textAlign: 'center',
                                    lineHeight: '140%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_3',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">Ray-Ban</span></strong></span></p>',
                                },
                            },
                            {
                                id: '5ukERnukKi',
                                type: 'text',
                                values: {
                                    containerPadding: '10px',
                                    anchor: '',
                                    textAlign: 'center',
                                    lineHeight: '140%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_4',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">$20</span></strong></span></p>',
                                },
                            },
                            {
                                id: 'XaCmrOYKsG',
                                type: 'button',
                                values: {
                                    containerPadding: '10px',
                                    anchor: '',
                                    href: {
                                        name: 'web',
                                        values: {
                                            href: '',
                                            target: '_blank',
                                        },
                                    },
                                    buttonColors: {
                                        color: '#FFFFFF',
                                        backgroundColor: '#262425',
                                        hoverColor: '#FFFFFF',
                                        hoverBackgroundColor: '#3AAEE0',
                                    },
                                    size: {
                                        autoWidth: true,
                                        width: '100%',
                                    },
                                    textAlign: 'center',
                                    lineHeight: '120%',
                                    padding: '10px 20px',
                                    border: {},
                                    borderRadius: '0px',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_button_2',
                                        htmlClassNames: 'u_content_button',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<span style="font-size: 14px; line-height: 16.8px;">Buy Now</span>',
                                    calculatedWidth: 104,
                                    calculatedHeight: 36,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_6',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                    {
                        id: '24PT3Ah2vk',
                        contents: [
                            {
                                id: '0waVLfQNzM',
                                type: 'image',
                                values: {
                                    containerPadding: '10px',
                                    anchor: '',
                                    src: {
                                        url: 'https://cdn.templates.unlayer.com/assets/1606932761674-2.jpg',
                                        width: 626,
                                        height: 417,
                                    },
                                    textAlign: 'center',
                                    altText: 'Image',
                                    action: {
                                        name: 'web',
                                        values: {
                                            href: '',
                                            target: '_blank',
                                        },
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_image_2',
                                        htmlClassNames: 'u_content_image',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                },
                            },
                            {
                                id: 'w9L9W7nYlo',
                                type: 'text',
                                values: {
                                    containerPadding: '10px 10px 0px',
                                    anchor: '',
                                    textAlign: 'center',
                                    lineHeight: '140%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_5',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">Ray-Ban</span></strong></span></p>',
                                },
                            },
                            {
                                id: '7Cqk0GhlnW',
                                type: 'text',
                                values: {
                                    containerPadding: '10px',
                                    anchor: '',
                                    textAlign: 'center',
                                    lineHeight: '140%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_6',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">$25</span></strong></span></p>',
                                },
                            },
                            {
                                id: 'Ko-67gyh8-',
                                type: 'button',
                                values: {
                                    containerPadding: '10px',
                                    anchor: '',
                                    href: {
                                        name: 'web',
                                        values: {
                                            href: '',
                                            target: '_blank',
                                        },
                                    },
                                    buttonColors: {
                                        color: '#FFFFFF',
                                        backgroundColor: '#262425',
                                        hoverColor: '#FFFFFF',
                                        hoverBackgroundColor: '#3AAEE0',
                                    },
                                    size: {
                                        autoWidth: true,
                                        width: '100%',
                                    },
                                    textAlign: 'center',
                                    lineHeight: '120%',
                                    padding: '10px 20px',
                                    border: {},
                                    borderRadius: '0px',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_button_3',
                                        htmlClassNames: 'u_content_button',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<span style="font-size: 14px; line-height: 16.8px;">Buy Now</span>',
                                    calculatedWidth: 104,
                                    calculatedHeight: 36,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_10',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '#ffffff',
                    backgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_4',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
            {
                id: 'Bukp-wL9Tq',
                cells: [1],
                columns: [
                    {
                        id: 'DIZm4Mag5G',
                        contents: [
                            {
                                id: 'tTvJ8mRS5J',
                                type: 'text',
                                values: {
                                    containerPadding: '30px 30px 40px',
                                    anchor: '',
                                    textAlign: 'center',
                                    lineHeight: '160%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_7',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 14px; line-height: 22.4px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&nbsp;</span></p>',
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_11',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '#ffffff',
                    backgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_8',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
            {
                id: 'jQK99awn7R',
                cells: [1],
                columns: [
                    {
                        id: '3oqMnDwcvB',
                        contents: [
                            {
                                id: 'caNnD-E-CP',
                                type: 'text',
                                values: {
                                    containerPadding: '60px 30px 0px',
                                    anchor: '',
                                    color: '#ffffff',
                                    textAlign: 'left',
                                    lineHeight: '120%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_8',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 120%;"><span style="font-size: 32px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 32px;">ABOUT OUR</span></strong></span></p>\n<p style="font-size: 14px; line-height: 120%;"><span style="font-size: 32px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 32px;"> PRODUCT</span></strong></span></p>',
                                    _override: {
                                        mobile: {
                                            textAlign: 'center',
                                        },
                                    },
                                },
                            },
                            {
                                id: 'cKumwemqHf',
                                type: 'text',
                                values: {
                                    containerPadding: '22px 30px 10px',
                                    anchor: '',
                                    color: '#ffffff',
                                    textAlign: 'left',
                                    lineHeight: '140%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_9',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">Lorem ipsum dolor sit amet, consectetur </span></p>\n<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">adipiscing elit, sed do eiusmod tempor </span></p>\n<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">incididunt ut labore et dolore magna </span></p>\n<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><span style="line-height: 19.6px; font-size: 14px;">aliqua.</span><span style="line-height: 19.6px; font-size: 14px;">enim ad minim veniam, quis nostrud </span></span></p>\n<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><span style="line-height: 19.6px; font-size: 14px;">exercitation ullamco</span><span style="line-height: 19.6px; font-size: 14px;">&nbsp;</span></span></p>',
                                    _override: {
                                        mobile: {
                                            textAlign: 'center',
                                        },
                                    },
                                },
                            },
                            {
                                id: 'FG1hKimyyp',
                                type: 'button',
                                values: {
                                    containerPadding: '10px 30px 40px',
                                    anchor: '',
                                    href: {
                                        name: 'web',
                                        values: {
                                            href: '',
                                            target: '_blank',
                                        },
                                    },
                                    buttonColors: {
                                        color: '#252324',
                                        backgroundColor: '#ffffff',
                                        hoverColor: '#FFFFFF',
                                        hoverBackgroundColor: '#3AAEE0',
                                    },
                                    size: {
                                        autoWidth: true,
                                        width: '100%',
                                    },
                                    textAlign: 'left',
                                    lineHeight: '120%',
                                    padding: '12px 25px',
                                    border: {},
                                    borderRadius: '0px',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_button_4',
                                        htmlClassNames: 'u_content_button',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<strong><span style="font-size: 14px; line-height: 16.8px;">VIEW MORE</span></strong>',
                                    _override: {
                                        mobile: {
                                            textAlign: 'center',
                                        },
                                    },
                                    calculatedWidth: 139,
                                    calculatedHeight: 40,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_9',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '',
                    backgroundImage: {
                        url: 'https://cdn.templates.unlayer.com/assets/1606937518713-ASASS.png',
                        fullWidth: false,
                        repeat: false,
                        center: true,
                        cover: false,
                        width: 600,
                        height: 500,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_7',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
            {
                id: 'qeKgkENjiw',
                cells: [1],
                columns: [
                    {
                        id: '_O186QKYzg',
                        contents: [
                            {
                                id: '5XlEPqCM--',
                                type: 'divider',
                                values: {
                                    width: '100%',
                                    border: {
                                        borderTopWidth: '0px',
                                        borderTopStyle: 'solid',
                                        borderTopColor: '#BBBBBB',
                                    },
                                    textAlign: 'center',
                                    containerPadding: '15px',
                                    anchor: '',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_divider_4',
                                        htmlClassNames: 'u_content_divider',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_12',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '#ffffff',
                    backgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_9',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
            {
                id: 'fbHcf_ZXyK',
                cells: [1],
                columns: [
                    {
                        id: 'sR6ZsnZdEN',
                        contents: [
                            {
                                id: 'QXsZos0gWB',
                                type: 'text',
                                values: {
                                    containerPadding: '20px 10px 10px',
                                    anchor: '',
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    lineHeight: '140%',
                                    linkStyle: {
                                        inherit: true,
                                        linkColor: '#0000ee',
                                        linkHoverColor: '#0000ee',
                                        linkUnderline: true,
                                        linkHoverUnderline: true,
                                    },
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_text_10',
                                        htmlClassNames: 'u_content_text',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                    text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px; font-family: Montserrat, sans-serif;"><strong><span style="line-height: 19.6px; font-size: 14px;">FOLLOW&nbsp; US&nbsp; ON</span></strong></span></p>',
                                },
                            },
                            {
                                id: 'alKQu_pZ_Q',
                                type: 'social',
                                values: {
                                    containerPadding: '0px 10px 20px',
                                    anchor: '',
                                    icons: {
                                        iconType: 'circle-white',
                                        icons: [
                                            {
                                                url: 'https://facebook.com/',
                                                name: 'Facebook',
                                            },
                                            {
                                                url: 'https://instagram.com/',
                                                name: 'Instagram',
                                            },
                                            {
                                                url: 'https://twitter.com/',
                                                name: 'Twitter',
                                            },
                                        ],
                                        editor: {
                                            data: {
                                                showDefaultIcons: true,
                                                showDefaultOptions: true,
                                                customIcons: [],
                                                customOptions: [],
                                            },
                                        },
                                    },
                                    align: 'center',
                                    spacing: 10,
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_social_1',
                                        htmlClassNames: 'u_content_social',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_14',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '#d4ae7f',
                    backgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_11',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
            {
                id: 'mM5leqDP32',
                cells: [1],
                columns: [
                    {
                        id: 'oNKQg3v_m_',
                        contents: [
                            {
                                id: 'gQtrzSD2QW',
                                type: 'divider',
                                values: {
                                    width: '100%',
                                    border: {
                                        borderTopWidth: '0px',
                                        borderTopStyle: 'solid',
                                        borderTopColor: '#BBBBBB',
                                    },
                                    textAlign: 'center',
                                    containerPadding: '10px',
                                    anchor: '',
                                    hideDesktop: false,
                                    displayCondition: null,
                                    _meta: {
                                        htmlID: 'u_content_divider_5',
                                        htmlClassNames: 'u_content_divider',
                                    },
                                    selectable: true,
                                    draggable: true,
                                    duplicatable: true,
                                    deletable: true,
                                    hideable: true,
                                    hideMobile: false,
                                },
                            },
                        ],
                        values: {
                            _meta: {
                                htmlID: 'u_column_15',
                                htmlClassNames: 'u_column',
                            },
                            border: {},
                            padding: '0px',
                            backgroundColor: '',
                        },
                    },
                ],
                values: {
                    displayCondition: null,
                    columns: false,
                    backgroundColor: '',
                    columnsBackgroundColor: '',
                    backgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false,
                    },
                    padding: '0px',
                    anchor: '',
                    hideDesktop: false,
                    _meta: {
                        htmlID: 'u_row_12',
                        htmlClassNames: 'u_row',
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    hideMobile: false,
                    noStackMobile: false,
                },
            },
        ],
        values: {
            popupPosition: 'center',
            popupWidth: '600px',
            popupHeight: 'auto',
            borderRadius: '10px',
            contentAlign: 'center',
            contentVerticalAlign: 'center',
            contentWidth: '600px',
            fontFamily: {
                label: 'Montserrat',
                value: "'Montserrat',sans-serif",
                url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                defaultFont: true,
            },
            textColor: '#000000',
            popupBackgroundColor: '#FFFFFF',
            popupBackgroundImage: {
                url: '',
                fullWidth: true,
                repeat: false,
                center: true,
                cover: true,
            },
            popupOverlay_backgroundColor: 'rgba(0, 0, 0, 0.1)',
            popupCloseButton_position: 'top-right',
            popupCloseButton_backgroundColor: '#DDDDDD',
            popupCloseButton_iconColor: '#000000',
            popupCloseButton_borderRadius: '0px',
            popupCloseButton_margin: '0px',
            popupCloseButton_action: {
                name: 'close_popup',
                attrs: {
                    onClick: "document.querySelector('.u-popup-container').style.display = 'none';",
                },
            },
            backgroundColor: '#e8d4bb',
            backgroundImage: {
                url: '',
                fullWidth: true,
                repeat: false,
                center: true,
                cover: false,
            },
            preheaderText: '',
            linkStyle: {
                body: true,
                linkColor: '#0000ee',
                linkHoverColor: '#0000ee',
                linkUnderline: true,
                linkHoverUnderline: true,
            },
            _meta: {
                htmlID: 'u_body',
                htmlClassNames: 'u_body',
            },
        },
    },
    schemaVersion: 9,
};

const EditTemplate = () => {
    const emailEditorRef = useRef(null);
    const [id, setId] = useState();
    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;

            const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(design))}`;
            const link = document.createElement('a');
            link.href = jsonString;
            link.download = 'data.json';

            let buff = new Buffer(toString(design));
            let base64data = buff.toString('base64');

            let objJsonStr = JSON.stringify(design);
            let objJsonB64 = Buffer.from(objJsonStr).toString('base64');

            let objHtmlStr = JSON.stringify(html);
            let objHtmlB64 = Buffer.from(objHtmlStr).toString('base64');

            const saveDesignPage = {
                Id: localStorage.getItem('templateID'),
                JsonFile: objJsonB64,
                HtmlFile: objHtmlB64,
                ImageFile: objHtmlB64,
                IsApproved: 0,
                RejectReason: null,
                CreatedBy: localStorage.getItem('userName'),
            };

            FetchApiPost('services/Pages/Page/SaveDesignPage', 'POST', saveDesignPage);
        });
    };

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        emailEditorRef.current.editor.loadDesign(template);
    };

    const onReady = () => {
        // editor is ready
        // console.log('onReady');
        // console.log(template);
        // console.log(first);
        // emailEditorRef.current.loadDesign(template);
    };

    // useEffect(() => {
    //     FetchApiPost(`services/Pages/Page/GetDesignPageById?id=4`, 'GET')
    //         .then((response) => response.json())
    //         .then((response) => {
    //             let design = JSON.parse(response.data.jsonFile);
    //             emailEditorRef.current.loadDesign(design);
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    return (
        <div>
            {/* <div className="text-end p-2" style={{ backgroundColor: '#3B3B3B' }}>
                <Button onClick={exportHtml} className="btn-primary">
                    save
                </Button>
            </div> */}

            <EmailEditor
                ref={emailEditorRef}
                onLoad={onLoad}
                options={{
                    tools: {
                        button: {
                            enabled: false,
                        },
                        divider: {
                            enabled: false,
                        },
                        heading: {
                            enabled: false,
                        },
                        image: {
                            enabled: false,
                        },
                        menu: {
                            enabled: false,
                        },
                        text: {
                            enabled: false,
                        },
                        html: {
                            enabled: false,
                        },
                        column: {
                            enabled: false,
                        },
                    },
                    tabs: {
                        content: {
                            enabled: false,
                        },
                        blocks: {
                            enabled: false,
                        },
                        body: {
                            enabled: false,
                        },
                    },
                    appearance: {
                        panels: {
                            tools: {
                                dock: 'right',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default EditTemplate;
