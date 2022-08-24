const baseURL = 'https://bluetanks-api.herokuapp.com/api/v1';

const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdkOTdmM2U1MTcxNjNiY2YxYzFkZDIiLCJlbWFpbCI6Im53YWd1dmljdG9yMTAwQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaXNWZXJpZmllZCI6dHJ1ZSwic3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNjYxMzc2NzU4LCJleHAiOjE2NjkxNTI3NTh9.AjRGAAuLQOlA6lklOi9AG3i0EzIj7t9dR_UWPXqk1LI"

export const getUsers = async () => {
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
    }
    let timeoutId;

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return Promise.race([
        fetch(`${baseURL}/users`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}

export const allStations = async () => {
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
    }
    let timeoutId;

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return Promise.race([
        fetch(`${baseURL}/stations`, requestOptions)
            .then(response => response.json()),
        new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

            //  clearTimeout(timeoutId)
        }).then(() => {
            clearTimeout(timeoutId)
        })

    ])

}





export const getTotalStations = {

    totalStations: async ({pageParam = 1}) => {
        const myHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
        }
        let timeoutId;

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        return Promise.race([
            fetch(`${baseURL}/stations`, requestOptions)
                .then(response => response.json()),
            new Promise((resolve, reject) => {
                timeoutId = setTimeout(() => reject(new Error('Timeout')), 15000)

                //  clearTimeout(timeoutId)
            }).then(() => {
                clearTimeout(timeoutId)
            })

        ])

    }
}
