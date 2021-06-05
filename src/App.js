import { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import firebase from "./services/firebase"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import { InputAdornment, IconButton } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: window.innerHeight - 220
  }
})

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

function App() {
  const classes = useStyles()

  const [records, setRecords] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const recordsRef = firebase.database().ref("registrations")

  useEffect(() => {
    recordsRef.on("value", snapshot => {
      let data = Object.values(snapshot.val())
      
      data.forEach((row, index, arr) => {
        row.isApproved ? arr[index]['isApproved'] = "Approved" : arr[index]['isApproved'] = "Submitted"
      })

      setRecords(data)
    })
  }, [])

  const updateStatus = (id, approvalStatus) => {
    let boolApprovalStatus = approvalStatus === "Approved"
    recordsRef.child(id).update({ isApproved: !boolApprovalStatus })
  }

  const getTableRecords = () => {
    if(searchQuery === "")
      return records
    
    let matchingRecords = []

    records.forEach(record => {
      if(record.email.toLowerCase().includes(searchQuery.toLowerCase()))
        matchingRecords.push(record)
      else if(record.email.toLowerCase().includes(searchQuery.toLowerCase()))
        matchingRecords.push(record)
      else if(record.productId.toLowerCase().includes(searchQuery.toLowerCase()))
        matchingRecords.push(record)
      else if(record.isApproved.toLowerCase().includes(searchQuery.toLowerCase()))
        matchingRecords.push(record)
    })

    return matchingRecords
  }

  return (
    <div className="App">
      <center>
        <h1 style={{margin: '20px 0 10px'}}>Dashboard</h1>
        <div style={{ margin: "20px 0 50px 0", width: "85%" }}>
          <TextField
            size="small"
            label="Search"
            style={{ width: "100%" }}
            variant="outlined"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ display: searchQuery === "" ? "none" : "block" }}
                    onClick={() => setSearchQuery("")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                    </svg>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        <Paper style={{ width: "85%" }}>
          <TableContainer className={classes.container}>
            <Table style={{display: records.length > 0 ? "table" : 'none'}} stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>S.No.</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Product ID</StyledTableCell>
                  <StyledTableCell align="right">
                    Status
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Update Status
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {getTableRecords().length > 0 ? getTableRecords().map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.productId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.isApproved}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="text"
                        color={row.isApproved === "Approved" ? "secondary" : "primary"}
                        onClick={() => updateStatus(row.id, row.isApproved)}
                      >
                        {row.isApproved === "Approved"
                          ? "Unapprove Registration"
                          : "Approve Registration"}
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                )) : 
                <StyledTableRow>
                  <div style={{padding: '20px'}}>
                    No Matching Records Found
                  </div>
                </StyledTableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </center>
    </div>
  )
}

export default App
