import React, { useState } from "react";
import { RootState } from "../../store/interfaces";
import { connect, useDispatch } from "react-redux";
import CmsSection from "./CmsSection";
import { setPageTitle } from "../../store/actions";
import Accordian from "../../components/Accordian";
import ImagesSection from "./ImagesSection";
import ThemeSection from "./ThemeSection";
import Spinner from "../../components/Spinner";
import fetchWebsiteSettings from "../../api/fetchWebsiteSettings";

interface WebsiteSettingsProps extends IMapState {}

interface IMapState {
  activeCompanyId: string;
}

const WebsiteSettings = ({ activeCompanyId }: WebsiteSettingsProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    dispatch(setPageTitle("Website Setting & Configuration"));
  });
  const fetchData = async () => {
    await fetchWebsiteSettings(activeCompanyId, dispatch);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, [activeCompanyId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Accordian
        title={"Landing Page Content"}
        desciption={
          "Set the order, add and remove sections from the website according to your business modal."
        }
        defaultExpanded
      >
        <CmsSection activeCompanyId={activeCompanyId} type={"landingPage"} />
      </Accordian>
      <Accordian
        title={"Checkout Page Content"}
        desciption={
          "Set the order, add and remove sections from your checkout."
        }
      >
        <CmsSection activeCompanyId={activeCompanyId} type={"checkout"} />
      </Accordian>
      <Accordian title={"Image Management"}>
        <ImagesSection activeCompanyId={activeCompanyId} />
      </Accordian>
      <Accordian title={"Theme Management"}>
        <ThemeSection activeCompanyId={activeCompanyId} />
      </Accordian>
    </>
  );
};

const mapState = (state: RootState): IMapState => ({
  activeCompanyId: state.user.activeCompanyId,
});
export default connect(mapState)(WebsiteSettings);
