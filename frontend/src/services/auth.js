export const loginUser = async (data) => {
  const response = await fetch("http://localhost:5000/api/users/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
}

export const registerUser = async (data) => {
  const response = await fetch("http://localhost:5000/api/users/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
}