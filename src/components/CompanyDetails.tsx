import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ICompany, RootState } from "../store/interfaces";
import { connect } from "react-redux";

interface IProps extends IMapState {}

const CompanyDetails = ({ companyDetails }: IProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedDetails, setEditedDetails] =
    useState<ICompany>(companyDetails);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [field]: event.target.value,
    }));
  };

  const saveChanges = () => {
    // Implement logic to save changes, update Redux store, etc.
    console.log("Save changes:", editedDetails);
    // Assuming there's an action to update the company details in the Redux store
    // dispatch(updateCompanyDetails(editedDetails));
    setEditMode(false);
  };

  const company: ICompany = editMode ? editedDetails : companyDetails;

  if (!company?.name) {
    return <>None Selected</>;
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {company.name}
        </Typography>
        <Typography variant="subtitle1">{company.contact.person}</Typography>
        <Typography variant="body2" color="textSecondary">
          {company.contact.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {company.contact.phone}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {company.contact.website}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {company.clientPublicId}
        </Typography>
        {editMode ? (
          <>
            <TextField
              label="Address Line 1"
              variant="outlined"
              value={editedDetails.address.addressLine1}
              onChange={(e: any) =>
                handleInputChange(e, "address.addressLine1")
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address Line 2"
              variant="outlined"
              value={editedDetails.address.addressLine2}
              onChange={(e: any) =>
                handleInputChange(e, "address.addressLine2")
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              variant="outlined"
              value={editedDetails.address.city}
              onChange={(e: any) => handleInputChange(e, "address.city")}
              fullWidth
              margin="normal"
            />
            {/* Add other address fields as needed */}
          </>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Address: {company.address.addressLine1},{" "}
            {company.address.addressLine2}, {company.address.city},{" "}
            {company.address.state}, {company.address.zipcode},{" "}
            {company.address.country}
          </Typography>
        )}

        <Button onClick={editMode ? saveChanges : handleEditToggle}>
          {editMode ? "Save Changes" : "Edit Details"}
        </Button>
      </CardContent>
    </Card>
  );
};

const mapState = (state: RootState): IMapState => {
  const { activeCompanyId } = state.user;
  return {
    // @ts-ignore
    companyDetails: state.associatedCompanies.find(
      (company: ICompany) => company.id === activeCompanyId
    ),
    activeCompanyId: state.user.activeCompanyId,
  };
};

interface IMapState {
  companyDetails: ICompany;
}

export default connect(mapState)(CompanyDetails);
