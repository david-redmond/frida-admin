import http from "../http";
import {toggleToastMessage} from "../store/actions";
import Routes from "../routes";

interface IArgs {
    companyName: string;
    companyId: string;
    dispatch: any;
}
export default async ({companyName, companyId, dispatch}: IArgs) => {
    try {
        const data = {
            companyName,
            companyId
        };
        const response = await http.put("/api/user/add-company", data);

        if (response.status >= 200 && response.status <= 299) {
            dispatch(toggleToastMessage({
                message: "Connection successfully.",
                showToast: "success"
            }))
            setTimeout(() => window.location.href = Routes.home, 1000);
        }
    } catch (e: any) {
        console.error("Error: ConnectCompanyToUser", e);
        dispatch(toggleToastMessage({
            message: "Error connecting the company.",
            showToast: "error"
        }))
    }
}