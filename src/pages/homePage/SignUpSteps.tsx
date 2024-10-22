import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Typography, Paper } from "@material-ui/core";
import Routes from "../../routes";
import { Link } from "@mui/material";
import fetchProducts from "../../api/fetchProducts";
import { connect, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { RootState } from "../../store/interfaces";
import fetchWebsiteSettings from "../../api/fetchWebsiteSettings";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(3),
  },
  stepper: {
    padding: theme.spacing(3, 0),
    backgroundColor: "transparent",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

interface IStep {
  title: string;
  key: number;
  description: string;
}

const steps: IStep[] = [
  {
    key: 0,
    title: "Create an Account",
    description: "Sign up for an account",
  },
  {
    key: 1,
    title: "Connect to a company",
    description: "Connect your account to a company",
  },
  {
    key: 2,
    title: "Create some products",
    description:
      "To start selling you will need some products. Create these in the products section.",
  },
  {
    key: 3,
    title: "Update the website settings",
    description:
      "You need to add your logo, colors and any UI sections you want to the website.",
  },
  {
    key: 4,
    title: "Update the public domain",
    description: "Lets create a sub-domain where the users can find your site.",
  },
];

interface IProps extends IMapState {}

const VerticalStepper = (props: IProps) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState<number>(
    props.startingStep,
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const dispatch = useDispatch();
  const fetchData = async () => {
    await fetchProducts(props.activeCompanyId, dispatch);
    await fetchWebsiteSettings(props.activeCompanyId, dispatch);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setActiveStep(props.startingStep);
  }, [props.startingStep]);

  const handleClick = () => {
    if (activeStep === 2) {
      return Routes.products;
    } else if (activeStep === 3) {
      return Routes.websiteSettings;
    } else {
      return Routes.profile;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Paper className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={classes.stepper}
      >
        {steps.map((step: IStep) => (
          <Step key={step.key}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <Typography className={classes.instructions}>
          {steps[activeStep].description}
        </Typography>
        <div className={classes.buttonContainer}>
          <Link href={handleClick()}>Fix this</Link>
        </div>
      </div>
    </Paper>
  );
};

interface IMapState {
  activeCompanyId: string;
  startingStep: number;
}
const mapState = (state: RootState): IMapState => {
  let theNumber: number = 2;
  if (state.products.length > 0) {
    theNumber = 3;
  }
  if (
    state.websiteSettings.checkoutContent.length > 0 ||
    state.websiteSettings.landingContent.length > 0
  ) {
    theNumber = 4;
  }
  return {
    activeCompanyId: state.user.activeCompanyId,
    startingStep: theNumber,
  };
};

export default connect(mapState)(VerticalStepper);
