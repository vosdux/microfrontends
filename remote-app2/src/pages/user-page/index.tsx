import { Button, Row, Table } from "antd";
import React from "react";

const columns = [
  {
    dataIndex: "age",
    label: "age",
  },
  {
    dataIndex: "position",
    label: "position",
  },
];

const data = [
  { age: '20', position: 'frontend developer' },
  { age: '31', position: 'backend developer' }
]

const UserPage: React.FC = () => {
  return (
    <>
      <Row>
        <Button>Create user1</Button>
      </Row>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default UserPage;
