import React from 'react';
import * as axios from 'axios';

const baseUrl = 'https://localhost:7139/api/';

const coreInstanse = axios.create({
    baseUrl : baseUrl
})