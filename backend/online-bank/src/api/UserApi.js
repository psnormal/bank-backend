import React from 'react';
import axios from 'axios';

const baseUrl = 'https://localhost:7099/api/';

const coreInstanse = axios.create({
    baseURL : baseUrl,
    headers: {
       'Content-Type': 'application/json'
    }
});

export const UserApi = {
    registerClient(name, lastname, password) {
        const body = {
            name: name,
            lastname: lastname,
            password: password
        }
        return coreInstanse.post('User/ClientRegistration', body)
    },

    registerEmployee(name, lastname, password) {
        const body = {
            title: name,
            body: lastname,
            userId: 1
        }
        return coreInstanse.post('https://jsonplaceholder.typicode.com/posts', body)
    },

    // registerEmployee(name, lastname, password) {
    //     const body = {
    //         name: name,
    //         lastname: lastname,
    //         password: password
    //     }
    //     return coreInstanse.post('User/EmployeeRegistration', body)
    // },

    getClientInfo(id) {
        return coreInstanse.get(`User/${id}/ClientInformation`)
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
    },

    /*getAllUsers() {
        return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
    },*/
     getAllUsers() {
         return coreInstanse.get('User/AllUsers')
         .then(response => {
             if (response.status === 200) {
                 return response.data;
             }
         })
         .catch(error => {
             console.log(error.response.data.error)
         });
     },

    blockUser(id) {
        return coreInstanse.put(`User/${id}/block`);
    }
}

