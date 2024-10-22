import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { IToggleToastMessage, RootState } from "../../store/interfaces";
import { connect } from "react-redux";
import { toggleToastMessage } from "../../store/actions";
import http from "../../http";

const ImageManagement = (props: IProps) => {
  console.log(props)
  const [logoUrl, setLogoUrl] = useState(props.logos.src);
  const [logoAlt, setLogoAlt] = useState(props.logos.alt);

  // const [faviconUrl, setFaviconUrl] = useState(props.logos.src);
  // const [faviconAlt, setFaviconAlt] = useState(props.logos.alt);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  React.useEffect(() => {
    setLogoAlt(props.logos.alt);
    setLogoUrl(props.logos.src);
  }, [props.logos]);

  const handleLogoUrlChange = (event: any) => {
    setLogoUrl(event.target.value);
  };

  const handleLogoAltChange = (event: any) => {
    setLogoAlt(event.target.value);
  };

  // const handleFaviconUrlChange = (event: any) => {
  //   setFaviconUrl(event.target.value);
  // };
  //
  // const handleFaviconAltChange = (event: any) => {
  //   setFaviconAlt(event.target.value);
  // };

  const handleSaveData = async () => {
    if (isSaving) {
      return;
    }
    try {
      setIsSaving(true);
      const data = {
        src: logoUrl,
        alt: logoAlt,
      };
      const response = await http.put(
        `/api/theme/${props.activeCompanyId}/logo`,
        data
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/*<Grid item xs={12} sm={6} md={4}>*/}
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={logoUrl}
              alt={logoAlt}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Company Logo
              </Typography>
              <TextField
                fullWidth
                label="Image URL"
                value={logoUrl}
                onChange={handleLogoUrlChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Alt Text"
                value={logoAlt}
                onChange={handleLogoAltChange}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>
        {/*<Grid item xs={12} md={6}>*/}
        {/*  <Card>*/}
        {/*    <CardMedia*/}
        {/*      component="img"*/}
        {/*      height="140"*/}
        {/*      image={faviconUrl}*/}
        {/*      alt={faviconAlt}*/}
        {/*    />*/}
        {/*    <CardContent>*/}
        {/*      <Typography variant="h6" gutterBottom>*/}
        {/*        Website Favicon*/}
        {/*      </Typography>*/}
        {/*      <TextField*/}
        {/*        fullWidth*/}
        {/*        label="Image URL"*/}
        {/*        value={faviconUrl}*/}
        {/*        onChange={handleFaviconUrlChange}*/}
        {/*        margin="normal"*/}
        {/*      />*/}
        {/*      <TextField*/}
        {/*        fullWidth*/}
        {/*        label="Alt Text"*/}
        {/*        value={faviconAlt}*/}
        {/*        onChange={handleFaviconAltChange}*/}
        {/*        margin="normal"*/}
        {/*      />*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}
        {/*</Grid>*/}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleSaveData}
      >
        Save image changes
      </Button>
    </Container>
  );
};

const mapState = (state: RootState): IMapState => ({
  logos: state.websiteSettings.theme.logos,
});
export default connect(mapState, { toggleToastMessage })(ImageManagement);

interface IMapState {
  logos: {
    alt: string;
    src: string;
  };
}

interface IActions {
  toggleToastMessage: (payload: IToggleToastMessage) => void;
}

interface IProps extends IActions, IMapState {
  activeCompanyId: string;
}
