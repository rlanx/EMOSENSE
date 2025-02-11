import React from "react";

export default function RoleSelector({ roles, selectedRole, onChange }) {
  return (
    <div className="space-y-1">
      <label>บทบาท</label>
      <div className="flex gap-5">
        {roles.map((role) => (
          <label key={role} className="label w-fit space-x-2">
            <input
              type="radio"
              name="role"
              className="radio radio-primary"
              value={role}
              checked={selectedRole === role}
              onChange={() => onChange(role)}
            />
            <span className="label-text">{role}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
