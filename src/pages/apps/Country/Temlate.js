export const template = {
    counters: {
      u_column: 1,
      u_row: 1,
      u_content_custom_dy_recommendation: 1,
      u_content_divider: 2,
      u_content_text: 1,
      u_content_button: 1,
      u_content_image: 2
    },
    body: {
      rows: [
        {
          cells: [1],
          columns: [
            {
              contents: [
                {
                  type: "text",
                  values: {
                    containerPadding: "10px",
                    _meta: {
                      htmlID: "u_content_text_1",
                      htmlClassNames: "u_content_text"
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    color: "#000000",
                    textAlign: "left",
                    lineHeight: "140%",
                    linkStyle: {
                      inherit: true,
                      linkColor: "#0000ee",
                      linkHoverColor: "#0000ee",
                      linkUnderline: true,
                      linkHoverUnderline: true
                    },
                    hideDesktop: false,
                    hideMobile: false,
                    text:
                      '<p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 40px; line-height: 56px;"><strong><span style="line-height: 56px; font-size: 40px;">My super email!</span></strong></span></p>'
                  }
                },
                {
                  type: "image",
                  values: {
                    containerPadding: "10px",
                    _meta: {
                      htmlID: "u_content_image_2",
                      htmlClassNames: "u_content_image"
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    src: {
                      url:
                        "https://s3.amazonaws.com/unroll-images-production/projects%2F9788%2F1611584020083-344508",
                      width: 640,
                      height: 484,
                      autoWidth: false,
                      maxWidth: "30%"
                    },
                    textAlign: "center",
                    altText: "Image",
                    action: {
                      name: "web",
                      values: {
                        href: "",
                        target: "_blank"
                      }
                    },
                    hideDesktop: false,
                    hideMobile: false,
                    pending: false
                  }
                },
                {
                  type: "divider",
                  values: {
                    containerPadding: "10px",
                    _meta: {
                      htmlID: "u_content_divider_1",
                      htmlClassNames: "u_content_divider"
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    width: "100%",
                    border: {
                      borderTopWidth: "1px",
                      borderTopStyle: "solid",
                      borderTopColor: "#BBBBBB"
                    },
                    textAlign: "center",
                    hideDesktop: false,
                    hideMobile: false
                  }
                },
                {
                  type: "custom",
                  slug: "dy_recommendation",
                  values: {
                    containerPadding: "10px",
                    _meta: {
                      htmlID: "u_content_custom_dy_recommendation_1",
                      htmlClassNames: "u_content_custom_dy_recommendation"
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideDesktop: false,
                    hideMobile: false,
                    html: ""
                  }
                },
                {
                  type: "custom",
                  slug: "dy_recommendation",
                  values: {
                    containerPadding: "10px",
                    _meta: {
                      htmlID: "u_content_custom_dy_recommendation_2",
                      htmlClassNames: "u_content_custom_dy_recommendation"
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideDesktop: false,
                    hideMobile: false,
                    html: ""
                  }
                },
                {
                  type: "divider",
                  values: {
                    containerPadding: "10px",
                    _meta: {
                      htmlID: "u_content_divider_2",
                      htmlClassNames: "u_content_divider"
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    width: "100%",
                    border: {
                      borderTopWidth: "1px",
                      borderTopStyle: "solid",
                      borderTopColor: "#BBBBBB"
                    },
                    textAlign: "center",
                    hideDesktop: false,
                    hideMobile: false
                  }
                },
                {
                  type: "button",
                  values: {
                    containerPadding: "10px",
                    _meta: {
                      htmlID: "u_content_button_1",
                      htmlClassNames: "u_content_button"
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    href: {
                      name: "web",
                      values: {
                        href: "",
                        target: "_blank"
                      }
                    },
                    buttonColors: {
                      color: "#FFFFFF",
                      backgroundColor: "#3AAEE0",
                      hoverColor: "#FFFFFF",
                      hoverBackgroundColor: "#3AAEE0"
                    },
                    size: {
                      autoWidth: true,
                      width: "100%"
                    },
                    lineHeight: "120%",
                    textAlign: "center",
                    border: {},
                    borderRadius: "4px",
                    padding: "10px 20px",
                    hideDesktop: false,
                    hideMobile: false,
                    text:
                      '<span style="font-size: 14px; line-height: 16.8px;">Open something</span>',
                    calculatedWidth: 142,
                    calculatedHeight: 36
                  }
                }
              ],
              values: {
                backgroundColor: "",
                padding: "0px",
                border: {},
                _meta: {
                  htmlID: "u_column_1",
                  htmlClassNames: "u_column"
                }
              }
            }
          ],
          values: {
            displayCondition: null,
            columns: false,
            backgroundColor: "",
            columnsBackgroundColor: "",
            backgroundImage: {
              url: "",
              fullWidth: true,
              repeat: false,
              center: true,
              cover: false
            },
            padding: "0px",
            hideDesktop: false,
            hideMobile: false,
            noStackMobile: false,
            _meta: {
              htmlID: "u_row_1",
              htmlClassNames: "u_row"
            },
            selectable: true,
            draggable: true,
            duplicatable: true,
            deletable: true
          }
        }
      ],
      values: {
        backgroundColor: "#e7e7e7",
        backgroundImage: {
          url: "",
          fullWidth: true,
          repeat: false,
          center: true,
          cover: false
        },
        contentWidth: "500px",
        contentAlign: "center",
        fontFamily: {
          label: "Arial",
          value: "arial,helvetica,sans-serif"
        },
        preheaderText: "",
        linkStyle: {
          body: true,
          linkColor: "#0000ee",
          linkHoverColor: "#0000ee",
          linkUnderline: true,
          linkHoverUnderline: true
        },
        _meta: {
          htmlID: "u_body",
          htmlClassNames: "u_body"
        }
      }
    },
    schemaVersion: 5
  };
  