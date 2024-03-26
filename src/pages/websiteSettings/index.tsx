import React from "react";
import http from "../../http";
import { RootState } from "../../store/interfaces";
import { connect, useDispatch } from "react-redux";
import CmsSection from "./CmsSection";
import { setCMS, setPageTitle, setThemeData } from "../../store/actions";
import Accordian from "../../components/Accordian";
import ImagesSection from "./ImagesSection";
import ThemeSection from "./ThemeSection";

interface WebsiteSettingsProps extends IMapState {}

interface IMapState {
  activeCompanyId: string;
  hasCmsContent: boolean;
}

const WebsiteSettings = ({
  activeCompanyId,
  hasCmsContent,
}: WebsiteSettingsProps) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPageTitle("Website Setting & Configuration"));
  });
  const fetchData = async () => {
    const response = await http.get(`/api/cms/${activeCompanyId}`);
    if (!!response && !!response.data) {
      dispatch(setCMS(response.data.cmsContent));
    }
    const themeResponse = await http.get(`/api/theme/${activeCompanyId}`);
    if (!!themeResponse && !!themeResponse.data) {
      dispatch(setThemeData(themeResponse.data));
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [activeCompanyId]);

  if (!hasCmsContent) {
    return <>Loading...</>;
  }

  return (
    <>
      <Accordian
        title={"Content Management"}
        desciption={
          "Set the order, add and remove sections from the website according to your business modal."
        }
        defaultExpanded
      >
        <CmsSection activeCompanyId={activeCompanyId} />
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
  hasCmsContent: state.websiteSettings.cms.length > 0,
});
export default connect(mapState)(WebsiteSettings);
