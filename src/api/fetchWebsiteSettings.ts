import http from "../http";
import { setWebsiteSettings } from "../store/actions";

let isFetching: boolean = false;
export default async (activeCompanyId: string, dispatch: any) => {
  try {
    if (isFetching) {
      return;
    }
    isFetching = true;
    const cmsResponse = await http.get(`/api/cms/${activeCompanyId}`);
    const themeResponse = await http.get(`/api/theme/${activeCompanyId}`);

    if (
      cmsResponse.status >= 200 &&
      cmsResponse.status <= 299 &&
      themeResponse.status >= 200 &&
      themeResponse.status <= 299
    ) {
      dispatch(
        setWebsiteSettings({ ...cmsResponse.data, ...themeResponse.data }),
      );
    }
  } catch (e: any) {
    console.error("Error: fetchCMS & Theme", e);
  } finally {
    isFetching = false;
  }
};
