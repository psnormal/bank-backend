import React from 'react';
import * as axios from 'axios';

const baseUrl = 'https://localhost:7239/api/';

const coreInstanse = axios.create({
    baseUrl : baseUrl
})