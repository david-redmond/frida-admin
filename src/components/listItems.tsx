import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import Routes from "../routes";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle, Store, ViewList } from "@mui/icons-material";
import { IAssociatedCompany, RootState } from "../store/interfaces";
import { connect, useDispatch } from "react-redux";
import { ListSubheader, Typography } from "@mui/material";
import { setActiveCompanyId } from "../store/actions";

interface MainListItemsProps extends IMapState {}

interface SecondaryListItemsProps extends IMapState {}

interface IMapState {
  activeCompanyId: string;
  clientsList: IAssociatedCompany[];
  hasAssociatedCompanies: boolean;
}
const _MainListItems = (props: MainListItemsProps) => {
  if (!props.hasAssociatedCompanies) {
    return (
      <React.Fragment>
        <Link to={Routes.home} className={"link-default"}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>
        <Link to={Routes.profile} className={"link-default"}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </Link>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Link to={Routes.home} className={"link-default"}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link to={Routes.orders} className={"link-default"}>
        <ListItemButton>
          <ListItemIcon>
            <ViewList />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </Link>
      <Link to={Routes.products} className={"link-default"}>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
      </Link>
      {/*<Link to={Routes.people}>*/}
      {/*  <ListItemButton>*/}
      {/*    <ListItemIcon>*/}
      {/*      <PeopleIcon />*/}
      {/*    </ListItemIcon>*/}
      {/*    <ListItemText primary="My Team" />*/}
      {/*  </ListItemButton>*/}
      {/*</Link>*/}
      {/*<Link to={Routes.reports}>*/}
      {/*  <ListItemButton>*/}
      {/*    <ListItemIcon>*/}
      {/*      <BarChartIcon />*/}
      {/*    </ListItemIcon>*/}
      {/*    <ListItemText primary="Reports" />*/}
      {/*  </ListItemButton>*/}
      {/*</Link>*/}
      <Link to={Routes.websiteSettings} className={"link-default"}>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Website Setting" />
        </ListItemButton>
      </Link>
      <Link to={Routes.profile} className={"link-default"}>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};

const _SecondaryListItems = (props: SecondaryListItemsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeCompany = (id: string) => {
    dispatch(setActiveCompanyId(id));
    navigate(Routes.home);
  };
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Associated Companies
      </ListSubheader>
      {props.hasAssociatedCompanies ? (
        props.clientsList.map((client: IAssociatedCompany) => {
          const activeCompanyStyle = {
            color: "grey",
          };
          if (client.id === props.activeCompanyId) {
            activeCompanyStyle.color = "black";
          }
          return (
            <ListItemButton
              onClick={() => handleChangeCompany(client.id)}
              style={activeCompanyStyle}
            >
              <ListItemIcon>
                <Store />
              </ListItemIcon>
              <div>
                <ListItemText primary={client.name} />
                {client.id === props.activeCompanyId && (
                  <Typography variant={"caption"}>Active Company</Typography>
                )}
              </div>
            </ListItemButton>
          );
        })
      ) : (
        <Link to={Routes.profile} className={"link-default"}>
          <ListItemButton onClick={() => null}>
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <ListItemText primary={"Create Store"} />
          </ListItemButton>
        </Link>
      )}
    </React.Fragment>
  );
};

const mapState = (state: RootState): IMapState => ({
  hasAssociatedCompanies: state.associatedCompanies.length > 0,
  activeCompanyId: state.user.activeCompanyId,
  clientsList: state.associatedCompanies,
});

export const SecondaryListItems = connect(mapState)(_SecondaryListItems);
export const MainListItems = connect(mapState)(_MainListItems);
