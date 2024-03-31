import http from "../http";
import {INewCompany} from "../store/interfaces";
import Routes from "../routes";
import {toggleToastMessage} from "../store/actions";

export default async (company: INewCompany, dispatch: any) => {
    try {

        const response = await http.post("/api/client", company);

        if (response.status >= 200 && response.status <= 299) {
            dispatch(toggleToastMessage({
                message: "New company successfully created.",
                showToast: "success"
            }))
            setTimeout(() => window.location.href = Routes.home, 1000);
        }
    } catch (e: any) {
        console.error("Error: ConnectCompanyToUser", e);
        dispatch(toggleToastMessage({
            message: "Error creating a new company.",
            showToast: "error"
        }))
    }
}