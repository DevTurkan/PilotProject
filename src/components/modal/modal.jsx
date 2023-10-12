import React, { useState } from 'react';
import { Button, Modal, Input, Select, Form } from 'antd';

const ModalComponent = (props) => {
  const { isModalOpen, penrow, handleAdd, handleEdit, handleCancel, inputData, handleChange, handleSelect, selectData } = props;
  const { Option } = Select;

  return (
    <>
      <Modal title="Baslik" centered open={isModalOpen} onOk={!penrow ? handleAdd : handleEdit} onCancel={handleCancel}>
        <Form
          onSubmit={!penrow ? handleAdd : handleEdit}
          layout="vertical"
          style={{ width: "100%" }}
          autoComplete="off"
        >
          <Form.Item
            label="Len Bilgisi Giriniz"
          >
            <Input style={{ backgroundColor: "#d9d9d9", padding: "11px" }} value={inputData} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Status Seciniz"
          >
            <Select
              value={selectData}
              style={{ width: '100%' }}
              onChange={handleSelect}
            >
              {
                [0, 1, 2].map((item, ind) => <Option key={ind} value={item}>{item}</Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item>
            <Button style={{ display: "none" }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
};
export default ModalComponent;