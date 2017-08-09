import request from './request'

const getMembers = members => request(`http://localhost:3080/getmembers`);
const getPosts = posts => request(`http://localhost:3080/getposts`);

export { getMembers, getPosts }