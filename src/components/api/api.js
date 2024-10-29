const apiBase = 'https://appointment-management-tool.onrender.com';
// const apiBase = 'http://localhost:3000';

export const getUser = async () => {
  try {
    const response = await fetch(`${apiBase}/users`);
    const users = await response.json();
    return users;
  } catch (e) {
    console.log(e.message);
  }
};

export const addUser = async (obj) => {
  try {
    const res = await fetch(`${apiBase}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const getData = async (id = '') => {
  try {
    const res = await fetch(`${apiBase}/visits/${id}`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export const addVisit = async (obj) => {
  try {
    const res = await fetch(`${apiBase}/visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    return await res.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteVisitById = async (id) => {
  try {
    const res = await fetch(`${apiBase}/visits/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const updateVisit = async (obj, id) => {
  try {
    const res = await fetch(`${apiBase}/visits/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    return await res.json();
  } catch (e) {
    console.log(e.message);
  }
};
