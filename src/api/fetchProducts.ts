import http from "../http";
import {setProducts} from "../store/actions";

let isFetching: boolean = false;
export default async (activeCompanyId: string, dispatch: any) => {
    try {
        if (isFetching) {
            return;
        }
        isFetching = true;
        const response = await http.get(`/api/products/${activeCompanyId}`);

        if (response.status >= 200 && response.status <= 299) {
            dispatch(setProducts(response.data))
        }
    } catch (e: any) {
        console.error("Error: fetchProducts", e)
    } finally {
        isFetching = false;
    }
}