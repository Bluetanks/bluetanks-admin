const baseURL = 'https://bluetanks-api.herokuapp.com/api/v1';

const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjliODE3NWYxZGViYzMwYWM2MmY5YWEiLCJlbWFpbCI6Im9yamlhY2VAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaXNWZXJpZmllZCI6dHJ1ZSwic3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNjYxMzg3OTQzLCJleHAiOjE2NjkxNjM5NDN9.9sMdhbaB_6tI_5RaJ7VLExDvL2adTKbGmaXdVfBobQ0"

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

export const addStation = async (body) => {
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
    }
    let timeoutId;

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body
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

export const editStation = async (id) => {
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
    }
    let timeoutId;

    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,

    };

    return Promise.race([
        fetch(`${baseURL}/stations/${id}`, requestOptions)
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
