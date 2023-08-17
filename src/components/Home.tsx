import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface HomeProps {
  setLoginAlert: React.Dispatch<React.SetStateAction<string>>;
}
interface resultProps {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}
const Home = (props: HomeProps) => {
  let user: { name: string };
  const navigate = useNavigate();
  const [result, setResult] = useState<resultProps[]>([]);
  const userFromLocalStorage = localStorage.getItem("user");
  user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : "";
  useEffect(() => {
    if (typeof userFromLocalStorage === "object") {
      props.setLoginAlert("Please Login to Access this Resource");
      navigate("/");
    } else {
      const api = async () => {
        const data = await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "GET",
        });
        const jsonData = await data.json();
        setResult(jsonData);
      };

      api();
    }
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "NAME", width: 200 },
    { field: "username", headerName: "USERNAME", width: 200 },
    { field: "email", headerName: "EMAIL", width: 200 },
    { field: "website", headerName: "WEBSITE", width: 200 },
    { field: "phone", headerName: "PHONE", width: 200 },
  ];
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography variant="h5" component="h5">
          Hey, {user?.name}
        </Typography>
        <DataGrid
          rows={result}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
};

export default Home;
