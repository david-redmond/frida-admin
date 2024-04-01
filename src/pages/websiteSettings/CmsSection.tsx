import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { connect } from "react-redux";
import { RootState } from "../../store/interfaces";
import { CMS_SECTIONS } from "../../store/constants";
import http from "../../http";
import { toggleToastMessage } from "../../store/actions";
import { IToggleToastMessage } from "../../store/interfaces";
import CmsComponentItem from "./CmsComponentItem";


interface IState {
  components: string[];
  newComponent: string;
  availableComponents: string[];
  isSaving: boolean;
}

const ComponentOrdering: React.FC<IProps> = (props) => {
  const [state, setState] = useState<IState>({
    components: [...props.cmsContent],
    newComponent: "",
    availableComponents: props.possibleCmsComponents.filter(
      (component) => !props.cmsContent.includes(component)
    ),
    isSaving: false,
  });

  const moveComponent = (fromIndex: number, toIndex: number) => {
    const updatedComponents = [...state.components];
    const [movedComponent] = updatedComponents.splice(fromIndex, 1);
    updatedComponents.splice(toIndex, 0, movedComponent);
    setState((prevState) => ({ ...prevState, components: updatedComponents }));
  };

  const removeComponent = (index: number) => {
    const removedComponent = state.components[index];
    const updatedComponents = state.components.filter((_, i) => i !== index);
    setState((prevState) => ({
      ...prevState,
      components: updatedComponents,
      availableComponents: [...prevState.availableComponents, removedComponent],
    }));
  };

  const addComponent = () => {
    const { newComponent, availableComponents, components } = state;
    if (newComponent && !components.includes(newComponent)) {
      setState((prevState) => ({
        ...prevState,
        components: [...components, newComponent],
        availableComponents: availableComponents.filter(
          (component) => component !== newComponent
        ),
        newComponent: "",
      }));
    }
  };

  const saveToDatabase = async () => {
    if (state.isSaving) {
      return;
    }

    const data = {
      cmsContent: state.components,
    };

    setState((prevState) => ({ ...prevState, isSaving: true }));

    try {
      const response = await http.post(`/api/cms/${props.activeCompanyId}`, data);

      if (response.status >= 200 && response.status <= 299) {
        props.toggleToastMessage({
          message: "Changes to website content saved.",
          showToast: "success",
        });
      }
    } catch (e) {
      console.error("Error saving CMS content", e);
      props.toggleToastMessage({
        message: "Error saving changes to website content. Please try again...",
        showToast: "error",
      });
    }

    setState((prevState) => ({ ...prevState, isSaving: false }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {state.components.map((_component, index) => {
              const { id, name, description } = CMS_SECTIONS[_component];
              return (
                <CmsComponentItem
                  key={id}
                  index={index}
                  name={name}
                  description={description}
                  moveComponent={moveComponent}
                  removeComponent={removeComponent}
                />
              );
            })}
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="newComponent">Select a new section</InputLabel>
                <Select
                  labelId="newComponent"
                  id="newComponent"
                  value={state.newComponent}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      newComponent: e.target.value as string,
                    }))
                  }
                >
                  <MenuItem value="">Select a component</MenuItem>
                  {state.availableComponents.map((component) => (
                    <MenuItem key={component} value={component}>
                      {CMS_SECTIONS[component]?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                onClick={addComponent}
                style={{ marginTop: "10px" }}
              >
                Add to website
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Button
            variant="contained"
            onClick={saveToDatabase}
            style={{
              marginTop: '20px'
            }}
        >
          Save changes
        </Button>
      </Container>
    </DndProvider>
  );
};

const mapState = (state: RootState): IMapsState => {
  return {
    cmsContent: state.websiteSettings.cms,
    possibleCmsComponents: state.websiteSettings.possibleCmsComponents,
  };
};

export default connect(mapState, { toggleToastMessage })(ComponentOrdering);

interface IMapsState {
  cmsContent: string[];
  possibleCmsComponents: string[];
}

interface IActions {
  toggleToastMessage: (payload: IToggleToastMessage) => void;
}

interface IProps extends IMapsState, IActions {
  activeCompanyId: string;
}
