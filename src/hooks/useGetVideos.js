import { useEffect, useState } from 'react';
import { useData } from './useData';

export const useGetVideos = () => {

    const [videos, setVideos] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastKey, setLastKey] = useState(null);
    const [moreContent, setMoreContent] = useState(true);
    const { getFirstPageData, getNextPageData } = useData();

    useEffect(() => {

        setLoading(true);

        if (!videos) {
            getFirstPageData()
                .then((data) => {
                    if(data?.lastVisible) {
                        setVideos(data.videos);
                        setLastKey(data.lastVisible);
                        setLoading(false);
                    } else {
                        setMoreContent(false);
                    }
                });
        }

    }, [videos, getFirstPageData]);

    const moreVideos = () => {

        setLoading(true);

        if(lastKey) {
            getNextPageData(lastKey)
                .then((data) => {
                    if(data?.lastVisible) {
                        setVideos([...videos, ...data.videos]);
                        setLastKey(data.lastVisible);
                        setLoading(false);
                    } else {
                        setMoreContent(false);
                    }
                });
        }

    }

    return {
        videos,
        loading,
        moreContent,
        moreVideos
    }

}
