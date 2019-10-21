import { useState, useEffect } from 'react';
const useQueryApi = (param) => {
    const [query, setQuery] = useState({
        type: '',
        arg: ''
    });
    const [queryRes, setQueryRes] = useState({});
    const [loading, setLoading] = useState(false);
    const setSearch = () => {
        setQuery({ ...query, type: param.query, arg: param.arg });
    }

    useEffect(() => {
        try {
            setLoading(true);
            setSearch();
        } catch (e) {
            console.error(e);
        } finally {
            makeReq();
        }



    }, [param]);


    const makeReq = async () => {
        try {
            const res = await fetch(`https://api.github.com/${query.type}/${query.arg}`);
            const jsonRes = await res.json();

            setQueryRes(jsonRes);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return [queryRes, loading,];
}


export default useQueryApi;