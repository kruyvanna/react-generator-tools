/*
 * @文件描述: 对表格的列的操作
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-30 11:31:49
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-05-14 11:44:43
 */
import { useState } from 'react';
import { ColumnType } from 'antd/lib/table';
import { useImmer } from 'use-immer';

export default function useTable() {
  const [columns, setColumns] = useImmer([]);
  const [index, setIndex] = useState<number>(0); // 当前选中的表单元素的index
  const [currentColumn, setCurrentColumn] = useState(); // 当前选中的表单元素

  /**
   * 上移表单项
   * @param index
   */
  const moveUp = (index: number) => () => {
    if (index === 0) return;

    setColumns(draft => {
      // 拿到这个index对应的item
      const column = draft.splice(index, 1);
      // 插入回去
      draft.splice(index - 1, 0, ...column);
    });
  };
  /**
   * 下移表单项
   * @param index
   */
  const moveDown = (index: number) => () => {
    if (index === columns.length - 1) return;

    setColumns(draft => {
      // 拿到这个index对应的item
      const column = draft.splice(index, 1);
      // 插入回去
      draft.splice(index + 1, 0, ...column);
    });
  };
  /**
   * 配置表格列
   * @param formItem
   * @param index
   */
  const configColumn = (column: ColumnType<never>, index: number) => {
    setIndex(index);
    setCurrentColumn(column as any);
  };

  /** 配置完成 */
  const handleConfirm = (columnProps: ColumnType<any>) => {
    setColumns(draft => {
      const column = draft.find((item:any) => item?.dataIndex === columnProps.dataIndex);
      if (!currentColumn && !column) {
        draft.push(columnProps as never);
      } else {
        //@ts-ignore
        draft[index] = columnProps;
      }
    });
  };

  /**
   * 删除配置项
   * @param index
   */
  const deleteColumn = (index: number) => () => {
    setColumns(draft => {
      draft.splice(index, 1);
    });
  };

  /**
   * 复制配置项
   * @param index
   */
  const copyColumn = (index: number) => () => {
    setColumns(draft => {
      const column = draft[index];
      draft.splice(index + 1, 0, column);
    });
  };

  return {
    columns,
    setColumns,
    moveUp,
    moveDown,
    configColumn,
    deleteColumn,
    copyColumn,
    index,
    setIndex,
    currentColumn,
    setCurrentColumn,
    onConfirm: handleConfirm,
  };
}
