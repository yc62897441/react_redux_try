export const fetch = 'fetch'

export const doFetch = (fetchData) => ({
    type: fetch,
    payload: {
        fetchData,
    },
})
