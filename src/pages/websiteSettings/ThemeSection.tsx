import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { IToggleToastMessage, RootState } from "../../store/interfaces";
import { connect } from "react-redux";
import { toggleToastMessage } from "../../store/actions";
import http from "../../http";
const { MaterialPicker } = require("react-color");

const ColorPickerDemo = (props: IProps) => {
  const [colors, setColors] = useState({});
  const [isSaving, setIsSaving] = useState<boolean>(false);

  React.useEffect(() => {
    setColors(props.colors);
  }, [props.colors]);

  const handleColorChange = (color: any, key: any) => {
    setColors((prevColors) => ({
      ...prevColors,
      [key]: color.hex,
    }));
  };

  const handleSaveChanges = async () => {
    if (isSaving) {
      return;
    }
    try {
      setIsSaving(true);
      const response = await http.put(
        `/api/theme/${props.activeCompanyId}/colors`,
        { ...colors }
      );

      if (response.status >= 200 && response.status <= 299) {
        props.toggleToastMessage({
          message: "Changes to website images saved.",
          showToast: "success",
        });
      }
    } catch (e) {
      console.error("Error saving images", e);
      props.toggleToastMessage({
        message: "Error saving changes to website images. Please try again...",
        showToast: "error",
      });
    }
    setIsSaving(false);
  };

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        {Object.entries(colors).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <div style={{ display: "flex" }}>
                  <MaterialPicker
                    color={value}
                    onChange={(color: any) => handleColorChange(color, key)}
                  />
                  <div
                    style={{
                      // @ts-ignore
                      backgroundColor: value,
                      width: "100%",
                      marginLeft: "10px",
                      paddingBottom: "120px",
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveChanges}
        style={{ marginTop: "20px" }}
      >
        Save theme changes
      </Button>
    </Container>
  );
};
const mapState = (state: RootState): IMapState => ({
  colors: state.websiteSettings.theme.colors,
});
export default connect(mapState, { toggleToastMessage })(ColorPickerDemo);

interface IMapState {
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    primaryText: string;
    secondaryText: string;
  };
}

interface IActions {
  toggleToastMessage: (payload: IToggleToastMessage) => void;
}

interface IProps extends IActions, IMapState {
  activeCompanyId: string;
}
