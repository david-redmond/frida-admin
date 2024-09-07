import http from "../http";

let isFetching: boolean = false;
export default async (activeCompanyId: string, setter: any) => {
  try {
    if (isFetching) {
      return;
    }
    isFetching = true;
    const response = await http.get(`/api/cms/${activeCompanyId}`);
    console.log("$$$$$$$$$$$$$")
    console.log(response)
    console.log("$$$$$$$$$$$$$")
    if (response.status >= 200 && response.status <= 299) {
      setter(response.data);
    }
  } catch (e: any) {
    console.error("Error: fetchCMS & Theme", e);
  } finally {
    isFetching = false;
  }
};
