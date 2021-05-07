/*
 * @File description: Templates and thumbnails of the middle and backstage management system

 * @Date: 2020-04-29 11:32:45

 * @LastEditTime: 2020-04-29 22:00:14
 */
import React, {useState, useContext} from'react';
import {Button, Tooltip, Modal} from'antd';
import {EyeOutlined, PlusOutlined} from'@ant-design/icons';
import classnames from'classnames';
import Context from'../../Context';
import templateList from'./template.json';
import styles from'./index.module.less';
import {Template} from'../../../../../interfaces/common';

export default () => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<string>();
  const [title, setTitle] = useState<string>();
  const {addTemplate, templateType} = useContext(Context);

  const previewImage = (image: string, title: string) => {
    setImage(image);
    setTitle(title);
    setVisible(true);
  };

  return (
    <div className={styles.row}>
      {(templateList as Template[]).map(template => (
        <div
          key={template.name}
          className={classnames(
            styles.col,
            templateType === template.type? styles.selected: null,
          )}
        >
          <div className={styles.hover}>
            <Tooltip title="Add template">
              <Button type="primary" onClick={() => addTemplate(template.type)}>
                <PlusOutlined />
              </Button>
            </Tooltip>
            <div style={{ marginRight: 15 }} />
            <Tooltip title="View large image">
              <Button type="primary" onClick={() => previewImage(template.image, template.name)}>
                <EyeOutlined />
              </Button>
            </Tooltip>
          </div>
          <div style={{ height: '100%' }}>
            <img src={template.image} alt={template.name} />
            <div className={styles.name}>{template.name}</div>
          </div>
        </div>
      ))}
      <Modal
        visible={visible}
        title={title}
        onCancel={() => setVisible(false)}
        width="80vw"
        centered
      >
        {image && <img src={image} style={{ width: '100%' }} />}
      </Modal>
    </div>
  );
};
