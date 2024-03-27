import http from "../http";

interface IArgs {
    companyName: string;
    companyId: string;
}
export default async ({companyName, companyId}: IArgs) => {
    try {
        const data = {
            companyName,
            companyId
        };
        const response = await http.put("/api/user/add-company", data);

        if (response.status >= 200 && response.status <= 299) {

        }
    } catch (e: any) {
        console.error("Error: ConnectCompanyToUser", e);
    }
}