import React, { useState } from "react";

interface User {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
}

const AdminControl: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const addUser = () => {
    if (newUsername && newPassword) {
      const newUser: User = {
        id: users.length + 1,
        username: newUsername,
        password: newPassword,
        isAdmin: false,
      };
      setUsers([...users, newUser]);
      setNewUsername("");
      setNewPassword("");
    } else {
      alert("Username and password are required.");
    }
  };

  const makeAdmin = () => {
    if (selectedUserId !== null) {
      setUsers(
        users.map((user) =>
          user.id === selectedUserId ? { ...user, isAdmin: true } : user
        )
      );
      setSelectedUserId(null);
    } else {
      alert("Please select a user to make admin.");
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      textAlign: "center" as const,
      color: "#333",
    },
    section: {
      marginBottom: "20px",
    },
    input: {
      display: "block",
      width: "100%",
      padding: "8px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
    },
    button: {
      display: "block",
      width: "100%",
      padding: "10px",
      backgroundColor: "#007BFF",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
    },
    select: {
      display: "block",
      width: "100%",
      padding: "8px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
    },
    userList: {
      listStyle: "none",
      padding: "0",
    },
    userListItem: {
      padding: "10px",
      borderBottom: "1px solid #ccc",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Control</h1>

      {/* Add User Section */}
      <div style={styles.section}>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={addUser} style={styles.button}>
          Add User
        </button>
      </div>

      {/* Make Admin Section */}
      <div style={styles.section}>
        <h2>Make User Admin</h2>
        <select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          style={styles.select}
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} {user.isAdmin ? "(Admin)" : ""}
            </option>
          ))}
        </select>
        <button
          onClick={makeAdmin}
          style={{
            ...styles.button,
            ...(selectedUserId === null ? styles.buttonDisabled : {}),
          }}
          disabled={selectedUserId === null}
        >
          Make Admin
        </button>
      </div>

      {/* Users List */}
      <div style={styles.section}>
        <h2>Users List</h2>
        <ul style={styles.userList}>
          {users.map((user) => (
            <li key={user.id} style={styles.userListItem}>
              {user.username} - {user.isAdmin ? "Admin" : "User"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminControl;
