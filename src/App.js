import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import firebase from "./services/firebase";

function App() {
  const [records, setRecords] = useState([]);
  const recordsRef = firebase.database().ref("registrations");

  useEffect(() => {
    recordsRef.on("value", (snapshot) => {
      setRecords(Object.values(snapshot.val()));
    });
  }, [recordsRef]);

  const updateStatus = (id, approvalStatus) => {
    recordsRef.child(id).update({'isApproved': !approvalStatus})
  };

  return (
    <div className="App">
      <h1 className="py-3 text-center">Dashboard</h1>
      <div className="mx-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Product ID</th>
              <th>Approval Status</th>
              <th>Update Approval</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, i) => {
              return (
                <tr key={i + 1}>
                  <td style={{ verticalAlign: "middle" }}>{i + 1}</td>
                  <td style={{ verticalAlign: "middle" }}>{record.name}</td>
                  <td style={{ verticalAlign: "middle" }}>{record.email}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {record.productId}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {record.isApproved ? "Approved" : "Not Approved"}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <Button onClick={() => updateStatus(record.id, record.isApproved)}>
                      {record.isApproved
                        ? "Unapprove Registration"
                        : "Approve Registration"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
