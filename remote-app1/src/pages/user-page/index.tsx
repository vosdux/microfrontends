import { Button, Row, Table } from "antd";
import React from "react";

const columns = [
  {
    dataIndex: "firstName",
    label: "name",
  },
  {
    dataIndex: "secondName",
    label: "second name",
  },
];

const data = [
  { firstName: 'a', secondName: 'b' },
  { firstName: 'c', secondName: 'd' }
]

const UserPage: React.FC = () => {
  return (
    <>
      <Row>
        <Button>Create user</Button>
      </Row>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default UserPage;
