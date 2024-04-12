import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";

function Users() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteUser(id);
      refetch();
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };
  return (
    <Row>
      {" "}
      <Col md={{ span: 10, offset: 1 }}>
        <LinkContainer to="/admindashboard">
          <Button variant="dark">Back</Button>
        </LinkContainer>
        <h2 className="text-center my-4">
          <strong>Users</strong>
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table bordered style={{ border: "2px solid black" }}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user?.firstName}</td>
                  <td> {user?.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>

                  <td>
                    <>
                      <LinkContainer to={`/user/${user._id}`}>
                        <Button className="btn-sm mx-1" variant="dark">
                          Edit
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm mx-1"
                        variant="danger"
                        onClick={() => deleteHandler(user._id)}
                      >
                        Delete
                      </Button>

                      {loadingDelete && <p>Loading...</p>}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Users;
