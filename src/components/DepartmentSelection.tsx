import React, { useState } from "react";
import { FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const DepartmentSelection: React.FC = () => {
  const [departmentData, setDepartmentData] = useState([
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ]);

  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleExpand = (dept: string) => {
    if (expanded.includes(dept)) {
      setExpanded(expanded.filter((d) => d !== dept));
    } else {
      setExpanded([...expanded, dept]);
    }
  };

  const handleSelect = (dept: string, subDept: string) => {
    if (subDept === "") {
      // User selected a department
      const selectedSubDepartments = departmentData.find(
        (d) => d.department === dept
      )?.sub_departments;
      if (selectedSubDepartments) {
        if (selected.includes(dept)) {
          setSelected(selected.filter((d) => d !== dept));
          setSelected(
            selected.filter((d) => !selectedSubDepartments.includes(d))
          );
        } else {
          setSelected([...selected, dept]);
          setSelected([...selected, ...selectedSubDepartments]);
        }
      }
    } else {
      // User selected a sub-department
      if (selected.includes(subDept)) {
        setSelected(selected.filter((d) => d !== subDept));
      } else {
        setSelected([...selected, subDept]);
      }
    }
  };

  const isDeptChecked = (dept: string) => {
    const subDepartments = departmentData.find(
      (d) => d.department === dept
    )?.sub_departments;

    if (!subDepartments) {
      return selected.includes(dept);
    }

    const allSubDepartmentsSelected = subDepartments.every((subDept) =>
      selected.includes(subDept)
    );

    if (allSubDepartmentsSelected) {
      return true;
    } else if (subDepartments.some((subDept) => selected.includes(subDept))) {
      return "indeterminate";
    } else {
      return false;
    }
  };

  const isSubDeptChecked = (dept: string, subDept: string) =>
    selected.includes(subDept);

  return (
    <div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h5">
          Select Departments and Sub-Departments
        </Typography>
      </div>
      <List>
        {departmentData.map((dept) => {
          const deptChecked = isDeptChecked(dept.department);
          const isDeptExpanded = expanded.includes(dept.department);
          const subDepartments = departmentData.find(
            (d) => d.department === dept.department
          )?.sub_departments;

          return (
            <div key={dept.department}>
              <ListItem button onClick={() => handleExpand(dept.department)}>
                {isDeptExpanded ? ( // Render minus icon if department is expanded
                  <FaMinusSquare />
                ) : (
                  <Checkbox
                    checked={deptChecked === true}
                    indeterminate={deptChecked === "indeterminate"}
                    onChange={() => handleSelect(dept.department, "")}
                  />
                )}
                <ListItemText primary={dept.department} />
                {!subDepartments && selected.includes(dept.department) && (
                  <FaCheckSquare />
                )}
              </ListItem>

              <Collapse in={isDeptExpanded} timeout="auto">
                <List component="div" disablePadding>
                  {dept.sub_departments.map((subDept) => (
                    <ListItem
                      key={subDept}
                      button
                      sx={{ marginLeft: 4 }}
                      onClick={() => handleSelect(dept.department, subDept)}
                    >
                      <Checkbox
                        checked={isSubDeptChecked(dept.department, subDept)}
                        onChange={() => handleSelect(dept.department, subDept)}
                      />
                      <ListItemText primary={subDept} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default DepartmentSelection;
